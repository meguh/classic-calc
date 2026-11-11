// Build ../../duo/data.json from route.js + candidates.json (QuestieDB + Wowhead) + the dungeon page data.
// Usage: node build-duo.js
const fs = require('fs');
const path = require('path');
const { chapters, overrides } = require('./route.js');
const C = require('./candidates.json');
const Q = require('./questie.json');
const TT = require('./tooltips.json');
const DJ = require('../../dungeons/data.json');

// Questie area ID -> zone name, from quests whose zone both sources agree on.
const N = require('./naowh-ref.json');
const zoneOfQuest = {};
for (const z of N.zones) for (const id of z.quests) zoneOfQuest[id] = z.name;
const areaName = { 16591: 'Riverglades' };
for (const [id, q] of Object.entries(Q.quests)) {
  if (q.zoneOrSort > 0 && zoneOfQuest[id] && !areaName[q.zoneOrSort]) areaName[q.zoneOrSort] = zoneOfQuest[id];
}

const npcByName = {};
for (const [id, n] of Object.entries(Q.npcs)) if (n.spawns && !npcByName[n.name]) npcByName[n.name] = { id: +id, ...n };
function npcSpot(name) {
  const n = npcByName[name];
  if (!n || !n.spawns) return { n: name };
  const area = Object.keys(n.spawns)[0];
  const p = n.spawns[area][0];
  return { n: name, x: Math.round(p[0] * 10) / 10, y: Math.round(p[1] * 10) / 10, z: areaName[area] || null };
}

const strip = s => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#039;|&apos;/g, "'").replace(/&quot;/g, '"');
const r1 = v => Math.round(v * 10) / 10;

function autoType(c) {
  switch (c.type) {
    case 'kill': return 'KILL';
    case 'talk': case 'explore': return 'QUICK';
    case 'gather': {
      const total = (c.items || []).reduce((s, i) => s + (i.c || 1), 0) + (c.objects || []).length;
      return total <= 2 ? 'QUICK' : 'GATHER';
    }
    case 'drop': case 'drop?': case 'kill+drop': {
      const one = c.req.length && c.req.every(r => r.c <= 1);
      return one ? 'BOSS' : 'DROP';
    }
    case 'kill+gather': return 'KILL';
    case 'item': return 'ITEM';
    default: return 'QUICK';
  }
}

const quests = {};
const nameOf = id => (C[id] && C[id].n) || (Q.quests[id] && Q.quests[id].name) || (TT[id] && TT[id].name) || (DJ.quests[id] && DJ.quests[id].n) || `Quest ${id}`;

function zoneQuest(id) {
  if (quests[id]) return quests[id];
  const c = C[id];
  const o = overrides[id] || {};
  let rec;
  if (c) {
    rec = {
      id, n: c.n, rq: c.rq, lv: c.lv, ty: o.ty || autoType(c),
      obj: c.text || '', req: c.req.map(r => [r.n, r.c]),
      to: c.ender && c.giver && c.ender !== c.giver.n ? c.ender : undefined,
      pre: c.pre.filter(p => p > 0).map(p => ({ id: p, n: nameOf(p) })),
      fv: c.inQuestie ? undefined : 1,
    };
    if (o.giver) rec.g = npcSpot(o.giver);
    else if (c.giver) {
      const g = c.giver;
      rec.g = { n: g.n + (g.kind === 'object' ? '' : ''), kind: g.kind !== 'npc' ? g.kind : undefined };
      if (g.at) { rec.g.x = r1(g.at[0]); rec.g.y = r1(g.at[1]); rec.g.z = areaName[g.area] || null; }
    }
    if (o.at) Object.assign(rec.g = rec.g || {}, { x: o.at[0], y: o.at[1] });
    if (c.at) rec.at = c.at;
  } else if (DJ.quests[id]) {
    const d = DJ.quests[id];
    rec = { id, n: d.n, rq: d.rq, lv: d.lv, ty: o.ty || 'DUNGEON', obj: d.obj || '', req: [], pu: d.pu };
    if (d.sm) rec.g = { n: d.pu, x: d.sm.x, y: d.sm.y, z: d.sm.z };
  } else {
    console.warn('unknown quest', id);
    rec = { id, n: nameOf(id), ty: o.ty || 'QUICK', obj: '', req: [] };
  }
  if (o.long) rec.long = 1;
  if (o.elite) rec.elite = 1;
  if (o.note) rec.note = o.note;
  return (quests[id] = rec);
}

function dungeonQuest(id) {
  const d = DJ.quests[id];
  const rec = {
    id, n: d.n, rq: d.rq, lv: d.lv, ty: 'DUNGEON', obj: d.obj || '', req: [],
    pu: d.pu, ti: d.ti, note: d.note, cls: d.cls, xp: d.xp, side: d.f,
  };
  if (d.sm) rec.g = { n: d.sm.t || d.pu, x: d.sm.x, y: d.sm.y, z: d.sm.z };
  else if (d.pu) {
    const s = npcSpot(d.pu.split(',')[0].trim());
    if (s.x != null) rec.g = { n: `${s.n} — ${s.z}`, x: r1(s.x), y: r1(s.y), z: s.z };
  }
  if (d.chain && d.chain.length) rec.pre = d.chain.map(p => ({ id: p, n: nameOf(p) }));
  if (id < 0) rec.nolink = 1;
  quests[id] = rec;
  return rec;
}

const used = new Set();
const out = [];
for (const ch of chapters) {
  if (ch.kind === 'dungeon') {
    const dn = DJ.dungeons.find(d => d.n === ch.dn);
    if (!dn) { console.warn('no dungeon', ch.dn); continue; }
    const ids = dn.quests.filter(id => DJ.quests[id] && DJ.quests[id].f !== 'Alliance');
    ids.forEach(dungeonQuest);
    const unlock = (ch.unlock || []).map(id => { zoneQuest(id); used.add(id); return id; });
    out.push({
      id: ch.id, kind: 'dungeon', title: dn.n, lv: ch.lv, range: dn.lv, loc: dn.loc, desc: dn.d,
      ent: dn.ent ? { x: dn.ent.x, y: dn.ent.y, z: dn.ent.z } : undefined,
      optional: ch.optional ? 1 : undefined, fv: dn.new ? 1 : undefined, q: ids, unlock,
    });
    continue;
  }
  const steps = ch.steps.map(s => {
    (s.q || []).forEach(id => { zoneQuest(id); used.add(id); });
    return { k: s.k, t: s.t, q: s.q, at: s.at, z: s.z };
  });
  out.push({
    id: ch.id, kind: 'zone', title: ch.title, zone: ch.zone, lv: ch.lv, hub: ch.hub, why: ch.why, tip: ch.tip,
    skip: ch.skip, steps, fv: ch.forever ? 1 : undefined, list: ch.list ? 1 : undefined,
  });
}

// "Other quests here": every remaining Horde quest of each route zone, attached to the zone
// chapter whose level range fits it best. Shown behind a toggle.
const zoneChapters = out.filter(c => c.kind === 'zone');
for (const c of Object.values(C)) {
  if (used.has(c.id) || c.cls || c.skill || c.repeatable || c.minRep) continue;
  if (c.type === 'item' || c.type === 'talk' || c.type === 'unknown') continue;
  if (c.giver && c.giver.kind === 'item' && c.giver.drop) continue;
  const chs = zoneChapters.filter(z => z.zone === c.zone);
  if (!chs.length) continue;
  const ch = chs.find(z => c.rq <= z.lv[1]) || chs[chs.length - 1];
  if (c.rq > ch.lv[1] + 2 || c.rq < ch.lv[0] - 6) continue;
  zoneQuest(c.id);
  (ch.more = ch.more || []).push(c.id);
}
for (const ch of zoneChapters) if (ch.more) ch.more.sort((a, b) => quests[a].rq - quests[b].rq || quests[a].n.localeCompare(quests[b].n));

// Check: every quest's prerequisites in the same chapter come earlier.
for (const ch of zoneChapters) {
  const seen = new Set();
  for (const s of ch.steps) {
    for (const id of s.q || []) {
      if (s.k === 'pick' || s.k === 'do') for (const p of quests[id].pre || []) {
        if (C[p.id] && C[p.id].zone === ch.zone && !seen.has(p.id) && !used.has(p.id)) console.warn(`${ch.id}: ${id} ${quests[id].n} needs ${p.id} ${p.n} (not in route)`);
      }
      seen.add(id);
    }
  }
}

const data = { built: new Date().toISOString().slice(0, 10), faction: 'Horde', chapters: out, quests };
const dest = path.join(__dirname, '../../duo/data.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(data));
console.log('chapters', out.length, 'quests', Object.keys(quests).length, 'bytes', fs.statSync(dest).size);
