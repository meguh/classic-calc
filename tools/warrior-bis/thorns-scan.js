// Scans Wowhead Forever tooltips for warrior-usable level 35-60 gear and records damage-shield ("thorns")
// effects and defensive stats. Output: thorns.json { id: { thorns, school, def, block, blockValue, dodge, parry, sta, armor } }.
// Only parsed numbers are stored, never Wowhead's text. Cached: re-running only fetches new ids.
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.join(__dirname, 'thorns.json');
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
const cache = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

if (process.argv.includes('--recheck')) for (const [k, v] of Object.entries(cache)) if (v.thorns) delete cache[k];
const lvl = i => i.reqLvl || (i.scalingOptions[0].ilvl || 0) - 5;
const ids = db.items.filter(i => lvl(i) >= 35 && lvl(i) <= 60 && (i.phase || 1) === 1 && i.quality >= 2 &&
  (!i.classAllowlist || i.classAllowlist.includes(1)) && (
    [2, 11, 12, 4].includes(i.type) ||
    ([1, 3, 5, 6, 7, 8, 9, 10].includes(i.type) && [2, 3, 4].includes(i.armorType)) ||
    (i.type === 13 && [1, 2, 3, 4, 7, 9].includes(i.weaponType) && i.handType !== 4))).map(i => i.id).filter(id => !cache[id]);

const get = url => new Promise((res, rej) => https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
  let b = ''; r.on('data', c => (b += c)).on('end', () => res([r.statusCode, b]));
}).on('error', rej));
const num = (re, t) => { const m = t.match(re); return m ? +m[1] : 0; };

function parse(html) {
  const t = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  const out = {};
  // Every "Equip:" line that damages attackers; lines with "chance" are procs, not thorns.
  for (const line of t.split(/(?=Equip:|Chance on hit:|Use:)/)) {
    const m = line.match(/inflicts? (\d+) (\w+) damage to (?:the )?attackers?/i);
    // Only text before the match decides "chance" ("Drop Chance" later in the tooltip doesn't count).
    if (m && !/chance/i.test(line.slice(0, line.indexOf(m[0])))) { out.thorns = (out.thorns || 0) + +m[1]; out.school = m[2]; }
    const bl = line.match(/Deals (\d+) to (\d+) (\w+) damage every time you block/i);
    if (bl) out.blockDmg = (+bl[1] + +bl[2]) / 2;
  }
  out.sta = num(/\+(\d+) Stamina/, t);
  out.armor = num(/(\d+) Armor/, t);
  out.def = num(/Increased Defense \+(\d+)/i, t) || num(/\+(\d+) Defense/i, t) || num(/defense (?:skill|rating) by (\d+)/i, t);
  out.block = num(/block (?:attacks with a shield|chance) by (\d+)%/i, t) || num(/(\d+) Block\b/, t);
  out.blockValue = num(/block value of your shield by (\d+)/i, t) || num(/(\d+) Block Value/i, t);
  out.dodge = num(/chance to dodge an attack by (\d+)%/i, t);
  out.parry = num(/chance to parry an attack by (\d+)%/i, t);
  for (const k of Object.keys(out)) if (!out[k]) delete out[k];
  return out;
}

(async () => {
  console.log('to fetch', ids.length);
  let n = 0;
  for (const id of ids) {
    try {
      const [code, body] = await get('https://nether.wowhead.com/forever/tooltip/item/' + id);
      cache[id] = code === 200 ? parse(JSON.parse(body).tooltip || '') : { missing: 1 };
    } catch (e) { continue; }
    if (++n % 100 === 0) { fs.writeFileSync(OUT, JSON.stringify(cache)); console.log(n); }
    await new Promise(r => setTimeout(r, 40));
  }
  fs.writeFileSync(OUT, JSON.stringify(cache));
  const t = Object.entries(cache).filter(([, v]) => v.thorns);
  console.log('done; thorns items:', t.length);
})();
