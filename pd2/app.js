/* PD2 S14 Druid planner — local-first, no build step. State lives in localStorage (key below);
   seed data comes from seed.js and is merged in only when the player asks for it. */
(function () {
  const S = window.PD2_SEED;
  const KEY = 'pd2planner.v1';
  const SCHEMA = 1;
  const SEASON_START = Date.UTC(2026, 9, 23, 17, 0); // Oct 23 2026, 10 a.m. Pacific (PDT)
  const COLLS = ['items', 'milestones', 'sources', 'mercs', 'gate', 'transition', 'areas', 'assumptions', 'materials'];

  const OWNERSHIP = [['missing', 'Missing', '○'], ['wishlist', 'Wanted', '☆'], ['owned-stash', 'In stash', '◆'], ['equipped', 'Equipped', '✔'], ['skip', 'Skipped', '–']];
  const STAGE = [['not-started', 'Not started', '○'], ['in-progress', 'In progress', '◐'], ['ready-to-test', 'Ready to test', '▶'], ['blocked', 'Blocked', '⚑'], ['complete', 'Complete', '✔']];
  const EVIDENCE = [['verified-s14', 'Verified S14', '★'], ['source-claimed', 'Source-claimed', '◇'], ['older-source', 'Older source', '⌛'], ['needs-verification', 'Needs verification', '?'], ['contradicted', 'Contradicted', '✖'], ['superseded', 'Superseded', '↷']];
  const PRIORITY = [['required', 'Required'], ['high', 'Strong upgrade'], ['nice-to-have', 'Nice to have'], ['luxury', 'Luxury'], ['experimental', 'Experimental']];
  const METHOD = ['unknown', 'find', 'trade', 'craft', 'runeword', 'corrupt', 'socket'];
  const COMPLETION = [['', '—'], ['self-farmed', 'Self-farmed'], ['traded', 'Traded'], ['carried', 'Carried'], ['not-applicable', 'N/A']];
  const FACET_STATE = [['not-evaluated', 'Not evaluated', '○'], ['in-progress', 'Working on it', '◐'], ['met', 'Met', '✔'], ['blocked', 'Blocked', '⚑'], ['na', 'Not needed', '–']];
  const SOURCE_TYPES = ['official', 'official-beta-hotfix', 'pd2-wiki', 'video-transcript', 'community-guide', 'player-test', 'speculative'];
  const TRANSITION_TAGS = [['', '—'], ['share', 'Keep / share'], ['keep-while-bossing', 'Keep while bossing'], ['sell-or-store', 'Sell / store'], ['acquire-for-transition', 'Acquire for transition'], ['compare-before-selling', 'Compare before selling']];
  const VIEWS = [['overview', 'Overview', '◈'], ['roadmap', 'Roadmap', '⇢'], ['loadouts', 'Loadouts', '⚔'], ['wishlist', 'Items & wishlist', '☰'],
    ['skills', 'Skills & stats', '✦'], ['bosses', 'Bosses', '☠'], ['gate', 'Shockwave gate', '⚡'], ['farming', 'Farming', '⌖'], ['sources', 'Sources & patches', '❏'], ['data', 'Data & notes', '⇅']];

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const today = () => new Date().toISOString().slice(0, 10);
  const nowIso = () => new Date().toISOString();
  const uid = (p) => p + '-' + Math.random().toString(36).slice(2, 8);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const label = (list, v) => (list.find((x) => x[0] === v) || [v, v])[1];
  const icon = (list, v) => (list.find((x) => x[0] === v) || [v, v, ''])[2];

  // ---------- state ----------
  function freshState() {
    const st = {
      schema: SCHEMA, seedVersion: S.SEED_VERSION, created: nowIso(),
      settings: { level: '', currentPhase: 'p0', activeBuild: 'poison-leveling', respecDone: false, respecDate: '', currency: '',
        questPoints: '', earnedOverride: '', targetFarm: '', merc: {} },
      phases: {}, deleted: {},
      items: clone(S.ITEMS), milestones: clone(S.MILESTONES), sources: clone(S.SOURCES), mercs: clone(S.MERCS),
      gate: clone(S.GATE).map((g) => Object.assign({ met: false, note: '' }, g)), transition: clone(S.TRANSITION).map((t) => Object.assign({ note: '' }, t)),
      areas: clone(S.AREAS).map((a) => Object.assign({ compat: '', danger: '', whyRun: '', notes: '', evidence: 'needs-verification' }, a)),
      assumptions: clone(S.ASSUMPTIONS).map((a) => Object.assign({ status: 'open', lastChecked: '' }, a)),
      materials: [], loadouts: clone(S.LOADOUTS), skills: {}, stats: {}, bossFacets: {},
      attempts: [], runs: [], session: null, log: [], notes: '', changelog: [{ date: today(), text: 'Planner created from seed v' + S.SEED_VERSION + ' (' + S.SEED_DATE + ').' }],
    };
    S.BOSSES.forEach((b) => {
      b.materials.forEach((m) => st.materials.push(Object.assign({ bossId: b.id }, clone(m))));
      st.bossFacets[b.id] = {}; S.FACETS.forEach(([k]) => (st.bossFacets[b.id][k] = 'not-evaluated'));
    });
    S.BUILDS.forEach((b) => {
      const p = S.BUILD_SKILLS[b.id];
      st.skills[b.id] = p ? presetRows(p) : [];
      st.stats[b.id] = {};
    });
    S.MERCS.forEach((m) => m.builds.forEach((bid) => (st.settings.merc[bid] = m.id)));
    return st;
  }
  const presetRows = (p) => S.SKILL_PRESETS[p].rows.map(([skill, points, role, note]) => ({ id: uid('sk'), skill, points, role, note, sourceId: S.SKILL_PRESETS[p].sourceId }));

  let state;
  let storageOk = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const st = JSON.parse(raw); if (validate(st).length === 0) return st; }
    } catch (e) { storageOk = false; }
    return freshState();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOk = true; } catch (e) { storageOk = false; }
  }
  function validate(st) {
    const errs = [];
    if (!st || typeof st !== 'object') return ['Not a JSON object'];
    if (st.schema !== SCHEMA) errs.push('Unknown schema version ' + st.schema);
    COLLS.forEach((c) => { if (!Array.isArray(st[c])) errs.push('Missing list: ' + c); });
    ['settings', 'loadouts', 'skills', 'stats', 'bossFacets'].forEach((k) => { if (!st[k] || typeof st[k] !== 'object') errs.push('Missing section: ' + k); });
    ['attempts', 'runs', 'log'].forEach((k) => { if (!Array.isArray(st[k])) errs.push('Missing list: ' + k); });
    return errs;
  }

  // ---------- generic path binding: "items#plague-rw.ownership", "settings.level", "stats.poison-farming.fcr"
  function resolve(path, create) {
    const segs = path.split('.');
    let o = state, ent = null;
    for (let i = 0; i < segs.length - 1; i++) {
      const [name, id] = segs[i].split('#');
      o = o[name] == null && create ? (o[name] = {}) : o[name];
      if (id != null) { o = o.find((x) => x.id === id); ent = o; }
      if (o == null) return null;
    }
    return { obj: o, key: segs[segs.length - 1], ent };
  }
  function getPath(path) { const r = resolve(path); return r ? r.obj[r.key] : undefined; }
  function setPath(path, value) {
    const r = resolve(path, true); if (!r) return;
    const old = r.obj[r.key];
    r.obj[r.key] = value;
    if (r.ent) { r.ent._e = r.ent._e || {}; r.ent._e[r.key] = true; r.ent.updated = nowIso(); }
    sideEffects(path, old, value, r.ent);
  }
  const get = (col, id) => state[col].find((x) => x.id === id);

  function sideEffects(path, old, val, ent) {
    if (/^items#.*\.ownership$/.test(path)) {
      if (isOwnedVal(val) && !isOwnedVal(old)) addLog('Acquired ' + ent.name);
      if (val !== 'equipped' && ent.equippedOn) { ent.equippedOn = ''; ent._e.equippedOn = true; }
    }
    if (/^items#.*.equippedOn$/.test(path) && val && ent.ownership !== 'equipped') {
      if (!isOwnedVal(ent.ownership)) addLog('Acquired ' + ent.name);
      ent.ownership = 'equipped'; ent._e.ownership = true;
    }
    if (/^milestones#.*\.status$/.test(path) && val === 'complete' && old !== 'complete') {
      if (!ent.completedDate) { ent.completedDate = today(); ent._e.completedDate = true; }
      addLog('Completed: ' + ent.title + (ent.completionMethod ? ' (' + label(COMPLETION, ent.completionMethod) + ')' : ''));
    }
  }
  function addLog(text) { state.log.unshift({ id: uid('log'), date: nowIso(), text }); state.log = state.log.slice(0, 200); }

  // ---------- derived logic
  const isOwnedVal = (v) => v === 'owned-stash' || v === 'equipped';
  const owned = (it) => !!it && isOwnedVal(it.ownership);
  const msDone = (m) => m.status === 'complete';
  const goalMet = (m) => msDone(m) && (!m.requiredMethod || m.completionMethod === m.requiredMethod);
  const prereqsMet = (m) => (m.prerequisiteIds || []).every((id) => { const p = get('milestones', id); return !p || msDone(p); });
  const phaseN = (id) => (S.PHASES.find((p) => p.id === id) || { n: 99 }).n;

  function phaseStatus(pid, autoOnly) {
    const manual = state.phases[pid] && state.phases[pid].status;
    if (manual && !autoOnly) return manual;
    const ms = state.milestones.filter((m) => m.phaseId === pid);
    if (!ms.length) return 'not-started';
    if (ms.every(msDone)) return 'complete';
    if (ms.some((m) => m.status === 'blocked')) return 'blocked';
    if (ms.some((m) => m.status !== 'not-started')) return 'in-progress';
    return 'not-started';
  }

  function nextActions(n = 3) {
    const cur = phaseN(state.settings.currentPhase);
    return state.milestones
      .filter((m) => !msDone(m) && prereqsMet(m) && phaseN(m.phaseId) <= cur + 1)
      .sort((a, b) => (b.status === 'blocked') - (a.status === 'blocked') || phaseN(a.phaseId) - phaseN(b.phaseId) || (a.priority || 3) - (b.priority || 3))
      .slice(0, n);
  }

  function buildItems(bid) { return state.items.filter((it) => (it.buildIds || []).includes(bid)); }
  function missingCriticalItems(bid) { return buildItems(bid).filter((it) => it.priority === 'required' && !owned(it) && it.ownership !== 'skip'); }

  function gateMet(g) { return g.itemId ? owned(get('items', g.itemId)) : !!g.met; }
  function shockwaveGate() {
    const req = state.gate.filter((g) => g.required), opt = state.gate.filter((g) => !g.required);
    const reqMet = req.filter(gateMet);
    return { req, opt, reqMet, unlocked: req.length > 0 && reqMet.length === req.length, optMet: opt.filter(gateMet) };
  }

  function bossReadiness(bossId) {
    const wins = state.attempts.filter((a) => a.bossId === bossId && a.outcome === 'success');
    if (wins.length) return { key: 'proven', text: 'Proven — ' + wins.length + ' logged kill' + (wins.length > 1 ? 's' : ''), icon: '★' };
    const f = state.bossFacets[bossId] || {};
    const vals = S.FACETS.map(([k]) => f[k] || 'not-evaluated');
    if (vals.includes('blocked')) return { key: 'blocked', text: 'Blocked', icon: '⚑' };
    const prep = S.FACETS.filter(([k]) => k !== 'test').every(([k]) => f[k] === 'met' || f[k] === 'na');
    if (prep) return { key: 'test-ready', text: 'Ready to test — not proven', icon: '▶' };
    if (vals.every((v) => v === 'not-evaluated')) return { key: 'none', text: 'Not evaluated', icon: '○' };
    return { key: 'prep', text: 'In preparation', icon: '◐' };
  }

  function skillBudget(bid) {
    const st = state.settings;
    const lvl = parseInt(st.level, 10);
    const quest = parseInt(st.questPoints, 10) || 0;
    const override = st.earnedOverride !== '' && st.earnedOverride != null ? parseInt(st.earnedOverride, 10) : NaN;
    const earned = !isNaN(override) ? override : (lvl > 0 ? lvl - 1 + quest : null);
    const spent = (state.skills[bid] || []).reduce((s, r) => s + (parseInt(r.points, 10) || 0), 0);
    return { earned, spent, over: earned != null && spent > earned, fromOverride: !isNaN(override) };
  }

  function ladderDay() {
    const d = Math.floor((Date.now() - SEASON_START) / 864e5);
    if (Date.now() < SEASON_START) { const h = Math.ceil((SEASON_START - Date.now()) / 36e5); return h > 48 ? 'Starts in ' + Math.ceil(h / 24) + ' days' : 'Starts in ' + h + ' h'; }
    return 'Ladder day ' + (d + 1);
  }

  // Where each physical item is used across loadouts/mercs (it is one item, never duplicated).
  function itemUsage(id) {
    const out = [];
    Object.entries(state.loadouts).forEach(([bid, slots]) => Object.entries(slots).forEach(([slot, s]) => {
      const i = s.items.indexOf(id); if (i >= 0) out.push({ bid, slot, main: i === 0 });
    }));
    state.mercs.forEach((m) => Object.entries(m.slots || {}).forEach(([slot, ids]) => { if ((ids || []).includes(id)) out.push({ merc: m.id, slot }); }));
    return out;
  }
  const buildName = (bid) => (S.BUILDS.find((b) => b.id === bid) || { name: bid }).name;
  const buildFamily = (bid) => (S.BUILDS.find((b) => b.id === bid) || {}).family;

  // ---------- seed merge (never overwrites a field the player edited)
  function mergeSeed() {
    const fresh = freshState();
    let added = 0, updated = 0;
    COLLS.forEach((c) => {
      fresh[c].forEach((se) => {
        if ((state.deleted[c] || []).includes(se.id)) return;
        const cur = state[c].find((x) => x.id === se.id);
        if (!cur) { state[c].push(se); added++; return; }
        Object.keys(se).forEach((k) => {
          if (k === '_e' || (cur._e && cur._e[k])) return;
          if (JSON.stringify(cur[k]) !== JSON.stringify(se[k])) { cur[k] = clone(se[k]); updated++; }
        });
      });
    });
    S.BUILDS.forEach((b) => {
      state.loadouts[b.id] = state.loadouts[b.id] || fresh.loadouts[b.id];
      S.SLOTS.forEach(([k]) => { if (!state.loadouts[b.id][k]) state.loadouts[b.id][k] = fresh.loadouts[b.id][k]; });
      if (!state.skills[b.id]) state.skills[b.id] = fresh.skills[b.id];
      if (!state.stats[b.id]) state.stats[b.id] = {};
    });
    const from = state.seedVersion;
    state.seedVersion = S.SEED_VERSION;
    state.changelog.unshift({ date: today(), text: 'Merged seed v' + S.SEED_VERSION + ' (from v' + from + '): ' + added + ' new entries, ' + updated + ' unedited fields refreshed. Your edits were kept.' });
    return { added, updated };
  }

  // ---------- UI helpers
  let view = 'overview';
  let drawer = null; // { type: 'item', id }
  let filters = { build: '', slot: '', priority: '', ownership: '', evidence: '', phase: '', q: '' };
  let srcQuery = '';

  const opts = (list, v) => list.map((o) => { const [val, txt] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(val)}"${val === v ? ' selected' : ''}>${esc(txt)}</option>`; }).join('');
  const sel = (path, list, v, cls = '') => `<select data-bind="${esc(path)}" class="${cls}" aria-label="${esc(path.split('.').pop())}">${opts(list, v)}</select>`;
  const inp = (path, v, ph = '', type = 'text', cls = '') => `<input type="${type}" data-bind="${esc(path)}" value="${esc(v)}" placeholder="${esc(ph)}" class="${cls}" aria-label="${esc(ph || path.split('.').pop())}">`;
  const area = (path, v, ph = '', rows = 2) => `<textarea data-bind="${esc(path)}" rows="${rows}" placeholder="${esc(ph)}" aria-label="${esc(ph || path.split('.').pop())}">${esc(v)}</textarea>`;
  const chk = (path, v, txt) => `<label class="chk"><input type="checkbox" data-bind="${esc(path)}"${v ? ' checked' : ''}> <span>${esc(txt)}</span></label>`;
  const badge = (list, v, prefix = '') => `<span class="badge b-${esc(v || 'none')}">${icon(list, v) ? '<span aria-hidden="true">' + icon(list, v) + '</span> ' : ''}${prefix}${esc(label(list, v))}</span>`;
  const evBadge = (v) => badge(EVIDENCE, v);
  const btn = (act, txt, extra = '', cls = '') => `<button type="button" data-act="${act}" ${extra} class="${cls}">${txt}</button>`;
  const srcLinks = (ids) => (ids || []).map((id) => { const s = get('sources', id); return s ? `<a href="#sources" data-act="nav" data-v="sources" class="srclink" title="${esc(s.claimSummary || '')}">${esc(shortSrc(s))}</a>` : ''; }).join(' ');
  const shortSrc = (s) => ({ 'pd2-s14-notes': 'S14 notes', 'pd2-beta-patch-1': 'Beta patch 1', 'video-1-poison-afk': 'Video 1', 'video-2-shockwave-s14': 'Video 2', 'video-3-poison-s12': 'Video 3', 'hiim-boss-tiers': 'Hiim tiers' }[s.id] || s.title.split(' — ')[0].slice(0, 24));
  const famClass = (bid) => (buildFamily(bid) === 'shock' ? 'fam-shock' : 'fam-poison');
  const fmtDate = (iso) => { try { return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch (e) { return iso; } };

  // ---------- render
  function render() {
    const focusBind = document.activeElement && document.activeElement.getAttribute('data-bind');
    const scrollY = window.scrollY;
    const st = state.settings;
    document.documentElement.dataset.family = buildFamily(st.activeBuild);
    document.getElementById('topbar').innerHTML = topbar();
    document.getElementById('nav').innerHTML = VIEWS.map(([k, t, ic]) => `<a href="#${k}" data-act="nav" data-v="${k}" class="${view === k ? 'active' : ''}"${view === k ? ' aria-current="page"' : ''}><span class="nav-ic" aria-hidden="true">${ic}</span>${t}</a>`).join('');
    document.getElementById('main').innerHTML = (VIEWS_R[view] || VIEWS_R.overview)();
    document.getElementById('rail').innerHTML = rail();
    document.getElementById('drawer').innerHTML = drawer ? drawerHtml() : '';
    document.getElementById('drawer').classList.toggle('open', !!drawer);
    document.getElementById('scrim').hidden = !drawer;
    if (focusBind) { const el = document.querySelector(`[data-bind="${CSS.escape(focusBind)}"]`); if (el) el.focus({ preventScroll: true }); }
    window.scrollTo(0, scrollY);
  }

  function topbar() {
    const st = state.settings;
    const cur = S.PHASES.find((p) => p.id === st.currentPhase);
    const fam = st.respecDone ? 'Shockwave' : 'Poison Creeper';
    return `<div class="tb-title"><button type="button" class="navtoggle" data-act="toggle-nav" aria-label="Menu">☰</button>
      <span class="tb-season">Season 14: Alliance</span><span class="tb-sep">|</span><span>Druid</span><span class="tb-sep">|</span>
      <span class="tb-build ${st.respecDone ? 'fam-shock' : 'fam-poison'}">${fam}${st.respecDone ? '' : ' → Shockwave'}</span><span class="tb-sep">|</span>
      <span>Stage ${cur.n}: ${esc(cur.title)}</span></div>
      <div class="tb-right"><span class="tb-day">${ladderDay()}</span>${storageOk ? '' : '<span class="badge b-blocked">⚑ Browser storage unavailable — export to keep data</span>'}</div>`;
  }

  function rail() {
    const na = nextActions(5);
    const crit = missingCriticalItems(state.settings.activeBuild).slice(0, 6);
    return `<h3>Next up</h3>${na.length ? na.map((m) => `<div class="rail-item">${badge(STAGE, m.status)}<div>${esc(m.title)}</div></div>`).join('') : '<p class="muted">No open tasks with prerequisites met.</p>'}
      <h3>Missing required (${esc(buildName(state.settings.activeBuild))})</h3>${crit.length ? crit.map((it) => `<button type="button" class="linkish rail-item" data-act="open-item" data-id="${it.id}">${badge(OWNERSHIP, it.ownership)} ${esc(it.name)}</button>`).join('') : '<p class="muted">Nothing marked required is missing.</p>'}`;
  }

  // ---- Overview
  function vOverview() {
    const st = state.settings;
    const na = nextActions(3);
    const top = na[0];
    const g = shockwaveGate();
    const t0mats = state.materials.filter((m) => m.bossId === 'diablo-clone-t0');
    return `<h1>Overview</h1>
    <section class="card hero">
      <div class="grid4">
        <label class="field">Current stage ${sel('settings.currentPhase', S.PHASES.map((p) => [p.id, p.n + ' — ' + p.title]), st.currentPhase)}</label>
        <label class="field">Level ${inp('settings.level', st.level, 'e.g. 72', 'number')}</label>
        <label class="field">Currency / budget ${inp('settings.currency', st.currency, 'free text, e.g. 3 Ist')}</label>
        <div class="field">Ladder<div class="big">${ladderDay()}</div></div>
      </div>
      <div class="profiles" role="group" aria-label="Active build profile">${S.BUILDS.map((b) => `<button type="button" data-act="build" data-v="${b.id}" class="pill ${b.family === 'shock' ? 'fam-shock' : 'fam-poison'} ${st.activeBuild === b.id ? 'on' : ''}" aria-pressed="${st.activeBuild === b.id}">${esc(b.name)}</button>`).join('')}</div>
    </section>
    <section class="card nextaction">
      <h2>Next action</h2>
      ${top ? `<div class="na-title">${esc(top.title)} ${badge(STAGE, top.status)} ${evBadge(top.evidence)}</div>
        <dl class="na"><dt>Why</dt><dd>${esc(top.why || 'No reason recorded — add one on the Roadmap.')}</dd>
        <dt>Unlocks</dt><dd>${esc(top.unlocks || unlockedBy(top.id) || '—')}</dd>
        <dt>Stage</dt><dd>${esc(S.PHASES.find((p) => p.id === top.phaseId).title)}</dd>
        <dt>Last edited</dt><dd>${top.updated ? fmtDate(top.updated) : 'Never (seed)'}</dd></dl>` : '<p class="muted">Every task with met prerequisites is complete. Move the current stage forward or add tasks on the Roadmap.</p>'}
      ${na.length > 1 ? `<h3>Then</h3><ol class="plain">${na.slice(1).map((m) => `<li>${esc(m.title)} ${badge(STAGE, m.status)}</li>`).join('')}</ol>` : ''}
    </section>
    <div class="tiles">
      ${bossTile('uber-tristram')}
      ${bossTile('diablo-clone-t0', `<div class="small">Materials: ${t0mats.map((m) => `${esc(m.name.split(' (')[0])} ${m.owned || 0}/${m.required == null ? '<span class="nv">?</span>' : m.required}`).join(' · ')}</div>`)}
      <div class="card tile fam-shock"><h3>Shockwave unlock</h3>
        <div class="big">${g.unlocked ? '<span class="badge b-complete">✔ Unlocked</span>' : `${g.reqMet.length} / ${g.req.length} required`}</div>
        <div class="small">${g.req.filter((c) => !gateMet(c)).map((c) => esc(c.label)).join(' · ') || 'All required conditions met.'}</div>
        <div class="small muted">Optional: ${g.optMet.length}/${g.opt.length}. ${st.respecDone ? 'Respec confirmed ' + esc(st.respecDate) : 'Respec not confirmed.'}</div>
        ${btn('nav', 'Open gate →', 'data-v="gate"', 'linkish')}</div>
      <div class="card tile"><h3>Self-farm goals</h3>${['m-torch', 'm-anni'].map((id) => { const m = get('milestones', id); return m ? `<div>${goalMet(m) ? '<span class="badge b-complete">✔ Self-farmed</span>' : msDone(m) ? '<span class="badge b-blocked">⚑ Done via ' + esc(label(COMPLETION, m.completionMethod) || '?') + ' — self-farm goal still open</span>' : '<span class="badge b-not-started">○ Open</span>'} ${esc(m.title.split(' — ')[0])}</div>` : ''; }).join('')}</div>
    </div>
    <section class="card"><h2>Progress log</h2>
      <form class="row" data-form="log-add"><input name="text" placeholder='e.g. "Found Spirit Ward"' aria-label="Log entry"><button type="submit">Add</button></form>
      ${state.log.length ? `<ul class="log">${state.log.slice(0, 8).map((l) => `<li><span class="muted">${fmtDate(l.date)}</span> ${esc(l.text)}</li>`).join('')}</ul>` : '<p class="muted">No progress logged yet.</p>'}
    </section>`;
  }
  function unlockedBy(id) { return state.milestones.filter((m) => (m.prerequisiteIds || []).includes(id)).map((m) => m.title).join('; '); }
  function bossTile(bid, extra = '') {
    const b = S.BOSSES.find((x) => x.id === bid), r = bossReadiness(bid);
    return `<div class="card tile"><h3>${esc(b.name)}</h3><div class="big"><span class="badge b-r-${r.key}"><span aria-hidden="true">${r.icon}</span> ${esc(r.text)}</span></div>
      ${r.key !== 'proven' ? '<div class="small warn">Poison Creeper single-target was heavily nerfed Oct 21 — needs S14 boss demonstration.</div>' : ''}${extra}
      ${btn('nav', 'Readiness & journal →', 'data-v="bosses"', 'linkish')}</div>`;
  }

  // ---- Roadmap
  function vRoadmap() {
    const cur = state.settings.currentPhase;
    return `<h1>Roadmap</h1><p class="muted">Order is a recommendation. Statuses, methods, dates and tasks are all yours to edit. "Self-farmed" goals only count when completed via self-farmed.</p>
    <ol class="timeline">${S.PHASES.map((p) => {
      const ms = state.milestones.filter((m) => m.phaseId === p.id);
      const ps = phaseStatus(p.id);
      const done = ms.filter(msDone).length;
      const fam = p.n >= 6 ? 'fam-shock' : 'fam-poison';
      return `<li class="phase ${fam} ${p.id === cur ? 'current' : ''}"><details ${p.id === cur ? 'open' : ''}>
        <summary><span class="ph-n">${p.n}</span><span class="ph-t">${esc(p.title)}</span>${badge(STAGE, ps)}<span class="muted small">${done}/${ms.length}</span></summary>
        <div class="ph-body"><div class="ph-meta"><span><b>Character:</b> ${esc(p.state)}</span><span><b>Focus:</b> ${esc(p.focus)}</span><span><b>Exit:</b> ${esc(p.exit)}</span>
          <label class="inline">Stage status ${sel('phases.' + p.id + '.status', [['', 'Auto (' + label(STAGE, phaseStatus(p.id, true)) + ')']].concat(STAGE.map((s) => [s[0], s[1]])), (state.phases[p.id] || {}).status || '')}</label></div>
        ${ms.map(msRow).join('')}
        <form class="row" data-form="ms-add" data-phase="${p.id}"><input name="title" placeholder="Add a task to this stage" aria-label="New task"><button type="submit">Add task</button></form></div>
      </details></li>`;
    }).join('')}</ol>`;
  }
  function msRow(m) {
    const P = 'milestones#' + m.id + '.';
    const pre = (m.prerequisiteIds || []).map((id) => { const p = get('milestones', id); return p ? `<span class="dep ${msDone(p) ? 'ok' : ''}">${msDone(p) ? '✔' : '⧗'} ${esc(p.title)}</span>` : ''; }).join('');
    const goalNote = m.requiredMethod && msDone(m) && !goalMet(m) ? '<span class="badge b-blocked">⚑ Completed, but not self-farmed — goal still open</span>' : '';
    return `<div class="ms ${msDone(m) ? 'done' : ''} ${!prereqsMet(m) ? 'locked' : ''}">
      <div class="ms-head"><span class="ms-title">${esc(m.title)}</span> ${evBadge(m.evidence)} ${m.requiresPlayerTest ? '<span class="badge b-test">▶ Needs your test</span>' : ''} ${goalNote}</div>
      ${pre ? `<div class="deps">Requires: ${pre}</div>` : ''}
      <div class="ms-grid">${sel(P + 'status', STAGE.map((s) => [s[0], s[1]]), m.status)}
        ${sel(P + 'completionMethod', COMPLETION, m.completionMethod)}
        ${inp(P + 'completedDate', m.completedDate, 'Date', 'date')}
        ${inp(P + 'level', m.level, 'Lvl', 'number', 'narrow')}
        ${sel(P + 'priority', [[1, 'P1'], [2, 'P2'], [3, 'P3'], [4, 'P4'], [5, 'P5']].map(([a, b]) => [String(a), b]), String(m.priority))}
        ${btn('ms-del', 'Remove', `data-id="${m.id}"`, 'danger ghost')}</div>
      <details class="ms-more"><summary>Why / notes</summary>${area(P + 'why', m.why, 'Why it matters')}${area(P + 'notes', m.notes, 'Notes')}${m.sourceIds && m.sourceIds.length ? '<div class="small">Sources: ' + srcLinks(m.sourceIds) + '</div>' : ''}</details>
    </div>`;
  }

  // ---- Loadouts
  function vLoadouts() {
    const bid = state.settings.activeBuild;
    const lo = state.loadouts[bid];
    const mercId = state.settings.merc[bid] || '';
    const merc = get('mercs', mercId);
    const crit = missingCriticalItems(bid);
    return `<h1>Loadouts</h1>
    <div class="profiles tabs" role="tablist">${S.BUILDS.map((b) => `<button type="button" role="tab" data-act="build" data-v="${b.id}" class="pill ${b.family === 'shock' ? 'fam-shock' : 'fam-poison'} ${bid === b.id ? 'on' : ''}" aria-selected="${bid === b.id}">${esc(b.name)}</button>`).join('')}</div>
    ${bid === 'poison-bossing' ? '<div class="callout warn">⚑ <b>Needs S14 boss demonstration.</b> Not a clone of the mapping setup. Oct 21 hotfix = large single-target nerf; prefer actual boss damage over tooltip numbers.</div>' : ''}
    <section class="card"><h2>Target vs owned <span class="muted small">— first item in each slot is the main pick</span></h2>
      <div class="cmp">${crit.length ? '<b>Missing required:</b> ' + crit.map((it) => `<button type="button" class="linkish" data-act="open-item" data-id="${it.id}">${esc(it.name)}</button>`).join(', ') : '<span class="badge b-complete">✔ No required items missing</span>'}</div>
      <div class="slots">${S.SLOTS.map(([k, name]) => slotCard(bid, k, name, lo[k])).join('')}</div>
      <p class="small muted">Key skill allocations live on <a href="#skills" data-act="nav" data-v="skills">Skills & stats</a>.</p>
    </section>
    <section class="card"><h2>Mercenary</h2>
      <label class="inline">Merc profile for this build ${sel('settings.merc.' + bid, [['', '— none —']].concat(state.mercs.map((m) => [m.id, m.name])), mercId)}</label>
      ${merc ? mercCard(merc) : '<p class="muted">No merc profile selected.</p>'}
    </section>`;
  }
  function slotCard(bid, k, name, s) {
    s = s || { items: [], note: '' };
    const P = `loadouts.${bid}.${k}.`;
    const candidates = state.items.filter((it) => !s.items.includes(it.id));
    return `<div class="slot"><div class="slot-h">${esc(name)}</div>
      ${s.items.length ? s.items.map((id, i) => { const it = get('items', id); if (!it) return ''; const shared = (it.buildIds || []).length > 1; return `<div class="slot-item ${i === 0 ? 'main' : 'alt'}">
        <button type="button" class="linkish item-name" data-act="open-item" data-id="${id}">${i === 0 ? '' : '<span class="muted">alt ' + i + ':</span> '}${esc(it.name)}</button>
        <div class="slot-badges">${badge(OWNERSHIP, it.ownership)}${it.equippedOn && it.equippedOn !== bid ? '<span class="badge b-warn">On ' + esc(buildName(it.equippedOn)) + '</span>' : ''}${shared ? '<span class="badge b-shared">⇄ Shared</span>' : ''}${evBadge(it.evidence)}<span class="badge b-prio">${esc(label(PRIORITY, it.priority))}</span></div>
        ${it.why ? `<div class="small">${esc(it.why)}</div>` : ''}
        <div class="slot-ctl">${i > 0 ? btn('slot-up', '↑ Make main', `data-b="${bid}" data-s="${k}" data-id="${id}"`, 'ghost') : ''}${!owned(it) ? btn('acquire', '✔ Got it', `data-id="${id}"`, 'ghost') : ''}${btn('slot-remove', 'Remove', `data-b="${bid}" data-s="${k}" data-id="${id}"`, 'ghost danger')}</div></div>`; }).join('') : '<div class="empty small">No item chosen.</div>'}
      ${inp(P + 'note', s.note, 'Stat priority / note')}
      <select data-act-change="slot-add" data-b="${bid}" data-s="${k}" aria-label="Add item to ${esc(name)}"><option value="">+ Add item…</option>${candidates.map((it) => `<option value="${it.id}">${esc(it.name)}</option>`).join('')}<option value="__new">+ New item…</option></select>
    </div>`;
  }
  function mercCard(m) {
    const P = 'mercs#' + m.id + '.';
    return `<div class="merc">${evBadge(m.evidence)} ${srcLinks(m.sourceIds)}
      <div class="grid3"><label class="field">Name ${inp(P + 'name', m.name)}</label><label class="field">Type / act ${inp(P + 'type', m.type, 'e.g. Act 2')}</label><label class="field">Aura / skill ${inp(P + 'aura', m.aura)}</label></div>
      <div class="slots">${S.MERC_SLOTS.map(([k, name, std]) => { const ids = (m.slots || {})[k] || []; return `<div class="slot"><div class="slot-h">${esc(name)} ${std ? '' : '<span class="badge b-needs-verification" title="Confirm PD2 merc can equip this slot">? PD2 slot unverified</span>'}</div>
        ${ids.map((id) => { const it = get('items', id); return it ? `<div class="slot-item main"><button type="button" class="linkish" data-act="open-item" data-id="${id}">${esc(it.name)}</button> ${badge(OWNERSHIP, it.ownership)} ${btn('merc-remove', '×', `data-m="${m.id}" data-s="${k}" data-id="${id}" aria-label="Remove"`, 'ghost danger')}</div>` : ''; }).join('') || '<div class="empty small">Empty</div>'}
        <select data-act-change="merc-add" data-m="${m.id}" data-s="${k}" aria-label="Add merc ${esc(name)}"><option value="">+ Add item…</option>${state.items.map((it) => `<option value="${it.id}">${esc(it.name)}</option>`).join('')}</select></div>`; }).join('')}</div>
      ${area(P + 'notes', m.notes, 'Merc notes')}</div>`;
  }

  // ---- Wishlist
  function vWishlist() {
    const f = filters;
    const list = state.items.filter((it) => (!f.build || (it.buildIds || []).includes(f.build)) && (!f.slot || it.slot === f.slot) && (!f.priority || it.priority === f.priority)
      && (!f.ownership || it.ownership === f.ownership) && (!f.evidence || it.evidence === f.evidence) && (!f.phase || String(it.phase) === f.phase)
      && (!f.q || (it.name + ' ' + it.alias + ' ' + it.notes + ' ' + it.why).toLowerCase().includes(f.q.toLowerCase())));
    const pOrder = PRIORITY.map((p) => p[0]);
    list.sort((a, b) => owned(a) - owned(b) || pOrder.indexOf(a.priority) - pOrder.indexOf(b.priority) || (a.phase || 9) - (b.phase || 9));
    const slots = [...new Set(state.items.map((i) => i.slot))];
    return `<h1>Items & wishlist</h1>
    <div class="filters">
      <select data-filter="build" aria-label="Build"><option value="">All builds</option>${opts(S.BUILDS.map((b) => [b.id, b.name]), f.build)}</select>
      <select data-filter="slot" aria-label="Slot"><option value="">All slots</option>${opts(slots, f.slot)}</select>
      <select data-filter="priority" aria-label="Priority"><option value="">Any priority</option>${opts(PRIORITY, f.priority)}</select>
      <select data-filter="ownership" aria-label="Ownership"><option value="">Any status</option>${opts(OWNERSHIP.map((o) => [o[0], o[1]]), f.ownership)}</select>
      <select data-filter="evidence" aria-label="Evidence"><option value="">Any confidence</option>${opts(EVIDENCE.map((o) => [o[0], o[1]]), f.evidence)}</select>
      <select data-filter="phase" aria-label="Stage"><option value="">Any stage</option>${opts(S.PHASES.map((p) => [String(p.n), p.n + ' ' + p.title]), f.phase)}</select>
      <input data-filter="q" value="${esc(f.q)}" placeholder="Search" aria-label="Search items">
      ${btn('item-new', '+ New item')}
    </div>
    <p class="small muted">${list.length} of ${state.items.length} items. Prices are whatever you enter — there is no price feed.</p>
    <div class="itemlist">${list.map((it) => `<div class="irow ${owned(it) ? 'is-owned' : ''}">
      <button type="button" class="linkish item-name" data-act="open-item" data-id="${it.id}">${esc(it.name)}</button>
      <span class="small muted">${esc(it.slot)} · ${(it.buildIds || []).map((b) => `<span class="${famClass(b)}">${esc(buildName(b).replace(/ \(.*\)/, ''))}</span>`).join(', ')}</span>
      <span class="irow-b">${badge(OWNERSHIP, it.ownership)}<span class="badge b-prio">${esc(label(PRIORITY, it.priority))}</span>${evBadge(it.evidence)}${(it.buildIds || []).length > 1 ? '<span class="badge b-shared">⇄ Shared</span>' : ''}</span>
      <span class="irow-c">${it.cost ? '<span class="small">' + esc(it.cost) + '</span>' : ''}${!owned(it) ? btn('acquire', '✔ Got it', `data-id="${it.id}"`, 'ghost') : ''}</span>
    </div>`).join('') || '<p class="muted">No items match these filters.</p>'}</div>`;
  }

  // ---- Item drawer
  function drawerHtml() {
    const it = get('items', drawer.id);
    if (!it) return '';
    const P = 'items#' + it.id + '.';
    const use = itemUsage(it.id);
    return `<div class="dr-h"><h2>${esc(it.name)}</h2>${btn('close-drawer', '✕', 'aria-label="Close"', 'ghost')}</div>
      <div class="dr-badges">${badge(OWNERSHIP, it.ownership)}${evBadge(it.evidence)}${it.alias ? '<span class="small muted">Transcript alias: ' + esc(it.alias) + '</span>' : ''}</div>
      <div class="grid2">
        <label class="field">Name ${inp(P + 'name', it.name)}</label>
        <label class="field">Status ${sel(P + 'ownership', OWNERSHIP.map((o) => [o[0], o[1]]), it.ownership)}</label>
        <label class="field">Equipped on ${sel(P + 'equippedOn', [['', '— not equipped —']].concat(S.BUILDS.map((b) => [b.id, b.name])), it.equippedOn)}</label>
        <label class="field">Priority ${sel(P + 'priority', PRIORITY, it.priority)}</label>
        <label class="field">Method ${sel(P + 'method', METHOD, it.method)}</label>
        <label class="field">Confidence ${sel(P + 'evidence', EVIDENCE.map((o) => [o[0], o[1]]), it.evidence)}</label>
        <label class="field">Slot hint ${inp(P + 'slot', it.slot)}</label>
        <label class="field">Kind / rarity ${inp(P + 'kind', it.kind)}</label>
        <label class="field">Base ${inp(P + 'base', it.base)}</label>
        <label class="field">Sockets / corruption ${inp(P + 'sockets', it.sockets)}</label>
        <label class="field">Owned qty ${inp(P + 'qty', it.qty, '0', 'number')}</label>
        <label class="field">Stage ${sel(P + 'phase', [['', '—']].concat(S.PHASES.map((p) => [p.n, p.n + ' ' + p.title])), it.phase)}</label>
        <label class="field">Cost (your estimate) ${inp(P + 'cost', it.cost, 'e.g. 2 Pul')}</label>
        <label class="field">Target date ${inp(P + 'targetDate', it.targetDate, '', 'date')}</label>
        <label class="field">Transition ${sel(P + 'transition', TRANSITION_TAGS, it.transition)}</label>
        <div class="field">${chk(P + 'gateMandatory', it.gateMandatory, 'Must-have for Shockwave')}</div>
      </div>
      <fieldset class="builds"><legend>Used by profiles</legend>${S.BUILDS.map((b) => `<label class="chk"><input type="checkbox" data-act-change="item-build" data-id="${it.id}" value="${b.id}"${(it.buildIds || []).includes(b.id) ? ' checked' : ''}> ${esc(b.name)}</label>`).join('')}</fieldset>
      <label class="field">Why it's picked ${area(P + 'why', it.why)}</label>
      <label class="field">Desired stats / range ${area(P + 'desiredStats', it.desiredStats)}</label>
      <label class="field">Acceptable substitutions ${area(P + 'alternatives', it.alternatives)}</label>
      <label class="field">Source notes ${area(P + 'notes', it.notes, '', 3)}</label>
      <label class="field">Trade notes ${area(P + 'tradeNotes', it.tradeNotes)}</label>
      <label class="field">Your notes ${area(P + 'userNotes', it.userNotes, '', 3)}</label>
      <div class="small">Sources: ${srcLinks(it.sourceIds) || '<span class="muted">none</span>'}</div>
      <div class="small">In loadouts: ${use.length ? use.map((u) => u.merc ? 'Merc (' + esc((get('mercs', u.merc) || {}).name) + ') ' + u.slot : esc(buildName(u.bid)) + ' / ' + u.slot + (u.main ? '' : ' (alt)')).join('; ') : '<span class="muted">not placed in any loadout</span>'}</div>
      <p class="small muted">One physical item: if it's equipped on one profile, the others show where it is.</p>
      ${btn('item-del', 'Delete item', `data-id="${it.id}"`, 'danger ghost')}`;
  }

  // ---- Skills & stats
  function vSkills() {
    const bid = state.settings.activeBuild;
    const rows = state.skills[bid] || [];
    const b = skillBudget(bid);
    const st = state.settings;
    return `<h1>Skills & stats</h1>
    <div class="profiles tabs">${S.BUILDS.map((x) => `<button type="button" data-act="build" data-v="${x.id}" class="pill ${x.family === 'shock' ? 'fam-shock' : 'fam-poison'} ${bid === x.id ? 'on' : ''}">${esc(x.name)}</button>`).join('')}</div>
    <section class="card"><h2>Point budget</h2>
      <div class="grid4"><label class="field">Character level ${inp('settings.level', st.level, '', 'number')}</label>
        <label class="field">Skill points from quests ${inp('settings.questPoints', st.questPoints, 'enter yours', 'number')}</label>
        <label class="field">Override earned points ${inp('settings.earnedOverride', st.earnedOverride, 'optional', 'number')}</label>
        <div class="field">Hard points<div class="big ${b.over ? 'bad' : ''}">${b.spent} / ${b.earned == null ? '?' : b.earned}</div></div></div>
      <p class="small muted">Earned = (level − 1) + quest points you enter. Standard D2 gives 12 from quests across 3 difficulties — not verified for PD2 S14, so it's not assumed. Soft points (+skills) are never counted as spent.</p>
      ${b.over ? `<div class="callout bad">⚑ <b>Over-allocated by ${b.spent - b.earned} point${b.spent - b.earned > 1 ? 's' : ''}.</b> This tree is not possible at your current level${b.fromOverride ? ' (using your override)' : ''}. Treat it as a target, or trim it.</div>` : ''}
      ${b.earned == null ? '<div class="callout">Enter your level to check this tree against your budget.</div>' : ''}
    </section>
    <section class="card"><h2>Allocation — ${esc(buildName(bid))}</h2>
      ${bid === 'poison-bossing' ? '<div class="callout warn">Boss allocation is a copy of the mapping preset as a starting point — validate in S14.</div>' : ''}
      <div class="row">Load preset: ${Object.entries(S.SKILL_PRESETS).map(([k, p]) => btn('preset-load', esc(p.name), `data-p="${k}"`, 'ghost')).join('')}</div>
      <p class="small muted">Presets come from different videos and seasons. Loading one replaces this profile's rows only; they are never merged.</p>
      <table class="tbl"><thead><tr><th>Skill</th><th>Hard pts</th><th>Role</th><th>Note</th><th></th></tr></thead><tbody>
      ${rows.map((r, i) => { const P = `skills.${bid}.${i}.`; return `<tr><td>${inp(P + 'skill', r.skill)}</td><td>${inp(P + 'points', r.points, '0', 'number', 'narrow')}</td>
        <td>${sel(P + 'role', [['core', 'Core'], ['prereq', 'Prerequisite'], ['utility', '1-pt utility'], ['leftover', 'Leftover']], r.role)}</td><td>${inp(P + 'note', r.note)}</td>
        <td>${btn('skill-del', '×', `data-i="${i}" aria-label="Remove skill"`, 'ghost danger')}</td></tr>`; }).join('') || '<tr><td colspan="5" class="muted">No skills yet — load a preset or add rows.</td></tr>'}
      </tbody></table>${btn('skill-add', '+ Add skill')}
      <p class="small">Attributes: strength for gear; ${buildFamily(bid) === 'poison' ? 'dexterity for 75% block only if you use a max-block setup (video 1);' : 'no max block in the video 2 baseline;'} rest vitality. No fixed numbers are assumed.</p>
    </section>
    <section class="card"><h2>In-game stats — ${esc(buildName(bid))}</h2>
      <p class="small muted">Copy from your character sheet / advanced stats. No breakpoint math is done here until PD2 frame data is verified. Video-reported Werebear targets: 99 FCR, 37/54 → 54/86 FHR.</p>
      <div class="statgrid">${S.STAT_FIELDS.map(([k, n]) => `<label class="field">${esc(n)} ${inp(`stats.${bid}.${k}`, (state.stats[bid] || {})[k], '', 'text')}</label>`).join('')}</div>
      <p class="small muted">Deadly Strike chance, max DS chance, and DS multiplier are separate stats. A +100% multiplier only raises damage on DS procs, not your average DPS by 2.5×.</p>
    </section>`;
  }

  // ---- Bosses
  function vBosses() {
    return `<h1>Bosses</h1>
    <div class="callout warn">⚑ <b>Oct 21 beta patch:</b> Poison Creeper got a slight AoE nerf and a <b>large single-target nerf</b>. Clearing maps well does not prove it can kill bosses. Readiness only says "Proven" once you log a successful kill.</div>
    ${S.BOSSES.map(bossCard).join('')}
    <section class="card"><h2>Attempt journal</h2>${attemptForm()}
      ${state.attempts.length ? `<div class="attempts">${state.attempts.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).map((a) => `<div class="attempt o-${a.outcome}">
        <div><b>${esc(S.BOSSES.find((b) => b.id === a.bossId).name)}</b> · ${esc(a.date)} · ${esc(buildName(a.buildId))} · <span class="badge b-o-${a.outcome}">${esc(a.outcome)}</span>${a.duration ? ' · ' + esc(a.duration) : ''}</div>
        ${['failureReason', 'damage', 'consumables', 'equipment', 'improve'].filter((k) => a[k]).map((k) => `<div class="small"><b>${{ failureReason: 'Failure reason', damage: 'Damage', consumables: 'Consumables', equipment: 'Gear', improve: 'Improve' }[k]}:</b> ${esc(a[k])}</div>`).join('')}
        ${a.url ? `<div class="small"><a href="${esc(a.url)}" target="_blank" rel="noopener">Video</a></div>` : ''}${btn('attempt-del', 'Delete', `data-id="${a.id}"`, 'ghost danger')}</div>`).join('')}</div>` : '<p class="muted">No boss attempts logged yet.</p>'}
    </section>`;
  }
  function bossCard(b) {
    const r = bossReadiness(b.id);
    const f = state.bossFacets[b.id];
    const mats = state.materials.filter((m) => m.bossId === b.id);
    const wins = state.attempts.filter((a) => a.bossId === b.id && a.outcome === 'success').sort((x, y) => (y.date || '').localeCompare(x.date || ''));
    return `<section class="card"><h2>${esc(b.name)} <span class="badge b-r-${r.key}"><span aria-hidden="true">${r.icon}</span> ${esc(r.text)}</span></h2>
      <p class="small">${esc(b.note)}</p>
      <div class="facets">${S.FACETS.map(([k, n]) => `<label class="facet"><span>${esc(n)}</span>${sel(`bossFacets.${b.id}.${k}`, FACET_STATE.map((x) => [x[0], x[1]]), f[k])}</label>`).join('')}</div>
      <h3>Materials</h3><table class="tbl"><thead><tr><th>Material</th><th>Owned</th><th>Required</th><th>Confidence</th><th>Note</th></tr></thead><tbody>
      ${mats.map((m) => { const P = 'materials#' + m.id + '.'; return `<tr><td>${esc(m.name)}</td><td>${inp(P + 'owned', m.owned, '0', 'number', 'narrow')}</td>
        <td>${inp(P + 'required', m.required == null ? '' : m.required, '?', 'number', 'narrow')}${m.required == null ? ' <span class="nv">Needs verification</span>' : ''}</td><td>${evBadge(m.evidence)}</td><td class="small">${esc(m.note)}</td></tr>`; }).join('')}
      </tbody></table>
      <form class="row" data-form="mat-add" data-boss="${b.id}"><input name="name" placeholder="Add material" aria-label="New material"><button type="submit">Add</button></form>
      <p class="small">Last success: ${wins.length ? esc(wins[0].date) + ' (' + esc(buildName(wins[0].buildId)) + ')' : '<span class="muted">none yet</span>'}</p>
    </section>`;
  }
  function attemptForm() {
    return `<form class="attemptform" data-form="attempt-add">
      <div class="grid4"><label class="field">Boss <select name="bossId">${S.BOSSES.map((b) => `<option value="${b.id}">${esc(b.name)}</option>`).join('')}</select></label>
      <label class="field">Date <input type="date" name="date" value="${today()}"></label>
      <label class="field">Profile <select name="buildId">${opts(S.BUILDS.map((b) => [b.id, b.name]), 'poison-bossing')}</select></label>
      <label class="field">Outcome <select name="outcome"><option value="failure">Failure</option><option value="partial">Partial</option><option value="success">Success</option><option value="aborted">Aborted</option></select></label></div>
      <div class="grid3"><label class="field">Duration (optional) <input name="duration" placeholder="e.g. 4:30"></label>
      <label class="field">Consumables used <input name="consumables"></label><label class="field">Video link <input name="url" type="url"></label></div>
      <div class="grid2"><label class="field">Failure reason <input name="failureReason" placeholder="e.g. fire res too low"></label><label class="field">Damage observations <input name="damage"></label>
      <label class="field">Gear notes <input name="equipment"></label><label class="field">What to improve <input name="improve"></label></div>
      <button type="submit">Log attempt</button></form>`;
  }

  // ---- Shockwave gate
  function vGate() {
    const g = shockwaveGate();
    const st = state.settings;
    const swItems = state.items.filter((it) => (it.buildIds || []).some((b) => buildFamily(b) === 'shock'));
    const cls = (it) => owned(it) ? ((it.buildIds || []).some((b) => buildFamily(b) === 'poison') ? 'Reused' : 'Already owned') : (['luxury', 'experimental', 'nice-to-have'].includes(it.priority) ? 'Optional' : 'New purchase');
    const groups = ['Already owned', 'Reused', 'New purchase', 'Optional'];
    return `<h1>Shockwave gate</h1>
    <div class="callout">Video 2 (~25:06): Shockwave is not a strong single-target boss build and can't self-farm Ubers as shown. Finish your boss goals before you respec.</div>
    <section class="card fam-shock"><h2>Status: ${g.unlocked ? '<span class="badge b-complete">✔ Unlocked</span>' : '<span class="badge b-blocked">⚑ Locked</span>'} <span class="muted small">${g.reqMet.length}/${g.req.length} required · ${g.optMet.length}/${g.opt.length} optional</span></h2>
      <div class="gate-cols"><div><h3>Required (blocks the switch)</h3>${g.req.map(gateRow).join('')}</div><div><h3>Optional (never blocks)</h3>${g.opt.map(gateRow).join('')}</div></div>
      <form class="row" data-form="gate-add"><input name="label" placeholder="Add a condition" aria-label="New condition"><label class="chk"><input type="checkbox" name="required"> Required</label><button type="submit">Add</button></form>
      <p class="small muted">Conditions tied to an item tick themselves when you mark that item owned.</p>
    </section>
    <section class="card"><h2>Scenario compare</h2><div class="grid2">
      <div><h3 class="fam-poison">Keep farming Poison Creeper</h3><p class="small">No new gear needed. Missing required items for Poison — farming: ${missingCriticalItems('poison-farming').map((i) => esc(i.name)).join(', ') || 'none'}.</p></div>
      <div><h3 class="fam-shock">Switch to Shockwave now</h3>${groups.map((gr) => { const l = swItems.filter((it) => cls(it) === gr); return `<div class="small"><b>${gr} (${l.length}):</b> ${l.map((it) => `<button type="button" class="linkish" data-act="open-item" data-id="${it.id}">${esc(it.name)}</button>${it.cost ? ' <span class="muted">' + esc(it.cost) + '</span>' : ''}`).join(', ') || '—'}</div>`; }).join('')}</div>
    </div><p class="small muted">Costs are only what you entered. No currency/hour or DPS projections.</p></section>
    <section class="card"><h2>Skill preview</h2><div class="grid2">${['poison-farming', 'shockwave-budget'].map((bid) => { const b = skillBudget(bid); return `<div><h3 class="${famClass(bid)}">${esc(buildName(bid))} <span class="small muted">${b.spent} pts${b.earned != null ? ' / ' + b.earned : ''}</span></h3><ul class="plain small">${(state.skills[bid] || []).map((r) => `<li>${esc(r.skill)} — ${esc(r.points)}</li>`).join('')}</ul></div>`; }).join('')}</div></section>
    <section class="card"><h2>Respec</h2>
      ${st.respecDone ? `<p><span class="badge b-complete">✔ Respec confirmed ${esc(st.respecDate)}</span></p>${btn('undo-respec', 'Undo confirmation', '', 'ghost')}` : `<p class="small">Confirming changes the header to Shockwave and logs it. It does <b>not</b> change any loadout or skill data.</p>${btn('confirm-respec', 'Confirm respec completed', g.unlocked ? '' : 'data-warn="1"')}`}
      <label class="field">Post-transition target farm / map tier ${inp('settings.targetFarm', st.targetFarm, 'e.g. T2 maps')}</label></section>
    <section class="card"><h2>Gear bridge</h2><table class="tbl"><thead><tr><th>Category</th><th>Poison</th><th>Shockwave</th><th>Action</th></tr></thead><tbody>
      ${state.transition.map((t) => `<tr><td>${esc(t.category)}</td><td class="small">${esc(t.poison)}</td><td class="small">${esc(t.shock)}</td><td>${inp('transition#' + t.id + '.action', t.action)}</td></tr>`).join('')}</tbody></table>
      <p class="small muted">Each item exists only once. If it's equipped on one profile, you have to move it before another profile can use it.</p></section>`;
  }
  function gateRow(c) {
    const it = c.itemId && get('items', c.itemId);
    const met = gateMet(c);
    return `<div class="gate-row ${met ? 'ok' : ''}"><span class="gate-l">${it ? `<span class="badge ${met ? 'b-complete' : 'b-not-started'}">${met ? '✔' : '○'}</span> <button type="button" class="linkish" data-act="open-item" data-id="${it.id}">${esc(c.label)}</button> <span class="small muted">(item: ${esc(label(OWNERSHIP, it.ownership))})</span>`
      : chk('gate#' + c.id + '.met', c.met, c.label)}</span>
      ${btn('gate-toggle-req', c.required ? 'Make optional' : 'Make required', `data-id="${c.id}"`, 'ghost small')}</div>`;
  }

  // ---- Farming
  function vFarming() {
    const s = state.session;
    const stats = (aid) => { const r = state.runs.filter((x) => x.areaId === aid); const t = r.filter((x) => x.minutes > 0); const v = r.filter((x) => x.value !== '' && x.value != null && !isNaN(x.value));
      return { n: r.length, avgMin: t.length ? (t.reduce((a, x) => a + +x.minutes, 0) / t.length).toFixed(1) : null, total: v.reduce((a, x) => a + +x.value, 0), hasV: v.length > 0 }; };
    return `<h1>Farming</h1>
    <section class="card"><h2>Session</h2>${s ? `<p>Session running since ${fmtDate(s.start)} · ${state.runs.filter((r) => r.sessionId === s.id).length} runs logged</p>
      <form class="grid4 runform" data-form="run-add"><label class="field">Area <select name="areaId">${state.areas.map((a) => `<option value="${a.id}">${esc(a.name)}</option>`).join('')}</select></label>
        <label class="field">Minutes <input name="minutes" type="number" step="0.1" min="0"></label><label class="field">Value (your unit) <input name="value" type="number" step="any"></label>
        <label class="field">Drops <input name="drops" placeholder="what dropped"></label><button type="submit">Log run</button></form>
      <form class="row" data-form="session-end"><input name="outcome" placeholder="Session outcome / notes" aria-label="Session outcome"><button type="submit">End session</button></form>`
      : `${btn('session-start', 'Start session')}`}
      <p class="small muted">Averages come only from runs you log. No drop rates, items/hour, or map times are made up.</p></section>
    <section class="card"><h2>Locations</h2><div class="areas">${state.areas.map((a) => { const x = stats(a.id); const P = 'areas#' + a.id + '.'; return `<details class="area"><summary><b>${esc(a.name)}</b> <span class="small muted">${esc(a.objective)}</span> <span class="small">${x.n} runs${x.avgMin ? ' · avg ' + x.avgMin + ' min' : ''}${x.hasV ? ' · total value ' + x.total : ''}</span></summary>
      <div class="grid3"><label class="field">Objective ${inp(P + 'objective', a.objective)}</label><label class="field">Build compatibility ${inp(P + 'compat', a.compat, 'e.g. Poison ok')}</label><label class="field">Danger ${inp(P + 'danger', a.danger)}</label></div>
      <label class="field">Why run it ${inp(P + 'whyRun', a.whyRun)}</label><label class="field">Notes ${area(P + 'notes', a.notes)}</label>
      ${state.runs.filter((r) => r.areaId === a.id).slice(-5).reverse().map((r) => `<div class="small">${fmtDate(r.date)} — ${r.minutes ? r.minutes + ' min' : ''} ${r.value !== '' && r.value != null ? '· ' + esc(r.value) : ''} ${esc(r.drops || '')}</div>`).join('')}</details>`; }).join('')}</div>
      <form class="row" data-form="area-add"><input name="name" placeholder="Add a location" aria-label="New location"><button type="submit">Add</button></form></section>`;
  }

  // ---- Sources
  function vSources() {
    const q = srcQuery.toLowerCase();
    const list = state.sources.filter((s) => !q || (s.title + ' ' + s.claimSummary + ' ' + s.type).toLowerCase().includes(q));
    return `<h1>Sources & patches</h1>
    <section class="card"><h2>Patch review <span class="small muted">— recheck these after every beta or final patch</span></h2>
      <table class="tbl"><thead><tr><th>Assumption</th><th>Affects</th><th>Sources</th><th>Status</th><th>Checked</th></tr></thead><tbody>
      ${state.assumptions.map((a) => `<tr><td class="small">${esc(a.text)}</td><td class="small">${esc(a.impact)}</td><td class="small">${srcLinks(a.sourceIds) || '<span class="nv">none</span>'}</td>
        <td>${sel('assumptions#' + a.id + '.status', [['open', 'Recheck'], ['confirmed', 'Confirmed at launch'], ['changed', 'Changed'], ['superseded', 'Superseded']], a.status)}</td>
        <td>${btn('assume-check', a.lastChecked ? esc(a.lastChecked) : 'Mark checked', `data-id="${a.id}"`, 'ghost small')}</td></tr>`).join('')}</tbody></table>
      <p class="small muted">Nothing here syncs live. These are notes you update by hand.</p></section>
    <section class="card"><h2>Source library</h2><input data-src-q value="${esc(srcQuery)}" placeholder="Search sources" aria-label="Search sources">
      <div class="sources">${list.map((s) => { const P = 'sources#' + s.id + '.'; return `<details class="src"><summary><b>${esc(s.title)}</b> ${evBadge(s.evidenceStatus)} <span class="badge">${esc(s.type)}</span></summary>
        <p class="small">${esc(s.claimSummary)}</p>${s.url ? `<p class="small"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a></p>` : ''}
        <div class="grid3"><label class="field">Confidence ${sel(P + 'evidenceStatus', EVIDENCE.map((e) => [e[0], e[1]]), s.evidenceStatus)}</label><label class="field">Last verified ${inp(P + 'observedDate', s.observedDate, '', 'date')}</label><label class="field">Season ${inp(P + 'season', s.season, '', 'number')}</label></div>
        <div class="grid2"><label class="field">URL ${inp(P + 'url', s.url, 'https://')}</label><label class="field">Timestamps / section ${inp(P + 'timestamp', s.timestamp)}</label></div>
        <label class="field">What it supports ${area(P + 'claimSummary', s.claimSummary, '', 3)}</label></details>`; }).join('')}</div>
      <form class="grid3" data-form="src-add"><input name="title" placeholder="New source title" aria-label="Source title"><select name="type" aria-label="Source type">${opts(SOURCE_TYPES, 'video-transcript')}</select><button type="submit">Add source</button></form></section>`;
  }

  // ---- Data
  function vData() {
    return `<h1>Data & notes</h1>
    <section class="card"><h2>Backup</h2><p class="small">Everything is stored in this browser only (no account, no sync). Export regularly, especially before clearing browser data or switching devices.</p>
      <div class="row">${btn('export', '⇩ Export JSON')}<label class="filebtn">⇧ Import JSON<input type="file" accept="application/json,.json" data-act-change="import" hidden></label></div></section>
    <section class="card"><h2>Seed data</h2><p class="small">Your data: seed v${state.seedVersion}. This app ships seed v${S.SEED_VERSION} (${S.SEED_DATE}).</p>
      ${state.seedVersion < S.SEED_VERSION ? '<div class="callout">New seed notes are available.</div>' : ''}
      ${btn('merge-seed', 'Merge new seed notes')} <span class="small muted">Adds new entries and refreshes only fields you never edited.</span></section>
    <section class="card"><h2>Notes & transcripts</h2>${area('notes', state.notes, 'Paste video transcripts, boss test notes, patch notes…', 12)}
      <p class="small muted">To add a new video: add it under Sources with a URL and timestamps, then link it from items or tasks. Conflicting claims stay side by side and are labelled. Neither one overwrites the other.</p></section>
    <section class="card"><h2>Change log</h2><ul class="log">${state.changelog.map((c) => `<li><span class="muted">${esc(c.date)}</span> ${esc(c.text)}</li>`).join('')}</ul></section>
    <section class="card danger-zone"><h2>Reset</h2>${btn('reset', 'Reset everything to seed', '', 'danger')}</section>`;
  }

  const VIEWS_R = { overview: vOverview, roadmap: vRoadmap, loadouts: vLoadouts, wishlist: vWishlist, skills: vSkills, bosses: vBosses, gate: vGate, farming: vFarming, sources: vSources, data: vData };

  // ---------- actions
  function commit() { save(); render(); }
  const ACT = {
    nav: (d) => { view = d.v; location.hash = d.v; document.body.classList.remove('nav-open'); drawer = null; render(); window.scrollTo(0, 0); },
    'toggle-nav': () => document.body.classList.toggle('nav-open'),
    build: (d) => { state.settings.activeBuild = d.v; commit(); },
    acquire: (d) => { setPath('items#' + d.id + '.ownership', 'owned-stash'); commit(); },
    'open-item': (d) => { drawer = { id: d.id }; render(); const c = document.querySelector('#drawer [data-act="close-drawer"]'); if (c) c.focus(); },
    'close-drawer': () => { drawer = null; render(); },
    'item-new': () => newItem(),
    'item-del': (d) => { const it = get('items', d.id); if (!confirm('Delete "' + it.name + '"? It is removed from every loadout.')) return; removeEntity('items', d.id);
      Object.values(state.loadouts).forEach((sl) => Object.values(sl).forEach((s) => (s.items = s.items.filter((x) => x !== d.id))));
      state.mercs.forEach((m) => Object.keys(m.slots || {}).forEach((k) => (m.slots[k] = m.slots[k].filter((x) => x !== d.id))));
      drawer = null; commit(); },
    'slot-up': (d) => { const s = state.loadouts[d.b][d.s]; s.items = [d.id].concat(s.items.filter((x) => x !== d.id)); commit(); },
    'slot-remove': (d) => { const s = state.loadouts[d.b][d.s]; s.items = s.items.filter((x) => x !== d.id); commit(); },
    'merc-remove': (d) => { const m = get('mercs', d.m); m.slots[d.s] = m.slots[d.s].filter((x) => x !== d.id); markEdited(m, 'slots'); commit(); },
    'ms-del': (d) => { const m = get('milestones', d.id); if (!confirm('Remove task "' + m.title + '"?')) return; removeEntity('milestones', d.id);
      state.milestones.forEach((x) => (x.prerequisiteIds = (x.prerequisiteIds || []).filter((p) => p !== d.id))); commit(); },
    'skill-add': () => { const bid = state.settings.activeBuild; state.skills[bid].push({ id: uid('sk'), skill: '', points: 0, role: 'utility', note: '' }); commit(); },
    'skill-del': (d) => { state.skills[state.settings.activeBuild].splice(+d.i, 1); commit(); },
    'preset-load': (d) => { const bid = state.settings.activeBuild; if ((state.skills[bid] || []).length && !confirm('Replace this profile\'s skill rows with "' + S.SKILL_PRESETS[d.p].name + '"?')) return; state.skills[bid] = presetRows(d.p); commit(); },
    'attempt-del': (d) => { if (!confirm('Delete this attempt?')) return; state.attempts = state.attempts.filter((a) => a.id !== d.id); commit(); },
    'confirm-respec': (d) => { if (d.warn && !confirm('Required Shockwave conditions are not all met. Confirm the respec anyway?')) return; state.settings.respecDone = true; state.settings.respecDate = today(); addLog('Respecced to Shockwave'); commit(); },
    'undo-respec': () => { state.settings.respecDone = false; state.settings.respecDate = ''; commit(); },
    'gate-toggle-req': (d) => { const g = get('gate', d.id); setPath('gate#' + d.id + '.required', !g.required); commit(); },
    'assume-check': (d) => { setPath('assumptions#' + d.id + '.lastChecked', today()); commit(); },
    'session-start': () => { state.session = { id: uid('ses'), start: nowIso() }; commit(); },
    export: () => exportJson(),
    'merge-seed': () => { const r = mergeSeed(); save(); alert('Merged: ' + r.added + ' new entries, ' + r.updated + ' unedited fields refreshed.'); render(); },
    reset: () => { if (!confirm('Erase ALL your progress, items, attempts and notes and start over from seed? Export first if unsure.')) return; state = freshState(); commit(); },
  };
  function markEdited(ent, k) { ent._e = ent._e || {}; ent._e[k] = true; }
  function removeEntity(col, id) { state[col] = state[col].filter((x) => x.id !== id); (state.deleted[col] = state.deleted[col] || []).push(id); }
  function newItem(slotTarget) {
    const name = prompt('Item name'); if (!name) return null;
    const bid = state.settings.activeBuild;
    const it = { id: uid('item'), name, alias: '', slot: slotTarget ? slotTarget.s : '', kind: '', base: '', sockets: '', buildIds: [bid], desiredStats: '', alternatives: '', method: 'unknown', priority: 'high',
      ownership: 'wishlist', equippedOn: '', cost: '', tradeNotes: '', targetDate: '', qty: 0, why: '', notes: '', userNotes: '', sourceIds: [], evidence: 'needs-verification', phase: '', transition: '', gateMandatory: false, _e: { custom: true } };
    state.items.push(it);
    if (slotTarget) state.loadouts[slotTarget.b][slotTarget.s].items.push(it.id);
    drawer = { id: it.id }; commit(); return it;
  }

  const CHANGE = {
    'slot-add': (el, d) => { if (!el.value) return; if (el.value === '__new') { newItem({ b: d.b, s: d.s }); return; } state.loadouts[d.b][d.s].items.push(el.value); commit(); },
    'merc-add': (el, d) => { if (!el.value) return; const m = get('mercs', d.m); m.slots = m.slots || {}; (m.slots[d.s] = m.slots[d.s] || []).push(el.value); markEdited(m, 'slots'); commit(); },
    'item-build': (el, d) => { const it = get('items', d.id); const set = new Set(it.buildIds || []); el.checked ? set.add(el.value) : set.delete(el.value); setPath('items#' + d.id + '.buildIds', S.BUILDS.map((b) => b.id).filter((b) => set.has(b))); commit(); },
    import: (el) => { const f = el.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => importJson(rd.result); rd.readAsText(f); el.value = ''; },
  };

  const FORMS = {
    'log-add': (fd) => { const t = fd.get('text').trim(); if (t) addLog(t); },
    'ms-add': (fd, form) => { const t = fd.get('title').trim(); if (!t) return; state.milestones.push({ id: uid('m'), phaseId: form.dataset.phase, title: t, why: '', unlocks: '', status: 'not-started', prerequisiteIds: [], requiresPlayerTest: false, completionMethod: '', requiredMethod: '', completedDate: '', level: '', priority: 3, evidence: 'needs-verification', sourceIds: [], notes: '', _e: { custom: true } }); },
    'mat-add': (fd, form) => { const n = fd.get('name').trim(); if (n) state.materials.push({ id: uid('mat'), bossId: form.dataset.boss, name: n, required: null, owned: 0, evidence: 'needs-verification', note: '', _e: { custom: true } }); },
    'attempt-add': (fd) => { const a = { id: uid('att') }; ['bossId', 'date', 'buildId', 'outcome', 'duration', 'consumables', 'url', 'failureReason', 'damage', 'equipment', 'improve'].forEach((k) => (a[k] = (fd.get(k) || '').trim()));
      state.attempts.push(a); addLog((a.outcome === 'success' ? 'Killed ' : 'Attempt (' + a.outcome + '): ') + S.BOSSES.find((b) => b.id === a.bossId).name + (a.failureReason ? ' — ' + a.failureReason : '')); },
    'gate-add': (fd) => { const l = fd.get('label').trim(); if (l) state.gate.push({ id: uid('g'), label: l, required: !!fd.get('required'), met: false, note: '', _e: { custom: true } }); },
    'run-add': (fd) => { state.runs.push({ id: uid('run'), sessionId: state.session && state.session.id, date: nowIso(), areaId: fd.get('areaId'), minutes: parseFloat(fd.get('minutes')) || 0, value: fd.get('value') === '' ? '' : parseFloat(fd.get('value')), drops: fd.get('drops').trim() }); },
    'session-end': (fd) => { const s = state.session; const n = state.runs.filter((r) => r.sessionId === s.id).length; addLog('Farming session: ' + n + ' runs' + (fd.get('outcome') ? ' — ' + fd.get('outcome') : '')); state.session = null; },
    'area-add': (fd) => { const n = fd.get('name').trim(); if (n) state.areas.push({ id: uid('a'), name: n, objective: '', phase: '', compat: '', danger: '', whyRun: '', notes: '', evidence: 'needs-verification', _e: { custom: true } }); },
    'src-add': (fd) => { const t = fd.get('title').trim(); if (t) state.sources.push({ id: uid('src'), title: t, type: fd.get('type'), url: '', evidenceStatus: 'needs-verification', claimSummary: '', observedDate: today(), _e: { custom: true } }); },
  };

  function exportJson() {
    const blob = new Blob([JSON.stringify(Object.assign({ exportedAt: nowIso(), app: 'pd2-s14-druid-planner' }, state), null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pd2-s14-druid-planner-' + today() + '.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function importJson(text) {
    let data; try { data = JSON.parse(text); } catch (e) { alert('Not valid JSON: ' + e.message); return false; }
    const errs = validate(data);
    if (errs.length) { alert('This file does not look like a planner export:\n- ' + errs.join('\n- ')); return false; }
    if (!confirm('Replace ALL current planner data with this file (exported ' + (data.exportedAt || 'unknown date') + ')?')) return false;
    delete data.exportedAt; delete data.app;
    state = data; addLog('Imported data from file'); commit(); return true;
  }

  // ---------- events
  function coerce(el) {
    if (el.type === 'checkbox') return el.checked;
    if (el.type === 'number') return el.value === '' ? (/\.required$/.test(el.dataset.bind) ? null : '') : Number(el.value);
    if (/\.priority$/.test(el.dataset.bind) && /^milestones/.test(el.dataset.bind)) return Number(el.value);
    if (/^items#.*\.phase$/.test(el.dataset.bind)) return el.value === '' ? '' : Number(el.value);
    return el.value;
  }
  function init() {
    state = load();
    const h = location.hash.slice(1); if (VIEWS_R[h]) view = h;
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-act]'); if (!t || t.tagName === 'SELECT' || t.tagName === 'INPUT') return;
      const fn = ACT[t.dataset.act]; if (!fn) return;
      e.preventDefault(); fn(Object.assign({}, t.dataset));
    });
    document.addEventListener('change', (e) => {
      const el = e.target;
      if (el.dataset.bind) { setPath(el.dataset.bind, coerce(el)); commit(); return; }
      if (el.dataset.actChange) { CHANGE[el.dataset.actChange](el, Object.assign({}, el.dataset)); return; }
      if (el.dataset.filter && el.tagName === 'SELECT') { filters[el.dataset.filter] = el.value; render(); }
    });
    document.addEventListener('input', (e) => {
      const el = e.target;
      const refocus = (sel) => { const s = document.querySelector(sel); if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); } };
      if (el.dataset.filter === 'q') { filters.q = el.value; render(); refocus('[data-filter="q"]'); }
      if (el.hasAttribute('data-src-q')) { srcQuery = el.value; render(); refocus('[data-src-q]'); }
    });
    document.addEventListener('submit', (e) => {
      const f = e.target; if (!f.dataset.form) return; e.preventDefault();
      FORMS[f.dataset.form](new FormData(f), f); commit();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer) { drawer = null; render(); } });
    document.getElementById('scrim').addEventListener('click', () => { drawer = null; render(); });
    window.addEventListener('hashchange', () => { const v = location.hash.slice(1); if (VIEWS_R[v] && v !== view) { view = v; render(); } });
    render();
  }

  // Exposed for the test harness and console debugging.
  window.PD2 = { get state() { return state; }, set state(s) { state = s; }, freshState, setPath, getPath, get, owned, goalMet, nextActions, missingCriticalItems,
    shockwaveGate, bossReadiness, skillBudget, mergeSeed, validate, importJson, itemUsage, render, save, KEY };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
