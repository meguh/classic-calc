// Decode the QuestieDB (Forever flavor) TOC metadata store into plain JSON.
// Usage: node extract-questie.js [path-to-QuestieDB_Forever.toc]
// Writes questie.json next to this script: { quests, npcs, objects, items }.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const TOC = process.argv[2] ||
  'D:/World of Warcraft/_forever_/Interface/AddOns/QuestieDB/QuestieDB_Forever.toc';

// ---- minimal CBOR decoder (RFC 8949 subset used by C_EncodingUtil) ----
function decodeCBOR(buf) {
  let p = 0;
  function readLen(ai) {
    if (ai < 24) return ai;
    if (ai === 24) return buf[p++];
    if (ai === 25) { const v = buf.readUInt16BE(p); p += 2; return v; }
    if (ai === 26) { const v = buf.readUInt32BE(p); p += 4; return v; }
    if (ai === 27) { const v = Number(buf.readBigUInt64BE(p)); p += 8; return v; }
    if (ai === 31) return -1;
    throw new Error('bad ai ' + ai);
  }
  function item() {
    const ib = buf[p++];
    const mt = ib >> 5, ai = ib & 31;
    switch (mt) {
      case 0: return readLen(ai);
      case 1: return -1 - readLen(ai);
      case 2: case 3: {
        const n = readLen(ai);
        if (n < 0) { let s = ''; while (buf[p] !== 0xff) s += item(); p++; return s; }
        const s = buf.slice(p, p + n); p += n; return s.toString('utf8');
      }
      case 4: {
        const n = readLen(ai); const a = [];
        if (n < 0) { while (buf[p] !== 0xff) a.push(item()); p++; return a; }
        for (let i = 0; i < n; i++) a.push(item());
        return a;
      }
      case 5: {
        const n = readLen(ai); const o = {};
        const put = () => { const k = item(); o[k] = item(); };
        if (n < 0) { while (buf[p] !== 0xff) put(); p++; return o; }
        for (let i = 0; i < n; i++) put();
        return o;
      }
      case 6: readLen(ai); return item();
      case 7: {
        if (ai === 20) return false; if (ai === 21) return true;
        if (ai === 22 || ai === 23) return null;
        if (ai === 25) { const h = buf.readUInt16BE(p); p += 2; return half(h); }
        if (ai === 26) { const v = buf.readFloatBE(p); p += 4; return v; }
        if (ai === 27) { const v = buf.readDoubleBE(p); p += 8; return v; }
        throw new Error('bad simple ' + ai);
      }
    }
  }
  function half(h) {
    const s = h & 0x8000 ? -1 : 1, e = (h >> 10) & 31, f = h & 1023;
    if (e === 0) return s * Math.pow(2, -14) * (f / 1024);
    if (e === 31) return f ? NaN : s * Infinity;
    return s * Math.pow(2, e - 15) * (1 + f / 1024);
  }
  return item();
}

// Lua-style tables come through as arrays or {1:..,2:..} maps. Normalise maps with
// integer keys into sparse arrays indexed from 1 (index 0 unused).
function luaify(v) {
  if (Array.isArray(v)) return v.map(luaify);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v)) o[k] = luaify(v[k]);
    return o;
  }
  return v;
}
// Arrays from CBOR are 0-based; Lua field N = array[N-1].
const at = (t, i) => (t == null ? undefined : Array.isArray(t) ? t[i - 1] : t[i]);

// ---- read metadata ----
const meta = new Map();
for (const line of fs.readFileSync(TOC, 'utf8').split(/\r?\n/)) {
  const m = /^## (X-[^:]+): (.*)$/.exec(line);
  if (m) meta.set(m[1], m[2]);
}
function stored(key) {
  const v = meta.get(key);
  if (v == null) return null;
  const c = /^~(\d+)~$/.exec(v);
  if (!c) return v;
  let s = '';
  for (let i = 1; i <= +c[1]; i++) s += meta.get(key + '-' + i);
  return s;
}
function ids(prefix) {
  const raw = Buffer.from(stored(`X-${prefix}-IDS`), 'base64');
  let dec;
  for (const f of [zlib.inflateSync, zlib.inflateRawSync, zlib.gunzipSync]) {
    try { dec = f(raw); break; } catch (e) { /* try next */ }
  }
  return decodeCBOR(dec);
}
function row(prefix, id) {
  const s = stored(`X-${prefix}-${id}-S`);
  return s ? luaify(decodeCBOR(Buffer.from(s, 'base64'))) : null;
}
function field(prefix, id, f) {
  const s = stored(`X-${prefix}-${id}-${f}`);
  return s ? luaify(decodeCBOR(Buffer.from(s, 'base64'))) : undefined;
}

function dump(prefix, fieldCount, names, tableFields) {
  const out = {};
  for (const id of ids(prefix)) {
    const r = row(prefix, id) || {};
    const e = {};
    for (let f = 1; f <= fieldCount; f++) {
      let v = tableFields.has(f) ? field(prefix, id, f) : at(r, f);
      if (v !== undefined && v !== null) e[names[f]] = v;
    }
    out[id] = e;
  }
  return out;
}

function loadMeta(file) {
  const src = fs.readFileSync(path.join(path.dirname(TOC), 'src/meta', file), 'utf8');
  const names = {}; const tables = new Set();
  const nm = /names = \{([\s\S]*?)\n  \}/.exec(src)[1];
  for (const m of nm.matchAll(/\[(\d+)\]='(\w+)'/g)) names[+m[1]] = m[2];
  const ty = /types = \{([\s\S]*?)\n  \}/.exec(src)[1];
  for (const m of ty.matchAll(/\[(\d+)\]='(\w+)'/g)) if (m[2] === 'table') tables.add(+m[1]);
  const count = +/fieldCount = (\d+)/.exec(src)[1];
  return { names, tables, count };
}

const out = {};
for (const [prefix, file, key] of [
  ['Quest', 'questMeta.lua', 'quests'],
  ['Npc', 'npcMeta.lua', 'npcs'],
  ['Object', 'objectMeta.lua', 'objects'],
  ['Item', 'itemMeta.lua', 'items'],
]) {
  const m = loadMeta(file);
  out[key] = dump(prefix, m.count, m.names, m.tables);
  console.log(key, Object.keys(out[key]).length);
}
fs.writeFileSync(path.join(__dirname, 'questie.json'), JSON.stringify(out));
