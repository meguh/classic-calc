// Parses set bonuses from wowsims' sim/common/forever/item_sets_auto_gen.go (MIT, copied to sim/presets/).
// Returns { setId: { name, bonuses: [{ n, text, stats: { statIndex: value } }] } }.
// Only plain stat bonuses get stats; procs and unimplemented bonuses keep their text and count as zero.
const fs = require('fs');
const path = require('path');

const RULES = [ // [regex, stat index, multiplier] -- ratings: hit 10 = 1%, crit 14 = 1%, dodge 12, parry 15, block 5
  [/chance to hit by ([\d.]+)%/i, 17, 10],
  [/critical strike by ([\d.]+)%/i, 18, 14],
  [/^\+(\d+) Attack Power\.$/i, 14, 1],
  [/^\+(\d+) Strength\.$/i, 0, 1],
  [/^\+(\d+) Agility\.$/i, 1, 1],
  [/^\+(\d+) Stamina\.$/i, 2, 1],
  [/^\+(\d+) Armor\.$/i, 27, 1],
  [/Defense \+(\d+)/i, 22, 1],
  [/chance to dodge an attack by ([\d.]+)%/i, 25, 12],
  [/chance to parry an attack by ([\d.]+)%/i, 26, 15],
  [/block attacks with a shield by ([\d.]+)%/i, 23, 5],
  [/block value of your shield by (\d+)/i, 24, 1],
];

module.exports = function parseSets() {
  const src = fs.readFileSync(path.join(__dirname, 'sim/presets/item_sets_auto_gen.go'), 'utf8');
  const sets = {};
  let cur = null, txt = [];
  for (const line of src.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/NewParsedItemSet\((\d+), "([^"]+)"/))) { cur = { name: m[2], bonuses: [] }; sets[m[1]] = cur; txt = []; continue; }
    if (!cur) continue;
    if ((m = line.match(/^\s*(?:\/\/\s*)?(\d+): \{/))) { // a bonus (commented out = not implemented in the sim)
      const text = txt.filter(t => !/^(TODO|unsupported)/.test(t)).join(' ');
      const stats = {};
      if (!/^\s*\/\//.test(line)) for (const [re, k, mult] of RULES) { const r = text.match(re); if (r) stats[k] = (stats[k] || 0) + +r[1] * mult; }
      cur.bonuses.push({ n: +m[1], text, stats });
      txt = [];
      continue;
    }
    if ((m = line.match(/^\s*\/\/ (.+)$/)) && !/wowhead\.com/.test(m[1])) txt.push(m[1].trim());
  }
  return sets;
};

if (require.main === module) {
  const s = module.exports();
  console.log(Object.keys(s).length, JSON.stringify(s[143]));
  for (const v of Object.values(s)) for (const b of v.bonuses) if (Object.keys(b.stats).length) console.log(v.name, b.n, b.text, JSON.stringify(b.stats));
}
