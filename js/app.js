/* ======== WordSteps — логика приложения ======== */
(function () {
  "use strict";

  /* ---------- данные ---------- */
  const LEVELS = [DATA_A1, DATA_A2, DATA_B1];
  const LV = {}, POOLS = {}, WORD_INFO = {};
  LEVELS.forEach(l => {
    LV[l.id] = l;
    POOLS[l.id] = l.lessons.flatMap(ls => ls.w.map(a => ({ w: a[0], ipa: a[1], ru: a[2] })));
    POOLS[l.id].forEach(x => { const k = x.w.toLowerCase(); if (!WORD_INFO[k]) WORD_INFO[k] = x; });
  });
  const TOTAL_LESSONS = LEVELS.reduce((n, l) => n + l.lessons.length, 0);
  const TOTAL_STORIES = LEVELS.reduce((n, l) => n + (STORIES[l.id] || []).length, 0);

  const PASS = 70;              // % для зачёта урока
  const QUIZ_N = 10;            // вопросов в каждой игре с вариантами
  const BUILD_N = 6;            // слов в игре «собери слово»
  const XP_ANSWER = 10;         // XP за правильный ответ
  const XP_STAR = 30;           // XP-бонус за каждую звезду урока

  const K_PROFILES = "ws_profiles_v1";
  const K_ACTIVE = "ws_active_v1";
  const K_PIN = "ws_teacher_pin";
  const K_TON = "ws_teacher_on";
  const K_OLD = "wordsteps_progress_v1";
  const pKey = id => "ws_p_" + id;

  /* ---------- утилиты ---------- */
  function jget(key, def) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v === null || v === undefined ? def : v; }
    catch (e) { return def; }
  }
  function jset(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function dstr(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function today() { return dstr(new Date()); }
  function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return dstr(d); }
  function stars(pct) { return pct >= 95 ? 3 : pct >= 85 ? 2 : pct >= PASS ? 1 : 0; }
  function starsStr(pct) { const s = stars(pct); return "★".repeat(s) + "☆".repeat(3 - s); }
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2600);
  }
  const app = document.getElementById("app");

  /* ---------- транскрипция русскими буквами ---------- */
  const IPA_TOKENS = [
    ["tʃ","ч",0],["dʒ","дж",0],["juː","ю:",1],["jʊ","ю",1],
    ["ɪə","иэ",1],["eɪ","эй",1],["aɪ","ай",1],["ɔɪ","ой",1],["aʊ","ау",1],["əʊ","оу",1],["eə","эа",1],["ʊə","уэ",1],
    ["iː","и:",1],["ɑː","а:",1],["ɔː","о:",1],["uː","у:",1],["ɜː","ё:",1],
    ["ŋk","нк",0],["ŋg","нг",0],
    ["ɪ","и",1],["i","и",1],["e","э",1],["æ","э",1],["ʌ","а",1],["ɒ","о",1],["ʊ","у",1],["ə","э",1],
    ["p","п",0],["b","б",0],["t","т",0],["d","д",0],["k","к",0],["g","г",0],
    ["f","ф",0],["v","в",0],["θ","с",0],["ð","з",0],["s","с",0],["z","з",0],
    ["ʃ","ш",0],["ʒ","ж",0],["h","х",0],["m","м",0],["n","н",0],["ŋ","нг",0],
    ["l","л",0],["r","р",0],["w","у",0],["j","й",0]
  ];
  function ipaToRu(ipa) {
    let out = "", stress = false, i = 0;
    while (i < ipa.length) {
      const c = ipa[i];
      if (c === "ˈ" || c === "ˌ") { stress = c === "ˈ"; i++; continue; }
      let hit = null;
      for (const t of IPA_TOKENS) { if (ipa.startsWith(t[0], i)) { hit = t; break; } }
      if (!hit) { i++; continue; }
      if (hit[2] && stress) { out += hit[1][0] + "́" + hit[1].slice(1); stress = false; }
      else out += hit[1];
      i += hit[0].length;
    }
    return out;
  }
  const normIpa = s => s.replace(/[ˈˌ]/g, "");

  /* ---------- озвучка ---------- */
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = voices.find(x => /en[-_]GB/i.test(x.lang)) ||
                voices.find(x => /en[-_]US/i.test(x.lang)) ||
                voices.find(x => /^en/i.test(x.lang));
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      u.rate = 0.85;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ---------- звуковые эффекты ---------- */
  let actx = null;
  function tone(freq, at, dur, type, gain) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(gain || 0.08, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + dur);
    o.connect(g); g.connect(actx.destination);
    o.start(at); o.stop(at + dur);
  }
  function fx(ok) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      if (ok) { tone(660, t, 0.09); tone(880, t + 0.09, 0.14); }
      else tone(200, t, 0.22, "square", 0.05);
    } catch (e) {}
  }

  /* ---------- профили учеников ---------- */
  let profiles = jget(K_PROFILES, []);
  let activeId = null;
  let P = null; // прогресс активного профиля

  function blankP() {
    return { v: 2, lessons: {}, stories: {}, unlock: {}, mist: {}, ach: [],
             stats: { xp: 0, answers: 0, correct: 0, streak: 0, lastDay: null } };
  }
  function normP(p) {
    const b = blankP();
    if (!p || typeof p !== "object") return b;
    p.lessons = p.lessons || {};
    p.stories = p.stories || {};
    p.unlock = p.unlock || {};
    p.mist = p.mist || {};
    p.ach = Array.isArray(p.ach) ? p.ach : [];
    p.stats = Object.assign(b.stats, p.stats || {});
    return p;
  }
  function loadP(id) { return normP(jget(pKey(id), null)); }
  function saveP(id, p) { jset(pKey(id), p); }
  function save() { if (activeId) saveP(activeId, P); }
  function saveProfiles() { jset(K_PROFILES, profiles); }
  function addProfile(name) {
    const id = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    profiles.push({ id, name: (name || "").trim() || "Ученик", created: today() });
    saveProfiles();
    saveP(id, blankP());
    return id;
  }
  function setActive(id) {
    activeId = id;
    try { localStorage.setItem(K_ACTIVE, id); } catch (e) {}
    P = loadP(id);
  }
  function profName(id) { const pr = profiles.find(x => x.id === id); return pr ? pr.name : "Ученик"; }

  /* ---------- доступ и зачёты ---------- */
  const teacherOn = () => { try { return localStorage.getItem(K_TON) === "1"; } catch (e) { return false; } };
  const teacherPin = () => { try { return localStorage.getItem(K_PIN) || ""; } catch (e) { return ""; } };

  function rec(p, lid, i) { return (p.lessons[lid] && p.lessons[lid][i]) || null; }
  function best(lid, i) { if (!P) return null; const r = rec(P, lid, i); return r && typeof r.best === "number" ? r.best : null; }
  function isDoneP(p, lid, i) { const r = rec(p, lid, i); return !!(r && r.best >= PASS); }
  function isDone(lid, i) { return P ? isDoneP(P, lid, i) : false; }
  function studentUnlocked(lid, i) {
    if (i === 0) return true;
    if (!P) return false;
    if (isDone(lid, i - 1)) return true;
    const u = P.unlock[lid];
    return typeof u === "number" && i <= u;
  }
  function unlocked(lid, i) { return teacherOn() || studentUnlocked(lid, i); }
  function doneCountP(p, lid) { return LV[lid].lessons.reduce((n, _, i) => n + (isDoneP(p, lid, i) ? 1 : 0), 0); }
  function doneCount(lid) { return P ? doneCountP(P, lid) : 0; }
  function doneTotalP(p) { return LEVELS.reduce((n, l) => n + doneCountP(p, l.id), 0); }
  function learnedP(p) {
    let n = 0;
    LEVELS.forEach(l => l.lessons.forEach((ls, i) => { if (isDoneP(p, l.id, i)) n += ls.w.length; }));
    return n;
  }
  function accuracyP(p) { return p.stats.answers ? Math.round(p.stats.correct / p.stats.answers * 100) : 0; }
  function curStreakP(p) {
    const s = p.stats;
    return (s.lastDay === today() || s.lastDay === yesterday()) ? (s.streak || 0) : 0;
  }
  function threeStarsP(p) {
    let n = 0;
    LEVELS.forEach(l => l.lessons.forEach((_, i) => { const r = rec(p, l.id, i); if (r && stars(r.best) === 3) n++; }));
    return n;
  }
  function hasPerfectP(p) {
    let f = false;
    LEVELS.forEach(l => l.lessons.forEach((_, i) => { const r = rec(p, l.id, i); if (r && r.best === 100) f = true; }));
    return f;
  }
  function levelDoneP(p, lid) { return doneCountP(p, lid) === LV[lid].lessons.length; }
  function storiesReadP(p) {
    let n = 0;
    LEVELS.forEach(l => (STORIES[l.id] || []).forEach((_, i) => {
      const r = p.stories && p.stories[l.id] && p.stories[l.id][i];
      if (r && r.read) n++;
    }));
    return n;
  }
  function storyRec(lid, i) { return (P && P.stories[lid] && P.stories[lid][i]) || null; }
  function studentStoryUnlocked(lid, i) {
    if (!P) return false;
    const need = STORIES[lid][i].after;
    if (doneCount(lid) >= need) return true;
    const u = P.unlock[lid];
    return typeof u === "number" && u + 1 >= need;
  }
  function unlockedStory(lid, i) { return teacherOn() || studentStoryUnlocked(lid, i); }

  /* ---------- достижения ---------- */
  const ACH = [
    { id: "first",    icon: "🚀", name: "Первый шаг",     desc: "Пройди первый урок",          chk: p => doneTotalP(p) >= 1 },
    { id: "five",     icon: "🔥", name: "В ритме",        desc: "Пройди 5 уроков",             chk: p => doneTotalP(p) >= 5 },
    { id: "ten",      icon: "💪", name: "Десятка",        desc: "Пройди 10 уроков",            chk: p => doneTotalP(p) >= 10 },
    { id: "half",     icon: "🏃", name: "Экватор",        desc: "Пройди половину всех уроков", chk: p => doneTotalP(p) >= Math.ceil(TOTAL_LESSONS / 2) },
    { id: "lvl-a1",   icon: "🎓", name: "Уровень A1",     desc: "Закрой все уроки A1",         chk: p => levelDoneP(p, "a1") },
    { id: "lvl-a2",   icon: "🎖️", name: "Уровень A2",     desc: "Закрой все уроки A2",         chk: p => levelDoneP(p, "a2") },
    { id: "lvl-b1",   icon: "🏆", name: "Уровень B1",     desc: "Закрой все уроки B1",         chk: p => levelDoneP(p, "b1") },
    { id: "perfect",  icon: "💯", name: "Перфекционист",  desc: "Пройди урок на 100%",         chk: p => hasPerfectP(p) },
    { id: "stars5",   icon: "⭐", name: "Звездочёт",      desc: "Получи ★★★ в 5 уроках",       chk: p => threeStarsP(p) >= 5 },
    { id: "words100", icon: "📚", name: "Сотня слов",     desc: "Выучи 100 слов",              chk: p => learnedP(p) >= 100 },
    { id: "words500", icon: "📖", name: "Полтысячи",      desc: "Выучи 500 слов",              chk: p => learnedP(p) >= 500 },
    { id: "streak3",  icon: "🕯️", name: "Три дня подряд", desc: "Занимайся 3 дня подряд",      chk: p => (p.stats.streak || 0) >= 3 },
    { id: "streak7",  icon: "🚒", name: "Неделя огня",    desc: "Занимайся 7 дней подряд",     chk: p => (p.stats.streak || 0) >= 7 },
    { id: "xp1000",   icon: "⚡", name: "Заряжен",        desc: "Набери 1000 XP",              chk: p => (p.stats.xp || 0) >= 1000 },
    { id: "read1",    icon: "📕", name: "Читатель",       desc: "Прочитай первую историю",     chk: p => storiesReadP(p) >= 1 },
    { id: "read5",    icon: "📗", name: "Книголюб",       desc: "Прочитай 5 историй",          chk: p => storiesReadP(p) >= 5 },
    { id: "read15",   icon: "📚", name: "Библиотека",     desc: "Прочитай все истории",        chk: p => storiesReadP(p) >= TOTAL_STORIES }
  ];
  function checkAch(p) {
    const got = [];
    ACH.forEach(a => { if (!p.ach.includes(a.id) && a.chk(p)) { p.ach.push(a.id); got.push(a); } });
    return got;
  }

  /* ---------- запись результатов ---------- */
  function recordAnswer(word, ok) {
    if (teacherOn() || !P) return;
    P.stats.answers++;
    if (ok) { P.stats.correct++; P.stats.xp += XP_ANSWER; }
    else P.mist[word] = (P.mist[word] || 0) + 1;
    save();
  }
  function recordLesson(lid, idx, pct) {
    if (teacherOn() || !P) return { bonus: 0, newAch: [] };
    P.lessons[lid] = P.lessons[lid] || {};
    const e = P.lessons[lid][idx] = P.lessons[lid][idx] ||
      { best: null, last: null, attempts: 0, history: [], passedAt: null };
    e.attempts++;
    e.last = pct;
    if (e.best === null || pct > e.best) e.best = pct;
    if (pct >= PASS && !e.passedAt) e.passedAt = today();
    e.history.push([today(), pct]);
    if (e.history.length > 20) e.history.shift();

    const s = P.stats, t = today();
    if (s.lastDay !== t) { s.streak = s.lastDay === yesterday() ? (s.streak || 0) + 1 : 1; s.lastDay = t; }
    const bonus = stars(pct) * XP_STAR;
    s.xp += bonus;
    const newAch = checkAch(P);
    save();
    return { bonus, newAch };
  }
  // Чекпоинт незаконченного урока: сохраняем этап и накопленный счёт,
  // чтобы можно было продолжить с того же места после выхода/перезагрузки.
  function lessonEntry(lid, idx) {
    P.lessons[lid] = P.lessons[lid] || {};
    return P.lessons[lid][idx] = P.lessons[lid][idx] ||
      { best: null, last: null, attempts: 0, history: [], passedAt: null };
  }
  function saveCheckpoint() {
    if (teacherOn() || !P || !cur) return;
    const e = lessonEntry(cur.level.id, cur.idx);
    e.resume = { stage: cur.stage, ok: cur.ok, total: cur.total };
    save();
  }
  function clearCheckpoint(lid, idx) {
    if (!P) return;
    const e = P.lessons[lid] && P.lessons[lid][idx];
    if (e && e.resume) { delete e.resume; save(); }
  }
  function getCheckpoint(lid, idx) {
    const e = P && P.lessons[lid] && P.lessons[lid][idx];
    return (e && e.resume && e.resume.stage >= 1 && e.resume.stage <= 4) ? e.resume : null;
  }
  function recordStory(lid, si, okCount, total) {
    if (teacherOn() || !P) return { gained: 0, newAch: [] };
    P.stories[lid] = P.stories[lid] || {};
    const e = P.stories[lid][si] = P.stories[lid][si] || { read: false, best: null, attempts: 0 };
    const pct = total ? Math.round(okCount / total * 100) : 100;
    e.read = true;
    e.attempts++;
    if (e.best === null || pct > e.best) e.best = pct;
    const s = P.stats, t = today();
    if (s.lastDay !== t) { s.streak = s.lastDay === yesterday() ? (s.streak || 0) + 1 : 1; s.lastDay = t; }
    const gained = okCount * 15;
    s.xp += gained;
    const newAch = checkAch(P);
    save();
    return { gained, newAch };
  }

  /* ---------- миграция старого прогресса ---------- */
  (function migrate() {
    if (profiles.length) return;
    const old = jget(K_OLD, null);
    if (!old) return;
    const id = addProfile("Ученик");
    const p = loadP(id);
    for (const lid in old) {
      if (!LV[lid]) continue;
      p.lessons[lid] = p.lessons[lid] || {};
      for (const i in old[lid]) {
        const pct = old[lid][i];
        if (typeof pct !== "number") continue;
        p.lessons[lid][i] = { best: pct, last: pct, attempts: 1, history: [[today(), pct]], passedAt: pct >= PASS ? today() : null };
        p.stats.answers += 36;
        p.stats.correct += Math.round(36 * pct / 100);
        p.stats.xp += Math.round(36 * pct / 100) * XP_ANSWER + stars(pct) * XP_STAR;
      }
    }
    checkAch(p);
    saveP(id, p);
    try { localStorage.removeItem(K_OLD); } catch (e) {}
  })();

  activeId = (() => { try { return localStorage.getItem(K_ACTIVE); } catch (e) { return null; } })();
  if (!profiles.find(x => x.id === activeId)) activeId = profiles.length ? profiles[0].id : null;
  if (activeId) P = loadP(activeId);

  /* ---------- экспорт / импорт кода прогресса ---------- */
  function exportCode() {
    const payload = { n: profName(activeId), d: today(), p: P };
    return "WS1." + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }
  function parseCode(str) {
    try {
      str = (str || "").trim();
      if (!str.startsWith("WS1.")) return null;
      const obj = JSON.parse(decodeURIComponent(escape(atob(str.slice(4)))));
      if (!obj || !obj.p) return null;
      obj.p = normP(obj.p);
      obj.n = obj.n || "Ученик";
      return obj;
    } catch (e) { return null; }
  }
  function showCodeModal(code) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-head"><h3>📤 Код для преподавателя</h3><button class="icon-btn" data-close>✕</button></div>
        <div style="padding:0 20px 20px">
          <p class="hint-note">Скопируй код и отправь преподавателю (WhatsApp, Telegram…). Он вставит его в своей панели и увидит твою статистику.</p>
          <textarea class="code-input" rows="5" readonly>${esc(code)}</textarea>
          <button class="btn primary" id="copyCode">📋 Скопировать</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#copyCode").addEventListener("click", () => {
      const ta = overlay.querySelector("textarea");
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      if (!ok && navigator.clipboard) navigator.clipboard.writeText(code).then(() => toast("Код скопирован 📋")).catch(() => {});
      else toast("Код скопирован 📋");
    });
    overlay.addEventListener("click", e => {
      if (e.target === overlay || e.target.hasAttribute("data-close")) overlay.remove();
    });
  }

  /* ---------- шапка ---------- */
  function topbar() {
    const box = document.getElementById("topRight");
    if (!box) return;
    let html = "";
    if (activeId && P) {
      html += `<button class="chip-btn" id="profileChip" title="Профили учеников">👤 ${esc(profName(activeId))} · 🔥${curStreakP(P)} · ⚡${P.stats.xp}</button>`;
    }
    if (teacherOn()) html += `<a class="chip-btn teach" href="#/teacher">🎓 Преподаватель</a>`;
    box.innerHTML = html;
    const pc = document.getElementById("profileChip");
    if (pc) pc.addEventListener("click", openProfilesModal);
  }

  /* ---------- роутер ---------- */
  window.addEventListener("hashchange", render);
  document.getElementById("resetBtn").addEventListener("click", e => {
    e.preventDefault();
    if (!activeId) return;
    if (confirm(`Сбросить прогресс профиля «${profName(activeId)}»?`)) {
      P = blankP();
      save();
      location.hash = "#/";
      render();
    }
  });

  function render() {
    const parts = (location.hash || "#/").replace(/^#\//, "").split("/").filter(Boolean);
    topbar();
    try { speechSynthesis.cancel(); } catch (e) {}
    const ws = document.getElementById("wordSheet");
    if (ws) ws.remove();
    if (!activeId && parts[0] !== "teacher") return renderOnboarding();
    if (parts[0] === "level" && LV[parts[1]]) return renderLevel(LV[parts[1]]);
    if (parts[0] === "lesson" && LV[parts[1]]) {
      const l = LV[parts[1]], idx = parseInt(parts[2], 10) || 0;
      if (idx >= 0 && idx < l.lessons.length && unlocked(l.id, idx)) return startLesson(l, idx);
      return renderLevel(l);
    }
    if (parts[0] === "story" && LV[parts[1]] && STORIES[parts[1]]) {
      const lid = parts[1], si = parseInt(parts[2], 10) || 0;
      if (si >= 0 && si < STORIES[lid].length && unlockedStory(lid, si)) return renderStory(LV[lid], si);
      return renderLevel(LV[lid]);
    }
    if (parts[0] === "stats") {
      const pid = parts[1];
      if (!pid || pid === activeId) return renderStats(activeId, { own: true, backTo: "#/" });
      if (teacherOn()) return renderStats(pid, { own: false, backTo: "#/teacher" });
      return renderHome();
    }
    if (parts[0] === "teacher") return renderTeacher();
    renderHome();
  }

  /* ---------- онбординг ---------- */
  function renderOnboarding() {
    app.innerHTML = `
      <div class="onboard fade-in">
        <div class="stage-card">
          <div class="result-emoji">👋</div>
          <h2 style="margin-top:8px">Добро пожаловать в WordSteps!</h2>
          <p class="result-msg">Как тебя зовут? Имя нужно, чтобы вести твою статистику<br>и показывать прогресс преподавателю.</p>
          <div class="onboard-form">
            <input class="text-input" id="nameInput" placeholder="Твоё имя" maxlength="30">
            <button class="btn primary big" id="startBtn">Начать 🚀</button>
          </div>
        </div>
      </div>`;
    const go = () => {
      const name = document.getElementById("nameInput").value.trim();
      if (!name) { document.getElementById("nameInput").focus(); return; }
      setActive(addProfile(name));
      toast(`Привет, ${name}! Удачи в учёбе 🍀`);
      location.hash = "#/";
      render();
    };
    document.getElementById("startBtn").addEventListener("click", go);
    document.getElementById("nameInput").addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  }

  /* ---------- профили: модалка ---------- */
  function openProfilesModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const rows = profiles.map(pr => {
      const p = pr.id === activeId ? P : loadP(pr.id);
      return `
        <div class="profile-row ${pr.id === activeId ? "active" : ""}">
          <button class="p-pick" data-pick="${pr.id}">
            <span>👤 <b>${esc(pr.name)}</b></span>
            <span class="p-meta">✅ ${doneTotalP(p)}/${TOTAL_LESSONS} · ⚡${p.stats.xp}</span>
          </button>
          ${profiles.length > 1 ? `<button class="icon-btn" data-del="${pr.id}" title="Удалить профиль">🗑️</button>` : ""}
        </div>`;
    }).join("");
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-head"><h3>Профили учеников</h3><button class="icon-btn" data-close>✕</button></div>
        <div class="word-list">
          ${rows}
          <div class="add-profile">
            <input class="text-input" id="newName" placeholder="Имя нового ученика" maxlength="30">
            <button class="btn primary" id="addBtn">Добавить</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => {
      setActive(b.dataset.pick);
      overlay.remove();
      toast(`Профиль: ${profName(activeId)} 👤`);
      render();
    }));
    overlay.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.del;
      if (!confirm(`Удалить профиль «${profName(id)}» и весь его прогресс?`)) return;
      profiles = profiles.filter(x => x.id !== id);
      saveProfiles();
      try { localStorage.removeItem(pKey(id)); } catch (e) {}
      if (activeId === id) setActive(profiles[0].id);
      overlay.remove();
      render();
    }));
    overlay.querySelector("#addBtn").addEventListener("click", () => {
      const name = overlay.querySelector("#newName").value.trim();
      if (!name) { overlay.querySelector("#newName").focus(); return; }
      setActive(addProfile(name));
      overlay.remove();
      toast(`Профиль «${name}» создан 🎉`);
      render();
    });
    overlay.addEventListener("click", e => {
      if (e.target === overlay || e.target.hasAttribute("data-close")) overlay.remove();
    });
  }

  /* ---------- главная ---------- */
  function renderHome() {
    const streak = P ? curStreakP(P) : 0;
    const cards = LEVELS.map(l => {
      const dn = doneCount(l.id), n = l.lessons.length;
      const pct = Math.round(dn / n * 100);
      const label = dn === 0 ? "Начать" : dn === n ? "Повторить" : "Продолжить";
      return `
        <div class="level-card fade-in" style="--ac:${l.color}">
          <div class="lc-head"><span class="lc-badge">${l.id.toUpperCase()}</span><h3>${esc(l.title.split("·")[1] || l.title)}</h3></div>
          <p>${esc(l.desc)}</p>
          <div class="bar"><i style="width:${pct}%"></i></div>
          <div class="lc-meta">${dn} / ${n} уроков · ${POOLS[l.id].length} слов · ${(STORIES[l.id] || []).length} историй</div>
          <button class="btn primary" data-go="#/level/${l.id}">${label}</button>
        </div>`;
    }).join("");

    app.innerHTML = `
      <section class="hero fade-in">
        <h1>Английский по шагам</h1>
        <p>1000 самых нужных слов — от A1 до B1. Учись читать по транскрипции,
           понимать на слух и узнавать слова в играх. Без скучной грамматики.</p>
        <div class="chips">
          <span class="chip">📖 Чтение с транскрипцией</span>
          <span class="chip">🎧 Слушание</span>
          <span class="chip">🎮 4 игры в каждом уроке</span>
          <span class="chip">📕 ${TOTAL_STORIES} историй для чтения</span>
          <span class="chip">🚫 Никакой грамматики</span>
        </div>
        ${streak ? `<p class="streak-line">🔥 Твоя серия: ${streak} дн. подряд — так держать!</p>` : ""}
        <div style="margin-top:18px"><button class="btn" data-go="#/stats">📊 Моя статистика</button></div>
      </section>
      <section class="levels">${cards}</section>`;

    app.querySelectorAll("[data-go]").forEach(b =>
      b.addEventListener("click", () => { location.hash = b.dataset.go; }));
  }

  /* ---------- страница уровня ---------- */
  function renderLevel(l) {
    const dn = doneCount(l.id), n = l.lessons.length;
    const ton = teacherOn();
    const cards = l.lessons.map((ls, i) => {
      const b = best(l.id, i);
      const stOpen = studentUnlocked(l.id, i);
      const open = ton || stOpen;
      const starsHtml = b !== null ? `<span class="stars">${starsStr(b)}</span>` : "";
      const cp = !ton ? getCheckpoint(l.id, i) : null;
      let meta;
      if (cp) meta = `⏸ продолжить с этапа «${(STAGES[cp.stage] || {}).name || ""}»`;
      else if (stOpen) meta = `${ls.w.length} слов${b !== null ? ` · лучший результат ${b}%` : ""}`;
      else if (ton) meta = `👁 просмотр · 🔒 у ученика закрыт`;
      else meta = "Пройди предыдущий урок";
      const unlockBtn = ton && !stOpen
        ? `<span class="mini-btn" data-unlock="${i}" title="Открыть ученику уроки до этого включительно">🔓 открыть ученику</span>` : "";
      return `
        <button class="lesson-card fade-in ${open ? "" : "locked"}" data-i="${i}" ${open ? "" : "disabled"} style="--ac:${l.color}">
          <span class="num">Урок ${i + 1}</span>
          <span class="name">${open ? "" : "🔒 "}${esc(ls.t)}</span>
          ${starsHtml}
          <span class="meta">${meta}</span>
          ${unlockBtn}
        </button>`;
    }).join("");

    const teachBox = ton ? `
      <div class="teach-box">
        <span>🎓 Режим преподавателя: все уроки открыты для просмотра.${P ? ` Доступ ученика «<b>${esc(profName(activeId))}</b>»:` : ""}</span>
        ${P ? `<button class="btn small" id="unlockAll">🔓 Открыть все уроки</button>
               <button class="btn small" id="resetUnlock">♻️ Вернуть обычный порядок</button>` : ""}
      </div>` : "";

    const storyCards = (STORIES[l.id] || []).map((s, i) => {
      const open = unlockedStory(l.id, i);
      const stOpen = studentStoryUnlocked(l.id, i);
      const r = storyRec(l.id, i);
      const words = s.p.join(" ").split(/\s+/).length;
      let status;
      if (!open) status = `🔒 Откроется после урока ${s.after}`;
      else if (r && r.read) status = `✅ Прочитано · тест ${r.best}%`;
      else status = `~${words} слов · читать`;
      if (ton && !stOpen) status += " · 👁 просмотр";
      return `
        <button class="lesson-card story-card fade-in ${open ? "" : "locked"}" data-s="${i}" ${open ? "" : "disabled"} style="--ac:${l.color}">
          <span class="num">📕 История ${i + 1}</span>
          <span class="name">${esc(s.t)}</span>
          <span class="meta">${esc(s.ru)}</span>
          <span class="meta">${status}</span>
        </button>`;
    }).join("");

    app.innerHTML = `
      <div class="page-head">
        <a class="back-link" href="#/">← Уровни</a>
        <h2>${esc(l.title)}</h2>
        <button class="btn" id="wordsBtn">📖 Все слова</button>
      </div>
      ${teachBox}
      <div class="level-progress">
        <div class="bar" style="--ac:${l.color}"><i style="width:${Math.round(dn / n * 100)}%"></i></div>
        <span>${dn} / ${n}</span>
      </div>
      <div class="lessons">${cards}</div>
      <h3 class="sec-title">📕 Истории для чтения</h3>
      <p class="hint-note">Истории написаны из слов уроков. Нажимай на любое слово в тексте — увидишь перевод и услышишь произношение. Новая история открывается после каждых трёх уроков.</p>
      <div class="lessons">${storyCards}</div>`;

    app.querySelectorAll(".lesson-card:not(.locked):not(.story-card)").forEach(c =>
      c.addEventListener("click", () => { location.hash = `#/lesson/${l.id}/${c.dataset.i}`; }));
    app.querySelectorAll(".story-card:not(.locked)").forEach(c =>
      c.addEventListener("click", () => { location.hash = `#/story/${l.id}/${c.dataset.s}`; }));
    app.querySelectorAll("[data-unlock]").forEach(u =>
      u.addEventListener("click", e => {
        e.stopPropagation();
        if (!P) return;
        const i = parseInt(u.dataset.unlock, 10);
        const cu = typeof P.unlock[l.id] === "number" ? P.unlock[l.id] : -1;
        P.unlock[l.id] = Math.max(cu, i);
        save();
        toast(`Уроки 1–${i + 1} открыты для «${profName(activeId)}» 🔓`);
        renderLevel(l);
      }));
    const ua = document.getElementById("unlockAll");
    if (ua) ua.addEventListener("click", () => {
      P.unlock[l.id] = l.lessons.length - 1;
      save();
      toast(`Все уроки ${l.id.toUpperCase()} открыты для «${profName(activeId)}» 🔓`);
      renderLevel(l);
    });
    const ru = document.getElementById("resetUnlock");
    if (ru) ru.addEventListener("click", () => {
      delete P.unlock[l.id];
      save();
      toast("Доступ снова по порядку прохождения ♻️");
      renderLevel(l);
    });
    document.getElementById("wordsBtn").addEventListener("click", () => openWordsModal(l));
  }

  /* ---------- список слов уровня ---------- */
  function openWordsModal(l) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-head">
          <h3>Слова уровня ${l.id.toUpperCase()} (${POOLS[l.id].length})</h3>
          <button class="icon-btn" data-close>✕</button>
        </div>
        <input class="modal-search" placeholder="Поиск слова или перевода…">
        <div class="word-list"></div>
      </div>`;
    document.body.appendChild(overlay);

    const list = overlay.querySelector(".word-list");
    const draw = q => {
      q = (q || "").trim().toLowerCase();
      const items = POOLS[l.id].filter(x => !q || x.w.toLowerCase().includes(q) || x.ru.toLowerCase().includes(q));
      list.innerHTML = items.map(x => `
        <div class="word-row">
          <button class="icon-btn" data-say="${esc(x.w)}">🔊</button>
          <div><div class="w">${esc(x.w)}</div><div class="i">[${esc(x.ipa)}] · ${esc(ipaToRu(x.ipa))}</div></div>
          <div class="r">${esc(x.ru)}</div>
        </div>`).join("") || `<p style="padding:20px;color:var(--muted)">Ничего не найдено</p>`;
      list.querySelectorAll("[data-say]").forEach(b =>
        b.addEventListener("click", () => speak(b.dataset.say)));
    };
    draw("");
    overlay.querySelector(".modal-search").addEventListener("input", e => draw(e.target.value));
    overlay.addEventListener("click", e => {
      if (e.target === overlay || e.target.hasAttribute("data-close")) overlay.remove();
    });
  }

  /* ---------- урок ---------- */
  const STAGES = [
    { icon: "📖", name: "Слова" },
    { icon: "👀", name: "Чтение" },
    { icon: "🔁", name: "Перевод" },
    { icon: "🎧", name: "Слух" },
    { icon: "🧩", name: "Сборка" }
  ];
  let cur = null;

  function startLesson(l, idx, opts) {
    opts = opts || {};
    // Есть незаконченный урок? Сначала спросим — продолжить или заново.
    if (!opts.fresh && !opts.resume) {
      const cp = getCheckpoint(l.id, idx);
      if (cp) return resumePrompt(l, idx, cp);
    }
    const cp = opts.resume ? getCheckpoint(l.id, idx) : null;
    const lesson = l.lessons[idx];
    cur = {
      level: l, idx, lesson,
      words: lesson.w.map(a => ({ w: a[0], ipa: a[1], ru: a[2] })),
      stage: cp ? cp.stage : 0,
      ok: cp ? cp.ok : 0,
      total: cp ? cp.total : 0
    };
    drawStage();
  }

  function resumePrompt(l, idx, cp) {
    const st = STAGES[cp.stage] || { icon: "", name: "" };
    app.innerHTML = `
      <div class="lesson-wrap fade-in">
        <div class="lesson-top">
          <a class="exit" href="#/level/${l.id}" title="Выйти">✕</a>
          <h2>Урок ${idx + 1}: ${esc(l.lessons[idx].t)}</h2>
        </div>
        <div class="stage-card">
          <div class="result-emoji">⏸️</div>
          <h2 style="margin-top:8px">Продолжить урок?</h2>
          <div class="result-msg">Ты остановился на этапе «${st.icon} ${st.name}».<br>Текущий счёт: ⭐ ${cp.ok} / ${cp.total}. Продолжим с этого места?</div>
          <div class="result-actions">
            <button class="btn primary big" id="resumeBtn">▶ Продолжить с этапа «${st.name}»</button>
            <button class="btn" id="restartBtn">🔄 Начать урок заново</button>
          </div>
        </div>
      </div>`;
    document.getElementById("resumeBtn").addEventListener("click", () => startLesson(l, idx, { resume: true }));
    document.getElementById("restartBtn").addEventListener("click", () => {
      clearCheckpoint(l.id, idx);
      startLesson(l, idx, { fresh: true });
    });
  }

  function shell(inner) {
    const c = cur;
    const steps = STAGES.map((s, i) => {
      const cls = i < c.stage ? "done" : i === c.stage ? "active" : "";
      return `<div class="st ${cls}">${s.icon} ${s.name}</div>`;
    }).join("");
    app.innerHTML = `
      <div class="lesson-wrap fade-in">
        ${teacherOn() ? `<div class="teach-note">👁 Просмотр преподавателя — результаты не сохраняются</div>` : ""}
        <div class="lesson-top">
          <a class="exit" href="#/level/${c.level.id}" title="Выйти из урока">✕</a>
          <h2>Урок ${c.idx + 1}: ${esc(c.lesson.t)}</h2>
          <span class="score-pill">⭐ ${c.ok} / ${c.total}</span>
        </div>
        <div class="stage-steps">${steps}</div>
        <div id="stageBox">${inner}</div>
      </div>`;
  }
  function updateScore() {
    const el = app.querySelector(".score-pill");
    if (el) el.textContent = `⭐ ${cur.ok} / ${cur.total}`;
  }

  function drawStage() {
    switch (cur.stage) {
      case 0: return stageLearn();
      case 1: return stageQuiz("read");
      case 2: return stageQuiz("trans");
      case 3: return stageQuiz("listen");
      case 4: return stageBuild();
      default: return stageResult();
    }
  }
  function nextStage() {
    cur.stage++;
    if (cur.stage <= 4) saveCheckpoint();   // сохраняем достигнутый этап (кроме экрана результата)
    drawStage();
  }

  /* --- этап 1: карточки слов --- */
  function stageLearn() {
    let i = 0;
    const ws = cur.words;
    shell(`
      <div class="stage-card">
        <div class="tip-box"><b>💡 Как читать:</b> ${esc(cur.lesson.tip)}</div>
        <div class="stage-title">Познакомься со словами</div>
        <div id="cardBox"></div>
        <div class="learn-nav">
          <button class="btn" id="prevBtn">←</button>
          <span class="learn-count" id="cnt"></span>
          <button class="btn" id="nextBtn">→</button>
        </div>
        <div class="learn-cta" id="cta"></div>
        <a class="skip-link" href="javascript:void(0)" id="skipLink">Я уже знаю эти слова — к заданиям →</a>
      </div>`);

    const box = document.getElementById("cardBox");
    const cta = document.getElementById("cta");
    const draw = () => {
      const w = ws[i];
      box.innerHTML = `
        <div class="fade-in">
          <div class="word-big">${esc(w.w)} <button class="icon-btn" id="sayBtn" title="Послушать">🔊</button></div>
          <div class="word-ipa">[${esc(w.ipa)}]</div>
          <div class="word-translit">читается: ${esc(ipaToRu(w.ipa))}</div>
          <div class="word-ru">${esc(w.ru)}</div>
        </div>`;
      document.getElementById("cnt").textContent = `${i + 1} / ${ws.length}`;
      document.getElementById("prevBtn").disabled = i === 0;
      document.getElementById("nextBtn").disabled = i === ws.length - 1;
      cta.innerHTML = i === ws.length - 1
        ? `<button class="btn primary big" id="goBtn">Перейти к заданиям 🚀</button>` : "";
      const go = document.getElementById("goBtn");
      if (go) go.addEventListener("click", nextStage);
      document.getElementById("sayBtn").addEventListener("click", () => speak(w.w));
      speak(w.w);
    };
    document.getElementById("prevBtn").addEventListener("click", () => { if (i > 0) { i--; draw(); } });
    document.getElementById("nextBtn").addEventListener("click", () => { if (i < ws.length - 1) { i++; draw(); } });
    document.getElementById("skipLink").addEventListener("click", nextStage);
    draw();
  }

  /* --- этапы 2–4: викторины --- */
  function distractors(word, n, keyFn, extraFilter) {
    const seen = new Set([keyFn(word)]);
    const out = [];
    for (const p of shuffle(POOLS[cur.level.id])) {
      if (p.w === word.w) continue;
      if (extraFilter && !extraFilter(p)) continue;
      const k = keyFn(p);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(p);
      if (out.length === n) break;
    }
    return out;
  }

  function stageQuiz(kind) {
    const titles = {
      read: "👀 Прочитай слово и выбери перевод",
      trans: "🔁 Найди английское слово",
      listen: "🎧 Послушай и выбери, что услышал"
    };
    const sample = shuffle(cur.words).slice(0, Math.min(QUIZ_N, cur.words.length));
    let qi = 0;

    const drawQ = () => {
      const w = sample[qi];
      let opts, prompt;
      if (kind === "read") {
        opts = shuffle([w, ...distractors(w, 3, p => p.ru)]);
        prompt = `
          <div class="q-word">${esc(w.w)} <button class="icon-btn" data-say>🔊</button></div>
          <div class="q-ipa">[${esc(w.ipa)}] · ${esc(ipaToRu(w.ipa))}</div>`;
      } else if (kind === "trans") {
        opts = shuffle([w, ...distractors(w, 3, p => p.w)]);
        prompt = `<div class="q-word">${esc(w.ru)}</div>`;
      } else {
        opts = shuffle([w, ...distractors(w, 3, p => p.w, p => normIpa(p.ipa) !== normIpa(w.ipa))]);
        prompt = `
          <button class="icon-btn q-listen" data-say title="Послушать ещё раз">🔊</button>
          <div class="q-hint">Нажми, чтобы послушать ещё раз</div>`;
      }
      const optHtml = opts.map(o => {
        const label = kind === "read" ? o.ru : o.w;
        return `<button class="opt" data-ok="${o.w === w.w ? 1 : 0}">${esc(label)}</button>`;
      }).join("");

      shell(`
        <div class="stage-card">
          <div class="stage-title">${titles[kind]}</div>
          <div class="q-progress">
            <div class="bar" style="--ac:${cur.level.color}"><i style="width:${qi / sample.length * 100}%"></i></div>
            <span>Вопрос ${qi + 1} из ${sample.length}</span>
          </div>
          ${prompt}
          <div class="options">${optHtml}</div>
        </div>`);

      app.querySelectorAll("[data-say]").forEach(b =>
        b.addEventListener("click", () => speak(w.w)));
      if (kind === "listen") setTimeout(() => speak(w.w), 300);

      let answered = false;
      app.querySelectorAll(".opt").forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const good = btn.dataset.ok === "1";
          cur.total++;
          if (good) { cur.ok++; btn.classList.add("correct"); }
          else {
            btn.classList.add("wrong");
            const right = app.querySelector('.opt[data-ok="1"]');
            if (right) right.classList.add("correct");
          }
          recordAnswer(w.w, good);
          fx(good);
          updateScore();
          app.querySelectorAll(".opt").forEach(b => { b.disabled = true; });
          setTimeout(() => { qi++; qi < sample.length ? drawQ() : nextStage(); }, good ? 700 : 1400);
        });
      });
    };
    drawQ();
  }

  /* --- этап 5: собери слово --- */
  function stageBuild() {
    let cand = cur.words.filter(w => w.w.length <= 8 && /^[a-z]+$/i.test(w.w));
    if (cand.length < BUILD_N) {
      cand = cur.words.filter(w => /^[a-z]+$/i.test(w.w)).sort((a, b) => a.w.length - b.w.length);
    }
    const sample = shuffle(cand).slice(0, Math.min(BUILD_N, cand.length));
    let qi = 0;

    const drawQ = () => {
      const w = sample[qi];
      const target = w.w.toLowerCase();
      let letters = shuffle(target.split(""));
      if (letters.join("") === target && target.length > 2) letters = shuffle(target.split(""));
      let built = [];
      let hadMistake = false;
      let finished = false;

      shell(`
        <div class="stage-card">
          <div class="stage-title">🧩 Собери слово из букв</div>
          <div class="q-progress">
            <div class="bar" style="--ac:${cur.level.color}"><i style="width:${qi / sample.length * 100}%"></i></div>
            <span>Слово ${qi + 1} из ${sample.length}</span>
          </div>
          <div class="q-word">${esc(w.ru)} <button class="icon-btn" data-say title="Подсказка — послушать">🔊</button></div>
          <div class="slots" id="slots"></div>
          <div class="chips-row" id="chips"></div>
          <div class="build-tools"><button class="btn" id="undoBtn">⌫ Убрать букву</button></div>
        </div>`);

      const slotsEl = document.getElementById("slots");
      const chipsEl = document.getElementById("chips");
      app.querySelector("[data-say]").addEventListener("click", () => speak(w.w));
      setTimeout(() => speak(w.w), 300);

      chipsEl.innerHTML = letters.map((ch, i) =>
        `<button class="letter-chip" data-i="${i}">${esc(ch)}</button>`).join("");

      const drawSlots = () => {
        slotsEl.innerHTML = target.split("").map((_, i) =>
          `<div class="slot ${built[i] ? "filled" : ""}">${built[i] ? esc(built[i].ch) : ""}</div>`).join("");
      };
      drawSlots();

      const check = () => {
        finished = true;
        const word = built.map(b => b.ch).join("");
        if (word === target) {
          slotsEl.classList.add("good");
          cur.total++;
          if (!hadMistake) cur.ok++;
          recordAnswer(w.w, !hadMistake);
          fx(true);
          updateScore();
          setTimeout(() => { qi++; qi < sample.length ? drawQ() : nextStage(); }, 900);
        } else {
          hadMistake = true;
          fx(false);
          slotsEl.classList.add("shake");
          setTimeout(() => {
            slotsEl.classList.remove("shake");
            built = [];
            chipsEl.querySelectorAll(".letter-chip").forEach(c => { c.disabled = false; });
            drawSlots();
            finished = false;
          }, 600);
        }
      };

      chipsEl.querySelectorAll(".letter-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          if (finished || chip.disabled) return;
          chip.disabled = true;
          built.push({ ch: chip.textContent, chipIdx: chip.dataset.i });
          drawSlots();
          if (built.length === target.length) check();
        });
      });
      document.getElementById("undoBtn").addEventListener("click", () => {
        if (finished || !built.length) return;
        const last = built.pop();
        const chip = chipsEl.querySelector(`.letter-chip[data-i="${last.chipIdx}"]`);
        if (chip) chip.disabled = false;
        drawSlots();
      });
    };
    drawQ();
  }

  /* --- результат --- */
  function stageResult() {
    const pct = cur.total ? Math.round(cur.ok / cur.total * 100) : 0;
    const st = stars(pct);
    const ton = teacherOn();
    const { bonus, newAch } = recordLesson(cur.level.id, cur.idx, pct);
    clearCheckpoint(cur.level.id, cur.idx);   // урок завершён — незаконченного чекпоинта больше нет
    topbar();

    const emoji = st === 3 ? "🏆" : st === 2 ? "🎉" : st === 1 ? "👍" : "💪";
    const passed = pct >= PASS;
    const lastLesson = cur.idx === cur.level.lessons.length - 1;
    const li = LEVELS.indexOf(cur.level);
    const nextLevel = li < LEVELS.length - 1 ? LEVELS[li + 1] : null;

    let msg, extra = "";
    if (!passed) msg = `Нужно набрать хотя бы ${PASS}%. Повтори слова и попробуй ещё раз!`;
    else if (lastLesson) {
      msg = `Ты прошёл все уроки уровня ${cur.level.id.toUpperCase()}! 🎓`;
      if (nextLevel) extra = `<button class="btn primary big" data-go="#/level/${nextLevel.id}">Уровень ${nextLevel.id.toUpperCase()} →</button>`;
    } else {
      msg = "Отличная работа! Следующий урок открыт.";
      extra = `<button class="btn primary big" data-go="#/lesson/${cur.level.id}/${cur.idx + 1}">Следующий урок →</button>`;
    }

    const gained = ton ? 0 : cur.ok * XP_ANSWER + bonus;
    const xpHtml = ton
      ? `<div class="result-msg">👁 Режим просмотра — результат не сохранён</div>`
      : `<div class="xp-gain">+${gained} XP</div>`;
    const achHtml = newAch.length
      ? `<div class="result-msg" style="margin-top:16px"><b>Новые достижения!</b></div>
         <div class="ach-new">${newAch.map(a => `<span class="chip">${a.icon} ${esc(a.name)}</span>`).join("")}</div>` : "";

    shell(`
      <div class="stage-card">
        <div class="result-emoji">${emoji}</div>
        <div class="result-pct">${pct}%</div>
        <div class="result-stars">${"★".repeat(st)}${"☆".repeat(3 - st)}</div>
        ${xpHtml}
        <div class="result-msg">Правильных ответов: ${cur.ok} из ${cur.total}.<br>${msg}</div>
        ${achHtml}
        <div class="result-actions">
          <button class="btn" id="repeatBtn">🔄 Повторить урок</button>
          <button class="btn" data-go="#/level/${cur.level.id}">К списку уроков</button>
          ${extra}
        </div>
      </div>`);
    if (st >= 1) fx(true);

    document.getElementById("repeatBtn").addEventListener("click", () => startLesson(cur.level, cur.idx, { fresh: true }));
    app.querySelectorAll("[data-go]").forEach(b =>
      b.addEventListener("click", () => {
        const target = b.dataset.go;
        if (location.hash === target) render(); else location.hash = target;
      }));
  }

  /* ---------- читалка историй ---------- */
  function lookupToken(tok) {
    const t = tok.toLowerCase().replace(/^'+|'+$/g, "");
    if (!t) return null;
    const tryOne = k => WORD_INFO[k]
      ? { ipa: WORD_INFO[k].ipa, ru: WORD_INFO[k].ru }
      : SERVICE_WORDS[k] ? { ipa: SERVICE_WORDS[k][0], ru: SERVICE_WORDS[k][1] } : null;
    const cands = [t];
    if (t.endsWith("'s")) cands.push(t.slice(0, -2));
    if (t.endsWith("ies") && t.length > 4) cands.push(t.slice(0, -3) + "y");
    if (t.endsWith("es") && t.length > 3) cands.push(t.slice(0, -2));
    if (t.endsWith("s") && t.length > 2) cands.push(t.slice(0, -1));
    if (t.endsWith("ing") && t.length > 4) {
      const base = t.slice(0, -3);
      cands.push(base, base + "e");
      if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) cands.push(base.slice(0, -1));
    }
    if (t.endsWith("ed") && t.length > 3) {
      const base = t.slice(0, -2);
      cands.push(t.slice(0, -1), base);
      if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) cands.push(base.slice(0, -1));
    }
    cands.push(t + "s");
    for (const k of cands) { const hit = tryOne(k); if (hit) return hit; }
    return null;
  }

  function showWordSheet(token) {
    let sheet = document.getElementById("wordSheet");
    if (!sheet) {
      sheet = document.createElement("div");
      sheet.id = "wordSheet";
      sheet.className = "word-sheet";
      document.body.appendChild(sheet);
    }
    const clean = token.replace(/^'+|'+$/g, "");
    const info = lookupToken(token);
    speak(clean);
    sheet.innerHTML = `
      <button class="icon-btn" data-say>🔊</button>
      <div class="ws-body">
        <div class="ws-w">${esc(clean)}</div>
        ${info ? `<div class="ws-i">[${esc(info.ipa)}] · ${esc(ipaToRu(info.ipa))}</div>
                  <div class="ws-r">${esc(info.ru)}</div>`
               : `<div class="ws-r">Перевода нет — возможно, это имя</div>`}
      </div>
      <button class="icon-btn" data-ws-close>✕</button>`;
    sheet.querySelector("[data-say]").addEventListener("click", e => { e.stopPropagation(); speak(clean); });
    sheet.querySelector("[data-ws-close]").addEventListener("click", () => sheet.remove());
  }

  function renderStory(l, si) {
    const s = STORIES[l.id][si];
    const wordsCount = s.p.join(" ").split(/\s+/).length;
    const parasHtml = s.p.map((para, pi) => {
      const html = para.replace(/[A-Za-zÀ-ÿ']+/g, m => `<span class="tw">${m}</span>`);
      return `<p class="story-p" data-p="${pi}">${html}</p>`;
    }).join("");

    app.innerHTML = `
      <div class="lesson-wrap fade-in">
        ${teacherOn() ? `<div class="teach-note">👁 Просмотр преподавателя — результаты не сохраняются</div>` : ""}
        <div class="lesson-top">
          <a class="exit" href="#/level/${l.id}" title="К уровню">✕</a>
          <h2>📕 ${esc(s.t)} <span class="story-sub">· ${esc(s.ru)}</span></h2>
          <button class="btn small" id="listenBtn">▶ Слушать</button>
        </div>
        <div class="story-meta">~${wordsCount} слов · история ${si + 1} из ${STORIES[l.id].length} · уровень ${l.id.toUpperCase()}</div>
        <div class="stage-card story-box">
          <p class="hint-note" style="margin-top:0">👆 Нажми на любое слово — перевод и произношение.</p>
          <div class="story-text">${parasHtml}</div>
        </div>
        <div id="quizArea" class="story-quiz-area">
          <button class="btn primary big" id="startQuiz">Ответить на вопросы 📝</button>
        </div>
      </div>`;

    app.querySelector(".story-text").addEventListener("click", e => {
      const t = e.target.closest(".tw");
      if (t) showWordSheet(t.textContent);
    });

    let playing = false;
    const listenBtn = document.getElementById("listenBtn");
    const paras = [...app.querySelectorAll(".story-p")];
    const stopPlay = () => {
      playing = false;
      try { speechSynthesis.cancel(); } catch (e) {}
      paras.forEach(p => p.classList.remove("playing"));
      listenBtn.textContent = "▶ Слушать";
    };
    const playPara = pi => {
      if (!playing || pi >= s.p.length) { stopPlay(); return; }
      paras.forEach(p => p.classList.remove("playing"));
      paras[pi].classList.add("playing");
      try {
        const u = new SpeechSynthesisUtterance(s.p[pi].replace(/[«»]/g, " "));
        const v = voices.find(x => /en[-_]GB/i.test(x.lang)) ||
                  voices.find(x => /en[-_]US/i.test(x.lang)) ||
                  voices.find(x => /^en/i.test(x.lang));
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
        u.rate = 0.85;
        u.onend = () => { if (playing) playPara(pi + 1); };
        u.onerror = () => stopPlay();
        speechSynthesis.speak(u);
      } catch (e) { stopPlay(); }
    };
    listenBtn.addEventListener("click", () => {
      if (playing) { stopPlay(); return; }
      playing = true;
      listenBtn.textContent = "⏹ Стоп";
      try { speechSynthesis.cancel(); } catch (e) {}
      playPara(0);
    });

    document.getElementById("startQuiz").addEventListener("click", () => {
      stopPlay();
      runStoryQuiz(l, si);
    });
  }

  function runStoryQuiz(l, si) {
    const s = STORIES[l.id][si];
    const area = document.getElementById("quizArea");
    let qi = 0, ok = 0;

    const finish = () => {
      const total = s.q.length;
      const ton = teacherOn();
      const res = recordStory(l.id, si, ok, total);
      topbar();
      const pct = Math.round(ok / total * 100);
      const emoji = pct === 100 ? "🏆" : pct >= 75 ? "🎉" : pct >= 50 ? "👍" : "💪";
      const next = si + 1 < STORIES[l.id].length && unlockedStory(l.id, si + 1)
        ? `<button class="btn primary big" data-go="#/story/${l.id}/${si + 1}">Следующая история →</button>` : "";
      const achHtml = res.newAch.length
        ? `<div class="result-msg" style="margin-top:14px"><b>Новые достижения!</b></div>
           <div class="ach-new">${res.newAch.map(a => `<span class="chip">${a.icon} ${esc(a.name)}</span>`).join("")}</div>` : "";
      area.innerHTML = `
        <div class="stage-card fade-in">
          <div class="result-emoji">${emoji}</div>
          <div class="result-pct">${pct}%</div>
          ${ton ? `<div class="result-msg">👁 Режим просмотра — результат не сохранён</div>` : `<div class="xp-gain">+${res.gained} XP</div>`}
          <div class="result-msg">Правильно: ${ok} из ${total}. История прочитана! 📕</div>
          ${achHtml}
          <div class="result-actions">
            <button class="btn" data-go="#/level/${l.id}">К уровню</button>
            ${next}
          </div>
        </div>`;
      area.querySelectorAll("[data-go]").forEach(b =>
        b.addEventListener("click", () => {
          const target = b.dataset.go;
          if (location.hash === target) render(); else location.hash = target;
        }));
      if (pct >= 50) fx(true);
    };

    const drawQ = () => {
      const q = s.q[qi];
      const opts = shuffle(q.o.map((text, i) => ({ text, good: i === q.a })));
      area.innerHTML = `
        <div class="stage-card fade-in">
          <div class="stage-title">📝 Вопрос ${qi + 1} из ${s.q.length}</div>
          <div class="q-word story-q">${esc(q.q)}</div>
          <div class="options">${opts.map(o => `<button class="opt" data-ok="${o.good ? 1 : 0}">${esc(o.text)}</button>`).join("")}</div>
        </div>`;
      area.scrollIntoView({ behavior: "smooth", block: "nearest" });
      let answered = false;
      area.querySelectorAll(".opt").forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const good = btn.dataset.ok === "1";
          if (good) { ok++; btn.classList.add("correct"); }
          else {
            btn.classList.add("wrong");
            const right = area.querySelector('.opt[data-ok="1"]');
            if (right) right.classList.add("correct");
          }
          fx(good);
          area.querySelectorAll(".opt").forEach(b => { b.disabled = true; });
          setTimeout(() => { qi++; qi < s.q.length ? drawQ() : finish(); }, good ? 700 : 1400);
        });
      });
    };
    drawQ();
  }

  /* ---------- статистика ---------- */
  function statsHtml(p) {
    const cards = [
      ["⚡", p.stats.xp, "XP"],
      ["🔥", curStreakP(p), "дней подряд"],
      ["📚", learnedP(p), "слов выучено"],
      ["🎯", accuracyP(p) + "%", "точность"],
      ["✅", doneTotalP(p) + " / " + TOTAL_LESSONS, "уроков"],
      ["📕", storiesReadP(p) + " / " + TOTAL_STORIES, "историй"],
      ["📝", p.stats.answers, "ответов"]
    ].map(c => `<div class="stat-card"><div class="sc-icon">${c[0]}</div><div class="sc-num">${c[1]}</div><div class="sc-label">${c[2]}</div></div>`).join("");

    const lvls = LEVELS.map(l => {
      const dn = doneCountP(p, l.id), n = l.lessons.length;
      return `
        <div class="lvl-line">
          <span class="lc-badge" style="background:${l.color}">${l.id.toUpperCase()}</span>
          <div class="bar" style="--ac:${l.color}"><i style="width:${Math.round(dn / n * 100)}%"></i></div>
          <span class="lvl-nums">${dn} / ${n}</span>
        </div>`;
    }).join("");

    const achHtml = ACH.map(a => {
      const got = p.ach.includes(a.id);
      return `<div class="ach ${got ? "got" : ""}"><div class="ach-icon">${a.icon}</div><div class="ach-name">${esc(a.name)}</div><div class="ach-desc">${esc(a.desc)}</div></div>`;
    }).join("");

    const mist = Object.entries(p.mist).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const mistHtml = mist.length ? mist.map(([w, n]) => {
      const info = WORD_INFO[w.toLowerCase()] || { ipa: "", ru: "" };
      return `
        <div class="mist-row">
          <button class="icon-btn" data-say="${esc(w)}">🔊</button>
          <div class="mw"><b>${esc(w)}</b> <span class="mi">[${esc(info.ipa)}]</span></div>
          <div class="mr">${esc(info.ru)}</div>
          <span class="mn">✗ ${n}</span>
        </div>`;
    }).join("") : `<p class="empty-note">Ошибок пока нет — отличная работа! 🎉</p>`;

    const hist = LEVELS.map(l => {
      const rows = l.lessons.map((ls, i) => {
        const r = rec(p, l.id, i);
        if (!r) return "";
        return `
          <div class="hist-row">
            <span class="hn">${i + 1}. ${esc(ls.t)}</span>
            <span class="hv">${r.best}% ${starsStr(r.best)} · попыток: ${r.attempts}${r.passedAt ? " · сдан " + r.passedAt : ""}</span>
          </div>`;
      }).filter(Boolean).join("");
      return rows ? `<details class="hist-lvl"><summary>${esc(l.title)}</summary>${rows}</details>` : "";
    }).join("") || `<p class="empty-note">Уроки ещё не начаты.</p>`;

    return `
      <div class="stats-grid">${cards}</div>
      <h3 class="sec-title">Уровни</h3>${lvls}
      <h3 class="sec-title">Достижения (${p.ach.length} / ${ACH.length})</h3>
      <div class="ach-grid">${achHtml}</div>
      <h3 class="sec-title">Трудные слова</h3>
      <div class="mist-list">${mistHtml}</div>
      <h3 class="sec-title">История по урокам</h3>${hist}`;
  }
  function bindSay(root) {
    root.querySelectorAll("[data-say]").forEach(b =>
      b.addEventListener("click", () => speak(b.dataset.say)));
  }

  function renderStats(pid, opts) {
    const prof = profiles.find(x => x.id === pid);
    if (!prof) { location.hash = "#/"; return; }
    const p = pid === activeId ? P : loadP(pid);
    app.innerHTML = `
      <div class="page-head fade-in">
        <a class="back-link" href="${opts.backTo}">← Назад</a>
        <h2>📊 Статистика: ${esc(prof.name)}</h2>
        ${opts.own ? `<button class="btn" id="exportBtn">📤 Код для преподавателя</button>` : ""}
      </div>
      ${statsHtml(p)}`;
    bindSay(app);
    const ex = document.getElementById("exportBtn");
    if (ex) ex.addEventListener("click", () => showCodeModal(exportCode()));
  }

  /* ---------- панель преподавателя ---------- */
  function renderTeacher() {
    const pin = teacherPin();

    if (!pin) {
      app.innerHTML = `
        <div class="pin-card fade-in">
          <div class="stage-card">
            <div class="result-emoji">🎓</div>
            <h2 style="margin-top:8px">Режим преподавателя</h2>
            <p class="result-msg">Придумайте PIN-код (минимум 4 символа).<br>С ним вы сможете открывать все уроки и смотреть статистику учеников на любом устройстве.</p>
            <div class="onboard-form">
              <input class="text-input" id="pinInput" type="password" placeholder="Новый PIN" maxlength="20">
              <button class="btn primary big" id="pinSave">Создать</button>
            </div>
            <div class="err-note" id="pinErr"></div>
          </div>
        </div>`;
      const goSetup = () => {
        const v = document.getElementById("pinInput").value.trim();
        if (v.length < 4) { document.getElementById("pinErr").textContent = "PIN слишком короткий — минимум 4 символа."; return; }
        try { localStorage.setItem(K_PIN, v); localStorage.setItem(K_TON, "1"); } catch (e) {}
        toast("Режим преподавателя включён 🎓");
        render();
      };
      document.getElementById("pinSave").addEventListener("click", goSetup);
      document.getElementById("pinInput").addEventListener("keydown", e => { if (e.key === "Enter") goSetup(); });
      return;
    }

    if (!teacherOn()) {
      app.innerHTML = `
        <div class="pin-card fade-in">
          <div class="stage-card">
            <div class="result-emoji">🔐</div>
            <h2 style="margin-top:8px">Вход для преподавателя</h2>
            <p class="result-msg">Введите PIN-код.</p>
            <div class="onboard-form">
              <input class="text-input" id="pinInput" type="password" placeholder="PIN" maxlength="20">
              <button class="btn primary big" id="pinGo">Войти</button>
            </div>
            <div class="err-note" id="pinErr"></div>
          </div>
        </div>`;
      const goLogin = () => {
        if (document.getElementById("pinInput").value.trim() === pin) {
          try { localStorage.setItem(K_TON, "1"); } catch (e) {}
          toast("Добро пожаловать! 🎓");
          render();
        } else document.getElementById("pinErr").textContent = "Неверный PIN.";
      };
      document.getElementById("pinGo").addEventListener("click", goLogin);
      document.getElementById("pinInput").addEventListener("keydown", e => { if (e.key === "Enter") goLogin(); });
      return;
    }

    const rows = profiles.map(pr => {
      const p = pr.id === activeId ? P : loadP(pr.id);
      return `
        <div class="t-row">
          <div class="t-name">👤 ${esc(pr.name)} ${pr.id === activeId ? `<span class="tag">активен</span>` : ""}</div>
          <div class="t-meta">✅ ${doneTotalP(p)} / ${TOTAL_LESSONS} уроков · ⚡ ${p.stats.xp} XP · 🔥 ${curStreakP(p)} дн. · 🎯 точность ${accuracyP(p)}% · 📚 ${learnedP(p)} слов</div>
          <div class="t-actions">
            <button class="btn small" data-stats="${pr.id}">📊 Статистика</button>
            <button class="btn small" data-unlockall="${pr.id}">🔓 Открыть все уроки</button>
            <button class="btn small" data-relock="${pr.id}">♻️ Обычный порядок</button>
            ${pr.id !== activeId ? `<button class="btn small" data-activate="${pr.id}">Сделать активным</button>` : ""}
          </div>
        </div>`;
    }).join("") || `<p class="empty-note">На этом устройстве пока нет профилей учеников.</p>`;

    const program = LEVELS.map(l => `
      <details class="prog-lvl">
        <summary><span class="lc-badge" style="background:${l.color}">${l.id.toUpperCase()}</span> ${esc(l.title)} — ${l.lessons.length} уроков, ${POOLS[l.id].length} слов</summary>
        ${l.lessons.map((ls, i) => `
          <details class="prog-lesson">
            <summary>${i + 1}. ${esc(ls.t)} · ${ls.w.length} слов <a class="mini-link" href="#/lesson/${l.id}/${i}">▶ пройти (просмотр)</a></summary>
            <p class="tip-box" style="margin-top:10px"><b>💡 Подсказка урока:</b> ${esc(ls.tip)}</p>
            <div class="prog-words">${ls.w.map(a => `
              <div class="word-row">
                <button class="icon-btn" data-say="${esc(a[0])}">🔊</button>
                <div><div class="w">${esc(a[0])}</div><div class="i">[${esc(a[1])}] · ${esc(ipaToRu(a[1]))}</div></div>
                <div class="r">${esc(a[2])}</div>
              </div>`).join("")}</div>
          </details>`).join("")}
        <div class="prog-stories"><b>📕 Истории:</b> ${(STORIES[l.id] || []).map((s, i) =>
          `<a class="mini-link" href="#/story/${l.id}/${i}">${i + 1}. ${esc(s.t)}</a>`).join(" · ")}</div>
      </details>`).join("");

    app.innerHTML = `
      <div class="page-head fade-in">
        <a class="back-link" href="#/">← На главную</a>
        <h2>🎓 Панель преподавателя</h2>
        <button class="btn" id="logoutBtn">Выйти из режима</button>
      </div>
      <div class="teach-box">👁 Пока режим включён, все уроки на сайте открыты для просмотра, а ваши результаты не попадают в статистику учеников.</div>

      <h3 class="sec-title">Ученики на этом устройстве</h3>
      <div class="t-table">${rows}</div>

      <h3 class="sec-title">Код от ученика</h3>
      <p class="hint-note">Ученик на своём устройстве открывает «📊 Моя статистика» → «📤 Код для преподавателя» и присылает вам код (WhatsApp, Telegram…). Вставьте код сюда — увидите его полную статистику:</p>
      <textarea class="code-input" id="codeInput" placeholder="WS1…" rows="3"></textarea>
      <button class="btn primary" id="showCode">Показать статистику ученика</button>
      <div id="codeResult"></div>

      <h3 class="sec-title">Программа курса</h3>
      ${program}`;

    bindSay(app);
    document.getElementById("logoutBtn").addEventListener("click", () => {
      try { localStorage.removeItem(K_TON); } catch (e) {}
      toast("Режим преподавателя выключен");
      location.hash = "#/";
      render();
    });
    app.querySelectorAll("[data-stats]").forEach(b =>
      b.addEventListener("click", () => { location.hash = "#/stats/" + b.dataset.stats; }));
    app.querySelectorAll("[data-unlockall]").forEach(b =>
      b.addEventListener("click", () => {
        const id = b.dataset.unlockall;
        const p = id === activeId ? P : loadP(id);
        LEVELS.forEach(l => { p.unlock[l.id] = l.lessons.length - 1; });
        saveP(id, p);
        if (id === activeId) P = p;
        toast(`Все уроки открыты для «${profName(id)}» 🔓`);
      }));
    app.querySelectorAll("[data-relock]").forEach(b =>
      b.addEventListener("click", () => {
        const id = b.dataset.relock;
        const p = id === activeId ? P : loadP(id);
        p.unlock = {};
        saveP(id, p);
        if (id === activeId) P = p;
        toast(`«${profName(id)}»: уроки снова открываются по порядку ♻️`);
      }));
    app.querySelectorAll("[data-activate]").forEach(b =>
      b.addEventListener("click", () => {
        setActive(b.dataset.activate);
        topbar();
        toast(`Активный профиль: ${profName(activeId)} 👤`);
        renderTeacher();
      }));
    document.getElementById("showCode").addEventListener("click", () => {
      const obj = parseCode(document.getElementById("codeInput").value);
      const box = document.getElementById("codeResult");
      if (!obj) { box.innerHTML = `<p class="err-note">Код не распознан. Проверьте, что скопирован целиком (начинается с WS1.).</p>`; return; }
      box.innerHTML = `
        <div class="page-head" style="margin-top:18px">
          <h2>📊 ${esc(obj.n)} <span class="tag">код от ${esc(obj.d || "?")}</span></h2>
        </div>
        ${statsHtml(obj.p)}`;
      bindSay(box);
    });
  }

  render();
})();
