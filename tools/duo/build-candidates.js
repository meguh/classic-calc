// Merge QuestieDB (GPL), Wowhead tooltips and zone membership into candidates.json:
// every Horde-available quest, required level 38-60, per open-world zone, classified for a duo.
const fs = require('fs');
const d = require('./questie.json');
const n = require('./naowh-ref.json');
const tt = require('./tooltips.json');

// Lua tables with holes arrive as {"3": ...}; turn them into 0-based arrays.
const L = t => {
  if (Array.isArray(t) || !t || typeof t !== 'object') return t;
  const a = []; for (const k of Object.keys(t)) if (/^\d+$/.test(k)) a[+k - 1] = t[k]; return a;
};
for (const q of Object.values(d.quests)) for (const k of ['objectives', 'startedBy', 'finishedBy']) if (q[k]) q[k] = L(q[k]);
const HORDE = 2n | 16n | 32n | 128n | 512n;
const strip = s => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"');

function parseTooltip(id) {
  const t = tt[id];
  if (!t) return null;
  const txt = strip(t.tooltip);
  const parts = txt.split('Requirements:');
  const lines = txt.split('\n').map(s => s.trim()).filter(Boolean);
  const text = lines.slice(1).filter(l => !l.startsWith('- ') && l !== 'Requirements:').join(' ').trim();
  const req = [];
  if (parts[1]) for (const l of parts[1].split('\n')) {
    const m = /^\s*-\s*(.+?)(?:\s+x\s+(\d+))?\s*$/.exec(l);
    if (m) req.push({ n: m[1].trim(), c: m[2] ? +m[2] : 1 });
  }
  return { name: t.name, text, req };
}

// Questie area ID -> zone name (via the quests both sources share)
const zoneOfQuest = {};
for (const z of n.zones) for (const id of z.quests) zoneOfQuest[id] = z.name;
const areaToZone = {};
for (const [id, q] of Object.entries(d.quests)) {
  if (q.zoneOrSort > 0 && zoneOfQuest[id]) areaToZone[q.zoneOrSort] = areaToZone[q.zoneOrSort] || zoneOfQuest[id];
}
const zoneToArea = {};
for (const [a, z] of Object.entries(areaToZone)) zoneToArea[z] = zoneToArea[z] || +a;
// Riverglades / Hyjal NPCs use their own area IDs
zoneToArea['Riverglades'] = zoneToArea['Riverglades'] || 16591;

function spawnsIn(spawns, area) {
  if (!spawns) return [];
  if (area && spawns[area]) return spawns[area];
  return [];
}
function centroid(pts) {
  if (!pts.length) return null;
  // use the densest cluster: average of points within 12 units of the median point
  const sx = pts.map(p => p[0]).sort((a, b) => a - b), sy = pts.map(p => p[1]).sort((a, b) => a - b);
  const mx = sx[sx.length >> 1], my = sy[sy.length >> 1];
  const near = pts.filter(p => Math.hypot(p[0] - mx, p[1] - my) < 12);
  const use = near.length ? near : pts;
  const x = use.reduce((s, p) => s + p[0], 0) / use.length, y = use.reduce((s, p) => s + p[1], 0) / use.length;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function giver(q, area) {
  const sb = q.startedBy || [];
  const npcs = sb[0] || [], objs = sb[1] || [], items = sb[2] || [];
  for (const id of npcs) {
    const npc = d.npcs[id]; if (!npc) continue;
    const pts = spawnsIn(npc.spawns, area);
    const anyArea = npc.spawns ? Object.keys(npc.spawns)[0] : null;
    const p = pts[0] || (anyArea ? npc.spawns[anyArea][0] : null);
    return { kind: 'npc', id, n: npc.name, at: p ? [p[0], p[1]] : null, area: pts[0] ? area : anyArea ? +anyArea : null };
  }
  for (const id of objs) {
    const o = d.objects[id]; if (!o) continue;
    const pts = spawnsIn(o.spawns, area);
    return { kind: 'object', id, n: o.name, at: pts[0] ? [pts[0][0], pts[0][1]] : null, area };
  }
  for (const id of items) {
    const it = d.items[id]; if (!it) continue;
    return { kind: 'item', id, n: it.name, drop: !!(it.npcDrops && it.npcDrops.length) };
  }
  return null;
}

function classify(q, tip, area) {
  const obj = q.objectives || [];
  const kills = [], objects = [], items = [];
  const at = [];
  for (const [nid, txt] of obj[0] || []) {
    const npc = d.npcs[nid];
    kills.push({ id: nid, n: txt || (npc && npc.name) });
    if (npc) at.push(...spawnsIn(npc.spawns, area));
  }
  for (const [kid, ids] of obj[4] || []) {
    kills.push({ id: kid, n: (d.npcs[kid] && d.npcs[kid].name) || 'kill credit' });
    for (const s of [].concat(ids || [])) { const npc = d.npcs[s]; if (npc) at.push(...spawnsIn(npc.spawns, area)); }
  }
  for (const [oid] of obj[1] || []) {
    const o = d.objects[oid]; objects.push({ id: oid, n: o && o.name });
    if (o) at.push(...spawnsIn(o.spawns, area));
  }
  for (const [iid] of obj[2] || []) {
    const it = d.items[iid] || {};
    const fromNpc = (it.npcDrops || []).length, fromObj = (it.objectDrops || []).length;
    items.push({ id: iid, n: it.name, src: fromNpc ? 'drop' : fromObj ? 'object' : 'other' });
    for (const nid of (it.npcDrops || []).slice(0, 8)) { const npc = d.npcs[nid]; if (npc) at.push(...spawnsIn(npc.spawns, area)); }
    for (const oid of (it.objectDrops || []).slice(0, 8)) { const o = d.objects[oid]; if (o) at.push(...spawnsIn(o.spawns, area)); }
  }
  const explore = !!q.triggerEnd;
  if (q.triggerEnd && q.triggerEnd[1]) for (const pts of Object.values(q.triggerEnd[1])) at.push(...pts);

  // counts from the tooltip requirements, matched by name
  const reqs = tip ? tip.req : [];
  const count = name => { const r = reqs.find(r => name && r.n.toLowerCase().startsWith(name.toLowerCase().slice(0, 12))); return r ? r.c : null; };
  for (const k of kills) k.c = count(k.n);
  for (const i of items) i.c = count(i.n);

  let type;
  const anyDrop = items.some(i => i.src === 'drop');
  const anyGather = items.some(i => i.src === 'object') || objects.length;
  if (!kills.length && !items.length && !objects.length) type = explore ? 'explore' : 'talk';
  else if (kills.length && !items.length && !objects.length) type = 'kill';
  else if (anyDrop) type = kills.length ? 'kill+drop' : 'drop';
  else if (anyGather) type = kills.length ? 'kill+gather' : 'gather';
  else type = 'item';
  return { type, kills, items, objects, explore, at: centroid(at) };
}

// Text-only classification for quests QuestieDB doesn't have.
function classifyText(tip) {
  if (!tip) return { type: 'unknown', kills: [], items: [], objects: [] };
  const t = tip.text.toLowerCase();
  const killy = /\b(slay|kill|destroy|defeat|slaughter|eliminate|cull|thin|put down|take down|dispatch)\b/.test(t);
  const collecty = /\b(collect|gather|bring|obtain|recover|retrieve|acquire|loot|salvage|harvest)\b/.test(t);
  let type = 'talk';
  if (tip.req.length) type = killy && !collecty ? 'kill' : collecty && !killy ? 'drop?' : 'mixed?';
  else if (/\b(explore|find|scout|investigate|locate|search)\b/.test(t)) type = 'explore';
  return { type, kills: [], items: [], objects: [], reqText: tip.req };
}

const out = {};
for (const z of n.zones) {
  const area = zoneToArea[z.name];
  for (const id of z.quests) {
    const nq = n.Q[id];
    if (!nq || nq.rq < 38 || nq.side === 1) continue;
    const q = d.quests[id];
    if (q && q.requiredRaces && (BigInt(q.requiredRaces) & HORDE) === 0n) continue;
    const tip = parseTooltip(id);
    const rec = {
      id, zone: z.name, n: (q && q.name) || (tip && tip.name) || nq.n,
      lv: (q && q.questLevel) || nq.lv, rq: (q && q.requiredLevel) || nq.rq,
      side: nq.side === 2 ? 'H' : 'B',
      inQuestie: !!q,
      text: tip ? tip.text : (q && q.objectivesText ? q.objectivesText[0] : ''),
      req: tip ? tip.req : [],
      pre: q ? [...(q.preQuestSingle || []), ...(q.preQuestGroup || [])] : (n.req[id] || []),
      next: q ? [...new Set([...(q.childQuests || []), ...(q.nextQuestInChain ? [q.nextQuestInChain] : [])])] : [],
      cls: q && q.requiredClasses ? q.requiredClasses : 0,
      skill: q && q.requiredSkill ? q.requiredSkill : null,
      repeatable: q ? !!(q.specialFlags & 1) : false,
      minRep: q && q.requiredMinRep ? q.requiredMinRep : null,
      breadcrumbFor: q ? q.breadcrumbForQuestId || null : null,
      giver: q ? giver(q, area) : null,
      ender: q && q.finishedBy && q.finishedBy[0] && d.npcs[q.finishedBy[0][0]] ? d.npcs[q.finishedBy[0][0]].name : null,
      ...(q ? classify(q, tip, area) : classifyText(tip)),
    };
    out[id] = rec;
  }
}
fs.writeFileSync('candidates.json', JSON.stringify(out, null, 0));
const by = {};
for (const r of Object.values(out)) { by[r.zone] = by[r.zone] || {}; by[r.zone][r.type] = (by[r.zone][r.type] || 0) + 1; }
console.log(by);
