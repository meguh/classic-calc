// Builds the per-request SimDatabase from the wowsims Forever db.json.
const raw = require('../db.json');
const ITEM_KEYS = ['id', 'name', 'type', 'armorType', 'weaponType', 'handType', 'rangedWeaponType', 'qualityModifier', 'weaponSpeed', 'setName', 'setId',
  'scalingOptions', 'itemEffects', 'limitCategory', 'unique', 'pseudoStats', 'classAllowlist', 'spellSchool'];
const ENCH_KEYS = ['effectId', 'name', 'type', 'stats', 'enchantEffects', 'enchantType', 'extraTypes', 'pseudoStats', 'weaponDamage', 'procKind'];
const CONS_KEYS = ['id', 'type', 'stats', 'buffsMainStat', 'name', 'icon', 'lvl', 'categoryId', 'effectIds', 'itemEffects', 'classAllowlist', 'requiredProfession', 'reqProfRank', 'weaponSubclassMask', 'weaponInventoryTypeMask', 'temporaryEnchant', 'raceAllowlist', 'groupKey', 'groupName', 'pseudoStats', 'holiday', 'potionClasses', 'mobTypeStats', 'zoneStats'];
const items = new Map(raw.items.map(i => [i.id, i]));
const enchants = new Map(raw.enchants.map(e => [e.effectId, e]));
const consumables = new Map(raw.consumables.map(c => [c.id, c]));
const pick = (o, keys) => Object.fromEntries(keys.filter(k => o[k] !== undefined).map(k => [k, o[k]]));
function database(itemIds, enchantIds, consumableIds) {
  return {
    items: [...new Set(itemIds)].map(id => items.get(id)).filter(Boolean).map(i => pick(i, ITEM_KEYS)),
    enchants: [...new Set(enchantIds)].map(id => enchants.get(id)).filter(Boolean).map(e => pick(e, ENCH_KEYS)),
    consumables: [...new Set(consumableIds)].map(id => consumables.get(id)).filter(Boolean).map(c => pick(c, CONS_KEYS)),
    spellEffects: raw.spellEffects,
    itemEffectRandPropPoints: raw.itemEffectRandPropPoints,
    randomSuffixes: raw.randomSuffixes,
  };
}
module.exports = { database, items, raw };
