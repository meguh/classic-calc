// Reference-only index from Naowh DiscoveryData (all rights reserved): which quest IDs exist
// per zone, used locally to find quests missing from QuestieDB. Nothing from it is published.
const fs = require('fs');
const src = fs.readFileSync('D:/World of Warcraft/_forever_/Interface/AddOns/NaowhForever_DiscoveryData/Quests.lua', 'utf8');
const zones = [];
for (const m of src.matchAll(/\{ map = (\d+), name = "([^"]+)", continent = (\d+), quests = \{([^}]*)\}/g))
  zones.push({ map: +m[1], name: m[2], quests: m[4].split(',').map(s => +s.trim()).filter(Boolean) });
const qs = src.slice(src.indexOf('D.Quests = {'), src.indexOf('D.Repeatable'));
const Q = {};
const re = /\[(\d+)\] = \{ "((?:[^"\\]|\\.)*)", (\d+), (\d+), (\d+), (\d+), (\d+), (nil|\d+)/g;
for (const m of qs.matchAll(re))
  Q[m[1]] = { n: m[2], lv: +m[3], rq: +m[4], side: +m[5], map: m[8] === 'nil' ? null : +m[8] };
const sec = (a, b) => src.slice(src.indexOf(a), b ? src.indexOf(b) : undefined);
const req = {};
for (const m of sec('D.Requires = {', 'D.Chains').matchAll(/\[(\d+)\] = \{([^}]*)\}/g))
  req[m[1]] = m[2].split(',').map(s => +s.trim());
const dungeon = [];
for (const m of sec('D.Dungeon = {', 'D.Battleground').matchAll(/(\d+)/g)) dungeon.push(+m[1]);
fs.writeFileSync('naowh-ref.json', JSON.stringify({ zones, Q, req, dungeon }));
console.log(zones.length, Object.keys(Q).length);
