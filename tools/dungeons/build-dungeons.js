// Merges fdj.json (ForeverDungeonJournal data) with wowhead.json (Wowhead Forever tooltips)
// into the site's dungeons/data.json.
// Usage: node build-dungeons.js fdj.json wowhead.json out.json
const fs = require('fs');
const [, , fdjFile, whFile, outFile] = process.argv;
const d = JSON.parse(fs.readFileSync(fdjFile, 'utf8'));
const wh = fs.existsSync(whFile) ? JSON.parse(fs.readFileSync(whFile, 'utf8')) : { item: {}, quest: {} };

const ZONES = {
  1411: 'Durotar', 1412: 'Mulgore', 1413: 'The Barrens', 1415: 'Eastern Kingdoms', 1416: 'Alterac Mountains',
  1417: 'Arathi Highlands', 1418: 'Badlands', 1419: 'Blasted Lands', 1420: 'Tirisfal Glades', 1421: 'Silverpine Forest',
  1422: 'Western Plaguelands', 1423: 'Eastern Plaguelands', 1424: 'Hillsbrad Foothills', 1425: 'The Hinterlands',
  1426: 'Dun Morogh', 1427: 'Searing Gorge', 1428: 'Burning Steppes', 1429: 'Elwynn Forest', 1431: 'Duskwood',
  1432: 'Loch Modan', 1433: 'Redridge Mountains', 1434: 'Stranglethorn Vale', 1435: 'Swamp of Sorrows', 1436: 'Westfall',
  1437: 'Wetlands', 1438: 'Teldrassil', 1439: 'Darkshore', 1440: 'Ashenvale', 1441: 'Thousand Needles',
  1442: 'Stonetalon Mountains', 1443: 'Desolace', 1444: 'Feralas', 1445: 'Dustwallow Marsh', 1446: 'Tanaris',
  1447: 'Azshara', 1448: 'Felwood', 1449: "Un'Goro Crater", 1450: 'Moonglade', 1452: 'Winterspring',
  1453: 'Stormwind City', 1454: 'Orgrimmar', 1455: 'Ironforge', 1456: 'Thunder Bluff', 1457: 'Darnassus',
  1458: 'Undercity', 2548: 'Riverglades',
};
const FOREVER_NEW = new Set(['Hall of Thanes', 'Ruins of Lordaeron', 'Excavation Site: Wetlands', 'City of Dalaran',
  'The Drowned City', "Krol'dok Stronghold", 'Alcaz Prison', 'Blackmaw Hold', "Shaper's Terrace"]);
const CLASSES = { WARRIOR: 'Warrior', PALADIN: 'Paladin', HUNTER: 'Hunter', ROGUE: 'Rogue', PRIEST: 'Priest',
  SHAMAN: 'Shaman', MAGE: 'Mage', WARLOCK: 'Warlock', DRUID: 'Druid' };
const LOOT_NOTES = { LOOT_NOTE_TWO_ITEMS: 'Can drop 2 items' };

const clean = s => typeof s === 'string'
  ? s.replace(/\|c[0-9a-fA-F]{8}/g, '').replace(/\|r/g, '').replace(/\|T[^|]*\|t/g, '').replace(/\r/g, '').trim()
  : s;

// ---- items: one shared table keyed by ID ----
const items = {};
function stripHtml(h) {
  return h.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(tr|table|div)>/gi, '\n').replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n+/g, '\n').trim();
}
function itemRef(id, name, q, extra) {
  if (!id) return { n: clean(name), q: q ?? 1, ...(extra || {}) };
  if (!items[id]) {
    const w = wh.item[id];
    const it = { n: clean(w?.name || name), q: w?.quality ?? q ?? 1 };
    if (w?.icon) it.i = w.icon;
    if (w?.tooltip) {
      const m = w.tooltip.match(/Item Level <!--ilvl-->(\d+)/); if (m) it.l = +m[1];
      const r = w.tooltip.match(/Requires Level <!--rlvl-->(\d+)/) || w.tooltip.match(/Requires Level (\d+)/); if (r) it.r = +r[1];
    }
    if (w === null) it.x = 1; // not on Wowhead Forever
    items[id] = it;
  }
  return { id, ...(extra || {}) };
}
// Loot tuple: [id, name, slot, quality, note?] or {1..4, tip}
function lootEntry(l) {
  if (!l) return null;
  const a = Array.isArray(l) ? l : [l[1], l[2], l[3], l[4]];
  const ex = {};
  if (a[2]) ex.s = clean(a[2]);
  if (a[4]) ex.note = clean(a[4]);
  const r = itemRef(a[0], a[1], a[3], ex);
  if (!a[0]) r.q = a[3];
  return r;
}
function itemTuple(t) { // [id, name, quality, note?]
  if (!Array.isArray(t)) return null;
  const ex = {}; if (typeof t[3] === 'string') ex.note = clean(t[3]);
  if (typeof t[3] === 'number' && t[3] > 1) ex.c = t[3];
  return itemRef(t[0], t[1], t[2], ex);
}
function place(m) {
  if (!m || !m.mapID) return undefined;
  const p = { z: ZONES[m.mapID] || ('Map ' + m.mapID), x: +(m.x * 100).toFixed(1), y: +(m.y * 100).toFixed(1) };
  if (m.label) p.t = clean(m.label);
  if (m.detail) p.d = clean(m.detail);
  return p;
}

// ---- quests: one table keyed by ID ----
const quests = {};
function questXP(id, q) {
  return q.liveXPFallback || d.FOREVER_QUEST_XP_FALLBACK?.[id] || d.FOREVER_QUEST_BASE_XP?.[id] || undefined;
}
function whQuest(id) {
  const w = wh.quest[id];
  if (!w) return {};
  const lv = w.tooltip?.match(/Level (\d+)/);
  return { name: w.name, level: lv ? +lv[1] : undefined };
}
function buildQuest(q, dungeon) {
  const id = q.id;
  const w = whQuest(id);
  const out = {
    id, n: clean(q.name || w.name), lv: q.level ?? w.level, rq: q.requires, f: q.faction || 'Both',
  };
  if (dungeon) out.dn = dungeon;
  const set = (k, v) => { if (v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length)) out[k] = v; };
  set('cls', q.classOnly && (CLASSES[q.classOnly] || q.classOnly));
  set('obj', clean(q.objective));
  set('where', clean(q.objectiveWhere));
  set('pu', clean(q.pickup));
  set('ti', clean(q.turnin));
  set('note', clean(q.note));
  set('warn', clean(q.warning));
  set('sm', place(q.startMap || d.QUEST_START_MAPS?.[id] || q.map));
  set('tm', place(q.turninMap));
  set('xp', questXP(id, q));
  set('rs', clean(q.rewardSummary));
  const fb = d.PREREQ_REWARD_ITEMS_FALLBACK?.[id];
  set('ri', (q.rewardItems || fb?.items || []).map(itemTuple).filter(Boolean));
  if (q.rewardChoice || (!q.rewardItems && fb?.choice)) out.rc = 1;
  set('ra', (q.additionalRewardItems || (!q.rewardItems && fb?.also) || []).map(itemTuple).filter(Boolean));
  if (!out.rs) {
    const c = d.PREREQ_REWARD_MONEY_FALLBACK?.[id];
    if (c) {
      const g = Math.floor(c / 10000), s = Math.floor(c / 100) % 100, cu = c % 100;
      set('rs', [g && g + 'g', s && s + 's', cu && cu + 'c'].filter(Boolean).join(' '));
    }
  }
  set('si', q.startItem && itemTuple(q.startItem));
  set('so', q.startObject && { n: clean(q.startObject[0]), d: clean(q.startObject[2]) });
  const req = [...(q.requiredItem ? [q.requiredItem] : []), ...(q.requiredItems || [])].map(itemTuple).filter(Boolean);
  set('req', req);
  set('pi', q.providedItem && itemTuple(q.providedItem));
  set('ni', q.noteItem && itemTuple(q.noteItem));
  if (q.learnItem) set('learn', itemRef(q.learnItem, q.learnTitle, 3));
  if (q.repeatable) out.rep = 1;
  if (q.startsInDungeon) out.sid = 1;
  set('prof', q.profession && q.profession[0] + q.profession.slice(1).toLowerCase());
  set('att', q.attunement && q.attunement[0] + q.attunement.slice(1).toLowerCase());
  for (const k of ['noteQuestLink', 'leadsToQuestLink', 'startQuestLink']) {
    const l = q[k]; if (l && l.id) set({ noteQuestLink: 'see', leadsToQuestLink: 'next', startQuestLink: 'from' }[k], { id: l.id, n: clean(l.name) });
  }
  if (q.hideFromMainList) out.hide = 1;
  if (wh.quest[id] === null) out.x = 1;
  // prerequisite chain
  const chain = d.QUEST_PREREQ_CHAINS?.[id];
  if (Array.isArray(chain) && chain.length) {
    out.chain = chain.filter(Boolean).map(s => s.id);
    for (const s of chain) if (s && s.id && !quests[s.id]) {
      const det = d.QUEST_PREREQ_DETAILS?.[s.id] || {};
      quests[s.id] = null; // guard
      quests[s.id] = buildQuest({ ...det, id: s.id, name: s.name || det.name, startMap: det.startMap || det.map,
        faction: det.faction || q.faction }, null);
    }
  }
  return out;
}

// ---- dungeons ----
const dungeons = [];
const order = [...d.ORDER, ...Object.keys(d.DB).filter(k => !d.ORDER.includes(k) && !k.startsWith('__'))];
for (const name of order) {
  const x = d.DB[name];
  if (!x) continue;
  const lvMap = d.BOSS_LEVELS?.[name] || {};
  const shared = d.SHARED_BY_BOSS?.[name] || {};
  const bosses = (x.bosses || []).map(b => {
    const o = { n: clean(b.name) };
    if (b.npcID) o.npc = b.npcID;
    if (lvMap[b.name]) o.lv = lvMap[b.name];
    if (b.description) o.d = clean(b.description);
    if (b.rare) o.rare = 1;
    if (b.trash) o.trash = 1;
    if (b.factionOnly) o.f = b.factionOnly;
    if (b.lootNote) o.ln = LOOT_NOTES[b.lootNote] || clean(b.lootNote);
    if (b.summonItem) o.sum = itemRef(b.summonItem, 'Summon item', 3);
    o.loot = (b.loot || []).map(lootEntry).filter(Boolean);
    const prob = (b.probableLoot || []).map(lootEntry).filter(Boolean);
    if (prob.length) o.prob = prob;
    const sh = (shared[b.name] || []).map(lootEntry).filter(Boolean);
    if (sh.length) o.shared = sh;
    return o;
  });
  const qids = [];
  for (const q of x.quests || []) {
    if (!q || !q.id) continue;
    const built = buildQuest(q, name);
    // a quest can sit in several dungeons: keep the first full copy, list it in each
    if (!quests[q.id] || !quests[q.id].dn) quests[q.id] = built;
    if (!q.hideFromMainList) qids.push(q.id);
  }
  const o = { n: name, lv: x.level, loc: clean(x.location), d: clean(x.description), bosses, quests: qids };
  if (FOREVER_NEW.has(name)) o.new = 1;
  if (x.entrance) o.ent = place(x.entrance);
  if (x.parentDungeon) o.parent = x.parentDungeon;
  if (x.questChainPage) o.chainPage = 1;
  if (x.fullItemsTBD) o.itemsTBD = 1;
  if (x.fullQuestsTBD) o.questsTBD = 1;
  dungeons.push(o);
}

const out = { built: new Date().toISOString().slice(0, 10), dungeons, quests, items };
fs.writeFileSync(outFile, JSON.stringify(out));
const nq = Object.keys(quests).length, ni = Object.keys(items).length;
const withIcon = Object.values(items).filter(i => i.i).length;
console.log(`dungeons ${dungeons.length}, quests ${nq}, items ${ni} (${withIcon} with Wowhead data), ${(fs.statSync(outFile).size / 1024).toFixed(0)} KB`);
