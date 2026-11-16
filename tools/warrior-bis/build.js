// Builds ../../warrior/data.json: top items per slot for a level 60 Fury (dual wield) / Arms (2H) warrior in WoW Forever.
// Item data: wowsims Forever item database (https://www.wowsims.com/forever/assets/database/db.json, MIT licensed).
// Scoring: the sim's own preset EP weights (Pre-BiS - Fury / Pre-BiS - Arms), in attack power per point.
// Usage: node build.js   (downloads db.json if missing; delete it to refresh)
const fs = require('fs');
const path = require('path');
const https = require('https');

const DB_URL = 'https://www.wowsims.com/forever/assets/database/db.json';
const DB = path.join(__dirname, 'db.json');
const OUT = path.join(__dirname, '../../warrior/data.json');
const KEEP = 40; // per slot; the page re-ranks against owned gear (hit/expertise caps), filters faction/PvP, shows 5

// Stat indexes (proto Stat enum): 0 Str 1 Agi 2 Sta 14 AP 17 Hit 18 Crit 19 Haste 20 ArP 21 Expertise 27 Armor
// Rating per 1%: hit 10, crit 14, haste 10, expertise 10.
const PROFILES = {
  fury: { 0: 2.2, 1: 1.7, 14: 1, 17: 1.69, 18: 2.26, 19: 1.76, 20: 0.39, 21: 2.35, mh: 12.59, oh: 2.66 },
  arms: { 0: 2.2, 1: 1.71, 14: 1, 17: 4.7, 18: 2.23, 19: 1.19, 20: 0.45, 21: 1.46, mh: 16.63, oh: 0 },
};
// Pseudo stats given as percentages on a few items: 12 melee hit %, 14 melee crit %, 20 melee haste %, 27 expertise %.
const PSEUDO = { 12: [17, 10], 14: [18, 14], 20: [19, 10], 27: [21, 10] };
const STAT_NAMES = { 0: 'Str', 1: 'Agi', 2: 'Sta', 14: 'AP', 17: 'Hit', 18: 'Crit', 19: 'Haste', 20: 'ArP', 21: 'Expertise' };
const PROF = { 1: 'Alchemy', 2: 'Blacksmithing', 3: 'Enchanting', 4: 'Engineering', 8: 'Leatherworking', 11: 'Tailoring' };
const REP = ['Hated', 'Hostile', 'Unfriendly', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted'];
const WEAPON = { 1: 'Axe', 2: 'Dagger', 3: 'Fist', 4: 'Mace', 6: 'Polearm', 8: 'Staff', 9: 'Sword' };
const RANGED = { 1: 'Bow', 2: 'Crossbow', 3: 'Gun', 4: 'Thrown' };
const ARMOR = { 1: 'Cloth', 2: 'Leather', 3: 'Mail', 4: 'Plate' };
const SKILL = { 1: 'Axes', 2: '2H Axes', 3: 'Maces', 4: '2H Maces', 5: 'Swords', 6: '2H Swords', 7: 'Polearms', 8: 'Staves', 9: 'Daggers', 10: 'Fist' };
// In the sim DB but not obtainable by players.
const EXCLUDE = new Set([17142 /* Shard of the Defiler */, 13262 /* Ashbringer */]);
// Pre-raid only: phase 1 still has items that need a raid (raid-boss head quests, raid reputations, raid crafting mats).
const RAID_WORDS = /Onyxia|Nefarian|Ragnaros|Zandalar|Zul'Gurub|Hakkar's|Molten Core|Blackwing|Hydraxian|Brood of Nozdormu|Qiraj|Naxxramas/i;
const RAID_CRAFTS = /^(Onyxia Scale|Fiery Plate|Molten Helm|Flarecore|Corehound|Lava Belt|Black Dragonscale|Blue Dragonscale|Chromatic|Core Armor|Bloodsoul|Primal Batskin|Bloodvine|Darksoul|Dark Iron (Bracers|Gauntlets|Helm|Leggings|Boots|Plate|Destroyer|Reaver|Sunderer))/i;
function raidLinked(item, db) {
  if (RAID_WORDS.test(item.name) || RAID_CRAFTS.test(item.name)) return true;
  return (item.sources || []).some(s =>
    (s.quest && RAID_WORDS.test(s.quest.name)) ||
    (s.rep && RAID_WORDS.test(db.factionById.get(s.rep.repFactionId)?.name || '')) ||
    (s.drop && RAID_WORDS.test(db.zoneById.get(s.drop.zoneId)?.name || '')));
}
// PvP gear: honor rank rewards plus battleground faction rewards (rep, vendors, AV/WSG/AB quests).
const PVP_FACTIONS = /Warsong Outriders|Silverwing Sentinels|Frostwolf Clan|Stormpike Guard|League of Arathor|The Defilers/i;
const PVP_NAMES = /^(Frostwolf|Stormpike|Outrider's|Sentinel's|Defiler's|Highlander's|Arathor|Warsong|Silverwing|Legionnaire's|Advisor's|Talisman of Arathor)/i;
function isPvp(item, db) {
  return PVP_NAMES.test(item.name) || (item.sources || []).some(s => s.pvp ||
    (s.rep && PVP_FACTIONS.test(db.factionById.get(s.rep.repFactionId)?.name || '')) ||
    (s.soldBy && /Alterac Valley|Warsong Gulch|Arathi Basin/.test(db.zoneById.get(s.soldBy.zoneId)?.name || '')));
}
const SWINGS_PER_SEC = 2; // rough hit rate for procChance effects (dual wield + abilities)

const SLOTS = [
  ['head', 'Head', 1], ['neck', 'Neck', 2], ['shoulder', 'Shoulders', 3], ['back', 'Back', 4], ['chest', 'Chest', 5],
  ['wrist', 'Wrists', 6], ['hands', 'Hands', 7], ['waist', 'Waist', 8], ['legs', 'Legs', 9], ['feet', 'Feet', 10],
  ['finger', 'Rings', 11], ['trinket', 'Trinkets', 12],
];

function get(url, file) {
  return new Promise((res, rej) => {
    https.get(url, r => {
      if (r.statusCode !== 200) return rej(new Error(url + ' -> ' + r.statusCode));
      r.pipe(fs.createWriteStream(file)).on('finish', res);
    }).on('error', rej);
  });
}

function statsEP(stats, w) {
  let ep = 0;
  for (const [k, v] of Object.entries(stats || {})) ep += (w[k] || 0) * v;
  return ep;
}

function effectEP(item, w) {
  // Average value of stat-granting procs and on-use effects. Effects without stats are listed, not scored.
  let ep = 0; const notes = [];
  for (const e of item.itemEffects || []) {
    const stats = e.scalingOptions?.[0]?.stats;
    const name = (e.buffName || '').replace(/\s*\(\d+\)$/, '');
    const dur = (e.effectDurationMs || 0) / 1000;
    let uptime = null, kind;
    if (e.onUse) { kind = 'Use'; uptime = e.onUse.cooldownMs ? Math.min(1, dur / (e.onUse.cooldownMs / 1000)) : 0; }
    else if (e.proc) {
      kind = 'Proc';
      let rate = e.proc.ppm ? e.proc.ppm / 60 : (e.proc.procChance || 0) * SWINGS_PER_SEC;
      if (e.proc.icdMs && rate > 0) rate = 1 / (1 / rate + e.proc.icdMs / 1000);
      uptime = dur ? 1 - Math.exp(-rate * dur) : 0;
    } else kind = 'Equip';
    const val = stats && uptime ? statsEP(stats, w) * uptime : 0;
    ep += val;
    notes.push({ kind, name, scored: val > 0 });
  }
  return { ep, notes };
}

function source(item, db) {
  const zone = id => db.zoneById.get(id)?.name;
  const out = [];
  for (const s of item.sources || []) {
    if (s.drop) {
      const npc = s.drop.npcId ? db.npcById.get(s.drop.npcId)?.name : s.drop.otherName;
      out.push(['Drop', [npc, zone(s.drop.zoneId)].filter(Boolean).join(' — ') || 'Drop']);
    } else if (s.quest) out.push(['Quest', s.quest.name + (s.quest.faction === 1 ? ' (A)' : s.quest.faction === 2 ? ' (H)' : '')]);
    else if (s.crafted) out.push(['Crafted', PROF[s.crafted.profession] || 'Crafted']);
    else if (s.rep) out.push(['Rep', (db.factionById.get(s.rep.repFactionId)?.name || 'Reputation') + (REP[s.rep.repLevel] ? ' ' + REP[s.rep.repLevel] : '')]);
    else if (s.soldBy) out.push(['Vendor', [s.soldBy.npcName, zone(s.soldBy.zoneId)].filter(Boolean).join(' — ')]);
    else if (s.pvp) out.push(['PvP', 'PvP rank reward']);
  }
  // Keep it short: one of each kind, vendors last.
  const seen = new Set();
  return out.filter(([k]) => !seen.has(k) && seen.add(k)).slice(0, 3);
}

function score(item, slotKind, db) {
  const prof = slotKind === '2h' ? PROFILES.arms : PROFILES.fury;
  const base = item.scalingOptions[0];
  const variants = [];
  const baseStats = { ...(base.stats || {}) };
  for (const [i, [stat, per]] of Object.entries(PSEUDO)) {
    const v = item.pseudoStats?.[i];
    if (v) baseStats[stat] = (baseStats[stat] || 0) + v * per;
  }
  if (item.randomSuffixOptions?.length) {
    for (const sid of item.randomSuffixOptions) {
      const sfx = db.suffixById.get(sid); if (!sfx) continue;
      const st = { ...baseStats };
      sfx.stats.forEach((v, k) => { if (v) st[k] = (st[k] || 0) + Math.round(v * base.randPropPoints / 10000); });
      variants.push({ suffix: sfx.name, stats: st });
    }
  } else variants.push({ suffix: null, stats: baseStats });

  const fx = effectEP(item, prof);
  const dps = base.unroundedDps || 0;
  const wpn = slotKind === 'mh' || slotKind === '2h' ? prof.mh * dps : slotKind === 'oh' ? prof.oh * dps : 0;
  let best = null;
  for (const v of variants) {
    const ep = statsEP(v.stats, prof) + fx.ep + wpn;
    if (!best || ep > best.ep) best = { ...v, ep };
  }
  const shown = {};
  for (const k of Object.keys(STAT_NAMES)) if (best.stats[k]) shown[STAT_NAMES[k]] = best.stats[k];
  const skills = (base.weaponSkills || []).map(s => `+${s.value} ${SKILL[s.skill] || 'skill'}`);
  return {
    id: item.id,
    name: item.name + (best.suffix ? ' ' + best.suffix : ''),
    icon: item.icon, q: item.quality, ilvl: base.ilvl, req: item.reqLvl || 0, phase: item.phase || 1,
    type: item.type === 13 ? WEAPON[item.weaponType] : item.type === 14 ? RANGED[item.rangedWeaponType] : ARMOR[item.armorType] || '',
    speed: item.weaponSpeed || undefined, dps: dps ? +dps.toFixed(1) : undefined,
    stats: shown, skills, fx: fx.notes, procEP: +fx.ep.toFixed(1),
    set: item.setName || undefined,
    faction: item.factionRestriction === 1 ? 'A' : item.factionRestriction === 2 ? 'H' : undefined,
    pvp: isPvp(item, db) || undefined,
    unique: item.unique || undefined,
    src: source(item, db),
    ep: +best.ep.toFixed(1),
  };
}

(async () => {
  if (!fs.existsSync(DB)) { console.log('downloading db.json'); await get(DB_URL, DB); }
  const raw = JSON.parse(fs.readFileSync(DB, 'utf8'));
  const db = {
    zoneById: new Map(raw.zones.map(z => [z.id, z])),
    npcById: new Map(raw.npcs.map(n => [n.id, n])),
    factionById: new Map(raw.factions.map(f => [f.id, f])),
    suffixById: new Map(raw.randomSuffixes.map(s => [s.id, s])),
  };
  const usable = raw.items.filter(i =>
    (!i.classAllowlist || i.classAllowlist.includes(1)) && (i.reqLvl || 0) <= 60 && i.quality >= 2 && !i.requiredProfession && !EXCLUDE.has(i.id) &&
    (i.phase || 1) === 1 && // sim phase 1 = content live in Forever now (no raids); phase 2 = Classic raid tiers
    !raidLinked(i, db));
  console.log('pre-raid filter removed:', raw.items.filter(i => (i.phase || 1) === 1 && raidLinked(i, db) && (!i.classAllowlist || i.classAllowlist.includes(1))).map(i => i.name).join(', '));

  const lists = {};
  const add = (key, label, kind, items) => {
    const scored = items.map(i => score(i, kind, db)).filter(x => x.ep > 0).sort((a, b) => b.ep - a.ep);
    // Keep the top KEEP overall plus the top 25 of each faction/PvP filter combination so every view still has 5.
    const keep = new Map();
    scored.slice(0, KEEP).forEach(x => keep.set(x.id, x));
    for (const fac of ['A', 'H']) for (const pvp of [true, false]) {
      scored.filter(x => (!x.faction || x.faction === fac) && (pvp || !x.pvp)).slice(0, 25).forEach(x => keep.set(x.id, x));
    }
    lists[key] = { label, kind, items: [...keep.values()].sort((a, b) => b.ep - a.ep) };
  };

  for (const [key, label, type] of SLOTS) {
    add(key, label, 'armor', usable.filter(i => i.type === type && (
      [2, 11, 12, 4].includes(type) || [2, 3, 4].includes(i.armorType))));
  }
  const weapons = usable.filter(i => i.type === 13 && WEAPON[i.weaponType]);
  add('mh', 'Main Hand', 'mh', weapons.filter(i => i.handType === 1 || i.handType === 2));
  add('oh', 'Off Hand', 'oh', weapons.filter(i => i.handType === 2 || i.handType === 3));
  add('2h', 'Two-Hand (Arms)', '2h', weapons.filter(i => i.handType === 4));
  add('ranged', 'Ranged', 'armor', usable.filter(i => i.type === 14 && RANGED[i.rangedWeaponType]));

  const out = {
    built: new Date().toISOString().slice(0, 10),
    weights: { fury: PROFILES.fury, arms: PROFILES.arms },
    slots: lists,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  for (const [k, v] of Object.entries(lists)) console.log(k.padEnd(9), v.items.slice(0, 5).map(x => `${x.name} (${x.ep})`).join(' | '));
})();
