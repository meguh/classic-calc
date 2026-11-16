// Runs the wowsims Forever sim worker (sim_worker.js + lib.wasm.gz from wowsims.com, MIT) inside Node.
const fs = require('fs'), zlib = require('zlib'), path = require('path');
const DIR = path.join(__dirname, 'wowsims');
let listeners = [], pending = new Map(), readyRes, nextId = 1;
const ready = new Promise(r => (readyRes = r));
globalThis.addEventListener = (type, fn) => { if (type === 'message') listeners.push(fn); };
globalThis.removeEventListener = (type, fn) => { listeners = listeners.filter(f => f !== fn); };
const dispatch = data => listeners.slice().forEach(fn => fn({ data }));
globalThis.postMessage = async m => {
  if (m.msg === 'wasmModuleRequest') {
    const mod = await WebAssembly.compile(zlib.gunzipSync(fs.readFileSync(path.join(DIR, 'lib.wasm.gz'))));
    dispatch({ msg: 'wasmModule', module: mod });
  } else if (m.msg === 'ready') readyRes();
  else if (m.msg === 'progress') {}
  else if (pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error)) : p.res(m.outputData); }
};
globalThis.fetch = async () => { throw new Error('no fetch'); };
globalThis.WorkerGlobalScope = function () {};
const origLog = console.log; console.log = (...a) => { if (!String(a[0]).includes('wasm')) origLog(...a); };
new Function(fs.readFileSync(path.join(DIR, 'sim_worker.js'), 'utf8'))();
console.log = origLog;
function call(msg, inputData) {
  const id = 'r' + nextId++;
  return new Promise((res, rej) => { pending.set(id, { res, rej }); dispatch({ msg, id, inputData }); });
}
module.exports = { ready, raidSimJson: async req => JSON.parse(await call('raidSimJson', JSON.stringify(req))) };
