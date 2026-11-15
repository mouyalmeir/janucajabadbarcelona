/* Janucá 5787 · Jabad Barcelona — comportamiento común */
(function () {
  'use strict';
  var D = window.JANUCA;

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }

  /* ---------- Iconos ---------- */
  var I = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function stamp(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }

  /* ---------- Eventos ---------- */
  function miniMenorah(n) {
    var h = '';
    for (var i = 1; i <= 8; i++) {
      if (i === 5) h += '<i class="sh on"></i>';
      h += '<i class="' + (i >= 9 - n ? 'on' : '') + '"></i>';
    }
    return '<div class="ev-mini" aria-hidden="true">' + h + '</div>';
  }

  function eventCard(ev, opts) {
    var p = D.parse(ev.date);
    var place = ev.mapsUrl ? '<a href="' + esc(ev.mapsUrl) + '" target="_blank" rel="noopener">' + esc(ev.place) + '</a>' : esc(ev.place);
    var badge = opts.past ? '<span class="ev-badge">Finalizado</span>' : (opts.next ? '<span class="ev-badge">Próximo</span>' : '');
    var cta = opts.compact
      ? '<a class="btn btn-gold btn-sm" href="eventos.html#' + esc(ev.id) + '">Ver detalles</a>'
      : (ev.cta ? '<a class="btn btn-gold btn-sm" href="' + esc(ev.cta.url) + '">' + esc(ev.cta.label) + '</a>' : '');
    return '<article class="event-card reveal' + (opts.past ? ' is-past' : '') + (opts.next ? ' is-next' : '') + '" id="' + (opts.compact ? 'card-' : '') + esc(ev.id) + '">' + badge +
      '<div class="ev-top"><div class="ev-date"><span class="ev-day">' + p.d + '</span><span class="ev-mon">dic<small>' + D.weekday(ev.date) + '</small></span></div>' + miniMenorah(ev.night) + '</div>' +
      '<p class="ev-kicker">' + D.ord[ev.night] + ' noche · ' + esc(ev.kicker) + '</p>' +
      '<h3>' + esc(ev.title) + '</h3>' +
      '<ul class="ev-meta"><li>' + I.clock + '<span>' + ev.start + ' – ' + ev.end + ' h</span></li><li>' + I.pin + '<span>' + place + '<small>' + esc(ev.address) + '</small></span></li></ul>' +
      '<p class="ev-desc">' + esc(ev.description) + '</p>' +
      '<div class="ev-actions">' + cta +
        '<details class="ev-cal"><summary class="btn btn-ghost btn-sm">' + I.cal + 'Calendario</summary><div class="ev-cal-menu">' +
          '<a href="' + gcal(ev) + '" target="_blank" rel="noopener">Google Calendar</a>' +
          '<button type="button" data-ics="' + esc(ev.id) + '">Apple / Outlook (.ics)</button></div></details>' +
        '<button class="btn btn-ghost btn-sm icon-btn" type="button" data-share="' + esc(ev.id) + '" aria-label="Compartir ' + esc(ev.title) + '">' + I.share + '</button>' +
      '</div></article>';
  }

  function gcal(ev) {
    var q = 'action=TEMPLATE&text=' + encodeURIComponent(ev.title + ' · Janucá con Jabad Barcelona') +
      '&dates=' + stamp(D.toUTC(ev.date, ev.start)) + '/' + stamp(D.toUTC(ev.date, ev.end)) +
      '&details=' + encodeURIComponent(ev.description) +
      '&location=' + encodeURIComponent(ev.place + ', ' + ev.address);
    return 'https://calendar.google.com/calendar/render?' + q;
  }

  function ics(ev) {
    function e(s) { return String(s).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n'); }
    var body = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Jabad Barcelona//Januca 5787//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + ev.id + '-5787@jabadbarcelona',
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(D.toUTC(ev.date, ev.start)),
      'DTEND:' + stamp(D.toUTC(ev.date, ev.end)),
      'SUMMARY:' + e(ev.title + ' · Janucá con Jabad Barcelona'),
      'DESCRIPTION:' + e(ev.description),
      'LOCATION:' + e(ev.place + ', ' + ev.address),
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'januca-' + ev.id + '.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  function share(ev) {
    var p = D.parse(ev.date);
    var url = new URL('eventos.html#' + ev.id, location.href).href;
    var text = ev.title + ' · ' + D.weekday(ev.date) + ' ' + p.d + ' de diciembre, ' + ev.start + ' h. Janucá con Jabad Barcelona ✨';
    if (navigator.share) { navigator.share({ title: ev.title, text: text, url: url }).catch(function () {}); return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
  }

  var lists = document.querySelectorAll('[data-events]');
  if (D && lists.length) {
    var now = D.now().getTime(), nextFound = false;
    var flags = D.events.map(function (ev) {
      var past = D.toUTC(ev.date, ev.end).getTime() < now;
      var next = !past && !nextFound;
      if (next) nextFound = true;
      return { past: past, next: next };
    });
    [].forEach.call(lists, function (list) {
      var compact = list.getAttribute('data-events') === 'compact';
      list.classList.toggle('compact', compact);
      list.innerHTML = D.events.map(function (ev, i) {
        return eventCard(ev, { compact: compact, past: flags[i].past, next: flags[i].next });
      }).join('');
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ics],[data-share]');
      if (!t) {
        [].forEach.call(document.querySelectorAll('.ev-cal[open]'), function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
        return;
      }
      var id = t.getAttribute('data-ics') || t.getAttribute('data-share');
      var ev = D.events.filter(function (x) { return x.id === id; })[0];
      if (!ev) return;
      if (t.hasAttribute('data-ics')) { ics(ev); t.closest('details').removeAttribute('open'); }
      else share(ev);
    });
  }

  /* ---------- Cuenta atrás / estado de hoy ---------- */
  var cd = document.querySelector('[data-countdown]');
  if (cd && D) {
    var st = D.status();
    if (st.phase === 'pre') {
      var cells = {};
      ['d', 'h', 'm', 's'].forEach(function (k) { cells[k] = cd.querySelector('[data-cd="' + k + '"]'); });
      var tick = function () {
        var ms = Math.max(0, D.firstLight - D.now());
        var s = Math.floor(ms / 1000);
        cells.d.textContent = Math.floor(s / 86400);
        cells.h.textContent = String(Math.floor(s / 3600) % 24).padStart(2, '0');
        cells.m.textContent = String(Math.floor(s / 60) % 60).padStart(2, '0');
        cells.s.textContent = String(s % 60).padStart(2, '0');
      };
      tick(); setInterval(tick, 1000);
    } else {
      var nd = D.nights[st.night - 1];
      var msg = st.phase === 'during'
        ? 'Hoy: ' + D.ord[st.night] + ' noche de Janucá · ' + nd.time
        : st.phase === 'last' ? 'Último día de Janucá: la festividad concluye esta noche'
        : 'Janucá 5787 ha concluido. ¡Que la luz siga con nosotros!';
      cd.innerHTML = '<span class="today-pill">' + msg + '</span>';
    }
  }

  /* ---------- Resaltar hoy en el calendario ---------- */
  if (D) {
    var s2 = D.status();
    if (s2.phase === 'during') {
      var row = document.querySelector('tr[data-night="' + s2.night + '"]');
      if (row) row.classList.add('today');
    }
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    [].forEach.call(items, function (it) { io.observe(it); });
  } else {
    [].forEach.call(items, function (it) { it.classList.add('in'); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
