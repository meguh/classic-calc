// Turn the duo route (../../duo/data.json) into a RestedXP (RXPGuides) guide addon.
// Usage: node build-rxp.js [AddOns folder]
// Writes ../../duo/rxp/RXP_DuoGuide/ (toc + guide) and, if given, installs a copy into the AddOns folder.
// Each route chapter becomes one RXP guide; they chain with #next in route order.
const fs = require('fs');
const path = require('path');
const D = require('../../duo/data.json');

const ADDON = 'RXP_DuoGuide';
const VERSION = 1;
const GROUP = 'Duo Leveling 40-60 (H)';

// Zone names RXPGuides knows on Forever, plus Forever's new zones by map ID.
const known = new Set(fs.readFileSync(path.join(__dirname, 'rxp-maps.txt'), 'utf8').split('\n')
  .map(l => (/^\["(.+)"\]/.exec(l) || [])[1]).filter(Boolean));
const mapIds = { 'Riverglades': 2548, 'Mount Hyjal': 2482 };
const zoneRef = z => (known.has(z) ? z : mapIds[z] || null);

const clean = s => String(s || '').replace(/[\r\n]+/g, ' ').replace(/\]=*\]/g, ']').replace(/\|/g, '/').trim();
const Q = id => D.quests[id];
const goto = (z, x, y) => {
  const r = zoneRef(z);
  // Questie uses -1,-1 for spawns inside instances; those get no waypoint.
  return r != null && x != null && y != null && x >= 0 && y >= 0 ? `    .goto ${r},${x},${y}` : null;
};
const friendly = n => `|cRXP_FRIENDLY_${clean(n)}|r`;
const target = g => (g && g.n && !g.kind && !/ — /.test(g.n) ? `    .target ${clean(g.n)}` : null);

function chapterName(ch) {
  const lv = ch.lv[0] === ch.lv[1] ? `${ch.lv[0]}` : `${ch.lv[0]}-${ch.lv[1]}`;
  return `${lv} ${ch.kind === 'dungeon' ? 'Dungeon: ' : ''}${ch.title}`;
}

function completes(id) {
  const q = Q(id);
  const out = [];
  (q.req || []).forEach(([n, c], i) => out.push(`    .complete ${id},${i + 1} --${clean(n)} (${c})`));
  if (q.ty === 'KILL') for (const [n] of q.req || []) if (clean(n) && !/ (rescued|freed|marked|planted|returned|collected|Ablaze|Found|Delivered|met|soothed)$/i.test(n)) out.push(`    .mob ${clean(n)}`);
  return out;
}

function zoneSteps(ch) {
  const out = [];
  const zone = ch.zone;
  for (const s of ch.steps) {
    const ids = (s.q || []).filter(id => Q(id));
    if (ch.list) {
      // No giver or route order known yet: one step per quest (pick it up, do it, hand it in).
      for (const id of ids) {
        const q = Q(id);
        out.push(['step',
          `    >>${clean(s.t)}: |cRXP_WARN_${clean(q.n)}|r. ${clean(q.obj)}`,
          `    .accept ${id} >>Accept ${clean(q.n)}`, ...completes(id),
          `    .turnin ${id} >>Turn in ${clean(q.n)}`].join('\n'));
      }
      continue;
    }
    const lines = ['step'];
    if (s.k === 'tip' && !ids.length) continue;
    if (s.k === 'go') {
      const g = s.at ? goto(s.z || zone, s.at[0], s.at[1]) : null;
      if (g) lines.push(g.replace(/$/, ` >>${clean(s.t)}`));
      else lines.push(`    >>${clean(s.t)}`);
      out.push(lines.join('\n'));
      continue;
    }
    if (s.k === 'pick' || (s.k === 'tip' && ids.length)) {
      // Group pickups by giver so each step has one waypoint.
      const byGiver = new Map();
      for (const id of ids) {
        const g = Q(id).g || {};
        const key = g.n ? `${g.n}|${g.x}|${g.y}` : 'none';
        if (!byGiver.has(key)) byGiver.set(key, { g, ids: [] });
        byGiver.get(key).ids.push(id);
      }
      for (const { g, ids: gids } of byGiver.values()) {
        const st = ['step'];
        const w = g.x != null ? goto(g.z || zone, g.x, g.y) : (s.at ? goto(s.z || zone, s.at[0], s.at[1]) : null);
        if (w) st.push(w);
        st.push(g.n ? `    >>Talk to ${friendly(g.n.split(' — ')[0])}` : `    >>${clean(s.t)}`);
        for (const id of gids) {
          const q = Q(id);
          st.push(`    .accept ${id} >>Accept ${clean(q.n)}`);
        }
        const t = target(g); if (t) st.push(t);
        out.push(st.join('\n'));
        if (s.k === 'tip') for (const id of gids) out.push(['step', `    >>${clean(Q(id).obj)}`, ...completes(id)].join('\n'));
      }
      continue;
    }
    if (s.k === 'do') {
      const at = s.at || (ids.length === 1 && Q(ids[0]).at);
      const w = at ? goto(s.z || zone, at[0], at[1]) : null;
      if (w) lines.push(w);
      lines.push(`    >>${clean(s.t)}`);
      for (const id of ids) lines.push(...completes(id));
      if (lines.length === (w ? 3 : 2)) continue; // nothing trackable
      out.push(lines.join('\n'));
      continue;
    }
    if (s.k === 'turn') {
      const w = s.at ? goto(s.z || zone, s.at[0], s.at[1]) : null;
      if (w) lines.push(w);
      lines.push(`    >>${clean(s.t)}`);
      for (const id of ids) {
        const q = Q(id);
        // A turn step may also list the follow-up to pick up right after.
        const isNew = !ch.steps.some(o => o !== s && ch.steps.indexOf(o) < ch.steps.indexOf(s) && (o.q || []).includes(id));
        lines.push(isNew ? `    .accept ${id} >>Accept ${clean(q.n)}` : `    .turnin ${id} >>Turn in ${clean(q.n)}`);
      }
      out.push(lines.join('\n'));
    }
  }
  return out;
}

function dungeonSteps(ch) {
  const out = [];
  if (ch.unlock.length) for (const id of ch.unlock) {
    const q = Q(id);
    const st = [q.cls ? `step << ${q.cls.split('/')[0]}` : 'step'];
    if (q.g && q.g.x != null) { const w = goto(q.g.z, q.g.x, q.g.y); if (w) st.push(w); }
    st.push(`    >>Unlock: ${clean(q.obj)}${q.g && q.g.x == null && q.g.n ? ' (from: ' + clean(q.g.n) + ')' : ''}`, `    .accept ${id} >>Accept ${clean(q.n)}`, ...completes(id), `    .turnin ${id} >>Turn in ${clean(q.n)}`);
    out.push(st.join('\n'));
  }
  // Pickups: one step per quest so any you can't take yet (chains, class quests) can be skipped.
  // Pickups near the dungeon first, then the rest grouped by zone.
  const zoneOf = id => (Q(id).g && Q(id).g.z) || 'zzz';
  const pos = ch.q.filter(id => id > 0)
    .sort((a, b) => (zoneOf(a) !== ch.loc) - (zoneOf(b) !== ch.loc) || zoneOf(a).localeCompare(zoneOf(b)));
  for (const id of pos) {
    const q = Q(id);
    const st = ['step'];
    if (q.cls) st[0] = `step << ${q.cls}`;
    if (q.g && q.g.x != null) { const w = goto(q.g.z, q.g.x, q.g.y); if (w) st.push(w); }
    st.push(`    >>${clean(q.pu ? 'Pick up from ' + q.pu : 'Pick up')}${q.pre && q.pre.length ? '. Chain: ' + q.pre.map(p => clean(p.n)).join(' > ') : ''}`);
    st.push(`    .accept ${id} >>Accept ${clean(q.n)}`);
    out.push(st.join('\n'));
  }
  const unknown = ch.q.filter(id => id < 0);
  const st = ['step'];
  if (ch.ent) { const w = goto(ch.ent.z, ch.ent.x, ch.ent.y); if (w) st.push(w); }
  st.push(`    >>Run ${clean(ch.title)} and do its quests${unknown.length ? '. Also: ' + unknown.map(id => clean(Q(id).n)).join(', ') + ' (pick up in game)' : ''}`);
  for (const id of pos) st.push(...completes(id));
  out.push(st.join('\n'));
  out.push(['step', `    >>Turn in your ${clean(ch.title)} quests`, ...pos.map(id => `    .turnin ${id} >>Turn in ${clean(Q(id).n)}`)].join('\n'));
  return out;
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
  const intro = ['step', `    >>|cRXP_WARN_${clean(ch.title)}|r (${ch.lv[0]}-${ch.lv[1]}). ${clean(ch.kind === 'dungeon' ? ch.desc : ch.why)}${ch.tip ? ' Duo tip: ' + clean(ch.tip) : ''}${ch.tips ? ' ' + ch.tips.map(clean).join(' ') : ''}${ch.skip && ch.skip.length ? ' Skip: ' + ch.skip.map(clean).join('; ') + '.' : ''} (Tick this step to start.)`].join('\n');
  const steps = ch.kind === 'dungeon' ? dungeonSteps(ch) : zoneSteps(ch);
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
