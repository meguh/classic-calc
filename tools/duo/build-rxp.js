// Turn the duo route (../../duo/data.json) into a RestedXP (RXPGuides) guide addon.
// Usage: node build-rxp.js [AddOns folder]
// Writes ../../duo/rxp/RXP_DuoGuide/ (toc + guide) and, if given, installs a copy into the AddOns folder.
// Each route chapter becomes one RXP guide; they chain with #next in route order.
//
// Auto-tracking follows the conventions of the real RXP guides:
// - A step completes when every non-text element in it is done (.accept, .turnin, .complete, .goto with a radius,
//   .collect, "+" manual lines). A step with only text (>> lines, .goto without a radius) is skipped at once.
// - .complete -ID,N and .turnin -ID: the negative ID makes the element count as done when the quest is not in the
//   log, so steps for quests the player never took fall through on their own. .turnin -ID,1 also counts as done
//   while the quest is unfinished (used for dungeon quests).
// - .accept ID,2,PRE: the accept counts as done while quest PRE is not turned in (chain not open yet).
//   .isQuestTurnedIn A,B skips a step unless A or B is turned in (one line per required quest).
// - "<< Class" on a step or line drops it at load time for other classes.
// - #completewith next/label keeps a step on screen next to the following ones until that step is passed.
// - ".mob +Name" after a .complete marks that mob until the objective is done; .target marks the NPC to talk to.
// - N in .complete ID,N is the Nth objective line of the quest in the in-game quest log.
const fs = require('fs');
const path = require('path');
const D = require('../../duo/data.json');

// QuestieDB extract (see extract-questie.js): objective types, quest NPCs, prerequisites and classes.
let Z = { quests: {}, npcs: {}, objects: {}, items: {} };
try { Z = require('./questie.json'); } catch (e) { console.warn('questie.json missing: run extract-questie.js for full tracking'); }

const ADDON = 'RXP_DuoGuide';
const VERSION = 2;
const GROUP = 'Duo Leveling 40-60 (H)';

// Zone names RXPGuides knows on Forever, plus Forever's new zones by map ID.
const known = new Set(fs.readFileSync(path.join(__dirname, 'rxp-maps.txt'), 'utf8').split('\n')
  .map(l => (/^\["(.+)"\]/.exec(l) || [])[1]).filter(Boolean));
const mapIds = { 'Riverglades': 2548, 'Mount Hyjal': 2482 };
const zoneRef = z => (known.has(z) ? z : mapIds[z] || null);
// Questie keys NPC spawns by area ID.
const AREA = {
  1: 'Dun Morogh', 3: 'Badlands', 4: 'Blasted Lands', 8: 'Swamp of Sorrows', 10: 'Duskwood', 11: 'Wetlands',
  12: 'Elwynn Forest', 14: 'Durotar', 15: 'Dustwallow Marsh', 16: 'Azshara', 17: 'The Barrens',
  28: 'Western Plaguelands', 33: 'Stranglethorn Vale', 36: 'Alterac Mountains', 38: 'Loch Modan', 40: 'Westfall',
  41: 'Deadwind Pass', 44: 'Redridge Mountains', 45: 'Arathi Highlands', 46: 'Burning Steppes',
  47: 'The Hinterlands', 51: 'Searing Gorge', 85: 'Tirisfal Glades', 130: 'Silverpine Forest',
  139: 'Eastern Plaguelands', 141: 'Teldrassil', 148: 'Darkshore', 215: 'Mulgore', 267: 'Hillsbrad Foothills',
  331: 'Ashenvale', 357: 'Feralas', 361: 'Felwood', 400: 'Thousand Needles', 405: 'Desolace',
  406: 'Stonetalon Mountains', 440: 'Tanaris', 490: "Un'Goro Crater", 493: 'Moonglade', 618: 'Winterspring',
  1377: 'Silithus', 1497: 'Undercity', 1519: 'Stormwind City', 1537: 'Ironforge', 1637: 'Orgrimmar',
  1638: 'Thunder Bluff', 1657: 'Darnassus',
};
const areaOf = name => Object.keys(AREA).find(a => AREA[a] === name);

// Text that goes into the guide. RXP's parser treats "--" as a comment, "<<" as a class filter, ">>" as the
// start of display text, and "|" starts an escape sequence.
const clean = s => String(s || '').replace(/[\r\n]+/g, ' ').replace(/\]=*\]/g, ']').replace(/\|/g, '/')
  .replace(/<</g, '<').replace(/>>/g, '>').replace(/-{2,}/g, '-').replace(/\s+/g, ' ').trim();
// Unit names for .mob/.target: arguments are comma-separated, so names with commas can't be used.
const unit = n => { const c = clean(n); return c && !c.includes(',') ? c : null; };
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const Q = id => D.quests[id];
const ZQ = id => Z.quests[Math.abs(id)];
const at = (t, i) => (t == null ? undefined : Array.isArray(t) ? t[i - 1] : t[i]);
const npc = id => Z.npcs[id] || {};
const hasSpawns = id => !!npc(id).spawns && Object.keys(npc(id).spawns).length > 0;

const goto = (z, x, y, radius) => {
  const r = zoneRef(z);
  // Questie uses -1,-1 for spawns inside instances; those get no waypoint.
  return r != null && x != null && y != null && x >= 0 && y >= 0
    ? `    .goto ${r},${x},${y}${radius ? ',' + radius : ''}` : null;
};
const friendly = n => `|cRXP_FRIENDLY_${clean(n)}|r`;
const giverName = g => (g && g.n ? g.n.split(' — ')[0] : null);
const target = g => { const n = g && !g.kind && unit(giverName(g)); return n && !/^Any /.test(n) ? `    .target ${n}` : null; };

// ---- quest facts ----

const CLASS_BITS = [[1, 'Warrior'], [2, 'Paladin'], [4, 'Hunter'], [8, 'Rogue'], [16, 'Priest'], [64, 'Shaman'],
  [128, 'Mage'], [256, 'Warlock'], [1024, 'Druid']];
function classes(id) {
  const z = ZQ(id);
  if (z && z.requiredClasses) {
    const names = CLASS_BITS.filter(([b]) => z.requiredClasses & b).map(([, n]) => n);
    if (names.length && names.length < CLASS_BITS.length) return names.join('/');
  }
  return Q(id) && Q(id).cls ? Q(id).cls.replace(/\s+/g, '') : null;
}
const clsTag = id => { const c = classes(id); return c ? ` << ${c}` : ''; };
const stepLine = id => (classes(id) ? `step << ${classes(id)}` : 'step');

// Prerequisites: any = one of these must be turned in; all = each must be turned in.
function prereqs(id) {
  const z = ZQ(id);
  if (z) return { any: (z.preQuestSingle || []).filter(p => p > 0), all: (z.preQuestGroup || []).filter(p => p > 0) };
  const pre = ((Q(id) || {}).pre || []).map(p => p.id).filter(p => p > 0);
  return pre.length > 1 ? { any: pre, all: [] } : { any: [], all: pre };
}
// Step-level skip: each .isQuestTurnedIn line skips the step unless one of its IDs is turned in.
function guards(id) {
  const { any, all } = prereqs(id);
  const out = [];
  if (any.length) out.push(`    .isQuestTurnedIn ${any.join(',')}`);
  for (const p of all) out.push(`    .isQuestTurnedIn ${p}`);
  return out;
}
// Element-level skip on .accept (flag 2) can check one quest only.
function acceptLine(id) {
  const { any, all } = prereqs(id);
  const pre = all.length ? all[all.length - 1] : any.length === 1 ? any[0] : null;
  return `    .accept ${id}${pre ? ',2,' + pre : ''} >>Accept ${clean(Q(id).n)}${clsTag(id)}`;
}
const needsOwnStep = id => { const { any, all } = prereqs(id); return !all.length && any.length > 1; };

const objItems = id => { const z = ZQ(id); return ((z && at(z.objectives || {}, 3)) || []).map(e => Z.items[e[0]] || {}); };

// Questie objectives in quest-log order: creatures/objects, kill credits, items, then the explore/event trigger.
function questieObjectives(id) {
  const z = ZQ(id);
  if (!z) return null;
  const ob = z.objectives || {};
  const out = [];
  for (const e of at(ob, 1) || []) out.push({ kind: 'c', n: e[1] || npc(e[0]).name, mobs: hasSpawns(e[0]) ? [npc(e[0]).name] : [] });
  for (const e of at(ob, 2) || []) out.push({ kind: 'o', n: e[1] || (Z.objects[e[0]] || {}).name, mobs: [] });
  for (const e of at(ob, 5) || []) {
    const ids = Array.isArray(e[0]) ? e[0] : [];
    out.push({ kind: 'k', n: e[2] || npc(e[1]).name, mobs: ids.filter(hasSpawns).map(i => npc(i).name).slice(0, 3) });
  }
  for (const e of at(ob, 3) || []) {
    const it = Z.items[e[0]] || {};
    out.push({ kind: 'i', n: e[1] || it.name, drops: (it.npcDrops || []).filter(hasSpawns), mobs: [] });
  }
  if (z.triggerEnd && z.triggerEnd[0]) out.push({ kind: 'e', n: z.triggerEnd[0], mobs: [] });
  return out;
}

const NOT_A_MOB = / (rescued|freed|marked|planted|returned|collected|Ablaze|Found|Delivered|met|soothed|reclaimed|empowered|released|disrupted|questioned)$/i;
// For objectives Questie doesn't know (Forever's new quests): a known NPC name, "X slain", or a name that doesn't
// read like an item.
const NPC_NAMES = new Set(Object.values(Z.npcs).map(n => n.name));
const looksLikeMob = n => NPC_NAMES.has(n) || / slain$/i.test(n) ||
  !(/'s | of /i.test(n) || / (Intelligence|Loot|Spear|Head|Sample|Shard|Pouch|Crate|Supplies|Goods|Charge|Keg|Fragment|Debris|Bangle)s?$/i.test(n));
// Objectives to track, as {i (quest-log index), n, c, mobs}. The route's own objective list (Wowhead Forever
// tooltips, quest-log order) wins; Questie adds the types and covers dungeon quests that have no list.
function objectives(id, zone) {
  const q = Q(id) || {};
  const zo = questieObjectives(id) || [];
  let list;
  if (q.req && q.req.some(([n]) => clean(n))) {
    list = q.req.filter(([n]) => clean(n)).map(([n, c]) => {
      const m = zo.find(o => norm(o.n) === norm(n)) || zo.find(o => o.n && norm(n).startsWith(norm(o.n).slice(0, 10)));
      return { n, c, ...(m ? { kind: m.kind, mobs: m.mobs, drops: m.drops } : {}) };
    });
  } else list = zo.filter(o => clean(o.n)).map(o => ({ ...o, c: null }));
  const area = areaOf(zone);
  return list.map((o, i) => {
    let mobs = o.mobs || [];
    if (!o.kind && q.ty === 'KILL' && !NOT_A_MOB.test(o.n) && looksLikeMob(o.n)) mobs = [o.n.replace(/ slain$/i, '')];
    if (o.kind === 'i' && o.drops && o.drops.length) {
      // Item drops: point at the mobs that drop it when they are few, or live in this zone.
      let d = o.drops;
      if (d.length > 3 && area) d = d.filter(n => npc(n).spawns[area]);
      if (d.length <= 4) mobs = d.map(n => npc(n).name);
    }
    return { i: i + 1, n: clean(o.n), c: o.c, mobs: [...new Set(mobs.map(unit).filter(Boolean))] };
  });
}

// .complete lines, each followed by .mob +Name for its mobs. neg: the element counts as done if the quest
// isn't in the log.
function completes(id, zone, neg = true) {
  const out = [];
  const cls = clsTag(id);
  let objs = objectives(id, zone);
  // Nothing known: the quest log shows a single "Objective Complete" line for quests without objectives.
  if (!objs.length) objs = [{ i: 1, n: clean(Q(id).n), c: null, mobs: [] }];
  for (const o of objs) {
    out.push(`    .complete ${neg ? '-' : ''}${id},${o.i}${cls} --${o.n}${o.c ? ` (${o.c})` : ''}`);
    for (const m of o.mobs) out.push(`    .mob +${m}${cls}`);
  }
  const z = ZQ(id);
  if (z && z.sourceItemId) out.push(`    .use ${z.sourceItemId}${cls}`);
  return out;
}

// Where a quest is turned in: the giver's spot when the same NPC ends it, else the finisher's spawn.
function finisher(id, zone) {
  const q = Q(id) || {};
  const z = ZQ(id);
  const g = q.g || {};
  const fromGiver = g.x != null && g.x >= 0 ? { n: giverName(g), z: g.z, x: g.x, y: g.y } : null;
  if (!z) return q.to ? { n: q.to } : fromGiver || { n: null }; // most quests end where they start
  const fid = (at(z.finishedBy, 1) || [])[0];
  const sid = (at(z.startedBy, 1) || [])[0];
  if (fid && fid === sid && fromGiver) return fromGiver;
  if (!fid) return { n: q.to || null };
  const f = npc(fid);
  const sp = f.spawns || {};
  const a = [areaOf(zone), ...Object.keys(sp)].find(k => k && sp[k] && sp[k].length && AREA[k] && zoneRef(AREA[k]) != null);
  return a ? { n: f.name, z: AREA[a], x: sp[a][0][0], y: sp[a][0][1] } : { n: f.name || q.to || null };
}

function chapterName(ch) {
  const lv = ch.lv[0] === ch.lv[1] ? `${ch.lv[0]}` : `${ch.lv[0]}-${ch.lv[1]}`;
  return `${lv} ${ch.kind === 'dungeon' ? 'Dungeon: ' : ''}${ch.title}`;
}

// Accept steps, one per quest giver. A quest whose chain can't be checked on its accept line gets its own step.
function pickSteps(ids, zone, fallbackText, fallbackAt) {
  const out = [];
  const byGiver = new Map();
  for (const id of ids) {
    const g = Q(id).g || {};
    const key = needsOwnStep(id) ? `own${id}` : g.n ? `${g.n}|${g.x}|${g.y}` : 'none';
    if (!byGiver.has(key)) byGiver.set(key, { g, ids: [] });
    byGiver.get(key).ids.push(id);
  }
  for (const [key, { g, ids: gids }] of byGiver) {
    const solo = key.startsWith('own');
    const st = [solo ? stepLine(gids[0]) : 'step'];
    const w = g.x != null ? goto(g.z || zone, g.x, g.y) : (fallbackAt ? goto(zone, fallbackAt[0], fallbackAt[1]) : null);
    if (w) st.push(w);
    st.push(g.n ? `    >>Talk to ${friendly(giverName(g))}` : `    >>${clean(fallbackText)}`);
    for (const id of gids) st.push(solo ? `    .accept ${id} >>Accept ${clean(Q(id).n)}` : acceptLine(id));
    const t = target(g); if (t) st.push(t);
    if (solo) st.push(...guards(gids[0]));
    out.push(st.join('\n'));
  }
  return out;
}

// Turn-in steps, one per finisher (or one step at the route's own turn-in spot).
function turnSteps(ids, zone, text, stepAt, skipIncomplete) {
  const out = [];
  const groups = new Map();
  for (const id of ids) {
    const f = finisher(id, zone);
    const key = stepAt ? 'at' : f.n ? `${f.n}|${f.x}|${f.y}` : 'none';
    if (!groups.has(key)) groups.set(key, { f, ids: [] });
    groups.get(key).ids.push(id);
  }
  for (const { f, ids: gids } of groups.values()) {
    const st = ['step'];
    const w = stepAt ? goto(zone, stepAt[0], stepAt[1]) : f.z ? goto(f.z, f.x, f.y) : null;
    if (w) st.push(w);
    st.push(text ? `    >>${clean(text)}` : f.n ? `    >>Talk to ${friendly(f.n)}` : '    >>Turn in');
    const names = [...new Set(gids.map(id => unit(finisher(id, zone).n)).filter(Boolean))];
    const shown = new Set();
    for (const id of gids) {
      st.push(`    .turnin -${id}${skipIncomplete ? ',1' : ''} >>Turn in ${clean(Q(id).n)}${clsTag(id)}`);
      const n = unit(finisher(id, zone).n);
      if (names.length > 1 && n && !shown.has(n)) { st.push(`    .target +${n}`); shown.add(n); }
    }
    if (names.length === 1) st.push(`    .target ${names[0]}`);
    out.push(st.join('\n'));
  }
  return out;
}

// Accept, do and turn in, all in one step (checklists and dungeon unlock chains).
function fullStep(id, zone, text) {
  const q = Q(id);
  const st = [stepLine(id)];
  if (q.g && q.g.x != null) { const w = goto(q.g.z || zone, q.g.x, q.g.y); if (w) st.push(w); }
  st.push(`    >>${text}`, `    .accept ${id} >>Accept ${clean(q.n)}`, ...completes(id, zone, false),
    `    .turnin ${id} >>Turn in ${clean(q.n)}`);
  const t = target(q.g); if (t) st.push(t);
  st.push(...guards(id));
  return st.join('\n');
}

// A note shown next to the following step until that step is done.
const note = text => ['step', '    #completewith next', `    +${text}`].join('\n');

function zoneSteps(ch) {
  const out = [];
  const zone = ch.zone;
  const seen = new Set();
  ch.steps.forEach((s, si) => {
    const ids = (s.q || []).filter(id => Q(id));
    if (ch.list) {
      // No giver or route order known yet: one step per quest (pick it up, do it, hand it in).
      for (const id of ids) out.push(fullStep(id, zone, `${clean(s.t)}: |cRXP_WARN_${clean(Q(id).n)}|r. ${clean(Q(id).obj)}`));
      return;
    }
    if (s.k === 'tip' && !ids.length) {
      // At the end of a chapter there is no next step to wait for, so the tip joins the last step's text.
      if (si < ch.steps.length - 1) out.push(note(clean(s.t)));
      else if (out.length) out[out.length - 1] += `\n    >>${clean(s.t)}`;
      return;
    }
    if (s.k === 'go') {
      // Travel: done on arrival, or once the next step is done.
      const g = s.at ? goto(s.z || zone, s.at[0], s.at[1], 40) : null;
      out.push(g ? ['step', '    #completewith next', `${g} >>${clean(s.t)}`].join('\n') : note(clean(s.t)));
      return;
    }
    if (s.k === 'pick' || (s.k === 'tip' && ids.length)) {
      out.push(...pickSteps(ids, zone, s.t, s.at));
      ids.forEach(id => seen.add(id));
      if (s.k === 'tip') for (const id of ids) out.push([stepLine(id), `    >>${clean(Q(id).obj)}`, ...completes(id, zone)].join('\n'));
      return;
    }
    if (s.k === 'do') {
      const lines = ['step'];
      const at0 = s.at || (ids.length === 1 && Q(ids[0]).at);
      const w = at0 ? goto(s.z || zone, at0[0], at0[1]) : null;
      if (w) lines.push(w);
      lines.push(`    >>${clean(s.t)}`);
      for (const id of ids) lines.push(...completes(id, s.z || zone));
      out.push(lines.join('\n'));
      ids.forEach(id => seen.add(id));
      return;
    }
    if (s.k === 'turn') {
      // A turn step may also list the follow-up to pick up right after. That gets its own accept step, so it
      // can be skipped when the chain is not open.
      const turnIds = ids.filter(id => seen.has(id));
      const newIds = ids.filter(id => !seen.has(id));
      if (turnIds.length) out.push(...turnSteps(turnIds, zone, s.t, s.at));
      if (newIds.length) out.push(...pickSteps(newIds, zone, s.t, s.at));
      ids.forEach(id => seen.add(id));
    }
  });
  return out;
}

function dungeonSteps(ch) {
  const out = [];
  const zone = ch.loc;
  for (const id of ch.unlock) {
    const q = Q(id);
    out.push(fullStep(id, (q.g && q.g.z) || zone,
      `Unlock: ${clean(q.obj)}${q.g && q.g.x == null && q.g.n ? ' (from: ' + clean(q.g.n) + ')' : ''}`));
  }
  const pos = ch.q.filter(id => id > 0 && Q(id));
  const routable = id => { const g = Q(id).g; return !!(g && goto(g.z, g.x, g.y)); };
  // Pickups we can walk to: one step per quest, so any you can't take yet (chains, class quests) is skipped.
  // Pickups near the dungeon first, then the rest grouped by zone.
  const zoneOf = id => (Q(id).g && Q(id).g.z) || 'zzz';
  const outside = pos.filter(routable)
    .sort((a, b) => (zoneOf(a) !== ch.loc) - (zoneOf(b) !== ch.loc) || zoneOf(a).localeCompare(zoneOf(b)));
  for (const id of outside) {
    const q = Q(id);
    const st = [stepLine(id), goto(q.g.z, q.g.x, q.g.y)];
    st.push(`    >>${q.g.n ? 'Talk to ' + friendly(giverName(q.g)) : 'Pick up'}${q.pre && q.pre.length ? '. Chain: ' + q.pre.map(p => clean(p.n)).join(' > ') : ''}`);
    st.push(`    .accept ${id} >>Accept ${clean(q.n)}`);
    const t = target(q.g); if (t) st.push(t);
    st.push(...guards(id));
    out.push(st.join('\n'));
  }
  // Quests that start inside (drops, books, NPCs in the instance): shown during the run, gone once it is done.
  for (const id of pos.filter(id => !routable(id))) {
    const q = Q(id);
    const z = ZQ(id);
    const item = z && (at(z.startedBy, 3) || [])[0];
    const st = [stepLine(id), '    #completewith run', `    >>${clean(q.pu ? 'Inside: ' + q.pu : 'Pick up inside')}`];
    if (item) st.push(`    .collect ${item},1,${id} --${clean((Z.items[item] || {}).name || q.n)}`);
    // No chain check here: a prerequisite done inside (Elven Legends before the librams) would hide it too early.
    st.push(`    .accept ${id} >>Accept ${clean(q.n)}`);
    out.push(st.join('\n'));
  }
  // Quests that also need materials from outside (vendor, crafted, disenchanted) would hold the run step until
  // they are finished; they get a step of their own that stays on screen during the run.
  const fromOutside = id => objItems(id).some(it => it.class !== 12 &&
    ((!(it.npcDrops || []).length && !(it.objectDrops || []).length) || (it.vendors || []).length));
  for (const id of pos.filter(fromOutside)) {
    out.push([stepLine(id), '    #completewith run', `    >>${clean(Q(id).n)} also needs items from outside the dungeon`,
      ...completes(id, zone)].join('\n'));
  }
  if (ch.ent) {
    const w = goto(ch.ent.z, ch.ent.x, ch.ent.y, 40);
    if (w) out.push(['step', '    #completewith next', `${w} >>Travel to the ${clean(ch.title)} entrance`].join('\n'));
  }
  const unknown = ch.q.filter(id => id < 0 && Q(id));
  const run = ['step', '    #label run',
    `    >>Run ${clean(ch.title)} and do its quests${unknown.length ? '. Also: ' + unknown.map(id => clean(Q(id).n)).join(', ') + ' (pick up in game)' : ''}`];
  for (const id of pos.filter(id => !fromOutside(id))) run.push(...completes(id, zone));
  // Nothing to track: a tick is the only signal that the run is done.
  if (run.length === 3) run.push(`    +Tick this when you have finished ${clean(ch.title)}`);
  out.push(run.join('\n'));
  // Turn-ins, one step per NPC. Finishers without a map spot are inside the instance, so they come first; then
  // the ones near the dungeon, then by zone. A dungeon quest left unfinished is skipped (-ID,1), not waited for.
  const fz = id => finisher(id, zone).z || '';
  const rank = id => (!fz(id) ? 0 : fz(id) === ch.loc ? 1 : 2);
  out.push(...turnSteps([...pos].sort((a, b) => rank(a) - rank(b) || fz(a).localeCompare(fz(b))), zone, null, null, true));
  return out;
}

// The chapter intro stays next to the first real step and goes away once that step is done. The label goes on
// a step every class sees, or it would vanish with a class-filtered step.
function withStartLabel(steps) {
  const i = steps.findIndex(s => /^step\n/.test(s) && !s.includes('#completewith'));
  if (i < 0) return { steps, label: 'next' };
  const s = steps.slice();
  s[i] = s[i].replace(/^step\n/, 'step\n    #label start\n');
  return { steps: s, label: 'start' };
}

const chapters = D.chapters;
const guides = chapters.map((ch, i) => {
  const next = chapters[i + 1];
  const head = [
    '#forever', '<< Horde',
    `#name ${chapterName(ch)}`, `#version ${VERSION}`, `#group ${GROUP}`,
    `#subgroup ${ch.kind === 'dungeon' ? 'Dungeon stops' : 'Zones'}`,
    next ? `#next ${chapterName(next)}` : '',
  ].filter(Boolean);
  const { steps, label } = withStartLabel(ch.kind === 'dungeon' ? dungeonSteps(ch) : zoneSteps(ch));
  const intro = ['step', `    #completewith ${label}`,
    `    +|cRXP_WARN_${clean(ch.title)}|r (${ch.lv[0]}-${ch.lv[1]}). ${clean(ch.kind === 'dungeon' ? ch.desc : ch.why)}${ch.tip ? ' Duo tip: ' + clean(ch.tip) : ''}${ch.tips ? ' ' + ch.tips.map(clean).join(' ') : ''}${ch.skip && ch.skip.length ? ' Skip: ' + ch.skip.map(clean).join('; ') + '.' : ''}`].join('\n');
  return `RXPGuides.RegisterGuide([==[\n${head.join('\n')}\n\n${[intro, ...steps].join('\n')}\n]==])\n`;
});

const lua = `-- Duo leveling route, Horde 40-60, WoW Forever. Generated from classiccraft.app/duo/ by tools/duo/build-rxp.js.\n` +
  `local faction = UnitFactionGroup("player")\nif faction == "Alliance" then return end\nif not RXPGuides or not RXPGuides.RegisterGuide then return end\n\n` + guides.join('\n');
const toc = [
  '## Interface: 16001', `## Title: RestedXP Duo Guide |cffff5a4a(Horde 40-60)|r`,
  '## Notes: A step-by-step Horde route for two players, levels 40-60 in WoW Forever, from classiccraft.app/duo/',
  '## Author: classiccraft.app', `## Version: ${VERSION}.0.0`, '## Dependencies: RXPGuides', '## Category: Quests', '',
  'DuoGuide.lua', '',
].join('\n');

const outDir = path.join(__dirname, '../../duo/rxp', ADDON);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${ADDON}.toc`), toc);
fs.writeFileSync(path.join(outDir, 'DuoGuide.lua'), lua);
console.log('guides', guides.length, 'bytes', lua.length);
const dest = process.argv[2];
if (dest) {
  const d = path.join(dest, ADDON);
  fs.mkdirSync(d, { recursive: true });
  for (const f of fs.readdirSync(outDir)) fs.copyFileSync(path.join(outDir, f), path.join(d, f));
  console.log('installed to', d);
}
