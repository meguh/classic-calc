/* Seed / reference data for the PD2 S14 Druid planner.
   Everything here is canonical starting data. The player's edits live in localStorage and are never
   overwritten by a newer seed: bump SEED_VERSION and use "Merge new seed notes" on the Data page.
   Evidence values: verified-s14 | source-claimed | older-source | needs-verification | contradicted | superseded */

window.PD2_SEED = (function () {
  const SEED_VERSION = 1;
  const SEED_DATE = '2026-10-21';

  const BUILDS = [
    { id: 'poison-leveling',   name: 'Poison — leveling',          family: 'poison' },
    { id: 'poison-farming',    name: 'Poison — farming',           family: 'poison' },
    { id: 'poison-bossing',    name: 'Poison — bossing (S14 experimental)', family: 'poison' },
    { id: 'shockwave-budget',  name: 'Shockwave — minimum viable', family: 'shock' },
    { id: 'shockwave-endgame', name: 'Shockwave — endgame',        family: 'shock' },
  ];

  const SLOTS = [
    ['helm', 'Helm'], ['amulet', 'Amulet'], ['weapon', 'Weapon'], ['offhand', 'Shield / off-hand'],
    ['chest', 'Chest'], ['gloves', 'Gloves'], ['belt', 'Belt'], ['boots', 'Boots'],
    ['ring1', 'Ring 1'], ['ring2', 'Ring 2'], ['swapWeapon', 'Swap weapon'], ['swapOffhand', 'Swap off-hand'],
    ['charms', 'Charms'],
  ];

  // Weapon, helm and chest are the classic merc slots. The extra slots the spec asks for are kept,
  // but flagged until PD2's merc equipment rules for them are confirmed.
  const MERC_SLOTS = [
    ['weapon', 'Weapon', true], ['helm', 'Helm', true], ['chest', 'Chest', true],
    ['gloves', 'Gloves', false], ['belt', 'Belt', false], ['boots', 'Boots', false],
  ];

  const SOURCES = [
    { id: 'pd2-s14-notes', title: 'Season 14 Alliance Open Beta Tentative Patch Notes (official Google Doc)', type: 'official',
      url: 'https://docs.google.com/document/d/1-ynVRb-5s4gTHAN86t1qQ6Yu6sdjS3F_WY09v6qoAGU/edit?tab=t.0#heading=h.9kegd15e6zbz',
      season: 14, observedDate: '2026-10-21', evidenceStatus: 'verified-s14',
      claimSummary: 'Read in full 2026-10-21. Tentative beta notes: Shockwave/Twister/Tornado keep Deadly + Critical Strike; Spirit of Barbs max DS from base points only and now grants DS to summons; Poison Creeper "now has a 2 second cooldown" (later removed by beta patch 1); new rare affixes, Cerebus\' Bite and Fenris changes, curse base values, corruption changes. Recheck against final launch notes.' },
    { id: 'pd2-beta-patch-1', title: 'Project Diablo 2 Open Beta Patch #1 (r/ProjectDiablo2, SenpaiSomething)', type: 'official-beta-hotfix',
      url: 'https://www.reddit.com/r/ProjectDiablo2/comments/1xbi0rk/project_diablo_2_open_beta_patch_1/',
      season: 14, observedDate: '2026-10-21', evidenceStatus: 'verified-s14',
      claimSummary: 'Per project brief (Reddit blocked automated re-reading): Poison Creeper 2s cooldown removed; life scaling 100% → 25%/lvl; damage scaling 16–22 4→8, 22–28 15→14, 28+ 30→20; synergies 14% → 25%/lvl; poison-res-reduction stacking bug fixed. Dev: slight AoE nerf, large single-target nerf. Act 3 merc Static Field no longer % life.' },
    { id: 'pd2-site', title: 'Project Diablo 2 — official site', type: 'official', url: 'https://www.projectdiablo2.com/',
      season: 14, evidenceStatus: 'verified-s14', claimSummary: 'Season 14: Alliance start Oct 23 2026, 10 a.m. Pacific (per brief). Open beta Oct 19–21.' },
    { id: 'pd2-wiki', title: 'PD2 Wiki', type: 'pd2-wiki', url: 'https://wiki.projectdiablo2.com/',
      evidenceStatus: 'needs-verification', claimSummary: 'Reference for item stats, merc rules, breakpoints and recipes. Check page dates — may lag S14 changes.' },
    { id: 'hiim-builds', title: 'hiimpd2.com — builds / planners', type: 'community-guide', url: 'https://hiimpd2.com/',
      evidenceStatus: 'needs-verification', claimSummary: 'Community planners and bossing info.' },
    { id: 'hiim-boss-guide', title: 'Hiim T0 boss guide', type: 'community-guide', url: 'https://hiimpd2.com/boss-guide',
      evidenceStatus: 'source-claimed', claimSummary: 'Boss strategy reference for T0 encounters.' },
    { id: 'hiim-boss-tiers', title: 'Hiim bossing tiers (season=14)', type: 'community-guide', url: 'https://hiimpd2.com/boss?season=14',
      season: 14, observedDate: '2026-10-21', evidenceStatus: 'source-claimed',
      claimSummary: 'T0 Diablo Clone baseline: 90% fire resistance, 25% PDR. Materials: Pure Demonic Essence (map bosses), Black Soulstone (Uber Tristram bosses), Prime Evil Soul (Hell Mephisto/Diablo/Baal). Reference targets, not universal minimums.' },
    { id: 'video-1-poison-afk', title: 'Video 1 — Poison Creeper AFK / retaliation mapping showcase', type: 'video-transcript',
      evidenceStatus: 'older-source', timestamp: '~0:49–2:16 gear+merc, ~2:16–3:20 skills, ~3:29–3:53 stats, ~7:50–11:08 attacking variant',
      claimSummary: 'Season unclear — do not assume S14. Mapping showcase, NOT boss evidence. Title/URL/author not yet recorded (from md base.txt).' },
    { id: 'video-2-shockwave-s14', title: 'Video 2 — Shockwave Druid S14 beta guide (budget → Deadly Strike)', type: 'video-transcript',
      season: 14, evidenceStatus: 'source-claimed', timestamp: '~0:10–1:02 crit interaction, ~2:34–4:20 skills, ~4:34–9:07 budget, ~12:09–20:16 advanced, ~25:06 bossing caveat',
      claimSummary: 'Explicit S14 beta guide. States Shockwave does not excel at single-target bossing / cannot self-farm Ubers as shown. Title/URL not yet recorded.' },
    { id: 'video-3-poison-s12', title: 'Video 3 — Poison Creeper summoner + Gust tele-stomp (S12 closed beta)', type: 'video-transcript',
      season: 12, evidenceStatus: 'older-source', timestamp: '~1:08–2:16 skills, ~2:25–7:19 items & snapshot, ~8:11–10:43 mercs, ~11:40–11:47 boss caveat',
      claimSummary: 'S12 — historical. Says bossing is weak in this configuration. Title/URL not yet recorded.' },
  ];

  const PHASES = [
    { id: 'p0', n: 0, title: 'Pre-ladder', state: 'No character', focus: 'Study S14 changes, loot filter, leveling route, wishlists', exit: 'Plan reviewed / ladder launched' },
    { id: 'p1', n: 1, title: 'Ladder start', state: 'Poison Creeper leveling', focus: 'Normal → Nightmare → Hell, skills, life/res, basic +skills, merc', exit: 'Hell progression done and basic farming works' },
    { id: 'p2', n: 2, title: 'Starter farming', state: 'Poison Creeper budget farmer', focus: 'Practical areas, basic charms, movement, starter economy', exit: 'Reliable survivability and first big upgrades' },
    { id: 'p3', n: 3, title: 'Boss-prep Poison', state: 'Separate boss loadout', focus: 'Defense, resists, poison skills/pierce, merc, consumables, testing', exit: 'Readiness passed AND damage/sustain demonstrated' },
    { id: 'p4', n: 4, title: 'Solo Uber Tristram', state: 'Poison, if verified viable', focus: 'Prerequisites; earn own Hellfire Torch; log results', exit: 'Self-run success or documented blocker + fallback' },
    { id: 'p5', n: 5, title: 'Solo T0 Diablo Clone', state: 'Poison, if verified viable', focus: 'Materials, defensive tuning, attempt T0, log', exit: 'First self-farmed Anni or documented blocker' },
    { id: 'p6', n: 6, title: 'Shockwave unlock', state: 'Poison → Shockwave respec', focus: 'Minimum viable Shockwave package; preflight', exit: 'Gear/charms/merc + respec available' },
    { id: 'p7', n: 7, title: 'Shockwave mapper', state: 'Shockwave Werebear', focus: 'FCR/FHR/DS priorities; map tier and speed', exit: 'Reliable preferred-tier farm' },
    { id: 'p8', n: 8, title: 'Endgame optimization', state: 'Shockwave upgrades', focus: 'DS multiplier, pelts, corruptions, skillers, survivability', exit: 'Ongoing' },
  ];

  // m(id, phase, title, opts)
  const M = (id, phaseId, title, o = {}) => Object.assign({ id, phaseId, title, why: '', unlocks: '', status: 'not-started',
    prerequisiteIds: [], requiresPlayerTest: false, completionMethod: '', requiredMethod: '', completedDate: '', level: '',
    priority: 3, evidence: 'source-claimed', sourceIds: [], notes: '' }, o);

  const MILESTONES = [
    M('m-review-notes', 'p0', 'Review S14 patch notes for Druid changes', { priority: 1, why: 'Barbs, Shockwave DS and Poison Creeper all changed this season.', unlocks: 'Trustworthy build assumptions', sourceIds: ['pd2-s14-notes', 'pd2-beta-patch-1'], evidence: 'verified-s14' }),
    M('m-loot-filter', 'p0', 'Loot filter ready for S14', { priority: 2, why: 'Spot +3 Summoning/Shapeshifting rare clubs & pelts and DS rare helms/gloves (new S14 affixes).', evidence: 'verified-s14', sourceIds: ['pd2-s14-notes'] }),
    M('m-level-route', 'p0', 'Choose leveling route', { priority: 3, why: 'Day-1 speed.', evidence: 'needs-verification', notes: 'No S14 Poison Creeper leveling transcript supplied yet.' }),
    M('m-wishlist', 'p0', 'Seed personal wishlist priorities', { priority: 4, why: 'Know which cheap items to grab first.' }),
    M('m-normal', 'p1', 'Clear Normal', { priority: 1, prerequisiteIds: [] }),
    M('m-merc', 'p1', 'Hire a merc and gear it', { priority: 2, why: 'Merc survival/curse support. See Loadouts → merc options.', evidence: 'source-claimed', sourceIds: ['video-3-poison-s12'] }),
    M('m-nm', 'p1', 'Clear Nightmare', { priority: 2, prerequisiteIds: ['m-normal'] }),
    M('m-hell', 'p1', 'Clear Hell (Hell Baal)', { priority: 2, prerequisiteIds: ['m-nm'], unlocks: 'Starter farming; Prime Evil Soul farming (per Hiim)' }),
    M('m-skillquests', 'p1', 'All skill-point quests done (Den/Radament/Izual each difficulty)', { priority: 3, evidence: 'needs-verification', notes: 'Standard D2 quest rewards — confirm PD2 S14 values, then fill quest points on Skills page.' }),
    M('m-res-capped', 'p1', 'Resistances capped in Hell', { priority: 2, prerequisiteIds: ['m-nm'], why: 'Survival in Hell and maps.' }),
    M('m-farm-areas', 'p2', 'Pick starter farm areas and log first sessions', { priority: 2, prerequisiteIds: ['m-hell'], why: 'Real numbers beat guesses — averages come only from your logged runs.' }),
    M('m-frw', 'p2', 'Get decent faster run/walk boots', { priority: 3, prerequisiteIds: ['m-hell'] }),
    M('m-charms', 'p2', 'Basic life/res small charms', { priority: 3, prerequisiteIds: ['m-hell'], why: 'Shared by both builds.' }),
    M('m-spirit-ward', 'p2', 'Spirit Ward (or alternative block shield)', { priority: 3, prerequisiteIds: ['m-hell'], sourceIds: ['video-1-poison-afk'], evidence: 'older-source' }),
    M('m-boss-loadout', 'p3', 'Assemble Poison — bossing loadout', { priority: 1, prerequisiteIds: ['m-hell'], why: 'Mapping setup is not boss evidence.', unlocks: 'Boss tests', evidence: 'needs-verification' }),
    M('m-boss-defense', 'p3', 'Hit defensive targets (max res, PDR, life, block)', { priority: 2, prerequisiteIds: ['m-boss-loadout'], requiresPlayerTest: false, evidence: 'needs-verification' }),
    M('m-st-test', 'p3', 'Test post-hotfix single-target damage on map/Hell bosses', { priority: 1, prerequisiteIds: ['m-boss-loadout'], requiresPlayerTest: true, why: 'Oct 21 hotfix: large single-target nerf. This is THE open question.', unlocks: 'Uber Tristram / T0 attempts', evidence: 'verified-s14', sourceIds: ['pd2-beta-patch-1'] }),
    M('m-ut-mats', 'p4', 'Collect Uber Tristram entry materials', { priority: 2, prerequisiteIds: ['m-hell'], evidence: 'needs-verification', notes: 'S14 recipe and quantities not verified — see Bosses page.' }),
    M('m-ut-attempt', 'p4', 'Attempt Uber Tristram (solo)', { priority: 1, prerequisiteIds: ['m-ut-mats', 'm-st-test'], requiresPlayerTest: true, unlocks: 'Black Soulstone (per Hiim), own Torch' }),
    M('m-torch', 'p4', 'Own Hellfire Torch — self-farmed', { priority: 1, prerequisiteIds: ['m-ut-attempt'], requiredMethod: 'self-farmed', why: 'Core season goal: no boss services.' }),
    M('m-pde', 'p5', 'Pure Demonic Essence (map bosses)', { priority: 2, prerequisiteIds: ['m-farm-areas'], evidence: 'source-claimed', sourceIds: ['hiim-boss-tiers'] }),
    M('m-bss', 'p5', 'Black Soulstone (Uber Tristram bosses)', { priority: 2, prerequisiteIds: ['m-ut-attempt'], evidence: 'source-claimed', sourceIds: ['hiim-boss-tiers'] }),
    M('m-pes', 'p5', 'Prime Evil Soul (Hell Mephisto/Diablo/Baal)', { priority: 2, prerequisiteIds: ['m-hell'], evidence: 'source-claimed', sourceIds: ['hiim-boss-tiers'] }),
    M('m-t0-defense', 'p5', 'T0 defense: 90% fire res, 25% PDR (Hiim reference)', { priority: 2, prerequisiteIds: ['m-boss-defense'], evidence: 'source-claimed', sourceIds: ['hiim-boss-tiers'] }),
    M('m-t0-attempt', 'p5', 'Attempt T0 Diablo Clone (solo)', { priority: 1, prerequisiteIds: ['m-pde', 'm-bss', 'm-pes', 'm-t0-defense'], requiresPlayerTest: true }),
    M('m-anni', 'p5', 'Own Annihilus — self-farmed', { priority: 1, prerequisiteIds: ['m-t0-attempt'], requiredMethod: 'self-farmed' }),
    M('m-sw-package', 'p6', 'Acquire minimum viable Shockwave package', { priority: 1, why: 'See Shockwave gate.', unlocks: 'Respec', sourceIds: ['video-2-shockwave-s14'] }),
    M('m-respec', 'p6', 'Respec to Shockwave (confirm on Shockwave gate)', { priority: 1, prerequisiteIds: ['m-sw-package'], why: 'Video 2: Shockwave cannot self-farm Ubers as shown — finish boss goals first.', sourceIds: ['video-2-shockwave-s14'] }),
    M('m-fcr', 'p7', 'Reach practical FCR target (video: 99)', { priority: 2, prerequisiteIds: ['m-respec'], evidence: 'needs-verification', sourceIds: ['video-2-shockwave-s14'] }),
    M('m-fhr', 'p7', 'FHR target (video: 37/54 early, 54/86 later)', { priority: 3, prerequisiteIds: ['m-respec'], evidence: 'needs-verification', sourceIds: ['video-2-shockwave-s14'] }),
    M('m-map-tier', 'p7', 'Pick and log preferred map tier', { priority: 2, prerequisiteIds: ['m-respec'] }),
    M('m-ds-package', 'p8', 'DS package: Death Cleaver + Lance Guard + Wraithskin', { priority: 3, prerequisiteIds: ['m-respec'], sourceIds: ['video-2-shockwave-s14'] }),
    M('m-skillers', 'p8', 'Shapeshifting skillers', { priority: 4, prerequisiteIds: ['m-respec'] }),
    M('m-corrupts', 'p8', 'Quality corruptions', { priority: 5, prerequisiteIds: ['m-respec'], notes: 'S14: chest corruption +20% FCR moved to tier 3; HFD corruption on boots/gloves/belt.', sourceIds: ['pd2-s14-notes'], evidence: 'verified-s14' }),
  ];

  // I(id, name, slot, builds, opts)
  const I = (id, name, slot, buildIds, o = {}) => Object.assign({ id, name, alias: '', slot, kind: '', base: '', sockets: '',
    buildIds, desiredStats: '', alternatives: '', method: 'unknown', priority: 'high', ownership: 'missing',
    equippedOn: '', cost: '', tradeNotes: '', targetDate: '', qty: 0, why: '', notes: '', userNotes: '',
    sourceIds: [], evidence: 'source-claimed', phase: '', transition: '', gateMandatory: false }, o);
  const PF = ['poison-farming'], PB = ['poison-bossing'], PFB = ['poison-farming', 'poison-bossing'];
  const SB = ['shockwave-budget'], SE = ['shockwave-endgame'], SBE = ['shockwave-budget', 'shockwave-endgame'];
  const v1 = ['video-1-poison-afk'], v2 = ['video-2-shockwave-s14'], v3 = ['video-3-poison-s12'];

  const ITEMS = [
    // ---- Poison Creeper (videos 1 & 3; NOT a boss BiS list)
    I('plague-rw', 'Plague (runeword)', 'weapon', PF, { kind: 'runeword', method: 'runeword', base: '+Poison Creeper base', why: '+Poison Creeper', sourceIds: v1, evidence: 'older-source', notes: 'Archetype A. Verify PD2 runeword bases.', phase: 2, transition: 'sell-or-store' }),
    I('heart-of-the-oak', 'Heart of the Oak (runeword)', 'weapon', PF, { kind: 'runeword', method: 'runeword', why: '+all skills, FCR', sourceIds: v3, evidence: 'older-source', notes: 'Archetype B.', phase: 2 }),
    I('pc-club', 'Rare/crafted +Poison Creeper club (+5/+6, aspirational +7)', 'weapon', PFB, { kind: 'rare/crafted', method: 'craft', why: '+Poison Creeper', sourceIds: ['video-3-poison-s12', 'pd2-s14-notes'], evidence: 'older-source', notes: 'S14: Keeper\'s (+3 Summoning, druid only) can now spawn on dropped rare clubs and pelts. Verify craft rules.', phase: 3, transition: 'keep-while-bossing' }),
    I('spirit-ward', 'Spirit Ward', 'offhand', PFB, { kind: 'unique', method: 'find', why: 'Block, resists', desiredStats: 'Useful +skills corruption', sourceIds: v1, evidence: 'older-source', phase: 2 }),
    I('prebuff-shield', 'High +skills prebuff shield', 'swapOffhand', PF, { kind: 'placeholder', why: 'Summon snapshot', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have', notes: 'Snapshot/prebuff behaviour must be verified in S14.' }),
    I('spirit-keeper', 'Spirit Keeper', 'helm', PFB, { kind: 'unique', method: 'find', why: 'Two spirits (Oak + Barbs) per video', sourceIds: v1, evidence: 'older-source', phase: 2 }),
    I('aldurs-helm', "Aldur's set helm", 'helm', PF, { kind: 'set', method: 'find', why: 'Higher +skills alternative', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have' }),
    I('pc-pelt', 'Rare +Poison Creeper pelt', 'helm', PFB, { kind: 'rare', method: 'find', why: '+Poison Creeper', sourceIds: ['video-3-poison-s12', 'pd2-s14-notes'], evidence: 'older-source', notes: 'S14: Keeper\'s +3 Summoning can spawn on rare pelts; +2 class skills on rare helms.', transition: 'keep-while-bossing' }),
    I('steel-carapace', 'Steel Carapace', 'chest', PF, { kind: 'unique', method: 'find', why: 'Defense / sustain', sourceIds: v1, evidence: 'older-source', priority: 'luxury' }),
    I('arkaines', "Arkaine's Valor", 'chest', PF, { kind: 'unique', method: 'find', why: '+skills', sourceIds: v3, evidence: 'older-source', priority: 'luxury' }),
    I('maras', "Mara's Kaleidoscope", 'amulet', PF, { kind: 'unique', alias: '"Mars"', method: 'find', why: 'All skills, all res', sourceIds: v1, evidence: 'older-source', priority: 'luxury' }),
    I('summon-amulet', 'Magic/crafted +Summoning amulet', 'amulet', PFB, { kind: 'magic/crafted', why: '+Summoning skills', sourceIds: v3, evidence: 'older-source', phase: 2 }),
    I('occultist', 'Occultist gloves', 'gloves', PF, { kind: 'unique', method: 'find', why: 'FCR', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have' }),
    I('arachnid', 'Arachnid Mesh', 'belt', PF, { kind: 'unique', method: 'find', why: '+skills, FCR', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have' }),
    I('siggards', "Siggard's Stealth (name uncertain)", 'belt', PF, { kind: 'unknown', alias: 'speech-to-text spelling uncertain', sourceIds: v1, evidence: 'needs-verification', priority: 'experimental', notes: 'Verify the recorded name and current properties.' }),
    I('soj', 'Stone of Jordan', 'ring1', PF, { kind: 'unique', why: '+skills, mana', sourceIds: v1, evidence: 'older-source', priority: 'nice-to-have' }),
    I('bk-ring', 'Bul-Kathos skill ring', 'ring2', PF, { kind: 'unique', why: '+skills', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have' }),
    I('raven-frost', 'Raven Frost', 'ring2', PF, { kind: 'unique', why: 'Cannot be frozen', sourceIds: v1, evidence: 'older-source', priority: 'nice-to-have' }),
    I('marrowwalk', 'Marrowwalk', 'boots', PF, { kind: 'unique', why: '+summoning-related stats per video', sourceIds: v3, evidence: 'older-source', priority: 'nice-to-have' }),
    I('gore-rider', 'Gore Rider', 'boots', PF, { kind: 'unique', why: 'Attacking endgame variant only', sourceIds: v1, evidence: 'older-source', priority: 'experimental' }),
    I('cta', 'Call to Arms', 'swapWeapon', ['poison-farming', 'shockwave-endgame'], { kind: 'runeword', method: 'runeword', why: 'Battle Orders prebuff', sourceIds: ['video-1-poison-afk', 'video-2-shockwave-s14'], evidence: 'source-claimed', priority: 'luxury', transition: 'share' }),
    I('lidless', 'Lidless Wall', 'swapOffhand', ['poison-farming', 'shockwave-endgame'], { kind: 'unique', alias: '"litless"', why: '+skills in swap', sourceIds: ['video-1-poison-afk', 'video-2-shockwave-s14'], evidence: 'source-claimed', priority: 'luxury', transition: 'share' }),
    I('summon-gcs', 'Summoning grand charms', 'charms', PFB, { kind: 'charm', why: '+Summoning skills', sourceIds: v3, evidence: 'older-source', transition: 'sell-or-store' }),
    I('torch', 'Hellfire Torch (self-farmed goal)', 'charms', ['poison-bossing', 'shockwave-budget', 'shockwave-endgame'], { kind: 'unique charm', method: 'find', priority: 'high', why: 'Season goal — farm it yourself from Uber Tristram', evidence: 'source-claimed', phase: 4, transition: 'share' }),
    I('anni', 'Annihilus (self-farmed goal)', 'charms', ['poison-bossing', 'shockwave-endgame'], { kind: 'unique charm', method: 'find', priority: 'high', why: 'Season goal — farm it yourself from T0 Diablo Clone', evidence: 'source-claimed', phase: 5, transition: 'share' }),
    I('life-res-scs', 'Life / resist small charms', 'charms', ['poison-farming', 'poison-bossing', 'shockwave-budget', 'shockwave-endgame'], { kind: 'charm', priority: 'required', why: 'Cap resists, life — shared', evidence: 'source-claimed', phase: 2, transition: 'share' }),

    // ---- Shockwave budget (video 2 ~4:34–9:07)
    I('memory-staff', 'Memory (4os staff: Lum Io Sol Eth)', 'weapon', SB, { kind: 'runeword', method: 'runeword', base: 'Staff, 4 sockets', why: '+skills, FCR — cheap start', sourceIds: v2, notes: 'Verify current PD2 stats.', priority: 'required', gateMandatory: true, phase: 6 }),
    I('insight-staff', 'Insight (staff)', 'weapon', SB, { kind: 'runeword', method: 'runeword', why: 'Mana alternative', sourceIds: v2, priority: 'nice-to-have' }),
    I('ss-circlet', 'Magic +3 Shapeshifting circlet', 'helm', SB, { kind: 'magic', method: 'find', why: 'Cheap +skills', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: Deadly Strike no longer spawns on circlets.', priority: 'required', gateMandatory: true, phase: 6 }),
    I('ss-amulet', 'Magic +3 Shapeshifting amulet', 'amulet', SB, { kind: 'magic', method: 'find', why: 'Cheap +skills', sourceIds: v2, priority: 'required', phase: 6 }),
    I('smoke', 'Smoke (Nef + Lum)', 'chest', SB, { kind: 'runeword', method: 'runeword', why: 'Resists / survival', sourceIds: v2, priority: 'required', phase: 6 }),
    I('fcr-belt', 'Rare/crafted FCR belt (~20 FCR)', 'belt', SBE, { kind: 'rare/crafted', why: 'Hit cast breakpoint', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: "of the Magus" 20% FCR can spawn on dropped rare belts.', priority: 'required', phase: 6, transition: 'compare-before-selling' }),
    I('ss-fcr-gloves', '+2/+3 Shapeshifting, +10/20 FCR gloves', 'gloves', SBE, { kind: 'magic/crafted/rare', why: 'Skills + FCR', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'Video: some can be shopped from Anya. S14: "of the Magus" 20% FCR on rare gloves; Devastating 10–20% DS on rare gloves.', priority: 'required', phase: 6, transition: 'compare-before-selling' }),
    I('trires-boots', 'Tri-res boots', 'boots', ['poison-farming', 'shockwave-budget', 'shockwave-endgame'], { kind: 'magic/rare', why: 'Resists', sourceIds: v2, priority: 'high', transition: 'share' }),
    I('hfd-rings', 'Crafted Half Freeze Duration rings (×2)', 'ring1', SB, { kind: 'crafted', method: 'craft', why: 'Freeze mitigation + sustain', sourceIds: v2, evidence: 'needs-verification', notes: 'Verify PD2 HFD interaction.', priority: 'high' }),
    I('tele-staff', 'Teleport-charge staff', 'swapWeapon', SB, { kind: 'magic', why: 'Mobility while unshifted', sourceIds: v2, priority: 'nice-to-have' }),
    I('fhr-scs', 'FHR / res / life charms', 'charms', SBE, { kind: 'charm', why: 'Cap res, reach FHR goal', sourceIds: v2, priority: 'high' }),
    I('witchwild', 'Witchwild String (merc)', 'merc-weapon', SBE, { kind: 'unique', alias: '"witch wild string"', why: 'Amplify Damage procs', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: Amplify base value changed, but item proc levels were adjusted to keep old values.', priority: 'high' }),
    I('merc-smoke', 'Smoke (merc armor)', 'merc-chest', SBE, { kind: 'runeword', method: 'runeword', why: 'Merc survival', sourceIds: v2, priority: 'high' }),

    // ---- Shockwave intermediate / endgame (video 2 ~12:09–20:16)
    I('cerebus', "Cerebus' Bite", 'helm', SE, { kind: 'unique', alias: '"service bite"; patch notes spell it "Cerberus Bite"', why: '+Shapeshifting, Deadly Strike chance', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'Video cites ~33% DS (unverified roll). S14: +2 Hunger, +2 Feral Rage, +120–180% bonus AR.', priority: 'high', phase: 7 }),
    I('death-cleaver', 'Death Cleaver', 'weapon', SE, { kind: 'unique', why: '+50% Deadly Strike multiplier (per video)', sourceIds: v2, notes: 'No change listed in S14 beta notes — stats still from video only.', priority: 'nice-to-have', phase: 8 }),
    I('lance-guard', 'Lance Guard', 'offhand', SE, { kind: 'unique', why: '+25% DS multiplier, DS chance (per video)', sourceIds: v2, priority: 'nice-to-have', phase: 8 }),
    I('wraithskin', 'Wraithskin', 'chest', SE, { kind: 'unique', alias: '"rave skin"', why: '+25% DS multiplier, curse res, sustain (per video)', sourceIds: v2, priority: 'nice-to-have', phase: 8 }),
    I('fenris', 'Fenris', 'helm', SE, { kind: 'unique', why: '+Druid skills, physical pierce', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: −5 to −10% enemy physical res reduced to −5 to −8%.', priority: 'luxury' }),
    I('denmother', 'Denmother', 'helm', SE, { kind: 'unique', why: 'FCR when needed', sourceIds: v2, priority: 'luxury' }),
    I('ss-pelt', 'Rare/crafted +Shockwave pelt', 'helm', SE, { kind: 'rare/crafted', why: 'Higher +Shockwave', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: Communal +3 Shapeshifting on rare pelts; Devastating 20–30% DS on rare helms; +2 class skills on rare helms.', priority: 'luxury' }),
    I('ss-fcr-amulet', '+Shapeshifting FCR amulet', 'amulet', SE, { kind: 'rare/crafted', why: 'Cast target', sourceIds: ['video-2-shockwave-s14', 'pd2-s14-notes'], notes: 'S14: "of the Magus" 20% FCR on dropped rare amulets.', priority: 'high' }),
    I('constricting', 'Constricting Ring', 'ring2', SE, { kind: 'unique', why: 'Ring variant used in video', sourceIds: v2, priority: 'nice-to-have' }),
    I('ss-skillers', 'Shapeshifting skillers (~9)', 'charms', SE, { kind: 'charm', why: '+skills; FRW/FHR as needed', sourceIds: v2, priority: 'luxury', transition: 'acquire-for-transition' }),
    I('headstriker', 'Headstriker', 'weapon', SE, { kind: 'unique', why: 'Higher max DS; less multiplier than Death Cleaver', sourceIds: v2, priority: 'experimental' }),

    // ---- Poison mercs (video 3 / video 1)
    I('demon-machine', 'Demon Machine (Act 1 merc)', 'merc-weapon', PF, { kind: 'unique', why: 'Damage/proc variant', sourceIds: ['video-3-poison-s12', 'pd2-s14-notes'], evidence: 'older-source', notes: 'S14: Demon Machine\'s on-hit Multiple Shot can no longer proc other proc effects — may weaken this setup.' }),
    I('merc-plague', 'Plague (Act 2 merc weapon)', 'merc-weapon', PF, { kind: 'runeword', method: 'runeword', why: 'Lower Resist / Poison Nova interactions', sourceIds: v3, evidence: 'older-source' }),
    I('innocence', 'Innocence (merc)', 'merc-chest', PF, { kind: 'needs verification', sourceIds: v3, evidence: 'needs-verification', notes: 'Name/item type from transcript — verify what "Innocence" is in PD2.' }),
    I('faith', 'Faith (merc bow, late attacking variant)', 'merc-weapon', ['poison-farming'], { kind: 'runeword', why: 'IAS breakpoints for attacking variant', sourceIds: v1, evidence: 'older-source', priority: 'luxury' }),
  ];

  // Loadouts: build → slot → { items: [main, ...alternatives], note }
  const L = (o) => o;
  const LOADOUTS = {
    'poison-leveling': L({
      helm: { items: [], note: 'Stat priority: +skills / life / res' }, amulet: { items: [], note: '+skills / res' },
      weapon: { items: [], note: '+Poison Creeper / +Summoning; FCR' }, offhand: { items: [], note: 'Block / res' },
      chest: { items: [], note: 'Res / life' }, gloves: { items: [], note: 'Res / FCR' }, belt: { items: [], note: 'Life / res' },
      boots: { items: [], note: 'FRW / res' }, ring1: { items: [], note: 'Res / FCR' }, ring2: { items: [], note: 'Res / FCR' },
      swapWeapon: { items: [], note: '' }, swapOffhand: { items: [], note: '' }, charms: { items: [], note: 'Life/res smalls as they drop' },
    }),
    'poison-farming': L({
      helm: { items: ['spirit-keeper', 'aldurs-helm', 'pc-pelt'], note: '' }, amulet: { items: ['summon-amulet', 'maras'], note: '' },
      weapon: { items: ['plague-rw', 'heart-of-the-oak', 'pc-club'], note: 'Different archetypes — pick one' }, offhand: { items: ['spirit-ward'], note: '' },
      chest: { items: ['steel-carapace', 'arkaines'], note: '' }, gloves: { items: ['occultist'], note: 'Video 3: FCR matters' },
      belt: { items: ['arachnid', 'siggards'], note: '' }, boots: { items: ['trires-boots', 'marrowwalk', 'gore-rider'], note: '' },
      ring1: { items: ['soj'], note: '' }, ring2: { items: ['bk-ring', 'raven-frost'], note: '' },
      swapWeapon: { items: ['cta'], note: 'CTA approach (V1) vs summon snapshot (V3) are separate' }, swapOffhand: { items: ['lidless', 'prebuff-shield'], note: '' },
      charms: { items: ['life-res-scs', 'summon-gcs'], note: '' },
    }),
    'poison-bossing': L({
      helm: { items: ['pc-pelt', 'spirit-keeper'], note: 'Needs S14 boss demonstration' }, amulet: { items: ['summon-amulet'], note: 'Res / skills' },
      weapon: { items: ['pc-club'], note: 'Actual boss damage > tooltip' }, offhand: { items: ['spirit-ward'], note: 'Max block option' },
      chest: { items: [], note: 'Max res / PDR — S14: Vanguard\'s/Immortal\'s PDR on rare chests' }, gloves: { items: [], note: 'Res / FCR' },
      belt: { items: [], note: 'Max res option (S14: +2–3% max res on belts)' }, boots: { items: ['trires-boots'], note: '' },
      ring1: { items: [], note: 'Res' }, ring2: { items: [], note: 'Res' }, swapWeapon: { items: [], note: '' }, swapOffhand: { items: [], note: '' },
      charms: { items: ['life-res-scs', 'summon-gcs', 'torch', 'anni'], note: 'Torch/Anni are goals, not day-1' },
    }),
    'shockwave-budget': L({
      helm: { items: ['ss-circlet'], note: '' }, amulet: { items: ['ss-amulet'], note: '' }, weapon: { items: ['memory-staff', 'insight-staff'], note: '' },
      offhand: { items: [], note: 'Staff is two-handed' }, chest: { items: ['smoke'], note: '' }, gloves: { items: ['ss-fcr-gloves'], note: '' },
      belt: { items: ['fcr-belt'], note: '' }, boots: { items: ['trires-boots'], note: '' }, ring1: { items: ['hfd-rings'], note: '' }, ring2: { items: ['hfd-rings'], note: '' },
      swapWeapon: { items: ['tele-staff'], note: '' }, swapOffhand: { items: [], note: '' }, charms: { items: ['life-res-scs', 'fhr-scs'], note: 'No Torch/Anni needed in the video demo' },
    }),
    'shockwave-endgame': L({
      helm: { items: ['cerebus', 'fenris', 'denmother', 'ss-pelt'], note: '' }, amulet: { items: ['ss-fcr-amulet'], note: '' },
      weapon: { items: ['death-cleaver', 'headstriker'], note: '' }, offhand: { items: ['lance-guard'], note: '' }, chest: { items: ['wraithskin'], note: '' },
      gloves: { items: ['ss-fcr-gloves'], note: '' }, belt: { items: ['fcr-belt'], note: '' }, boots: { items: ['trires-boots'], note: '' },
      ring1: { items: [], note: 'FCR as needed' }, ring2: { items: ['constricting'], note: '' },
      swapWeapon: { items: ['cta'], note: '' }, swapOffhand: { items: ['lidless'], note: '' }, charms: { items: ['ss-skillers', 'fhr-scs', 'torch', 'anni'], note: '' },
    }),
  };

  const MERCS = [
    { id: 'merc-leveling', name: 'Leveling merc (choose)', type: '', aura: '', builds: ['poison-leveling'], sourceIds: [], evidence: 'needs-verification', notes: 'S14: mercs now get full XP from your kills.', slots: {} },
    { id: 'merc-a2-plague', name: 'Act 2 defensive — Plague + Innocence', type: 'Act 2', aura: 'Needs verification', builds: ['poison-farming'], sourceIds: v3, evidence: 'older-source',
      notes: 'Video 3 ~8:11–10:43. Lower Resist / Poison Nova interactions.', slots: { weapon: ['merc-plague'], chest: ['innocence'] } },
    { id: 'merc-a1-dm', name: 'Act 1 — Demon Machine + Innocence', type: 'Act 1', aura: '', builds: [], sourceIds: v3, evidence: 'older-source',
      notes: 'Alternative damage/proc merc (video 3). S14 proc change may weaken it.', slots: { weapon: ['demon-machine'], chest: ['innocence'] } },
    { id: 'merc-faith', name: 'Late attacking variant — Faith', type: 'Needs verification', aura: '', builds: [], sourceIds: v1, evidence: 'older-source',
      notes: 'Video 1 ~2:00. Not day-1 shopping.', slots: { weapon: ['faith'] } },
    { id: 'merc-boss-tbd', name: 'Boss merc (to test)', type: '', aura: '', builds: ['poison-bossing'], sourceIds: ['pd2-beta-patch-1'], evidence: 'needs-verification',
      notes: 'Pre-S14 boss merc comparisons are suspect: Act 3 Static Field no longer does % life. Never count % life in a T0 estimate.', slots: {} },
    { id: 'merc-a1-witchwild', name: 'Act 1 — Witchwild String + Smoke', type: 'Act 1', aura: '', builds: ['shockwave-budget', 'shockwave-endgame'], sourceIds: v2, evidence: 'source-claimed',
      notes: 'Video 2 ~8:20–8:58. Shockwave merc (Amplify Damage) — not for Poison\'s Lower Resist goals.', slots: { weapon: ['witchwild'], chest: ['merc-smoke'] } },
  ];

  const SKILL_PRESETS = {
    'poison-A': { name: 'Poison A — AFK mapper (video 1)', sourceId: 'video-1-poison-afk', rows: [
      ['Poison Creeper', 20, 'core', '~2:51'], ['Carrion Vine', 20, 'core', '~2:58'], ['Solar Creeper', 20, 'core', '~2:58'],
      ['Rabies', 1, 'core', 'Named as PC synergy; ≥1 shown (~3:08) — not a complete S14 optimization'],
      ['Werewolf', 1, 'prereq', 'Rabies prerequisite per video'], ['Feral Rage', 1, 'prereq', 'Rabies prerequisite per video'],
      ['Arctic Blast', 1, 'utility', ''], ['Cyclone Armor', 1, 'utility', ''], ['Gust', 1, 'utility', 'Mobility'],
      ['Heart of Wolverine', 1, 'utility', '~3:20'], ['Spirit of Barbs', 1, 'utility', '~3:20'], ['Oak Sage', 0, 'leftover', 'Remaining points (life/survival)'],
    ] },
    'poison-B': { name: 'Poison B — S12 summoner / Gust (video 3)', sourceId: 'video-3-poison-s12', rows: [
      ['Poison Creeper', 20, 'core', ''], ['Carrion Vine', 20, 'core', ''], ['Solar Creeper', 20, 'core', ''], ['Rabies', 20, 'core', 'Prereqs as required'],
      ['Gust', 1, 'core', 'Video: skill level 30 hard+soft = S12 cooldown cap. REVERIFY S14'], ['Oak Sage', 1, 'utility', 'Then optional leftovers'],
    ] },
    'shockwave-v2': { name: 'Shockwave — video 2 core', sourceId: 'video-2-shockwave-s14', rows: [
      ['Shockwave', 20, 'core', '~2:34–4:20'], ['Werebear', 20, 'core', ''], ['Twister', 20, 'core', 'Synergy per video'],
      ['Spirit of Barbs', 20, 'core', 'S14: max DS now from base (hard) points only'], ['Hunger', 1, 'utility', 'Movement speed (~2:48)'],
      ['Carrion Vine', 1, 'utility', 'Sustain — points not specified'], ['Solar Creeper', 1, 'utility', 'Sustain — points not specified'],
      ['Gust', 1, 'utility', 'Optional travel out of bear form'], ['Lycanthropy', 0, 'leftover', 'Remaining points'],
    ] },
  };
  const BUILD_SKILLS = { 'poison-leveling': null, 'poison-farming': 'poison-A', 'poison-bossing': 'poison-A', 'shockwave-budget': 'shockwave-v2', 'shockwave-endgame': 'shockwave-v2' };

  const STAT_FIELDS = [
    ['life', 'Life'], ['mana', 'Mana'], ['fr', 'Fire res'], ['cr', 'Cold res'], ['lr', 'Light res'], ['pr', 'Poison res'],
    ['maxfr', 'Max fire res'], ['maxcr', 'Max cold res'], ['maxlr', 'Max light res'], ['maxpr', 'Max poison res'],
    ['pdr', 'PDR %'], ['block', 'Block %'], ['fcr', 'FCR'], ['fhr', 'FHR'], ['physPierce', 'Physical pierce'], ['poisonPierce', 'Poison pierce'],
    ['ds', 'Deadly Strike chance'], ['maxds', 'Max DS chance'], ['dsmult', 'DS multiplier'], ['plusSkills', 'Relevant +skills'], ['frw', 'Faster run/walk'],
  ];

  const BOSSES = [
    { id: 'uber-tristram', name: 'Uber Tristram', reward: 'Hellfire Torch', milestoneId: 'm-ut-attempt',
      note: 'Requirement categories seeded; numeric thresholds and recipe quantities left blank until verified for S14. Do not assume the D2R fight is identical.',
      materials: [
        { id: 'ut-keys', name: 'Keys (Terror / Hate / Destruction)', required: null, owned: 0, evidence: 'needs-verification', note: 'Classic D2 portal chain — PD2 S14 recipe not verified.' },
        { id: 'ut-organs', name: 'Organs (Brain / Horn / Eye)', required: null, owned: 0, evidence: 'needs-verification', note: 'Classic D2 portal chain — PD2 S14 recipe not verified.' },
      ] },
    { id: 'diablo-clone-t0', name: 'Diablo Clone (Tier 0)', reward: 'Annihilus', milestoneId: 'm-t0-attempt',
      note: 'Hiim reference baseline for T0: 90% fire resistance, 25% PDR. Reference targets, not guaranteed minimums. S14 notes: tormented soul pillars no longer targetable.',
      materials: [
        { id: 't0-pde', name: 'Pure Demonic Essence (map bosses)', required: null, owned: 0, evidence: 'source-claimed', note: 'Hiim (S14). Quantity needs verification.' },
        { id: 't0-bss', name: 'Black Soulstone (Uber Tristram bosses)', required: null, owned: 0, evidence: 'source-claimed', note: 'Hiim (S14). Requires Uber Tristram progress. Quantity needs verification.' },
        { id: 't0-pes', name: 'Prime Evil Soul (Hell Mephisto/Diablo/Baal)', required: null, owned: 0, evidence: 'source-claimed', note: 'Hiim (S14). Quantity needs verification.' },
      ] },
  ];

  const FACETS = [
    ['materials', 'Entry materials complete'],
    ['loadout', 'Poison boss loadout equipped + charms'],
    ['defense', 'Defensive targets (block, res/max res, PDR, life, CC, consumables)'],
    ['offense', 'Tested boss damage & sustain after Oct 21 hotfix'],
    ['merc', 'Merc viable (or marked unnecessary)'],
    ['test', 'Player-confirmed test run'],
  ];

  // Shockwave gate. `itemId` conditions are met automatically when that item is owned or equipped.
  const GATE = [
    { id: 'g-respec', label: 'Respec available', required: true, met: false },
    { id: 'g-fcr', label: 'Core FCR setup (video target 99 FCR — unverified frames)', required: true, met: false },
    { id: 'g-ds', label: 'A workable Deadly Strike source', required: true, met: false },
    { id: 'g-res', label: 'Enough resistances / survivability', required: true, met: false },
    { id: 'g-merc', label: 'Shockwave merc set up', required: true, met: false },
    { id: 'g-memory', label: 'Memory staff', required: true, itemId: 'memory-staff' },
    { id: 'g-circlet', label: '+3 Shapeshifting circlet', required: true, itemId: 'ss-circlet' },
    { id: 'g-fhr', label: '54+ FHR', required: false, met: false },
    { id: 'g-wraith', label: 'Wraithskin', required: false, itemId: 'wraithskin' },
    { id: 'g-cleaver', label: 'Death Cleaver', required: false, itemId: 'death-cleaver' },
    { id: 'g-lance', label: 'Lance Guard', required: false, itemId: 'lance-guard' },
    { id: 'g-skillers', label: 'Shapeshifting skillers', required: false, itemId: 'ss-skillers' },
    { id: 'g-pelt', label: 'Fenris or crafted pelt', required: false, itemId: 'fenris' },
    { id: 'g-corrupt', label: 'Quality corruption', required: false, met: false },
  ];

  const TRANSITION = [
    { id: 't1', category: 'All-res / life small charms', poison: 'Useful', shock: 'Useful', action: 'Keep / share' },
    { id: 't2', category: 'Torch and Anni', poison: 'Goal: farm personally', shock: 'Useful later', action: 'Keep / share' },
    { id: 't3', category: 'CTA / Lidless prebuff', poison: 'Some Poison variants', shock: 'Shockwave advanced', action: 'Likely share (depends on snapshot setup)' },
    { id: 't4', category: 'Generic high-resist boots', poison: 'Useful', shock: 'Useful', action: 'Share if adequate' },
    { id: 't5', category: 'Summoning skillers', poison: 'Poison primary', shock: 'Not optimal', action: 'Separate stash / potential sale' },
    { id: 't6', category: 'Shapeshifting skillers', poison: 'Not core', shock: 'Shockwave primary', action: 'Acquire for transition' },
    { id: 't7', category: 'Poison-skill club/pelt, poison facets', poison: 'Poison progression', shock: 'Not core', action: 'Keep while bossing, later sell/store' },
    { id: 't8', category: 'Spirit Ward / max-block', poison: 'Poison defense option', shock: 'DS version wants Lance Guard', action: 'Different shield roles' },
    { id: 't9', category: 'Death Cleaver, Lance Guard, Wraithskin', poison: 'Not baseline', shock: 'Signature DS package', action: 'Wishlist / advanced transition' },
    { id: 't10', category: 'Rare FCR gloves/belts', poison: 'Depends on stats', shock: 'Very useful for 99 FCR', action: 'Compare stats before selling' },
  ];

  const AREAS = [
    { id: 'a-lvl-n', name: 'Normal leveling', objective: 'Leveling', phase: 1 },
    { id: 'a-lvl-nm', name: 'Nightmare leveling', objective: 'Leveling', phase: 1 },
    { id: 'a-lvl-h', name: 'Hell leveling', objective: 'Leveling', phase: 1 },
    { id: 'a-chaos', name: 'Chaos Sanctuary', objective: 'XP / items', phase: 2 },
    { id: 'a-arcane', name: 'Arcane Sanctuary', objective: 'Items', phase: 2 },
    { id: 'a-maps-t1', name: 'Maps — Tier 1', objective: 'Items / Pure Demonic Essence from map bosses (per Hiim)', phase: 2 },
    { id: 'a-maps-t2', name: 'Maps — Tier 2', objective: 'Items / essences', phase: 3 },
    { id: 'a-maps-t3', name: 'Maps — Tier 3', objective: 'Items / essences', phase: 7 },
    { id: 'a-hell-pe', name: 'Hell Mephisto / Diablo / Baal', objective: 'Prime Evil Soul (per Hiim)', phase: 5 },
    { id: 'a-keys', name: 'Key / material sources', objective: 'Uber Tristram entry (needs verification)', phase: 4 },
  ];

  const ASSUMPTIONS = [
    { id: 'as-pc-cd', text: 'Poison Creeper 2s cooldown REMOVED (beta notes added it; beta patch 1 removed it).', sourceIds: ['pd2-beta-patch-1', 'pd2-s14-notes'], impact: 'Poison leveling & mapping' },
    { id: 'as-pc-nums', text: 'Poison Creeper: life 25%/lvl, damage scaling 8/14/20, synergies 25%/lvl.', sourceIds: ['pd2-beta-patch-1'], impact: 'Poison damage' },
    { id: 'as-pc-st', text: 'Poison Creeper large single-target nerf — Uber Tristram / T0 viability UNKNOWN until tested.', sourceIds: ['pd2-beta-patch-1'], impact: 'Stages 3–5' },
    { id: 'as-sw-ds', text: 'Shockwave, Twister and Tornado are affected by Deadly Strike and Critical Strike (other non-weapon physical spells are not).', sourceIds: ['pd2-s14-notes', 'video-2-shockwave-s14'], impact: 'Whole Shockwave plan' },
    { id: 'as-barbs-base', text: 'Spirit of Barbs grants max Deadly Strike from base (hard) points only.', sourceIds: ['pd2-s14-notes'], impact: 'Shockwave skill points' },
    { id: 'as-barbs-summons', text: 'Spirit of Barbs now grants Deadly Strike to summons; summons without weapons benefit from applicable CS/DS.', sourceIds: ['pd2-s14-notes'], impact: 'Poison summons — test' },
    { id: 'as-cerebus', text: "Cerebus' Bite: +2 Hunger, +2 Feral Rage, +120–180% AR. DS% (~33% per video) not in notes.", sourceIds: ['pd2-s14-notes', 'video-2-shockwave-s14'], impact: 'Shockwave helm' },
    { id: 'as-fenris', text: 'Fenris enemy physical res reduced to −5 to −8%.', sourceIds: ['pd2-s14-notes'], impact: 'Shockwave helm' },
    { id: 'as-affixes', text: 'New rare affixes: +3 Summoning/Shapeshifting on rare clubs & pelts; DS 20–30% rare helms, 10–20% rare gloves; 20% FCR on rare belts/gloves/amulets; +2 class skills on rare chest/helm/shield; DS no longer on circlets.', sourceIds: ['pd2-s14-notes'], impact: 'Loot filter, both builds' },
    { id: 'as-corrupt', text: 'Corruptions: chest +20% FCR (tier 3); half freeze duration on boots/gloves/belt.', sourceIds: ['pd2-s14-notes'], impact: 'Endgame' },
    { id: 'as-curses', text: 'Lower Resist/Amplify base values raised; item proc levels adjusted to keep old values.', sourceIds: ['pd2-s14-notes'], impact: 'Merc curse weapons' },
    { id: 'as-a3', text: 'Act 3 merc Static Field no longer does % life damage.', sourceIds: ['pd2-beta-patch-1'], impact: 'Boss merc choice' },
    { id: 'as-breakpoints', text: 'Werebear 99 FCR / 37–54–86 FHR targets are video-reported only.', sourceIds: ['video-2-shockwave-s14'], impact: 'Shockwave gear' },
    { id: 'as-ds-items', text: 'Death Cleaver +50%, Lance Guard +25%, Wraithskin +25% DS multiplier — video only, no S14 change listed.', sourceIds: ['video-2-shockwave-s14'], impact: 'Endgame DS package' },
    { id: 'as-t0', text: 'T0 Clone: 90% FR + 25% PDR baseline; materials PDE / Black Soulstone / Prime Evil Soul.', sourceIds: ['hiim-boss-tiers'], impact: 'Stage 5' },
    { id: 'as-ut', text: 'Uber Tristram S14 entry recipe and quantities — unknown.', sourceIds: [], impact: 'Stage 4' },
  ];

  return { SEED_VERSION, SEED_DATE, BUILDS, SLOTS, MERC_SLOTS, SOURCES, PHASES, MILESTONES, ITEMS, LOADOUTS, MERCS,
    SKILL_PRESETS, BUILD_SKILLS, STAT_FIELDS, BOSSES, FACETS, GATE, TRANSITION, AREAS, ASSUMPTIONS };
})();
