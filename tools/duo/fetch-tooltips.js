// Fetch Wowhead Forever quest tooltips (objective text + requirement counts) for every
// candidate quest: Horde-available, required level 38+, in an open-world zone or a dungeon.
// Resumable cache: tooltips.json. Usage: node fetch-tooltips.js
const fs = require('fs');
const n = require('./naowh-ref.json');
const dj = require('../../dungeons/data.json');

const ids = new Set();
for (const z of n.zones) for (const id of z.quests) {
  const q = n.Q[id];
  if (q && q.rq >= 38 && q.side !== 1) ids.add(id);
}
for (const id of Object.keys(dj.quests)) ids.add(+id);

const OUT = 'tooltips.json';
const cache = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const todo = [...ids].filter(id => !(id in cache));
console.log('candidates', ids.size, 'to fetch', todo.length);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let done = 0;
async function worker() {
  while (todo.length) {
    const id = todo.shift();
    for (let a = 0; a < 4; a++) {
      try {
        const res = await fetch(`https://nether.wowhead.com/forever/tooltip/quest/${id}`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res.status === 404) { cache[id] = null; break; }
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const j = await res.json();
        cache[id] = { name: j.name, tooltip: j.tooltip };
        break;
      } catch (e) {
        if (a === 3) console.error(id, e.message);
        await sleep(2000 * (a + 1));
      }
    }
    if (++done % 200 === 0) { console.log(done); fs.writeFileSync(OUT, JSON.stringify(cache)); }
    await sleep(120);
  }
}
(async () => {
  await Promise.all([worker(), worker(), worker(), worker()]);
  fs.writeFileSync(OUT, JSON.stringify(cache));
  console.log('done; null', Object.values(cache).filter(v => v === null).length);
})();
