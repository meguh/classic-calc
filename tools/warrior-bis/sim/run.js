// Runs the wowsims Forever engine over the BiS lists.
//   node run.js   -> swaps each item into the Pre-BiS set and sims it. Writes
//     ../sim-procs.json: per item, the DPS the stat weights don't explain (procs, weapon speed/skill, caps), in EP
//     results-validate.json: sim DPS vs EP for the top 10 per slot (Horde, no PvP)
// (Stripping an effect from the item record does not work: the engine registers most procs by item ID in Go.)
// Needs wowsims/sim_worker.js + wowsims/lib.wasm.gz (from https://www.wowsims.com/forever/, MIT) and ../db.json.
// Baseline: wowsims' own Pre-BiS Fury set / APL / talents (Arms set for two-handers), the sim page's default buffs,
// a level 63 boss for 180 s. Each comparison uses the same random seed so differences are not noise.
const fs = require('fs');
const path = require('path');
const { Worker, isMainThread, parentPort } = require('worker_threads');

const ITERATIONS = 3000;
const SEED = 4242;
const SLOT_INDEX = { head: 0, neck: 1, shoulder: 2, back: 3, chest: 4, wrist: 5, hands: 6, waist: 7, legs: 8, feet: 9,
  finger: 10, trinket: 12, mh: 14, oh: 15, '2h': 14, ranged: 16 };
const P = f => JSON.parse(fs.readFileSync(path.join(__dirname, 'presets', f), 'utf8'));

if (!isMainThread) {
  const E = require('./engine');
  const { database } = require('./db');
  parentPort.on('message', async job => {
    await E.ready;
    const req = buildRequest(job, database);
    const r = await E.raidSimJson(req);
    const p = r?.raidMetrics?.parties?.[0]?.players?.[0];
    parentPort.postMessage({ key: job.key, dps: p ? p.dps.avg : null, err: p ? null : (r?.error?.message || 'failed').slice(0, 200) });
  });
  return;
}

function buildRequest(job, database) {
  const arms = job.spec === 'arms';
  const gear = JSON.parse(JSON.stringify(P(arms ? 'prebis_arms.gear.json' : 'prebis_fury.gear.json')));
  while (gear.items.length < 17) gear.items.push({});
  let stripped = null;
  if (job.item) {
    let idx = SLOT_INDEX[job.slot];
    // Rings/trinkets: if the other slot already has this (unique) item, swap there instead.
    if ((job.slot === 'finger' || job.slot === 'trinket') && gear.items[idx + 1]?.id === job.item.id) idx += 1;
    const keep = gear.items[idx]?.enchant;
    gear.items[idx] = { id: job.item.id, ...(keep ? { enchant: keep } : {}), ...(job.item.sfx ? { randomSuffix: job.item.sfx } : {}) };
    if (job.slot === '2h') gear.items[15] = {};
    if (job.strip) stripped = job.item.id;
  }
  const db = database(gear.items.map(i => i.id).filter(Boolean), gear.items.map(i => i.enchant).filter(Boolean),
    [13442, 274274, 20452, 18588, 10646, 12404]);
  if (stripped) db.items.forEach(i => { if (i.id === stripped) delete i.itemEffects; });
  const tstats = Array(39).fill(0); tstats[27] = 3731; tstats[14] = 320; tstats[24] = 54; tstats[29] = 1428900;
  const bonus = Array(39).fill(0); bonus[14] = job.bonusAP || 0;
  return {
    raid: {
      parties: [{ players: [{
        name: 'W', race: 'RaceOrc', class: 'ClassWarrior', equipment: gear,
        talentsString: arms ? '30303213132215201-55050000002-2' : '30303213002-350530005122100231-1',
        consumables: { resourcePotId: 13442, flaskId: 274274, foodId: 20452, explosiveId: 18588, extraIds: [10646], ...(arms ? {} : { ohImbueId: 12404 }) },
        buffs: { greaterBlessingOfKings: true, greaterBlessingOfMight: 1 },
        profession1: 'Engineering', profession2: 'Blacksmithing', rotation: P(arms ? 'arms.apl.json' : 'fury.apl.json'),
        reactionTimeMs: 100, channelClipDelayMs: 50, bonusStats: { stats: bonus },
        dpsWarrior: { options: { classOptions: { useBattleShout: true, defaultStance: 'WarriorStanceBerserker' } } },
        database: db,
      }], buffs: {} }],
      buffs: { powerWordFortitude: true, markOfTheWild: true, strengthOfEarthTotem: 1, windfuryTotem: true, graceOfAirTotem: 1, leaderOfThePack: true },
      debuffs: { giftOfArthas: true, exposeArmor: true, faerieFire: true, sunderArmor: true, curseOfRecklessness: true },
    },
    encounter: { duration: 180, durationVariation: 5, executeProportion20: 0.2, targets: [{ id: 31146, name: 'Raid Target', level: 63,
      mobType: 'MobTypeMechanical', stats: tstats, minBaseDamage: 2601, damageSpread: 0.5, swingSpeed: 2, parryHaste: true }] },
    simOptions: { iterations: ITERATIONS, randomSeed: SEED },
  };
}

async function runAll(jobs) {
  const n = Math.min(12, jobs.length);
  const results = {};
  let next = 0, done = 0;
  await Promise.all(Array.from({ length: n }, () => new Promise(resolve => {
    const w = new Worker(__filename);
    const feed = () => { if (next >= jobs.length) { w.terminate(); return resolve(); } w.postMessage(jobs[next++]); };
    w.on('message', m => {
      results[m.key] = m; done++;
      if (m.err) console.error('  ', m.key, m.err);
      if (done % 10 === 0 || done === jobs.length) process.stdout.write(`  ${done}/${jobs.length}\r`);
      feed();
    });
    w.on('error', e => { console.error(e); resolve(); });
    feed();
  })));
  console.log();
  return results;
}

(async () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../warrior/data.json'), 'utf8'));
  const specOf = k => (k === '2h' ? 'arms' : 'fury');
  const jobs = [
    { key: 'base:fury', spec: 'fury' }, { key: 'ap:fury', spec: 'fury', bonusAP: 100 },
    { key: 'base:arms', spec: 'arms' }, { key: 'ap:arms', spec: 'arms', bonusAP: 100 },
  ];
  // Per slot: the top 10 (Horde, no PvP) plus every item with an effect. Each is swapped into the Pre-BiS set.
  const lin = x => x.ep - (x.procEP || 0); // stat-only EP
  const pools = {};
  for (const [k, s] of Object.entries(data.slots)) {
    const top = s.items.filter(x => !x.pvp && x.faction !== 'A').slice(0, 10);
    const fx = s.items.filter(x => x.fx.length);
    // Reference: the best item with no effect at all; DPS differences are measured against it.
    const ref = s.items.find(x => !x.fx.length && !x.skills.length);
    pools[k] = { top, ref, items: [...new Map([...s.items, ref].filter(Boolean).map(x => [x.id, x])).values()] };
    for (const x of pools[k].items) jobs.push({ key: `item:${k}:${x.id}`, spec: specOf(k), slot: k, item: x });
  }
  console.log(jobs.length, 'sims x', ITERATIONS, 'iterations');
  const t = Date.now();
  const r = await runAll(jobs);
  console.log('done in', ((Date.now() - t) / 1000).toFixed(0), 's');
  const perAP = { fury: (r['ap:fury'].dps - r['base:fury'].dps) / 100, arms: (r['ap:arms'].dps - r['base:arms'].dps) / 100 };
  console.log('baseline DPS fury', r['base:fury'].dps.toFixed(1), 'arms', r['base:arms'].dps.toFixed(1), 'DPS per AP', perAP);

  const procs = {}, report = { perAP, base: { fury: r['base:fury'].dps, arms: r['base:arms'].dps }, slots: {} };
  for (const [k, p] of Object.entries(pools)) {
    const d = x => r[`item:${k}:${x.id}`]?.dps;
    if (!p.ref || d(p.ref) == null) continue;
    // Sim value in EP: the reference's stat EP plus the DPS difference converted to EP.
    const simEP = x => lin(p.ref) + (d(x) - d(p.ref)) / perAP[specOf(k)];
    const kind = ['mh', 'oh', '2h'].includes(k) ? k : 'armor';
    for (const x of p.items) {
      if (d(x) == null) continue;
      procs[`${kind}:${x.id}`] = +(simEP(x) - lin(x)).toFixed(1); // what the stat weights miss: procs, weapon speed/skill, caps
    }
    report.slots[k] = p.top.filter(x => d(x) != null).map(x => ({ name: x.name, ep: x.ep, simEP: +simEP(x).toFixed(1), dps: +d(x).toFixed(1) }));
  }
  fs.writeFileSync(path.join(__dirname, '../sim-procs.json'), JSON.stringify(procs, null, 1));
  fs.writeFileSync(path.join(__dirname, 'results-validate.json'), JSON.stringify(report, null, 1));
  console.log('wrote sim-procs.json', Object.keys(procs).length, 'entries and results-validate.json');
})();
