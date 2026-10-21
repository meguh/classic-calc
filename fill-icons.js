#!/usr/bin/env node
/**
 * fill-icons.js — Fill missing item/recipe icons in <prefix>-mats.json / <prefix>-professions.json
 *
 * Usage:
 *   node fill-icons.js wotlk            (newest wow_classic build)
 *   node fill-icons.js wotlk 5.5.4.70469
 *
 * Item icons come from the client's Item table (IconFileDataID) mapped through the icon map
 * that fetch-forever.js caches in .cache/icons.json — run that once first. Recipes take the
 * icon of the item they create. Requires Node.js 18+
 */

const fs   = require('fs');
const path = require('path');

const GAME_DIR  = __dirname;
const CACHE_DIR = path.join(GAME_DIR, '.cache');

async function pickBuild() {
  const res = await fetch('https://wago.tools/api/builds');
  if (!res.ok) throw new Error(`HTTP ${res.status} for build list`);
  return (await res.json()).wow_classic[0].version;
}

async function main() {
  const prefix = process.argv[2];
  if (!prefix) { console.error('Usage: node fill-icons.js <prefix> [build]'); process.exit(1); }

  const iconsFile = path.join(CACHE_DIR, 'icons.json');
  if (!fs.existsSync(iconsFile)) { console.error('Missing .cache/icons.json — run node fetch-forever.js first'); process.exit(1); }
  const icons = JSON.parse(fs.readFileSync(iconsFile, 'utf8'));

  const version = process.argv[3] || await pickBuild();
  const dir = path.join(CACHE_DIR, version);
  const itemCsv = path.join(dir, 'Item.csv');
  if (!fs.existsSync(itemCsv)) {
    fs.mkdirSync(dir, { recursive: true });
    const res = await fetch(`https://wago.tools/db2/Item/csv?build=${version}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} for Item table`);
    fs.writeFileSync(itemCsv, Buffer.from(await res.arrayBuffer()));
  }
  console.log(`Build: ${version}`);

  // Item.csv has no quoted fields: ID,ClassID,...,IconFileDataID,...
  const lines = fs.readFileSync(itemCsv, 'utf8').split(/\r?\n/).filter(Boolean);
  const col = lines[0].split(',').indexOf('IconFileDataID');
  const itemIcon = new Map();
  for (const line of lines.slice(1)) {
    const v = line.split(',');
    const slug = icons[v[col]];
    if (slug) itemIcon.set(+v[0], slug);
  }

  const matsFile  = path.join(GAME_DIR, `${prefix}-mats.json`);
  const profsFile = path.join(GAME_DIR, `${prefix}-professions.json`);
  const matsText  = fs.readFileSync(matsFile, 'utf8');
  const profsText = fs.readFileSync(profsFile, 'utf8');
  const mats  = JSON.parse(matsText);
  const profs = JSON.parse(profsText);

  let items = 0, recipes = 0;
  for (const m of mats) {
    if (!m.icon && itemIcon.has(m.id)) { m.icon = itemIcon.get(m.id); items++; }
  }
  for (const r of profs) {
    const slug = r.creates?.item_id && itemIcon.get(r.creates.item_id);
    if (!r.icon && slug) { r.icon = slug; recipes++; }
  }

  // keep each file's existing formatting (pretty-printed or compact)
  const save = (file, data, text) => {
    const indent = (/^\[\r?\n( +)/.exec(text) || [])[1]?.length || 0;
    const eol    = text.includes('\r\n') ? '\r\n' : '\n';
    let out = JSON.stringify(data, null, indent);
    if (eol === '\r\n') out = out.replace(/\n/g, '\r\n');
    fs.writeFileSync(file, out + (text.endsWith(eol) ? eol : ''));
  };
  save(matsFile,  mats,  matsText);
  save(profsFile, profs, profsText);
  console.log(`  Items   : ${items} filled, ${mats.filter(m => !m.icon).length} still missing`);
  console.log(`  Recipes : ${recipes} filled, ${profs.filter(r => !r.icon).length} still missing`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
