// Runs ForeverDungeonJournal's data files in a Lua VM and dumps the tables as JSON.
// Usage: node extract.js <addonDir> <out.json>
const fs = require('fs');
const path = require('path');
const { lua, lauxlib, lualib, to_luastring } = require('fengari');

const addonDir = process.argv[2];
const outFile = process.argv[3];

const L = lauxlib.luaL_newstate();
lualib.luaL_openlibs(L);

function run(code, name, args = []) {
  const buf = typeof code === 'string' ? to_luastring(code) : code;
  if (lauxlib.luaL_loadbuffer(L, buf, null, to_luastring('@' + name)) !== lua.LUA_OK) {
    throw new Error('load ' + name + ': ' + lua.lua_tojsstring(L, -1));
  }
  // push args: ADDON_NAME, FDJ
  for (const a of args) {
    if (a === 'FDJ') lua.lua_getglobal(L, to_luastring('__FDJ'));
    else lua.lua_pushstring(L, to_luastring(a));
  }
  if (lua.lua_pcall(L, args.length, 1, 0) !== lua.LUA_OK) {
    const msg = lua.lua_tojsstring(L, -1);
    lua.lua_pop(L, 1);
    console.error('WARN ' + name + ': ' + msg);
    return null;
  }
  const r = lua.lua_isstring(L, -1) ? lua.lua_tojsstring(L, -1) : null;
  lua.lua_pop(L, 1);
  return r;
}

// WoW API stubs: any unknown global is a callable no-op object.
run(`
local stub
stub = setmetatable({}, {
  __index = function() return stub end,
  __call = function() return stub end,
  __newindex = function() end,
  __concat = function() return "" end,
})
setmetatable(_G, { __index = function(_, k) return stub end })
GetLocale = function() return "enUS" end
__FDJ = { Constants = { ALBA_FAIRMOON_LOCATION = "Alba Fairmoon, Sentinel Hill inn, Westfall" } }
ForeverDungeonJournal_NS = __FDJ
ForeverDungeonJournalDB = {}
`, 'stubs');

const files = [
  'Data/Dungeons.lua', 'Data/SharedLoot.lua', 'Data/DungeonEntrances.lua', 'Data/DungeonRoutes.lua',
  'Data/Bosses.lua', 'Data/QuestMaps.lua', 'Data/QuestChains.lua', 'Data/QuestRewards.lua',
  'Data/QuestShareability.lua', 'Data/QuestUpdates.lua',
];
for (const f of files) {
  run(fs.readFileSync(path.join(addonDir, f)), f, ['ForeverDungeonJournal', 'FDJ']);
}

const json = run(`
local seen = {}
local function esc(s)
  s = s:gsub('[%c"\\\\]', function(c)
    if c == '"' then return '\\\\"' elseif c == '\\\\' then return '\\\\\\\\'
    elseif c == '\\n' then return '\\\\n' elseif c == '\\r' then return '\\\\r' elseif c == '\\t' then return '\\\\t'
    else return string.format('\\\\u%04x', c:byte()) end
  end)
  return '"' .. s .. '"'
end
local function ser(v, depth)
  local t = type(v)
  if t == 'string' then return esc(v)
  elseif t == 'number' then
    if v ~= v or v == math.huge or v == -math.huge then return 'null' end
    if math.type and math.type(v) == 'integer' then return tostring(v) end
    return string.format('%.10g', v)
  elseif t == 'boolean' then return tostring(v)
  elseif t == 'table' then
    if seen[v] or depth > 40 then return '"<cycle>"' end
    seen[v] = true
    local n = rawlen(v)
    local count = 0
    for _ in next, v do count = count + 1 end
    local out = {}
    local maxi, allint = 0, true
    for k in next, v do
      if math.type(k) == 'integer' and k > 0 then if k > maxi then maxi = k end else allint = false end
    end
    if count == 0 then seen[v] = nil return '[]' end
    if allint and maxi <= count * 2 then n = maxi; count = n end
    if n > 0 and count == n then
      for i = 1, n do out[i] = ser(rawget(v, i), depth + 1) end
      seen[v] = nil
      return '[' .. table.concat(out, ',') .. ']'
    end
    for k, val in next, v do
      local tv = type(val)
      if tv ~= 'function' and tv ~= 'userdata' and tv ~= 'thread' then
        out[#out + 1] = esc(tostring(k)) .. ':' .. ser(val, depth + 1)
      end
    end
    seen[v] = nil
    return '{' .. table.concat(out, ',') .. '}'
  end
  return 'null'
end
local F = __FDJ
local pick = {}
for k, v in next, F do
  if type(v) == 'table' and k ~= 'Constants' then pick[k] = v end
end
return ser(pick, 0)
`, 'dump');

fs.writeFileSync(outFile, json);
const obj = JSON.parse(json);
for (const k of Object.keys(obj)) console.log(k, Array.isArray(obj[k]) ? obj[k].length : Object.keys(obj[k]).length);
