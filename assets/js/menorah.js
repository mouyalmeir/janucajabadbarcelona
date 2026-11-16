/* ==========================================================================
   Janukiá
   - En la portada hay dos:
       · #menorah (hero): la entrada al deslizar. Decorativa: se enciende sola.
       · #menorah-tool (sección «Enciende tu janukiá»): interactiva, con los
         controles, el selector de noches y el panel de cada noche.
   - Cada noche muestra las velas que tocan (se colocan de derecha a izquierda).
   - Primero se enciende el shamash; después las velas de IZQUIERDA a DERECHA,
     empezando por la vela nueva de esa noche.
   - Por defecto abre la noche que corresponde a hoy (hora de Barcelona).
     Para probar: ?noche=5  o  ?fecha=2026-12-08T19:00
   ========================================================================== */
(function () {
  'use strict';
  var D = window.JANUCA;
  var heroStage = document.getElementById('menorah');
  var toolStage = document.getElementById('menorah-tool');
  if (!D || (!heroStage && !toolStage)) return;

  var NS = 'http://www.w3.org/2000/svg';
  var CX = 400, CUP = 250, GAP = 86, SLOPE = 0.55, SH_CUP = 166, CH = 78;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var today = D.status();

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function posX(i) { return i <= 4 ? CX - (5 - i) * GAP : CX + (i - 4) * GAP; }
  function armK(i) { return i <= 4 ? 5 - i : i - 4; }
  function flamePath(x, y, w, h) {
    return 'M' + x + ',' + y +
      'C' + (x - w) + ',' + y + ' ' + (x - w * .95) + ',' + (y - h * .42) + ' ' + x + ',' + (y - h) +
      'C' + (x + w * .95) + ',' + (y - h * .42) + ' ' + (x + w) + ',' + y + ' ' + x + ',' + y + 'Z';
  }
  function blessingsText(arr) { return arr.length === 3 ? '1, 2 y 3' : arr.join(' y '); }
  function nightData(n) { return D.nights[n - 1]; }
  function dateLabel(nd) { var p = D.parse(nd.date); return D.weekday(nd.date) + ' ' + p.d + ' de ' + D.months[p.m - 1]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  var ICO = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    candle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 7v13M3 9l9 6M6 9l6 4M21 9l-9 6M18 9l-6 4M8 21h8M12 2.5v2"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.5 3 5 5.2 5 10a5 5 0 0 1-10 0c0-2.4 1.1-3.9 2.4-5.2.2 1.6.9 2.7 2 3.2C11 7.6 11 4.6 12 2z"/></svg>'
  };

  /* ---------- Una janukiá (opts.ui = controles; sin ellos es decorativa) ---------- */
  function create(stage, opts) {
    var ui = opts.ui || null;

    /* ----- SVG ----- */
    var svg = el('svg', ui
      ? { viewBox: '0 0 800 500', role: 'group', 'aria-label': 'Janukiá interactiva: toca las velas para encenderlas' }
      : { viewBox: '0 0 800 500', role: 'img', 'aria-label': 'Janukiá con las velas de esta noche' });
    var defs = el('defs', {}, svg);
    defs.innerHTML =
      '<linearGradient id="goldU" gradientUnits="userSpaceOnUse" x1="0" y1="120" x2="800" y2="500">' +
        '<stop offset="0" stop-color="#8a5a18"/><stop offset=".22" stop-color="#f2c46d"/><stop offset=".38" stop-color="#fff1c1"/>' +
        '<stop offset=".5" stop-color="#d9a24a"/><stop offset=".64" stop-color="#ffe6a6"/><stop offset=".82" stop-color="#c98a2e"/><stop offset="1" stop-color="#7a4d12"/></linearGradient>' +
      '<linearGradient id="wax" x1="0" x2="1"><stop offset="0" stop-color="#cbbd9e"/><stop offset=".38" stop-color="#fffaf0"/><stop offset="1" stop-color="#bfae8a"/></linearGradient>' +
      '<linearGradient id="waxSh" x1="0" x2="1"><stop offset="0" stop-color="#9fb4e8"/><stop offset=".38" stop-color="#f1f5ff"/><stop offset="1" stop-color="#8da1d6"/></linearGradient>' +
      '<radialGradient id="flameO" cx=".5" cy=".86" r=".78" fx=".5" fy=".92"><stop offset="0" stop-color="#fffbe6"/><stop offset=".28" stop-color="#ffe08a"/>' +
        '<stop offset=".6" stop-color="#ffab2e"/><stop offset=".86" stop-color="#ff6a00" stop-opacity=".85"/><stop offset="1" stop-color="#ff4d00" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="flameI" cx=".5" cy=".8" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fff6c8"/><stop offset="1" stop-color="#fff0b4" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="haloG"><stop offset="0" stop-color="#ffd678" stop-opacity=".55"/><stop offset=".4" stop-color="#ffaa3c" stop-opacity=".18"/><stop offset="1" stop-color="#ff9632" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="floorG"><stop offset="0" stop-color="#ffb347" stop-opacity=".28"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>';

    var gFloor = el('ellipse', { cx: CX, cy: 482, rx: 330, ry: 26, fill: 'url(#floorG)' }, svg);
    gFloor.style.transition = 'opacity .9s';
    var gMetal = el('g', {}, svg);
    // brazos diagonales rectos (estilo Jabad)
    for (var i = 1; i <= 8; i++) {
      var k = armK(i);
      el('path', { class: 'arm', d: 'M' + posX(i) + ',' + (CUP + 6) + 'L' + CX + ',' + (CUP + k * GAP * SLOPE) }, gMetal);
    }
    el('rect', { class: 'metal', x: CX - 7, y: SH_CUP + 4, width: 14, height: 462 - SH_CUP, rx: 5 }, gMetal);
    for (k = 1; k <= 4; k++) el('circle', { class: 'metal', cx: CX, cy: CUP + k * GAP * SLOPE, r: 9 }, gMetal);
    el('path', { class: 'metal', d: 'M340,482 Q400,436 460,482 Z' }, gMetal);
    el('rect', { class: 'metal', x: 318, y: 478, width: 164, height: 9, rx: 4.5 }, gMetal);

    var gCandles = el('g', {}, svg);
    var gCups = el('g', {}, svg);
    var gOrder = el('g', {}, svg);
    var gFx = el('g', {}, svg);

    function makeCandle(id, x, cupY, isSh) {
      var top = cupY - CH;
      var g = el('g', ui ? { class: 'candle absent', 'data-id': id, tabindex: '-1', role: 'button' } : { class: 'candle absent' }, gCandles);
      g.style.transformOrigin = x + 'px ' + cupY + 'px';
      el('circle', { class: 'halo', cx: x, cy: top - 26, r: 62, fill: 'url(#haloG)' }, g);
      el('rect', { class: 'ring', x: x - 31, y: top - 56, width: 62, height: CH + 66, rx: 26 }, g);
      el('rect', { x: x - 11, y: top, width: 22, height: CH + 4, rx: 3, fill: isSh ? 'url(#waxSh)' : 'url(#wax)' }, g);
      el('path', { d: 'M' + (x - 11) + ',' + (top + 3) + 'q4,10 7,0', fill: isSh ? '#f1f5ff' : '#fffaf0', opacity: '.9' }, g);
      el('line', { class: 'wick', x1: x, y1: top, x2: x, y2: top - 8 }, g);
      var fg = el('g', { class: 'flame-g' }, g);
      fg.style.transformOrigin = x + 'px ' + (top - 3) + 'px';
      var fl = el('g', { class: 'flame' }, fg);
      fl.style.transformOrigin = x + 'px ' + (top - 3) + 'px';
      fl.style.animationDelay = (-Math.random() * 1.2).toFixed(2) + 's';
      fl.style.animationDuration = (1.05 + Math.random() * .5).toFixed(2) + 's';
      el('path', { d: flamePath(x, top - 2, 13, 46), fill: 'url(#flameO)' }, fl);
      el('path', { d: flamePath(x, top - 4, 6, 24), fill: 'url(#flameI)' }, fl);
      el('ellipse', { cx: x, cy: top - 5, rx: 4, ry: 3, fill: '#7fb2ff', opacity: '.7' }, fl);
      // copa
      el('path', { class: 'metal', d: 'M' + (x - 18) + ',' + (cupY - 2) + 'L' + (x + 18) + ',' + (cupY - 2) + 'L' + (x + 11) + ',' + (cupY + 11) + 'L' + (x - 11) + ',' + (cupY + 11) + 'Z' }, gCups);
      el('rect', { class: 'metal', x: x - 20, y: cupY - 5, width: 40, height: 5, rx: 2.5 }, gCups);
      return { id: id, x: x, top: top, g: g };
    }

    var shamash = makeCandle('sh', CX, SH_CUP, true);
    shamash.g.classList.remove('absent');
    if (ui) shamash.g.setAttribute('aria-label', 'Shamash (vela auxiliar)');
    var candles = {};
    var orderMarks = {};
    for (i = 1; i <= 8; i++) {
      candles[i] = makeCandle(i, posX(i), CUP, false);
      var om = el('g', { class: 'order' }, gOrder);
      el('circle', { cx: posX(i), cy: CUP + 32, r: 12 }, om);
      var t = el('text', { x: posX(i), y: CUP + 32.5 }, om);
      orderMarks[i] = { g: om, t: t };
    }
    stage.appendChild(svg);
    if (!ui) stage.classList.add('is-deco');

    var scene = stage.closest('.menorah-scene') || stage;
    var statusEl = ui && ui.status, pickerEl = ui && ui.picker, panelEl = ui && ui.panel;
    var btnNext = ui && ui.next, btnAll = ui && ui.all, btnReset = ui && ui.reset;
    var state = { night: 1, order: [], step: 0, busy: false, token: 0, auto: false };

    /* ----- Selector de noches (con fecha hebrea y eventos) ----- */
    if (pickerEl) D.nights.forEach(function (nd) {
      var b = document.createElement('button');
      var ev = D.eventForNight(nd.n);
      var p = D.parse(nd.date);
      b.type = 'button';
      b.className = 'night-btn' + (ev ? ' has-event' : '');
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<b>' + nd.n + '</b><span class="nb-d">' + D.weekday(nd.date).slice(0, 3) + ' ' + p.d + '</span>' +
        '<span class="nb-h">' + nd.hebrew.replace(' de ', ' ') + '</span>' +
        (ev ? '<i class="ev-dot" aria-hidden="true"></i>' : '');
      b.setAttribute('aria-label', D.ord[nd.n] + ' noche, ' + dateLabel(nd) + ', ' + nd.hebrew + (ev ? '. Encendido público: ' + ev.place : ''));
      if (ev) b.title = 'Encendido público: ' + ev.place + ', ' + ev.start + ' h';
      if ((today.phase === 'during' || today.phase === 'last') && today.night === nd.n) {
        b.insertAdjacentHTML('afterbegin', '<span class="tag">' + (today.phase === 'last' ? 'Última' : 'Hoy') + '</span>');
      }
      b.addEventListener('click', function () { setNight(nd.n); });
      pickerEl.appendChild(b);
    });

    /* ----- Núcleo ----- */
    function setNight(n) {
      state.token++;
      state.busy = false;
      state.auto = false;
      state.night = n;
      state.order = [];
      for (var p = 9 - n; p <= 8; p++) state.order.push(p); // la nueva (la de hoy) es la de la izquierda
      state.step = 0;
      shamash.g.classList.remove('lit');
      for (var i = 1; i <= 8; i++) {
        var on = i >= 9 - n;
        candles[i].g.classList.toggle('absent', !on);
        candles[i].g.classList.remove('lit');
        if (ui) candles[i].g.setAttribute('aria-label', on ? 'Vela ' + (i - (9 - n) + 1) + ' de ' + n : '');
        orderMarks[i].g.classList.toggle('show', on);
        orderMarks[i].g.classList.remove('done', 'is-next');
        orderMarks[i].t.textContent = on ? (i - (9 - n) + 1) : '';
      }
      if (pickerEl) [].forEach.call(pickerEl.children, function (b, idx) { b.setAttribute('aria-pressed', String(idx + 1 === n)); });
      renderPanel(nightData(n));
      refresh();
    }

    function renderPanel(nd) {
      if (!panelEl) return;
      var n = nd.n, ev = D.eventForNight(n);
      var bl = D.blessings.map(function (b) {
        var off = nd.blessings.indexOf(b.n) < 0;
        return '<li' + (off ? ' class="off"' : '') + '><button type="button" data-bless="' + b.n + '"><b>' + b.n + '</b>' + b.name +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></li>';
      }).join('') + (D.songs || []).map(function (t) {
        return '<li class="song-item"><button type="button" data-text="' + t.key + '"><b>♪</b>' + t.name +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></li>';
      }).join('');
      panelEl.innerHTML =
        '<div class="np-card"><h4>' + ICO.cal + D.ord[n] + ' noche</h4>' +
          '<p class="np-big">' + cap(dateLabel(nd)) + '</p>' +
          '<p>Noche del ' + nd.hebrew + ' de 5787</p>' +
          '<span class="np-time">' + nd.time + '</span>' +
          '<p' + (nd.alert ? ' class="np-alert"' : '') + '>' + (nd.alert || nd.note) + '</p></div>' +
        '<div class="np-card"><h4>' + ICO.candle + 'Cómo colocarlas</h4>' +
          '<p class="np-big">' + (n === 1 ? '1 vela' : n + ' velas') + ' + shamash</p>' +
          '<p>' + (n === 1
            ? 'La vela de hoy va en el extremo derecho de la janukiá. Enciende el shamash y, con él, la vela.'
            : 'Cada noche se añade una vela a la izquierda. Con el shamash, enciende primero <strong>la vela nueva, la de hoy</strong> (la que acabas de añadir) y sigue hacia la derecha.') + '</p></div>' +
        '<div class="np-card"><h4>' + ICO.book + 'Bendiciones y cantos</h4><ul class="blessing-list">' + bl + '</ul>' +
          '<p class="np-small">Toca una para leerla o cantarla.</p></div>' +
        '<div class="np-card np-light"><h4>' + ICO.spark + 'Suma tu luz</h4>' +
          '<p class="np-quote">«' + nd.thought + '»</p><p>' + nd.idea + '</p>' +
          (ev ? '<a class="np-event" href="eventos#' + ev.id + '"><img src="assets/img/' + ev.art + '.svg" alt="" width="48" height="48" loading="lazy"><span><small>Encendido público · ' + ev.start + ' h</small><span class="loc">' + ev.place + '</span> · ' + ev.city + '</span></a>' : '') +
        '</div>';
      revealCards();
    }

    // Cada tarjeta aparece cuando entra en pantalla (en móvil, una a una al deslizar)
    var cardIO = (panelEl && 'IntersectionObserver' in window && !reduce) ? new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (en) { return en.isIntersecting; });
      batch.forEach(function (en, i) {
        en.target.style.transitionDelay = (i * 0.09).toFixed(2) + 's'; // escalonado si entran a la vez
        en.target.classList.add('in');
        cardIO.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .15 }) : null;
    function revealCards() {
      [].forEach.call(panelEl.querySelectorAll('.np-card'), function (c) {
        c.classList.add('np-reveal');
        if (cardIO) cardIO.observe(c); else c.classList.add('in');
      });
    }

    function expected() { return state.step === 0 ? 'sh' : state.order[state.step - 1]; }
    function done() { return state.step > state.order.length; }

    function refresh() {
      // en la decorativa no se marca la vela siguiente: no se puede tocar
      var guide = !!ui && !state.auto;
      shamash.g.classList.toggle('next', state.step === 0 && guide);
      if (ui) shamash.g.setAttribute('tabindex', state.step === 0 ? '0' : '-1');
      for (var i = 1; i <= 8; i++) {
        var isNext = !done() && expected() === i && guide;
        candles[i].g.classList.toggle('next', isNext);
        if (ui) candles[i].g.setAttribute('tabindex', isNext ? '0' : '-1');
        orderMarks[i].g.classList.toggle('is-next', isNext);
      }
      var lit = state.step;
      scene.style.setProperty('--lit', (lit / 9).toFixed(3));
      gFloor.style.opacity = .3 + .7 * (lit / 9);
      if (!statusEl) return;

      var n = state.night, nd = nightData(n);
      var html;
      if (state.auto && !done()) {
        html = '<strong>Encendiendo la ' + D.ord[n] + ' noche…</strong><span>Primero el shamash y después, de izquierda a derecha, empezando por la vela de hoy.</span>';
      } else if (state.step === 0) {
        html = '<strong>Paso 1 · Enciende el shamash</strong><span>Toca la vela central: con ella se encienden las demás.</span>';
      } else if (!done()) {
        var k = state.step;
        html = k === 1
          ? '<strong>Recita las bendiciones ' + blessingsText(nd.blessings) + '</strong><span>' + (n === 1
              ? 'Después enciende <b>la vela de hoy</b>, en el extremo derecho.'
              : 'Después enciende primero <b>la vela nueva, la de hoy</b>: la que has añadido esta noche, la de más a la izquierda.') + '</span>'
          : '<strong>Vela ' + k + ' de ' + n + '</strong><span>Sigue de izquierda a derecha.</span>';
      } else {
        html = '<strong>¡Jag Janucá Saméaj! ✦</strong><span>' + (n === 1 ? 'La primera vela brilla' : 'Las ' + n + ' velas de la ' + D.ord[n] + ' noche brillan') +
          '. Ahora se recita <a href="bendiciones#hanerot" data-text="hanerot">Hanerot Halalu</a>, el <a href="bendiciones#mizmor" data-text="mizmor">Mizmor Shir</a> y se canta <a href="bendiciones#maoz-tzur" data-text="maoz">Maoz Tzur</a>.' +
          (state.auto ? ' Pulsa <b>«Encenderla yo»</b> para hacerlo tú, vela a vela.' : '') + '</span>';
      }
      statusEl.innerHTML = html;
      if (btnNext) {
        btnNext.disabled = done() || state.auto;
        btnNext.querySelector('span').textContent = state.step === 0 ? 'Encender el shamash' : 'Encender la siguiente';
      }
    }

    function ignite(c) {
      c.g.classList.add('lit');
      c.g.classList.remove('next');
      if (c.id !== 'sh') orderMarks[c.id].g.classList.add('done');
    }

    function spark(to, cb) {
      if (reduce || !svg.animate) { cb(); return; }
      var s = el('g', {}, gFx);
      el('circle', { r: 16, fill: 'url(#haloG)' }, s);
      el('circle', { r: 3.5, fill: '#fffbe6' }, s);
      var x0 = shamash.x, y0 = shamash.top - 20, x1 = to.x, y1 = to.top - 10;
      var midY = Math.min(y0, y1) - 34, dur = 320 + Math.abs(x1 - x0) * .55, fired = false;
      function end() { if (fired) return; fired = true; if (s.parentNode) gFx.removeChild(s); cb(); }
      s.animate([
        { transform: 'translate(' + x0 + 'px,' + y0 + 'px)' },
        { transform: 'translate(' + (x0 + x1) / 2 + 'px,' + midY + 'px)' },
        { transform: 'translate(' + x1 + 'px,' + y1 + 'px)' }
      ], { duration: dur, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).onfinish = end;
      setTimeout(end, dur + 80); // por si la animación se pausa
    }

    // Un fueguito baja lentamente desde arriba, oscilando, y enciende el shamash
    function descend(cb) {
      if (reduce || !svg.animate) { cb(); return; }
      var g = el('g', {}, gFx);
      el('circle', { r: 36, fill: 'url(#haloG)' }, g);
      var f = el('g', { class: 'spark-flame' }, g);
      el('path', { d: flamePath(0, 10, 9, 32), fill: 'url(#flameO)' }, f);
      el('path', { d: flamePath(0, 9, 4, 16), fill: 'url(#flameI)' }, f);
      var x1 = shamash.x, y1 = shamash.top - 12, dur = 1900, fired = false;
      function end() { if (fired) return; fired = true; if (g.parentNode) gFx.removeChild(g); cb(); }
      g.animate([
        { transform: 'translate(' + (x1 - 6) + 'px,-70px) scale(.5)', opacity: 0 },
        { transform: 'translate(' + (x1 + 26) + 'px,-6px) scale(.8)', opacity: 1, offset: .22 },
        { transform: 'translate(' + (x1 - 22) + 'px,' + (y1 * .45) + 'px) scale(.9)', offset: .5 },
        { transform: 'translate(' + (x1 + 12) + 'px,' + (y1 * .78) + 'px) scale(.95)', offset: .76 },
        { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.7)', opacity: 1 }
      ], { duration: dur, easing: 'cubic-bezier(.45,0,.35,1)', fill: 'forwards' }).onfinish = end;
      setTimeout(end, dur + 100);
    }

    function lightNext(cb) {
      if (state.busy || done()) return;
      var id = expected();
      if (id === 'sh') {
        state.busy = true;
        var tk = state.token;
        descend(function () {
          if (tk !== state.token) return;
          ignite(shamash); state.step++; state.busy = false; refresh();
          if (cb) setTimeout(cb, 520);
        });
        return;
      }
      state.busy = true;
      var tok = state.token;
      spark(candles[id], function () {
        if (tok !== state.token) return;
        ignite(candles[id]);
        state.step++;
        state.busy = false;
        refresh();
        if (done()) celebrate();
        if (cb) cb();
      });
    }

    function hint(c, msg) {
      c.g.classList.remove('shake');
      void c.g.getBBox();
      c.g.classList.add('shake');
      setTimeout(function () { c.g.classList.remove('shake'); }, 500);
      statusEl.innerHTML = '<strong>Todavía no</strong><span>' + msg + '</span>';
      clearTimeout(hint.t);
      hint.t = setTimeout(refresh, 2800);
    }

    function onPick(id) {
      if (state.busy || done() || state.auto) return;
      var c = id === 'sh' ? shamash : candles[id];
      if (c.g.classList.contains('lit')) return;
      if (id === expected()) { clearTimeout(hint.t); lightNext(); return; }
      if (state.step === 0) hint(c, 'Primero se enciende el <b>shamash</b>, la vela central más alta: con él se encienden las demás.');
      else hint(c, 'Se enciende de <b>izquierda a derecha</b>, empezando por <b>la vela nueva de hoy</b>, la que has añadido esta noche. Toca la vela marcada.');
    }

    function lightAll(auto) {
      var tok = state.token;
      if (auto) { state.auto = true; refresh(); }
      (function loop() {
        if (tok !== state.token || done()) return;
        lightNext(function () { setTimeout(loop, 280); });
      })();
    }

    // Reproducir: vuelve a empezar la noche y la enciende sola
    function play() {
      clearTimeout(hint.t);
      setNight(state.night);
      state.auto = true; refresh();
      setTimeout(function () { lightAll(true); }, reduce ? 0 : 450);
    }

    function celebrate() {
      if (reduce) return;
      for (var i = 0; i < 18; i++) {
        var e = document.createElement('span');
        e.className = 'ember';
        e.style.left = (8 + Math.random() * 84) + '%';
        e.style.top = (22 + Math.random() * 18) + '%';
        e.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
        e.style.animationDelay = (Math.random() * .8) + 's';
        stage.appendChild(e);
        setTimeout(function (x) { return function () { x.remove(); }; }(e), 3600);
      }
    }

    /* ----- Controles (solo la interactiva) ----- */
    if (ui) {
      if (panelEl) panelEl.addEventListener('click', onTextClick);
      if (statusEl) statusEl.addEventListener('click', onTextClick);
      svg.addEventListener('click', function (e) {
        var g = e.target.closest && e.target.closest('.candle');
        if (!g) return;
        var id = g.getAttribute('data-id');
        onPick(id === 'sh' ? 'sh' : +id);
      });
      svg.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var g = e.target.closest && e.target.closest('.candle');
        if (!g) return;
        e.preventDefault();
        var id = g.getAttribute('data-id');
        onPick(id === 'sh' ? 'sh' : +id);
      });
      if (btnNext) btnNext.addEventListener('click', function () { clearTimeout(hint.t); lightNext(); });
      if (btnAll) btnAll.addEventListener('click', play);
      if (btnReset) btnReset.addEventListener('click', function () { clearTimeout(hint.t); setNight(state.night); });
    }

    return { setNight: setNight, play: play, state: state };
  }

  /* ---------- Bendiciones y cantos en diálogo ---------- */
  // Secuencia: 1.ª, 2.ª y 3.ª bendición → Hanerot Halalu → Mizmor Shir → Maoz Tzur
  var TEXTS = D.blessings.map(function (b) {
    return { key: String(b.n), kicker: D.ord[b.n] + ' bendición · ' + b.when, name: b.name, he: b.he, tr: b.tr, es: b.es };
  }).concat((D.songs || []).map(function (s) {
    return { key: s.key, kicker: s.when, name: s.name, he: s.he, tr: s.tr, es: s.es };
  }));
  function textIndex(key) { for (var i = 0; i < TEXTS.length; i++) if (TEXTS[i].key === String(key)) return i; return 0; }
  var bdlg;
  // Diálogo en 3 partes: cabecera fija (título + cerrar), texto con scroll y acciones fijas abajo
  function textHTML(i) {
    var t = TEXTS[i], prev = TEXTS[i - 1], next = TEXTS[i + 1];
    return '<div class="modal-head"><div><p class="eyebrow">' + t.kicker + '</p><h3 id="bless-title">' + t.name + '</h3></div>' +
        '<button class="modal-close" type="button" aria-label="Cerrar">×</button></div>' +
      '<div class="modal-body">' +
        (t.he ? '<p class="bless-he" lang="he" dir="rtl">' + t.he + '</p>' : '') +
        (t.tr ? '<p class="bless-tr">' + t.tr + '</p>' : '') +
        '<p class="bless-es' + (t.he || t.tr ? '' : ' bless-only') + '">' + t.es + '</p>' +
      '</div>' +
      '<div class="modal-foot bless-nav">' +
        (prev ? '<button class="btn btn-ghost btn-sm" type="button" data-bgo="' + (i - 1) + '">← ' + prev.name + '</button>' : '<span></span>') +
        (next ? '<button class="btn btn-gold btn-sm" type="button" data-bgo="' + (i + 1) + '">' + next.name + ' →</button>' : '<button class="btn btn-ghost btn-sm" type="button" data-close>Cerrar</button>') +
      '</div>';
  }
  function lockPage(on) { document.documentElement.classList.toggle('modal-open', on); }
  function openText(key) {
    if (!bdlg) {
      bdlg = document.createElement('dialog');
      bdlg.className = 'modal bless-modal';
      bdlg.setAttribute('aria-labelledby', 'bless-title');
      document.body.appendChild(bdlg);
      bdlg.addEventListener('click', function (e) {
        if (e.target === bdlg || e.target.closest('.modal-close,[data-close]')) { bdlg.close(); return; }
        var go = e.target.closest('[data-bgo]');
        if (go) {
          bdlg.innerHTML = textHTML(+go.getAttribute('data-bgo'));
          var body = bdlg.querySelector('.modal-body'); if (body) body.scrollTop = 0;
        }
      });
      bdlg.addEventListener('close', function () { lockPage(false); });
    }
    bdlg.innerHTML = textHTML(textIndex(key));
    lockPage(true);
    if (bdlg.showModal) { if (!bdlg.open) bdlg.showModal(); } else bdlg.setAttribute('open', '');
  }
  function onTextClick(e) {
    var b = e.target.closest('[data-bless],[data-text]');
    if (!b) return;
    e.preventDefault();
    openText(b.getAttribute('data-bless') || b.getAttribute('data-text'));
  }

  /* ---------- Crear las janukiás ---------- */
  var $id = function (x) { return document.getElementById(x); };
  var heroM = heroStage ? create(heroStage, {}) : null;
  var toolM = toolStage ? create(toolStage, { ui: {
    status: $id('menorah-status'), picker: $id('night-picker'), panel: $id('night-panel'),
    next: $id('m-next'), all: $id('m-all'), reset: $id('m-reset')
  } }) : null;

  /* ---------- Noche de hoy ---------- */
  var ens = window.JANUCA_ENSAYO;
  var start = ens ? ens.noche : today.night;
  try {
    var q = +new URLSearchParams(location.search).get('noche');
    if (q >= 1 && q <= 8) start = q;
  } catch (e) {}
  if (heroM) heroM.setNight(start);
  if (toolM) toolM.setNight(start);

  // La que se enciende sola al entrar: la del hero (o la interactiva si no hay hero)
  var intro = heroM || toolM;
  var introStage = heroM ? heroStage : toolStage;
  // En el ensayo (#jb-ensayo) la janukiá espera apagada a que termine la cuenta atrás
  var autoDone = !!ens;
  function autoStart() { if (autoDone) return; autoDone = true; intro.play(); }

  // API para otras partes de la web (p. ej. el final de la cuenta atrás)
  window.JanucaMenorah = {
    play: function (n) {
      autoDone = true; n = +n;
      if (n >= 1 && n <= 8) {
        if (n !== intro.state.night) intro.setNight(n);
        if (toolM && toolM !== intro && n !== toolM.state.night) toolM.setNight(n);
      }
      intro.play();
    }
  };

  /* ---------- Entrada al deslizar (estilo Apple) + encendido automático ---------- */
  var hero = document.querySelector('.hero-scroll');
  var copy = $id('hero-copy');
  var heroScene = introStage.closest('.menorah-scene');
  var sky = heroScene && heroScene.querySelector('.skyline');
  var hintEl = document.querySelector('.scroll-hint');

  if (hero && heroM && !reduce) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var range = hero.offsetHeight - window.innerHeight;
      var p = range > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / range)) : 1;
      var e = 1 - (1 - p) * (1 - p); // sigue al dedo: ligero ease-out, sin retardo
      var s0 = window.innerWidth < 700 ? .84 : .72;
      heroStage.style.transform = 'translate3d(0,' + ((1 - e) * 7).toFixed(2) + '%,0) scale(' + (s0 + (1 - s0) * e).toFixed(4) + ')';
      if (copy) {
        copy.style.transform = 'translate3d(0,' + (-e * 28).toFixed(1) + 'px,0)';
        copy.style.opacity = (1 - Math.max(0, e - .35) * 1.25).toFixed(3);
      }
      if (sky) sky.style.transform = 'translate3d(0,' + ((1 - e) * 24).toFixed(1) + 'px,0)';
      if (hintEl) hintEl.style.opacity = Math.max(0, 1 - p * 5).toFixed(2);
      if (p > .08) autoStart();
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
    setTimeout(autoStart, 2400); // si no se desliza, se enciende igualmente
  } else {
    setTimeout(autoStart, 300);
  }
})();
