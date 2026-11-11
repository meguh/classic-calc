// Print a zone's route-worthy candidates for curation: node list-zone.js "Zone" [all]
const c = require('./candidates.json');
const [, , zone, all] = process.argv;
const rows = Object.values(c).filter(r => r.zone === zone && (all || (!r.cls && !r.skill && !r.repeatable && !r.minRep && r.rq <= 60)))
  .sort((a, b) => a.rq - b.rq || a.id - b.id);
for (const r of rows) {
  const g = r.giver ? `${r.giver.n}${r.giver.at ? ' ' + r.giver.at.map(v => Math.round(v)).join(',') : ''}${r.giver.kind === 'item' ? ' [item' + (r.giver.drop ? ' drop' : '') + ']' : ''}` : '?';
  const req = r.req.map(x => `${x.n}${x.c > 1 ? ' x' + x.c : ''}`).join('; ');
  console.log(`${r.id}\t${r.rq}/${r.lv}\t${r.type}\t${r.n}\t| pre:${r.pre.join(',')}\t| ${g}\t| at:${r.at ? r.at.map(Math.round).join(',') : '-'}\t| ${req}${r.ender && r.giver && r.ender !== r.giver.n ? '\t| to:' + r.ender : ''}`);
}
