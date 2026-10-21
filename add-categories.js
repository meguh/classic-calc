#!/usr/bin/env node
/**
 * add-categories.js — Add the in-game recipe category ("Mail Helmets", "Elixirs", …) to
 * <prefix>-professions.json, from a client build's SkillLineAbility + TradeSkillCategory tables
 *
 * Usage:
 *   node add-categories.js classic 5.5.4.70469
 *   node add-categories.js tbc     5.5.4.70469
 *   node add-categories.js wotlk   5.5.4.70469
 *
 * Use a build that has TradeSkillCategory (the 1.15/2.5 clients don't; MoP Classic does and
 * still carries every older recipe). Matches on recipe id = spell id first, then on the item
 * the recipe creates (WotLK ids come from the Game Data API and aren't spell ids).
 *
 * Recipes with no match keep no category; the site groups them under "Miscellaneous".
 * Requires Node.js 18+
 */

const fs   = require('fs');
const path = require('path');

const GAME_DIR  = __dirname;
const CACHE_DIR = path.join(GAME_DIR, '.cache');

async function table(version, name) {
  const dir  = path.join(CACHE_DIR, version);
  const file = path.join(dir, `${name}.csv`);
  if (!fs.existsSync(file)) {
    fs.mkdirSync(dir, { recursive: true });
    const res = await fetch(`https://wago.tools/db2/${name}/csv?build=${version}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${name}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return readCsv(file);
}

function parseLine(line) {
  const out = [];
  let cur = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else quoted = false;
      } else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function readCsv(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
  const head = parseLine(lines[0]);
  return lines.slice(1).map(l => {
    const v = parseLine(l), row = {};
    head.forEach((k, i) => { row[k] = v[i]; });
    return row;
  });
}

async function main() {
  const [prefix, version] = process.argv.slice(2);
  if (!prefix || !version) { console.error('Usage: node add-categories.js <prefix> <build>'); process.exit(1); }

  const catName = new Map((await table(version, 'TradeSkillCategory')).map(r => [r.ID, r.Name_lang]));
  const spellCat = new Map();   // spellId → category name
  for (const a of await table(version, 'SkillLineAbility')) {
    const name = catName.get(a.TradeSkillCategoryID);
    if (name && !spellCat.has(a.Spell)) spellCat.set(a.Spell, name);
  }

  const itemCat = new Map();    // created itemId → category name
  for (const e of await table(version, 'SpellEffect')) {
    if (e.Effect !== '24' || !spellCat.has(e.SpellID) || itemCat.has(e.EffectItemType)) continue;
    itemCat.set(e.EffectItemType, spellCat.get(e.SpellID));
  }

  const file = path.join(GAME_DIR, `${prefix}-professions.json`);
  const text = fs.readFileSync(file, 'utf8');
  const profs = JSON.parse(text);
  let hit = 0;
  for (const r of profs) {
    const cat = spellCat.get(String(r.id)) || itemCat.get(String(r.creates?.item_id));
    if (cat) { r.category = cat; hit++; }
  }

  // keep the file's existing formatting (pretty-printed or compact, LF or CRLF)
  const indent = (/^\[\r?\n( +)/.exec(text) || [])[1]?.length || 0;
  const eol    = text.includes('\r\n') ? '\r\n' : '\n';
  let out = JSON.stringify(profs, null, indent);
  if (eol === '\r\n') out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file, out + (text.endsWith(eol) ? eol : ''));
  console.log(`${prefix}: ${hit}/${profs.length} recipes categorised (build ${version})`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
