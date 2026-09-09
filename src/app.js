/* Study app for the trunk anatomy, embryology and teratology objectives.
 *
 * Five ways to work: read an objective, drill flashcards, sit a quiz, recall an
 * objective from memory, and check the mastery map. Every question and card is
 * tagged to one of the 32 objectives, so progress is always reported per objective.
 *
 * Progress lives in the `db` capability so it follows the reader between devices,
 * mirrored into localStorage so the page is useful instantly and offline. Both the
 * tutor and the store can be absent — `claude.use()` resolves null — so every mode
 * has to work without them.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ setup */

  /* Stable ids from content, not array position, so reordering or inserting a
   * question later doesn't silently orphan someone's progress. */
  function hash(text) {
    var h = 5381;
    for (var i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  QUESTIONS.forEach(function (q) { q.id = q.lo + '.' + hash(q.q); });
  CARDS.forEach(function (c) { c.id = c.lo + '.' + hash(c.f); });

  var OBJ_BY_ID = {};
  OBJECTIVES.forEach(function (o) { OBJ_BY_ID[o.id] = o; });
  var MOD_BY_ID = {};
  MODULES.forEach(function (m) { MOD_BY_ID[m.id] = m; });

  var FIGS_BY_OBJ = {};
  (FIGURES.placements || []).forEach(function (p) {
    (FIGS_BY_OBJ[p.objective] = FIGS_BY_OBJ[p.objective] || []).push(p);
  });

  function objectivesIn(moduleId) {
    return OBJECTIVES.filter(function (o) { return o.module === moduleId; });
  }
  function esc(text) {
    return String(text).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }
  function shuffled(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  /* ---------------------------------------------------------------- storage */

  var STORAGE_KEY = 'trunk-embryo-progress-v1';
  var DOC_PATH = 'progress/main';
  var BLANK = { objectives: {}, cards: {}, questions: {}, sessions: [], updatedAt: 0 };

  var progress = JSON.parse(JSON.stringify(BLANK));
  var db = null;
  var saveTimer = null;

  function readLocal() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign({}, BLANK, JSON.parse(raw));
    } catch (e) { /* private window, blocked storage: start fresh */ }
    return null;
  }

  function writeLocal() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { /* nothing to do */ }
  }

  /* Local write is immediate so nothing is lost on a reload; the shared document
   * is debounced so a fast flashcard run doesn't fire a write per tap. */
  function save() {
    progress.updatedAt = Date.now();
    writeLocal();
    if (!db) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      db.doc(DOC_PATH).set(progress).catch(function () { setSync(false); });
    }, 1500);
  }

  function setSync(on) {
    var el = document.getElementById('sync');
    if (!el) return;
    el.innerHTML = '<span class="dot' + (on ? ' on' : '') + '"></span>' +
      (on ? 'Synced across devices' : 'Saved on this device');
  }

  async function connectStore() {
    var local = readLocal();
    if (local) progress = local;
    render();

    try { db = await window.claude.use('db'); } catch (e) { db = null; }
    if (!db) { setSync(false); return; }

    try {
      var snap = await db.doc(DOC_PATH).get();
      var remote = snap.exists ? snap.data() : null;
      if (remote && (remote.updatedAt || 0) > (progress.updatedAt || 0)) {
        progress = Object.assign({}, BLANK, remote);
        writeLocal();
        render();
      } else if (progress.updatedAt) {
        await db.doc(DOC_PATH).set(progress);
      }
      setSync(true);
    } catch (e) {
      db = null;
      setSync(false);
    }
  }

  /* ------------------------------------------------------------------ tutor */

  var sample = null;
  var tutorGone = false;

  async function getSample() {
    if (tutorGone) return null;
    if (sample) return sample;
    try { sample = await window.claude.use('sample'); } catch (e) { sample = null; }
    if (!sample) tutorGone = true;
    return sample;
  }

  /* Every prompt carries its objective inline and is told to stay inside it —
   * the tutor is scoped to the syllabus for the same reason the question bank is. */
  function objectiveBrief(objective) {
    var lines = ['Learning objective: ' + objective.text];
    lines.push('Course facts for this objective:');
    objective.essentials.forEach(function (e) {
      lines.push('- ' + (e.t ? e.t + ': ' : '') + e.d);
    });
    if (objective.mustRemember) lines.push('Key line to remember: ' + objective.mustRemember);
    if (objective.pitfall) lines.push('Known exam trap: ' + objective.pitfall);
    return lines.join('\n');
  }

  async function ask(target, prompt) {
    var fn = await getSample();
    if (!fn) {
      target.innerHTML = '<span class="label">Tutor unavailable</span>Ask-Claude features need to run on the ' +
        'published page and be allowed by the viewer.';
      return;
    }
    target.hidden = false;
    target.innerHTML = '<span class="label">Claude</span>Thinking…';
    try {
      var result = await fn(prompt, {
        modelTier: 'default',
        onText: function (u) { target.innerHTML = '<span class="label">Claude</span>' + esc(u.text); },
      });
      target.innerHTML = '<span class="label">Claude</span>' + esc(result.text);
    } catch (err) {
      var code = err && err.code;
      if (code === 'not_granted') {
        tutorGone = true;
        target.innerHTML = '<span class="label">Tutor unavailable</span>You declined, so the tutor is off for this visit.';
        return;
      }
      var message = code === 'rate_limited'
        ? 'Too many requests just now — wait a moment and try again.'
        : 'That didn’t go through. Try again.';
      target.innerHTML = '<span class="label">Tutor</span>' + esc(err && err.text ? err.text : message);
    }
  }

  /* --------------------------------------------------------------- progress */

  function objectiveState(id) { return progress.objectives[id] || 'unseen'; }

  function questionStats(loId) {
    var seen = 0, right = 0;
    QUESTIONS.forEach(function (q) {
      if (q.lo !== loId) return;
      var rec = progress.questions[q.id];
      if (!rec) return;
      seen += rec.seen;
      right += rec.right;
    });
    return { seen: seen, right: right };
  }

  function knownCount() {
    return OBJECTIVES.filter(function (o) { return objectiveState(o.id) === 'known'; }).length;
  }

  function weakQuestions() {
    return QUESTIONS.filter(function (q) {
      var rec = progress.questions[q.id];
      return rec && rec.lastWrong;
    });
  }

  function dueCards(pool) {
    var now = Date.now();
    return pool.filter(function (c) {
      var rec = progress.cards[c.id];
      return !rec || !rec.due || rec.due <= now;
    });
  }

  /* --------------------------------------------------------------------- ui */

  var ui = {
    view: 'learn',
    openObjective: null,
    cards: null,
    quiz: null,
    recall: { objective: null, verdict: '' },
  };

  var VIEWS = [
    { id: 'learn', key: '01', name: 'Learn' },
    { id: 'cards', key: '02', name: 'Flashcards' },
    { id: 'quiz', key: '03', name: 'Quiz' },
    { id: 'recall', key: '04', name: 'Recall' },
    { id: 'progress', key: '05', name: 'Progress' },
  ];

  function go(view) {
    ui.view = view;
    window.scrollTo(0, 0);
    render();
  }

  function render() {
    var nav = document.getElementById('nav');
    var tabs = document.getElementById('tabs');
    if (nav) {
      nav.innerHTML = VIEWS.map(function (v) {
        return '<button data-go="' + v.id + '" aria-current="' + (ui.view === v.id) + '">' +
          '<span class="k">' + v.key + '</span><span>' + v.name + '</span></button>';
      }).join('');
    }
    if (tabs) {
      tabs.innerHTML = VIEWS.map(function (v) {
        return '<button data-go="' + v.id + '" aria-current="' + (ui.view === v.id) + '">' + v.name + '</button>';
      }).join('');
    }
    var count = document.getElementById('known-count');
    if (count) count.textContent = knownCount() + ' / ' + OBJECTIVES.length;

    var main = document.getElementById('main');
    if (ui.view === 'learn') renderLearn(main);
    else if (ui.view === 'cards') renderCards(main);
    else if (ui.view === 'quiz') renderQuiz(main);
    else if (ui.view === 'recall') renderRecall(main);
    else renderProgress(main);
  }

  /* ------------------------------------------------------------------ learn */

  function figureHtml(placement) {
    var image = FIGURES.images[placement.image];
    if (!image) return '';
    var module = MOD_BY_ID[placement.module];
    return '<figure class="fig"><div class="plate">' +
      '<img loading="lazy" src="' + image.src + '" width="' + image.w + '" height="' + image.h +
      '" alt="' + esc(placement.caption) + '"></div>' +
      '<figcaption><span class="cap">' + esc(placement.caption) + '</span>' +
      '<span class="src label">' + esc(module.short) + ' · slide ' + placement.slide + '</span>' +
      '</figcaption></figure>';
  }

  function objectiveBodyHtml(o) {
    var html = '';
    var figs = FIGS_BY_OBJ[o.id] || [];
    if (figs.length) html += '<div class="figs">' + figs.map(figureHtml).join('') + '</div>';

    if (o.note) html += '<div class="note">' + esc(o.note) + '</div>';

    html += '<div class="ess">' + o.essentials.map(function (e) {
      var layer = e.layer ? ' <span class="chip ' + e.layer + '">' + e.layer + '</span>' : '';
      return '<div><span class="t">' + esc(e.t) + layer + '</span><span class="d">' + esc(e.d) + '</span></div>';
    }).join('') + '</div>';

    if (o.timeline) {
      html += '<div class="timeline">' + TIMELINE.map(function (t) {
        return '<div><span class="when">' + esc(t.when) + '</span><span>' + esc(t.what) + '</span></div>';
      }).join('') + '</div>';
    }

    if (o.pitfall) {
      html += '<div class="pitfall"><span class="label">Exam trap</span><p>' + esc(o.pitfall) + '</p></div>';
    }
    if (o.mustRemember) {
      html += '<div class="must"><span class="label">Must remember</span><p>' + esc(o.mustRemember) + '</p></div>';
    }

    var known = objectiveState(o.id) === 'known';
    html += '<div class="obj-actions">' +
      '<button class="btn small" data-known="' + o.id + '">' +
      (known ? 'Mark as still learning' : 'Mark as known') + '</button>' +
      '<button class="btn small" data-explain="' + o.id + '">Explain this differently</button>' +
      '<button class="btn small" data-newq="' + o.id + '">Give me a practice question</button>' +
      '<button class="btn small" data-drill="' + o.id + '">Quiz me on this</button>' +
      '</div><div class="tutor" id="tutor-' + o.id + '" hidden></div>';
    return html;
  }

  function renderLearn(main) {
    var html = '<div class="wrap"><div class="view-head"><h2>Learn</h2>' +
      '<p>All 32 learning objectives from the five lecture decks. The ones your high-yield ' +
      'guide covers are marked, and each objective carries the lecture figures that illustrate it.</p></div>';

    MODULES.forEach(function (m) {
      var objs = objectivesIn(m.id);
      html += '<section class="mod"><div class="mod-head">' +
        '<span class="label">Module ' + m.num + '</span><h3>' + esc(m.title) + '</h3>' +
        '<div class="somites" title="' + objs.filter(function (o) {
          return objectiveState(o.id) === 'known';
        }).length + ' of ' + objs.length + ' known">' + objs.map(function (o) {
          return '<i class="' + (objectiveState(o.id) === 'known' ? 'on' : '') + '"></i>';
        }).join('') + '</div></div>';

      objs.forEach(function (o) {
        var open = ui.openObjective === o.id;
        var known = objectiveState(o.id) === 'known';
        html += '<div class="obj"><button class="obj-btn" data-obj="' + o.id + '" aria-expanded="' + open + '">' +
          '<span class="obj-num">' + m.num + '.' + o.num + '</span>' +
          '<span class="obj-title">' + esc(o.text) + '</span>' +
          '<span class="obj-meta">' +
          (o.highYield ? '<span class="chip hy">High yield</span>' : '') +
          (known ? '<span class="chip known">Known</span>' : '') +
          '</span></button>';
        if (open) html += '<div class="obj-body">' + objectiveBodyHtml(o) + '</div>';
        html += '</div>';
      });
      html += '</section>';
    });

    main.innerHTML = html + '</div>';
  }

  /* ------------------------------------------------------------- flashcards */

  function cardPool(scope) {
    if (scope === 'hy') {
      return CARDS.filter(function (c) { return OBJ_BY_ID[c.lo].highYield; });
    }
    if (scope === 'due') return dueCards(CARDS);
    if (scope && scope.indexOf('m') === 0) {
      return CARDS.filter(function (c) { return OBJ_BY_ID[c.lo].module === scope; });
    }
    return CARDS.slice();
  }

  var BOX_DAYS = [0, 0.007, 1, 3, 7, 21];

  /* The queue is fixed for the round. Nothing is appended mid-session, so paging
   * back and forward is free and the counter never shifts under you. */
  function buildDeck(scope, shuffle, only) {
    var pool = only ? only.slice() : cardPool(scope);
    if (shuffle) {
      pool = shuffled(pool);
    } else {
      /* Weakest first: low Leitner box, then longest un-reviewed. */
      pool = pool.slice().sort(function (a, b) {
        var ra = progress.cards[a.id] || { box: 0, due: 0 };
        var rb = progress.cards[b.id] || { box: 0, due: 0 };
        return (ra.box || 0) - (rb.box || 0) || (ra.due || 0) - (rb.due || 0);
      });
    }
    ui.cards = { scope: scope, queue: pool, at: 0, flipped: false, shuffle: !!shuffle, marks: {} };
  }

  function startDeck(scope, shuffle, only) {
    buildDeck(scope, shuffle, only);
    render();
  }

  /* Index `queue.length` is the end-of-round summary, so you can page onto it and
   * back off it like any other card. */
  function goCard(delta) {
    var deck = ui.cards;
    if (!deck) return;
    var next = Math.max(0, Math.min(deck.queue.length, deck.at + delta));
    if (next === deck.at) return;
    deck.at = next;
    deck.flipped = false;
    render();
  }

  function markCard(rating) {
    var deck = ui.cards;
    if (!deck) return;
    var card = deck.queue[deck.at];
    if (!card) return;

    var rec = progress.cards[card.id] || { box: 1, due: 0, seen: 0, right: 0 };
    var already = deck.marks[card.id];
    if (!already) rec.seen++;                       // re-marking on a second pass isn't a new view
    if (rating === 'known') {
      rec.box = Math.min(5, rec.box + 1);
      if (already !== 'known') rec.right++;
    } else {
      rec.box = 1;
      if (already === 'known') rec.right = Math.max(0, rec.right - 1);
    }
    rec.due = Date.now() + BOX_DAYS[rec.box] * 86400000;
    progress.cards[card.id] = rec;
    deck.marks[card.id] = rating;
    save();

    if (deck.at < deck.queue.length) { deck.at++; deck.flipped = false; }
    render();
  }

  function deckTally() {
    var deck = ui.cards;
    var known = 0, learning = 0;
    Object.keys(deck.marks).forEach(function (id) {
      if (deck.marks[id] === 'known') known++; else learning++;
    });
    return { known: known, learning: learning };
  }

  function renderCards(main) {
    if (!ui.cards) buildDeck('all', false);        // never open on an empty screen
    var deck = ui.cards;
    var total = deck.queue.length;

    var picker = '<div class="scope"><label for="deck-scope">Deck</label><select id="deck-scope">' +
      [{ v: 'all', t: 'Everything (' + CARDS.length + ' cards)' },
       { v: 'hy', t: 'High-yield only' },
       { v: 'due', t: 'Due for review (' + dueCards(CARDS).length + ')' }].concat(
        MODULES.map(function (m) {
          return { v: m.id, t: 'Module ' + m.num + ' — ' + m.short };
        })).map(function (o) {
          return '<option value="' + o.v + '"' + (deck.scope === o.v ? ' selected' : '') + '>' +
            esc(o.t) + '</option>';
        }).join('') + '</select>' +
      '<button class="btn small" id="deck-shuffle" aria-pressed="' + deck.shuffle + '">Shuffle</button>' +
      '<button class="btn small" id="deck-restart">Restart</button></div>';

    var html = '<div class="wrap"><div class="view-head"><h2>Flashcards</h2>' +
      '<p>Click the card or press <kbd>Space</kbd> to flip. <kbd>←</kbd> and <kbd>→</kbd> move ' +
      'through the deck — marking a card is optional.</p></div>' + picker;

    if (!total) {
      main.innerHTML = html + '<p class="empty">Nothing due in this deck right now. ' +
        'Pick another one above.</p></div>';
      return wireDeck(main);
    }

    if (deck.at >= total) {
      var tally = deckTally();
      html += '<div class="card" style="padding:26px 28px">' +
        '<div class="score">' + tally.known + '<span style="color:var(--ink-3)">/' + total + '</span></div>' +
        '<p class="label" style="margin-top:6px">marked as known</p>' +
        (tally.learning
          ? '<p style="margin-top:14px">' + tally.learning + ' still to nail down.</p>'
          : '<p style="margin-top:14px">Deck finished.</p>') +
        '<div class="obj-actions">' +
        (tally.learning ? '<button class="btn primary" id="deck-hard">Study the ' + tally.learning +
          ' you’re still learning</button>' : '') +
        '<button class="btn" id="deck-restart2">Restart this deck</button>' +
        '<button class="btn" data-nav="-1">← Back to the last card</button>' +
        '</div></div></div>';
      main.innerHTML = html;
      return wireDeck(main);
    }

    var card = deck.queue[deck.at];
    var objective = OBJ_BY_ID[card.lo];
    var module = MOD_BY_ID[objective.module];
    var mark = deck.marks[card.id];
    var badge = mark
      ? '<span class="chip ' + (mark === 'known' ? 'known' : 'learning') + ' mark">' +
        (mark === 'known' ? 'Known' : 'Still learning') + '</span>'
      : '';

    html += '<div class="deck">' +
      '<div class="deck-meta"><span>' + esc(module.short) + ' · objective ' +
      module.num + '.' + objective.num + '</span>' +
      '<span>' + Object.keys(deck.marks).length + ' of ' + total + ' marked</span></div>' +
      '<div class="bar"><span style="width:' + Math.round((deck.at / total) * 100) + '%"></span></div>' +

      '<div class="flash' + (deck.flipped ? ' flipped' : '') + '" id="flash" tabindex="0" ' +
      'role="button" aria-label="Flip card"><div class="flash-inner">' +
      '<div class="face front">' + badge +
      '<div class="text">' + esc(card.f) + '</div>' +
      '<span class="hint">Click or press Space</span></div>' +
      '<div class="face back">' + badge +
      '<div class="text">' + esc(card.b) + '</div>' +
      '<span class="hint">' + esc(module.short) + '</span></div>' +
      '</div></div>' +

      '<div class="rate">' +
      '<button class="btn" data-mark="learning">Still learning</button>' +
      '<button class="btn primary" data-mark="known">Know it</button></div>' +

      '<div class="navrow">' +
      '<button class="btn nav" data-nav="-1"' + (deck.at === 0 ? ' disabled' : '') +
      ' aria-label="Previous card">←</button>' +
      '<span class="count">' + (deck.at + 1) + ' / ' + total + '</span>' +
      '<button class="btn nav" data-nav="1" aria-label="Next card">→</button>' +
      '</div></div></div>';

    main.innerHTML = html;
    wireDeck(main);

    var flash = document.getElementById('flash');
    flash.onclick = function () { deck.flipped = !deck.flipped; render(); };
  }

  function wireDeck(main) {
    var deck = ui.cards;
    var select = document.getElementById('deck-scope');
    if (select) select.onchange = function () { startDeck(select.value, deck.shuffle); };

    var shuffle = document.getElementById('deck-shuffle');
    if (shuffle) shuffle.onclick = function () { startDeck(deck.scope, !deck.shuffle); };

    ['deck-restart', 'deck-restart2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.onclick = function () { startDeck(deck.scope, deck.shuffle); };
    });

    var hard = document.getElementById('deck-hard');
    if (hard) {
      hard.onclick = function () {
        startDeck(deck.scope, deck.shuffle, deck.queue.filter(function (c) {
          return deck.marks[c.id] === 'learning';
        }));
      };
    }

    Array.prototype.forEach.call(main.querySelectorAll('[data-nav]'), function (btn) {
      btn.onclick = function () { goCard(parseInt(btn.getAttribute('data-nav'), 10)); };
    });
    Array.prototype.forEach.call(main.querySelectorAll('[data-mark]'), function (btn) {
      btn.onclick = function () { markCard(btn.getAttribute('data-mark')); };
    });
  }

  /* Quizlet-style keys, live only while a deck is on screen. */
  document.addEventListener('keydown', function (event) {
    if (ui.view !== 'cards' || !ui.cards) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var tag = (event.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

    var deck = ui.cards;
    var onCard = deck.at < deck.queue.length;

    if (event.key === 'ArrowRight') { event.preventDefault(); goCard(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); goCard(-1); }
    else if (onCard && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      deck.flipped = !deck.flipped;
      render();
    } else if (onCard && event.key === '1') { event.preventDefault(); markCard('learning'); }
    else if (onCard && event.key === '2') { event.preventDefault(); markCard('known'); }
  });

  /* ------------------------------------------------------------------- quiz */

  function questionPool(scope) {
    if (scope === 'hy') return QUESTIONS.filter(function (q) { return OBJ_BY_ID[q.lo].highYield; });
    if (scope === 'weak') return weakQuestions();
    if (scope === 'guide') return QUESTIONS.filter(function (q) { return q.src === 'guide'; });
    if (scope && scope.indexOf('m') === 0) {
      return QUESTIONS.filter(function (q) { return OBJ_BY_ID[q.lo].module === scope; });
    }
    return QUESTIONS.slice();
  }

  /* Two ways to sit it. Practice reveals the answer as you go and locks each
   * question once you have seen it. Test lets you answer, change your mind and
   * roam until you submit — nothing is scored or recorded until then. */
  function startQuiz(scope, size, mode, only) {
    var pool = shuffled(only || questionPool(scope));
    if (size > 0) pool = pool.slice(0, size);
    ui.quiz = {
      scope: scope, size: size, mode: mode, queue: pool,
      at: 0, picks: {}, locked: {}, graded: false,
    };
    render();
  }

  function commitAnswer(question, picked) {
    var rec = progress.questions[question.id] || { seen: 0, right: 0, lastWrong: false };
    rec.seen++;
    if (picked === question.a) rec.right++;
    rec.lastWrong = picked !== question.a;
    progress.questions[question.id] = rec;
  }

  function pickAnswer(index) {
    var quiz = ui.quiz;
    if (!quiz || quiz.graded) return;
    if (quiz.mode === 'practice' && quiz.locked[quiz.at]) return;

    quiz.picks[quiz.at] = index;
    if (quiz.mode === 'practice') {
      quiz.locked[quiz.at] = true;
      commitAnswer(quiz.queue[quiz.at], index);   // practice answers are final
      save();
    }
    render();
  }

  function goQuestion(delta) {
    var quiz = ui.quiz;
    if (!quiz) return;
    var next = Math.max(0, Math.min(quiz.queue.length - 1, quiz.at + delta));
    if (next === quiz.at) return;
    quiz.at = next;
    render();
  }

  function quizScore() {
    var quiz = ui.quiz;
    var right = 0, answered = 0;
    quiz.queue.forEach(function (q, i) {
      if (quiz.picks[i] === undefined) return;
      answered++;
      if (quiz.picks[i] === q.a) right++;
    });
    return { right: right, answered: answered };
  }

  function finishQuiz() {
    var quiz = ui.quiz;
    if (!quiz || quiz.graded) return;
    /* Practice already recorded each answer as it was given; a test records
     * everything now, so changing your mind mid-test costs nothing. */
    if (quiz.mode === 'test') {
      quiz.queue.forEach(function (q, i) {
        if (quiz.picks[i] !== undefined) commitAnswer(q, quiz.picks[i]);
      });
    }
    quiz.graded = true;
    progress.sessions.unshift({
      t: Date.now(), mode: 'quiz', scope: quiz.scope,
      score: quizScore().right, total: quiz.queue.length,
    });
    progress.sessions = progress.sessions.slice(0, 50);
    save();
    render();
  }

  function renderQuizSetup(main) {
    var weak = weakQuestions().length;
    main.innerHTML = '<div class="wrap"><div class="view-head"><h2>Quiz</h2>' +
      '<p>' + QUESTIONS.length + ' questions across all 32 objectives, including the five from your ' +
      'high-yield guide. Every answer traces back to a fact in the lectures or the guide.</p></div>' +
      '<div class="scope">' +
      '<label for="q-scope">Scope</label><select id="q-scope">' +
      '<option value="all">Everything (' + QUESTIONS.length + ')</option>' +
      '<option value="hy">High-yield objectives only</option>' +
      '<option value="weak"' + (weak ? '' : ' disabled') + '>Weak spots (' + weak + ')</option>' +
      '<option value="guide">The guide’s own 5 questions</option>' +
      MODULES.map(function (m) {
        return '<option value="' + m.id + '">Module ' + m.num + ' — ' + esc(m.short) + '</option>';
      }).join('') + '</select>' +
      '<label for="q-size">Length</label><select id="q-size">' +
      '<option value="10">10 questions</option><option value="20">20 questions</option>' +
      '<option value="0">All of them</option></select></div>' +

      '<div class="modes">' +
      '<button class="modecard" data-mode="practice"><strong>Practice</strong>' +
      '<span>See the answer and the explanation as soon as you pick. Good for learning it.</span></button>' +
      '<button class="modecard" data-mode="test"><strong>Test</strong>' +
      '<span>Answer everything first, change your mind freely, then submit and get marked. ' +
      'Good for checking you are ready.</span></button></div></div>';

    Array.prototype.forEach.call(main.querySelectorAll('[data-mode]'), function (btn) {
      btn.onclick = function () {
        startQuiz(
          document.getElementById('q-scope').value,
          parseInt(document.getElementById('q-size').value, 10),
          btn.getAttribute('data-mode')
        );
      };
    });
  }

  function renderQuiz(main) {
    var quiz = ui.quiz;
    if (!quiz) return renderQuizSetup(main);
    if (quiz.graded) return renderQuizResults(main);

    var total = quiz.queue.length;
    var question = quiz.queue[quiz.at];
    var objective = OBJ_BY_ID[question.lo];
    var module = MOD_BY_ID[objective.module];
    var picked = quiz.picks[quiz.at];
    var reveal = quiz.mode === 'practice' && quiz.locked[quiz.at];
    var score = quizScore();

    var html = '<div class="wrap"><div class="q-top">' +
      '<span class="chip">' + esc(module.short) + ' · ' + module.num + '.' + objective.num + '</span>' +
      '<span class="count">' + (quiz.at + 1) + ' / ' + total +
      (quiz.mode === 'test' ? ' · ' + score.answered + ' answered' : '') + '</span></div>' +
      '<div class="bar" style="margin-bottom:18px"><span style="width:' +
      Math.round(((quiz.at + 1) / total) * 100) + '%"></span></div>' +
      (question.src === 'guide' ? '<p><span class="chip hy">From your guide</span></p>' : '') +
      '<h2 class="q-stem">' + esc(question.q) + '</h2><div class="choices">';

    question.c.forEach(function (choice, i) {
      var cls = 'choice';
      if (reveal && i === question.a) cls += ' right';
      else if (reveal && i === picked) cls += ' wrong';
      else if (!reveal && i === picked) cls += ' picked';
      html += '<button class="' + cls + '" data-pick="' + i + '"' + (reveal ? ' disabled' : '') + '>' +
        '<span class="k">' + 'ABCD'[i] + '</span><span>' + esc(choice) + '</span></button>';
    });
    html += '</div>';

    if (reveal) {
      var right = picked === question.a;
      html += '<div class="why ' + (right ? 'right' : 'wrong') + '">' +
        '<span class="label">' + (right ? 'Correct' : 'Not quite') + '</span>' + esc(question.why) +
        ' <button class="btn small" data-open="' + objective.id + '" style="margin-left:6px">' +
        'Read the objective</button></div>';
    }

    /* A test shows every question's state at a glance and lets you jump straight
     * to the ones you skipped. */
    if (quiz.mode === 'test') {
      html += '<div class="qgrid">' + quiz.queue.map(function (q, i) {
        var cls = 'qcell' + (quiz.picks[i] !== undefined ? ' done' : '') + (i === quiz.at ? ' at' : '');
        return '<button class="' + cls + '" data-jump="' + i + '" aria-label="Question ' + (i + 1) + '">' +
          (i + 1) + '</button>';
      }).join('') + '</div>';
    }

    html += '<div class="navrow q-nav">' +
      '<button class="btn nav" data-qnav="-1"' + (quiz.at === 0 ? ' disabled' : '') +
      ' aria-label="Previous question">←</button>' +
      '<button class="btn nav" data-qnav="1"' + (quiz.at === total - 1 ? ' disabled' : '') +
      ' aria-label="Next question">→</button>' +
      (quiz.mode === 'test'
        ? '<button class="btn primary" id="q-submit">Submit' +
          (score.answered < total ? ' (' + (total - score.answered) + ' unanswered)' : '') + '</button>'
        : '<button class="btn primary" id="q-submit"' + (quiz.at === total - 1 ? '' : ' hidden') +
          '>See results</button>') +
      '<button class="btn" id="q-new">New quiz</button></div></div>';

    main.innerHTML = html;

    Array.prototype.forEach.call(main.querySelectorAll('[data-pick]'), function (btn) {
      btn.onclick = function () { pickAnswer(parseInt(btn.getAttribute('data-pick'), 10)); };
    });
    Array.prototype.forEach.call(main.querySelectorAll('[data-qnav]'), function (btn) {
      btn.onclick = function () { goQuestion(parseInt(btn.getAttribute('data-qnav'), 10)); };
    });
    Array.prototype.forEach.call(main.querySelectorAll('[data-jump]'), function (btn) {
      btn.onclick = function () { quiz.at = parseInt(btn.getAttribute('data-jump'), 10); render(); };
    });
    document.getElementById('q-submit').onclick = finishQuiz;
    document.getElementById('q-new').onclick = function () { ui.quiz = null; render(); };
  }

  function renderQuizResults(main) {
    var quiz = ui.quiz;
    var total = quiz.queue.length;
    var score = quizScore();
    var missed = quiz.queue.filter(function (q, i) { return quiz.picks[i] !== q.a; });

    var html = '<div class="wrap"><div class="view-head"><h2>Results</h2></div>' +
      '<div class="card" style="padding:22px 24px;margin-bottom:24px">' +
      '<div class="score">' + score.right + '<span style="color:var(--ink-3)">/' + total + '</span></div>' +
      '<p class="label" style="margin-top:6px">' + Math.round((score.right / total) * 100) + '% correct' +
      (score.answered < total ? ' · ' + (total - score.answered) + ' left blank' : '') + '</p></div>';

    html += '<h3 style="margin-bottom:10px">Every question</h3><div class="weak">';
    quiz.queue.forEach(function (q, i) {
      var picked = quiz.picks[i];
      var right = picked === q.a;
      var objective = OBJ_BY_ID[q.lo];
      var module = MOD_BY_ID[objective.module];
      html += '<div class="miss"><div style="display:flex;gap:9px;align-items:flex-start">' +
        '<span class="chip ' + (right ? 'known' : 'hy') + '">' + (right ? '✓' : '✗') + '</span>' +
        '<strong>' + esc(q.q) + '</strong></div>' +
        '<div class="line">' + (picked === undefined
          ? '<span class="yours">Left blank</span>'
          : 'You chose <span class="' + (right ? 'theirs' : 'yours') + '">' + esc(q.c[picked]) + '</span>') +
        (right ? '' : ' · Answer: <span class="theirs">' + esc(q.c[q.a]) + '</span>') + '</div>' +
        (right ? '' : '<div class="line" style="color:var(--ink-2)">' + esc(q.why) + '</div>') +
        '<div style="margin-top:8px"><button class="btn small" data-open="' + objective.id + '">' +
        esc(module.short) + ' · objective ' + module.num + '.' + objective.num + '</button></div></div>';
    });
    html += '</div><div class="obj-actions" style="margin-top:22px">' +
      (missed.length ? '<button class="btn primary" id="q-retry">Retake the ' + missed.length +
        ' you missed</button>' : '') +
      '<button class="btn" id="q-again">Same quiz again</button>' +
      '<button class="btn" id="q-new">New quiz</button></div></div>';

    main.innerHTML = html;
    var retry = document.getElementById('q-retry');
    if (retry) retry.onclick = function () { startQuiz(quiz.scope, 0, quiz.mode, missed); };
    document.getElementById('q-again').onclick = function () {
      startQuiz(quiz.scope, quiz.size, quiz.mode);
    };
    document.getElementById('q-new').onclick = function () { ui.quiz = null; render(); };
  }

  /* Same key scheme as the flashcards: arrows move, digits answer. */
  document.addEventListener('keydown', function (event) {
    if (ui.view !== 'quiz' || !ui.quiz || ui.quiz.graded) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var tag = (event.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

    if (event.key === 'ArrowRight') { event.preventDefault(); goQuestion(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); goQuestion(-1); }
    else if (event.key === 'Enter') {
      event.preventDefault();
      if (ui.quiz.at === ui.quiz.queue.length - 1) finishQuiz(); else goQuestion(1);
    } else if ('1234'.indexOf(event.key) > -1) {
      event.preventDefault();
      pickAnswer(parseInt(event.key, 10) - 1);
    } else if ('abcdABCD'.indexOf(event.key) > -1 && event.key.length === 1) {
      event.preventDefault();
      pickAnswer('abcd'.indexOf(event.key.toLowerCase()));
    }
  });

  /* ----------------------------------------------------------------- recall */

  function renderRecall(main) {
    var chosen = ui.recall.objective ? OBJ_BY_ID[ui.recall.objective] : null;

    var html = '<div class="wrap"><div class="view-head"><h2>Recall</h2>' +
      '<p>Say everything you can about one objective without looking, then have it marked against ' +
      'the lecture facts. Harder than recognising an answer, and it sticks better.</p></div>' +
      '<div class="scope"><label for="r-obj">Objective</label><select id="r-obj">' +
      '<option value="">Choose an objective…</option>' +
      MODULES.map(function (m) {
        return '<optgroup label="Module ' + m.num + ' — ' + esc(m.short) + '">' +
          objectivesIn(m.id).map(function (o) {
            return '<option value="' + o.id + '"' + (chosen && chosen.id === o.id ? ' selected' : '') + '>' +
              m.num + '.' + o.num + ' ' + esc(o.text) + (o.highYield ? ' ★' : '') + '</option>';
          }).join('') + '</optgroup>';
      }).join('') + '</select>' +
      '<button class="btn small" id="r-random">Pick one for me</button></div>';

    if (!chosen) {
      main.innerHTML = html + '<p class="empty">Objectives marked ★ are the ones your high-yield guide covers.</p></div>';
      wireRecall();
      return;
    }

    html += '<div class="recall"><h3 style="margin-bottom:10px">' + esc(chosen.text) + '</h3>' +
      '<textarea id="r-text" placeholder="Write what you remember — terms, order of events, the exceptions…"></textarea>' +
      '<div class="obj-actions">' +
      '<button class="btn primary" id="r-grade">Mark my answer</button>' +
      '<button class="btn" id="r-reveal">Just show me the answer</button>' +
      '<button class="btn" data-open="' + chosen.id + '">Read the objective</button></div>' +
      '<div class="verdict" id="r-verdict" hidden></div></div></div>';

    main.innerHTML = html;
    wireRecall();

    var verdict = document.getElementById('r-verdict');
    document.getElementById('r-reveal').onclick = function () {
      verdict.hidden = false;
      verdict.innerHTML = '<span class="label">Model answer</span>' +
        esc(chosen.mustRemember || '') + '\n\n' +
        chosen.essentials.map(function (e) { return '• ' + (e.t ? e.t + ' — ' : '') + e.d; }).join('\n');
    };
    document.getElementById('r-grade').onclick = function () {
      var written = document.getElementById('r-text').value.trim();
      if (!written) { document.getElementById('r-text').focus(); return; }
      ask(verdict,
        'You are marking a medical student\'s free-recall answer for a course learning objective.\n\n' +
        objectiveBrief(chosen) + '\n\nThe student wrote:\n"""\n' + written + '\n"""\n\n' +
        'Reply in this shape:\nVerdict: Solid / Partial / Needs work\nGot right: ...\nMissed: ...\n\n' +
        'Judge only against the course facts above and never introduce facts beyond them. ' +
        'Be specific about what was missed. Under 150 words.');
    };
  }

  function wireRecall() {
    var select = document.getElementById('r-obj');
    if (select) {
      select.onchange = function () {
        ui.recall.objective = select.value || null;
        render();
      };
    }
    var random = document.getElementById('r-random');
    if (random) {
      random.onclick = function () {
        var pool = OBJECTIVES.filter(function (o) { return objectiveState(o.id) !== 'known'; });
        if (!pool.length) pool = OBJECTIVES;
        ui.recall.objective = pool[Math.floor(Math.random() * pool.length)].id;
        render();
      };
    }
  }

  /* --------------------------------------------------------------- progress */

  function renderProgress(main) {
    var known = knownCount();
    var answered = 0, correct = 0;
    Object.keys(progress.questions).forEach(function (id) {
      answered += progress.questions[id].seen;
      correct += progress.questions[id].right;
    });
    var reviewed = Object.keys(progress.cards).length;
    var accuracy = answered ? Math.round((correct / answered) * 100) + '%' : '—';

    var html = '<div class="wrap wide"><div class="view-head"><h2>Progress</h2>' +
      '<p>Mastery is tracked per objective. Objectives with a pink underline are the ones ' +
      'your high-yield guide covers.</p></div>' +
      '<div class="tiles">' +
      '<div class="tile"><div class="n">' + known + '/' + OBJECTIVES.length + '</div><span class="label">Objectives known</span></div>' +
      '<div class="tile"><div class="n">' + accuracy + '</div><span class="label">Quiz accuracy</span></div>' +
      '<div class="tile"><div class="n">' + answered + '</div><span class="label">Questions answered</span></div>' +
      '<div class="tile"><div class="n">' + reviewed + '/' + CARDS.length + '</div><span class="label">Cards seen</span></div>' +
      '</div>';

    html += '<h3 style="margin-bottom:12px">Mastery map</h3><div class="map">';
    MODULES.forEach(function (m) {
      html += '<div class="map-mod"><div class="name"><strong>Module ' + m.num + '</strong><br>' +
        esc(m.short) + '</div><div class="map-cells">';
      objectivesIn(m.id).forEach(function (o) {
        var stats = questionStats(o.id);
        var cls = 'map-cell';
        if (objectiveState(o.id) === 'known') cls += ' known';
        else if (stats.seen) cls += ' seen';
        if (o.highYield) cls += ' hy';
        html += '<button class="' + cls + '" data-open="' + o.id + '" title="' + esc(o.text) + '">' +
          m.num + '.' + o.num + '</button>';
      });
      html += '</div></div>';
    });
    html += '</div>';

    var weak = OBJECTIVES.map(function (o) {
      var stats = questionStats(o.id);
      return { o: o, stats: stats, pct: stats.seen ? stats.right / stats.seen : 1 };
    }).filter(function (row) { return row.stats.seen >= 2 && row.pct < 0.8; })
      .sort(function (a, b) { return a.pct - b.pct; });

    html += '<h3 style="margin:28px 0 4px">Weak spots</h3>';
    if (weak.length) {
      html += '<p style="color:var(--ink-2);margin-bottom:10px">Objectives you are getting wrong most often.</p><div class="weak">';
      weak.forEach(function (row) {
        var m = MOD_BY_ID[row.o.module];
        html += '<div class="weak-row"><button data-open="' + row.o.id + '">' +
          '<span class="label">' + m.num + '.' + row.o.num + '</span> ' + esc(row.o.text) + '</button>' +
          '<span class="pct">' + row.stats.right + '/' + row.stats.seen + '</span></div>';
      });
      html += '</div>';
    } else {
      html += '<p class="empty">Answer a few quiz questions and the objectives you keep missing will collect here.</p>';
    }

    if (progress.sessions.length) {
      html += '<h3 style="margin:28px 0 10px">Recent quizzes</h3><div class="weak">';
      progress.sessions.slice(0, 8).forEach(function (s) {
        var when = new Date(s.t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        html += '<div class="weak-row"><span>' + when + ' · ' + esc(scopeName(s.scope)) + '</span>' +
          '<span class="pct" style="color:var(--ink-2)">' + s.score + '/' + s.total + '</span></div>';
      });
      html += '</div>';
    }

    html += '<div class="obj-actions" style="margin-top:30px">' +
      '<button class="btn small" id="reset">Reset all progress</button></div></div>';
    main.innerHTML = html;

    document.getElementById('reset').onclick = function () {
      if (!window.confirm('Clear every mark, card schedule and quiz result? This cannot be undone.')) return;
      progress = JSON.parse(JSON.stringify(BLANK));
      ui.cards = null;
      ui.quiz = null;
      save();
      render();
    };
  }

  function scopeName(scope) {
    if (scope === 'all') return 'Everything';
    if (scope === 'hy') return 'High-yield';
    if (scope === 'weak') return 'Weak spots';
    if (scope === 'guide') return 'Guide questions';
    if (MOD_BY_ID[scope]) return 'Module ' + MOD_BY_ID[scope].num;
    var objective = OBJ_BY_ID[scope];          // a single-objective drill
    if (objective) return 'Objective ' + MOD_BY_ID[objective.module].num + '.' + objective.num;
    return scope;
  }

  /* ---------------------------------------------------------------- events */

  document.addEventListener('click', function (event) {
    var target = event.target.closest('[data-go],[data-obj],[data-known],[data-explain],[data-newq],[data-drill],[data-open]');
    if (!target) return;

    var view = target.getAttribute('data-go');
    if (view) return go(view);

    var open = target.getAttribute('data-open');
    if (open) {
      ui.openObjective = open;
      ui.view = 'learn';
      render();
      var el = document.querySelector('[data-obj="' + open + '"]');
      if (el) el.scrollIntoView({ block: 'center' });
      return;
    }

    var toggle = target.getAttribute('data-obj');
    if (toggle) {
      ui.openObjective = ui.openObjective === toggle ? null : toggle;
      return render();
    }

    var known = target.getAttribute('data-known');
    if (known) {
      progress.objectives[known] = objectiveState(known) === 'known' ? 'learning' : 'known';
      save();
      return render();
    }

    var drill = target.getAttribute('data-drill');
    if (drill) {
      ui.view = 'quiz';
      window.scrollTo(0, 0);
      return startQuiz(drill, 0, 'practice', QUESTIONS.filter(function (q) {
        return q.lo === drill;
      }));
    }

    var explain = target.getAttribute('data-explain');
    if (explain) {
      var o1 = OBJ_BY_ID[explain];
      return ask(document.getElementById('tutor-' + explain),
        'Re-explain this learning objective for a student who finds it confusing. Plain language, ' +
        'concrete, under 130 words. Stay strictly inside the course facts given — add nothing beyond them.\n\n' +
        objectiveBrief(o1));
    }

    var newq = target.getAttribute('data-newq');
    if (newq) {
      var o2 = OBJ_BY_ID[newq];
      return ask(document.getElementById('tutor-' + newq),
        'Write one new multiple-choice practice question for this objective, using ONLY the course facts ' +
        'given. Give the question, then options A to D on separate lines, then "Answer: X" and one ' +
        'sentence of explanation.\n\n' + objectiveBrief(o2));
    }
  });

  /* ------------------------------------------------------------------- boot */

  document.getElementById('total-objectives').textContent = OBJECTIVES.length;
  setSync(false);
  render();
  connectStore();
})();
