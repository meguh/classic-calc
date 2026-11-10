// Fetches Wowhead Forever tooltip data for every item and quest ID in fdj.json.
// Usage: node fetch-wowhead.js fdj.json wowhead.json   (resumable cache)
const fs = require('fs');
const [, , inFile, outFile] = process.argv;
const d = JSON.parse(fs.readFileSync(inFile, 'utf8'));

const items = new Set(), quests = new Set();
function walk(v, parentKey) {
  if (Array.isArray(v)) {
    if (Number.isInteger(v[0]) && v[0] > 0 && typeof v[1] === 'string') items.add(v[0]);
    v.forEach(x => walk(x, parentKey));
  } else if (v && typeof v === 'object') {
    // quest objects: have id + name + objective/pickup
    if (Number.isInteger(v.id) && typeof v.name === 'string' && /quest|chain|prereq|link/i.test(parentKey || 'quest')) quests.add(v.id);
    for (const [k, x] of Object.entries(v)) {
      if (/QuestLink$/.test(k) && Number.isInteger(x)) quests.add(x);
      if (/QuestLink$/.test(k) && x && Number.isInteger(x.id)) quests.add(x.id);
      walk(x, /^(quests|QUEST_PREREQ_CHAINS)$/.test(k) || /QuestLink$/.test(k) ? 'quest' : (parentKey === 'quest' && /^\d+$/.test(k) ? 'quest' : k));
    }
  }
}
walk(d.DB, 'db');
walk(d.QUEST_PREREQ_CHAINS, 'quest');
for (const k of Object.keys(d.QUEST_PREREQ_DETAILS || {})) quests.add(+k);
walk(d.QUEST_PREREQ_DETAILS, 'details');
walk(d.SHARED_BY_BOSS, 'shared');
walk(d.PREREQ_REWARD_ITEMS_FALLBACK, 'rew');

const cache = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : { item: {}, quest: {} };
const todo = [...[...items].map(id => ['item', id]), ...[...quests].map(id => ['quest', id])]
  .filter(([t, id]) => !(id in cache[t]));
console.log(`items ${items.size}, quests ${quests.size}, to fetch ${todo.length}`);

const sleep = ms => new Promise(r => setTimeout(r, ms));
let done = 0;
async function worker() {
  while (todo.length) {
    const [t, id] = todo.shift();
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch(`https://nether.wowhead.com/forever/tooltip/${t}/${id}`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (res.status === 404) { cache[t][id] = null; break; }
        if (!res.ok) throw new Error('HTTP ' + res.status);
        cache[t][id] = await res.json();
        break;
      } catch (e) {
        if (attempt === 3) console.error(t, id, e.message);
        await sleep(2000 * (attempt + 1));
      }
    }
    if (++done % 100 === 0) { console.log(done); fs.writeFileSync(outFile, JSON.stringify(cache)); }
    await sleep(150);
  }
}
(async () => {
  await Promise.all([worker(), worker(), worker(), worker()]);
  fs.writeFileSync(outFile, JSON.stringify(cache));
  const miss = t => Object.values(cache[t]).filter(v => v === null).length;
  console.log('done; missing items', miss('item'), 'missing quests', miss('quest'));
})();
