#!/usr/bin/env node
/**
 * fetch-forever.js — Build WoW: Forever crafting data from the game client's DB2 tables
 *
 * Usage:
 *   node fetch-forever.js              (newest 1.60.x build of wowf / wow_classic_beta)
 *   node fetch-forever.js 1.60.1.70450 (specific build)
 *
 * Data comes from wago.tools DB2 CSV exports; icon names from the wowdev community listfile.
 * Downloads are cached in .cache/ (gitignored). Requires Node.js 18+
 *
 * Outputs:
 *   forever-professions.json  — recipes (same schema as classic-professions.json)
 *   forever-mats.json         — items   (same schema as classic-mats.json, plus `raw`)
 */

const fs   = require('fs');
const path = require('path');

const GAME_DIR  = __dirname;
const CACHE_DIR = path.join(GAME_DIR, '.cache');
const PRODUCTS  = ['wowf', 'wow_classic_beta'];
const LISTFILE  = 'https://github.com/wowdev/wow-listfile/releases/latest/download/community-listfile.csv';

const CRAFT_TYPES = new Set([129, 164, 165, 171, 185, 186, 197, 202, 333]);

// Spell ID bands: original 1.12 recipes are < 100k. Season of Discovery added 400k–1.23M.
// Forever's new recipes start at ~1.229M (first: Camping). SoD rows still ship in the client.
const FOREVER_MIN_SPELL = 1229000;
const ACQUIRE_REMOVED   = '3';
const EFFECT_CREATE_ITEM = '24';

// ── Download + cache ────────────────────────────────────────────────────────

async function download(url, file) {
  if (fs.existsSync(file)) return;
  process.stdout.write(`  downloading ${path.basename(file)} ... `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log('ok');
}

async function pickBuild() {
  const res = await fetch('https://wago.tools/api/builds');
  if (!res.ok) throw new Error(`HTTP ${res.status} for build list`);
  const all = await res.json();
  const builds = PRODUCTS.flatMap(p => all[p] || []).filter(b => b.version.startsWith('1.60.'));
  if (!builds.length) throw new Error('No 1.60.x build found');
  const num = v => +v.split('.').pop();
  builds.sort((a, b) => num(b.version) - num(a.version));
  return builds[0];
}

// ── CSV ─────────────────────────────────────────────────────────────────────

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

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const version = process.argv[2] || (await pickBuild()).version;
  console.log(`Build: ${version}`);

  const dir = path.join(CACHE_DIR, version);
  fs.mkdirSync(dir, { recursive: true });

  const TABLES = ['SkillLineAbility', 'SpellReagents', 'SpellEffect', 'SpellName',
                  'SpellMisc', 'Item', 'ItemSparse', 'TradeSkillCategory'];
  for (const t of TABLES) {
    await download(`https://wago.tools/db2/${t}/csv?build=${version}`, path.join(dir, `${t}.csv`));
  }

  // Icon names (fileDataID → slug). The full listfile is ~150 MB, so keep only icons.
  const iconsFile = path.join(CACHE_DIR, 'icons.json');
  if (!fs.existsSync(iconsFile)) {
    const listfile = path.join(CACHE_DIR, 'listfile.csv');
    await download(LISTFILE, listfile);
    const icons = {};
    for (const line of fs.readFileSync(listfile, 'utf8').split(/\r?\n/)) {
      const m = /^(\d+);interface\/icons\/([^/]+)\.blp$/i.exec(line);
      if (m) icons[m[1]] = m[2].toLowerCase();
    }
    fs.writeFileSync(iconsFile, JSON.stringify(icons));
    fs.unlinkSync(listfile);
  }
  const icons = JSON.parse(fs.readFileSync(iconsFile, 'utf8'));

  const load = t => readCsv(path.join(dir, `${t}.csv`));
  const spellNames = new Map(load('SpellName').map(r => [r.ID, r.Name_lang]));
  const spellIcons = new Map(load('SpellMisc').map(r => [r.SpellID, icons[r.SpellIconFileDataID] || '']));
  const sodCats    = new Set(load('TradeSkillCategory')
    .filter(r => /season of discovery/i.test(r.Name_lang)).map(r => r.ID));

  const reagentsBySpell = new Map();
  for (const r of load('SpellReagents')) {
    const list = [];
    for (let i = 0; i < 8; i++) {
      const id = +r[`Reagent_${i}`], n = +r[`ReagentCount_${i}`];
      if (id > 0 && n > 0) list.push({ item_id: id, item_count: n });
    }
    if (list.length) reagentsBySpell.set(r.SpellID, list);
  }

  const createsBySpell = new Map();
  for (const e of load('SpellEffect')) {
    if (e.Effect !== EFFECT_CREATE_ITEM || !(+e.EffectItemType > 0)) continue;
    if (createsBySpell.has(e.SpellID)) continue;
    createsBySpell.set(e.SpellID, {
      item_id:    +e.EffectItemType,
      item_count: Math.max(1, Math.round(+e.EffectBasePointsF || 1)),
    });
  }

  // Recipes
  const recipes = [];
  const seenSpell = new Set();
  for (const a of load('SkillLineAbility')) {
    const type = +a.SkillLine, spell = +a.Spell;
    if (!CRAFT_TYPES.has(type) || seenSpell.has(spell)) continue;
    if (a.AcquireMethod === ACQUIRE_REMOVED || sodCats.has(a.TradeSkillCategoryID)) continue;
    if (spell >= 100000 && spell < FOREVER_MIN_SPELL) continue;
    const reagents = reagentsBySpell.get(a.Spell);
    if (!reagents) continue;
    seenSpell.add(spell);

    const low = +a.TrivialSkillLineRankLow, high = +a.TrivialSkillLineRankHigh;
    const recipe = {
      id:            spell,
      type,
      name:          spellNames.get(a.Spell) || `Spell #${spell}`,
      icon:          '',
      color_level_2: low,
      color_level_3: Math.round((low + high) / 2),
      color_level_4: high,
      is_new:        spell >= FOREVER_MIN_SPELL,
      reagents,
    };
    const creates = createsBySpell.get(a.Spell);
    if (creates) recipe.creates = creates;
    recipes.push(recipe);
  }

  // Items referenced by any recipe
  const wanted = new Set();
  for (const r of recipes) {
    if (r.creates) wanted.add(r.creates.item_id);
    r.reagents.forEach(rg => wanted.add(rg.item_id));
  }

  const itemIcons = new Map(load('Item').map(r => [r.ID, icons[r.IconFileDataID] || '']));

  // Classic data shares item IDs: reuse its gathering/disenchant sources, and its
  // name/icon for items the beta export doesn't carry
  const classicItems = new Map();
  try {
    for (const it of JSON.parse(fs.readFileSync(path.join(GAME_DIR, 'classic-mats.json'), 'utf8'))) {
      classicItems.set(it.id, it);
    }
  } catch { console.warn('  classic-mats.json not found — gathered items will not be flagged'); }
  const classicSources = id => (classicItems.get(id)?.sources || []).filter(s => s.type !== 5);

  const items = new Map();
  for (const s of load('ItemSparse')) {
    const id = +s.ID;
    if (!wanted.has(id)) continue;
    items.set(id, {
      id,
      name:           s.Display_lang,
      icon:           itemIcons.get(s.ID) || classicItems.get(id)?.icon || '',
      quality:        +s.OverallQualityID,
      slot:           +s.InventoryType,
      requires_level: +s.RequiredLevel,
      item_level:     +s.ItemLevel,
      sell_price:     +s.SellPrice,
      bind_type:      +s.Bonding,
      sources:        classicSources(id),
    });
  }

  // Items missing from ItemSparse (not exported, or still encrypted): Classic data first,
  // then the name of the recipe that makes it
  let stubbed = 0;
  for (const id of wanted) {
    if (items.has(id)) continue;
    const c = classicItems.get(id);
    const maker = recipes.find(r => r.creates?.item_id === id);
    items.set(id, {
      id,
      name:    c?.name || maker?.name || `Item #${id}`,
      icon:    c?.icon || itemIcons.get(String(id)) || (maker && spellIcons.get(String(maker.id))) || '',
      quality: c?.quality ?? 1,
      sources: classicSources(id),
    });
    if (!c && !maker) stubbed++;
  }

  for (const r of recipes) {
    const spellIcon = spellIcons.get(String(r.id)) || '';
    if (r.creates) {
      const out = items.get(r.creates.item_id);
      if (!out.icon) out.icon = spellIcon;
      r.icon = out.icon;
      out.sources.push({ type: 5, skill_id: r.id, item_count: r.creates.item_count });
    } else {
      r.icon = spellIcon;
    }
  }

  // Conversion pairs (A→B and B→A, e.g. lesser ↔ greater essences) would expand forever;
  // mark both sides raw so the calculator stops there.
  const makers = new Map();
  for (const r of recipes) if (r.creates) {
    (makers.get(r.creates.item_id) || makers.set(r.creates.item_id, []).get(r.creates.item_id)).push(r);
  }
  let rawCount = 0;
  for (const [out, list] of makers) {
    for (const r of list) for (const rg of r.reagents) {
      if (rg.item_id === out) continue;   // upgrades that consume the item itself
      const back = makers.get(rg.item_id) || [];
      if (back.some(b => b.reagents.some(x => x.item_id === out))) {
        for (const id of [out, rg.item_id]) {
          const it = items.get(id);
          if (it && !it.raw) { it.raw = true; rawCount++; }
        }
      }
    }
  }

  recipes.sort((a, b) => a.type - b.type || a.id - b.id);
  const mats = [...items.values()].sort((a, b) => a.id - b.id);
  fs.writeFileSync(path.join(GAME_DIR, 'forever-professions.json'), JSON.stringify(recipes));
  fs.writeFileSync(path.join(GAME_DIR, 'forever-mats.json'), JSON.stringify(mats));

  console.log('Done!');
  console.log(`  Recipes : ${recipes.length} (${recipes.filter(r => r.is_new).length} new in Forever)`);
  console.log(`  Items   : ${mats.length}${stubbed ? ` (${stubbed} unnamed — not in this build's data)` : ''}`);
  console.log(`  No icon : ${mats.filter(m => !m.icon).length} items`);
  console.log(`  Raw-flagged conversion items: ${rawCount}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
