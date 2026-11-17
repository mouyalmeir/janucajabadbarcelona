/* Janucá 5787 · Jabad Barcelona — comportamiento común */
(function () {
  'use strict';
  var D = window.JANUCA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Menú móvil ---------- */
  var toggle = $('.nav-toggle'), nav = $('#nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }

  /* ---------- Utilidades ---------- */
  var I = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    metro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="14" rx="4"/><path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>'
  };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function stamp(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function evById(id) { return D.events.filter(function (x) { return x.id === id; })[0]; }
  function mapsUrl(ev) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ev.mapsQuery || ev.address); }
  // Si un evento no tiene hora de fin, se calcula 1 h 30 min para el calendario
  function endHM(ev) {
    if (ev.end) return ev.end;
    var t = ev.start.split(':'), m = +t[0] * 60 + +t[1] + 90;
    return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  }
  function timeLabel(ev) { return ev.end ? ev.start + ' – ' + ev.end + ' h' : ev.start + ' h'; }
  function evLocation(ev) { return ev.place + ', ' + ev.address.replace(/ · /g, ', '); }
  function miniMenorah(n) {
    var h = '';
    for (var i = 1; i <= 8; i++) {
      if (i === 5) h += '<i class="sh on"></i>';
      h += '<i class="' + (i >= 9 - n ? 'on' : '') + '"></i>';
    }
    return '<span class="ev-mini" aria-hidden="true">' + h + '</span>';
  }
  function dots(n) {
    var h = '';
    for (var i = 1; i <= 8; i++) h += '<i class="' + (i <= n ? 'on' : '') + '"></i>';
    return '<span class="dots" aria-hidden="true">' + h + '</span>';
  }

  /* ---------- Calendario (.ics) ---------- */
  function icsEsc(s) { return String(s).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n'); }
  function vevent(uid, start, end, title, desc, loc) {
    return ['BEGIN:VEVENT', 'UID:' + uid + '@januca5787-barcelona', 'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start), 'DTEND:' + stamp(end), 'SUMMARY:' + icsEsc(title),
      'DESCRIPTION:' + icsEsc(desc), loc ? 'LOCATION:' + icsEsc(loc) : '', 'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY',
      'DESCRIPTION:' + icsEsc(title), 'END:VALARM', 'END:VEVENT'].filter(Boolean).join('\r\n');
  }
  function downloadIcs(name, events) {
    var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Jabad Barcelona//Januca 5787//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH']
      .concat(events, ['END:VCALENDAR']).join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function eventIcs(ev) {
    downloadIcs('januca-' + ev.id + '.ics', [vevent(ev.id, D.toUTC(ev.date, ev.start), D.toUTC(ev.date, endHM(ev)),
      ev.title + ' · Janucá', ev.description + ' Organiza: ' + ev.org + '.', evLocation(ev))]);
  }
  function nightsIcs() {
    downloadIcs('januca-5787-8-noches.ics', D.nights.map(function (nd) {
      var slot = D.nightSlots[nd.n] || ['17:30', '18:00'];
      var ev = D.eventForNight(nd.n);
      var desc = nd.time + ' (' + nd.note + '). Bendiciones: ' + nd.blessings.join(', ') + '.' + (nd.alert ? ' ' + nd.alert : '') +
        (ev ? ' Encendido público: ' + ev.title + ' (' + ev.org + '), ' + ev.start + ' h.' : '');
      return vevent('noche-' + nd.n, D.toUTC(nd.date, slot[0]), D.toUTC(nd.date, slot[1]),
        '🕎 Janucá · ' + D.ord[nd.n] + ' vela (' + nd.n + ' + shamash)', desc, '');
    }));
  }
  function gcal(ev) {
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(ev.title + ' · Janucá') +
      '&dates=' + stamp(D.toUTC(ev.date, ev.start)) + '/' + stamp(D.toUTC(ev.date, endHM(ev))) +
      '&details=' + encodeURIComponent(ev.description + ' Organiza: ' + ev.org + '.') + '&location=' + encodeURIComponent(evLocation(ev));
  }
  function share(ev) {
    var p = D.parse(ev.date);
    var url = new URL('eventos#' + ev.id, location.href).href;
    var text = ev.title + ' · ' + D.weekday(ev.date) + ' ' + p.d + ' de diciembre, ' + ev.start + ' h. Janucá con Jabad Barcelona ✨';
    if (navigator.share) { navigator.share({ title: ev.title, text: text, url: url }).catch(function () {}); return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
  }
  function calMenu(ev) {
    return '<details class="ev-cal"><summary class="btn btn-ghost btn-sm">' + I.cal + 'Calendario</summary><div class="ev-cal-menu">' +
      '<a href="' + gcal(ev) + '" target="_blank" rel="noopener">Google Calendar</a>' +
      '<button type="button" data-ics="' + esc(ev.id) + '">Apple / Outlook (.ics)</button></div></details>';
  }

  /* ---------- Eventos ---------- */
  // [[lugar]] en los datos → lugar resaltado en dorado; en textos planos (calendario, compartir) se quita la marca
  function plainTxt(s) { return String(s || '').replace(/\[\[|\]\]/g, ''); }
  function richTxt(s) { return esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="loc">$1</span>'); }
  D.events.forEach(function (ev) {
    ev.titleHtml = richTxt(ev.title); ev.descHtml = richTxt(ev.description);
    ev.title = plainTxt(ev.title); ev.description = plainTxt(ev.description);
  });
  D.faqs.forEach(function (f) { f.aHtml = richTxt(f.a); f.a = plainTxt(f.a); });

  var nowT = D.now().getTime(), nextFound = false;
  var flags = {}, nextEv = null;
  D.events.forEach(function (ev) {
    var past = D.toUTC(ev.date, endHM(ev)).getTime() < nowT;
    var next = !past && !nextFound;
    if (next) { nextFound = true; nextEv = ev; }
    flags[ev.id] = { past: past, next: next };
  });
  // Días que faltan (fecha de Barcelona)
  function todayMadrid() {
    try { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(D.now()); }
    catch (e) { return D.now().toISOString().slice(0, 10); }
  }
  function daysUntil(ds) { return Math.round((Date.parse(ds + 'T00:00:00Z') - Date.parse(todayMadrid() + 'T00:00:00Z')) / 864e5); }
  function soonLabel(ev) {
    if (flags[ev.id].past) return 'Finalizado';
    var n = daysUntil(ev.date);
    return n <= 0 ? 'Hoy' : n === 1 ? 'Mañana' : 'En ' + n + ' días';
  }
  function badge(ev) {
    var f = flags[ev.id];
    return f.past ? '<span class="ev-badge">Finalizado</span>' : (f.next ? '<span class="ev-badge">Próximo encendido</span>' : '');
  }
  // Logo del organizador (si lo hay) + nombre
  function orgLogo(ev, cls) {
    return ev.orgLogo ? '<img class="' + cls + '" src="assets/img/' + ev.orgLogo + '.webp" alt="" loading="lazy" decoding="async">' : '';
  }
  function media(ev) {
    var p = D.parse(ev.date);
    return '<img src="assets/img/' + ev.art + '.svg" alt="" width="960" height="600" loading="lazy" decoding="async">' +
      badge(ev) +
      '<span class="ev-chip">' + miniMenorah(ev.night) + D.ord[ev.night] + ' noche</span>' +
      '<span class="ev-date"><span class="ev-day">' + p.d + '</span><span class="ev-mon">dic<small>' + D.weekday(ev.date) + '</small></span></span>' +
      '<span class="ev-city">' + I.pin + esc(ev.city) + '</span>';
  }
  // Lo que añade la dirección al lugar y la ciudad (o, si no añade nada, el barrio)
  function placeSub(ev) {
    var skip = function (x) { return x && x !== ev.place && x !== ev.city; };
    var parts = ev.address.split(' · ').filter(skip);
    return (parts.length ? parts : String(ev.area || '').split(' · ').filter(skip)).join(' · ');
  }
  // Portada: agenda de los encendidos (fecha y hora a la izquierda, lugar como protagonista)
  function agendaItem(ev) {
    var f = flags[ev.id], p = D.parse(ev.date), link = 'eventos#' + esc(ev.id), sub = placeSub(ev);
    return '<li class="ag-item reveal' + (f.past ? ' is-past' : '') + (f.next ? ' is-next' : '') + (ev.featured ? ' is-featured' : '') + '" id="ag-' + esc(ev.id) + '">' +
      '<div class="ag-when" aria-hidden="true"><span class="ag-wd">' + D.weekday(ev.date).slice(0, 3) + '</span><b class="ag-day">' + p.d + '</b>' +
        '<span class="ag-mon">dic</span><span class="ag-time">' + ev.start + '<small>h</small></span></div>' +
      '<article class="ag-card">' +
        '<a class="ag-art" href="' + link + '" tabindex="-1" aria-hidden="true">' +
          '<img src="assets/img/' + ev.art + '.svg" alt="" width="960" height="600" loading="lazy" decoding="async">' + badge(ev) +
          '<span class="ev-chip">' + miniMenorah(ev.night) + D.ord[ev.night] + ' noche</span></a>' +
        '<div class="ag-info">' +
          '<p class="ag-city">' + I.pin + esc(ev.city) + (ev.featured ? '<span class="ag-tag">Gran encendido</span>' : '') + '</p>' +
          '<h3 class="ag-place"><a href="' + link + '">' + esc(ev.place) + '</a></h3>' +
          '<p class="sr-only">' + cap(D.dateLong(ev.date)) + ', a las ' + ev.start + ' h</p>' +
          (sub ? '<p class="ag-sub">' + esc(sub) + '</p>' : '') +
          (ev.transport ? '<p class="ag-transit">' + I.metro + esc(ev.transport) + '</p>' : '') +
          '<p class="ag-org">' + orgLogo(ev, 'ag-org-logo') + '<span><small>Organiza</small>' + esc(ev.org) + '</span></p>' +
        '</div>' +
        '<div class="ag-actions">' +
          '<span class="ev-soon' + (f.past ? ' is-past' : '') + '">' + soonLabel(ev) + '</span>' +
          '<a class="btn btn-gold btn-sm ag-go" href="' + mapsUrl(ev) + '" target="_blank" rel="noopener">' + I.map + 'Cómo llegar</a>' +
          '<div class="ag-more">' + calMenu(ev) +
            '<button class="btn btn-ghost btn-sm icon-btn" type="button" data-share="' + esc(ev.id) + '" aria-label="Compartir ' + esc(ev.title) + '">' + I.share + '</button></div>' +
        '</div>' +
      '</article></li>';
  }
  function eventDetail(ev) {
    var f = flags[ev.id];
    return '<article class="ev-detail reveal' + (ev.featured ? ' featured' : '') + (f.past ? ' is-past' : '') + '" id="' + esc(ev.id) + '">' +
      '<div class="ev-detail-media ev-media">' + media(ev) + '</div>' +
      '<div class="ev-detail-body"><p class="ev-kicker">' + D.ord[ev.night] + ' noche · ' + esc(ev.area) + '</p>' +
      '<h2>' + ev.titleHtml + '</h2><p>' + ev.descHtml + '</p>' +
      '<div class="ev-facts">' +
        '<div class="fact fact-wide fact-place">' + I.pin + '<span><small>Lugar</small><b>' + esc(ev.place) + '</b><em>' + esc(ev.address) + '</em></span></div>' +
        '<div class="fact">' + I.cal + '<span><small>Fecha</small>' + cap(D.dateLong(ev.date)) + '</span></div>' +
        '<div class="fact">' + I.clock + '<span><small>Hora</small>' + timeLabel(ev) + ' <span class="ev-soon' + (f.past ? ' is-past' : '') + '">' + soonLabel(ev) + '</span></span></div>' +
        (ev.transport ? '<div class="fact fact-wide">' + I.metro + '<span><small>Cómo llegar</small>' + esc(ev.transport) + '</span></div>' : '') +
      '</div>' +
      '<ul class="ev-program">' + ev.program.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      (ev.notice ? '<p class="ev-notice">' + esc(ev.notice) + '</p>' : '') +
      '<div class="ev-org' + (ev.orgLogo ? '' : ' no-logo') + '">' + orgLogo(ev, 'ev-org-logo') +
        '<span><small>Organiza</small>' + esc(ev.org) + '</span></div>' +
      '<div class="ev-actions">' +
        '<a class="btn btn-gold btn-sm" href="' + mapsUrl(ev) + '" target="_blank" rel="noopener">' + I.map + 'Cómo llegar</a>' + calMenu(ev) +
        '<button class="btn btn-ghost btn-sm icon-btn" type="button" data-share="' + esc(ev.id) + '" aria-label="Compartir ' + esc(ev.title) + '">' + I.share + '</button>' +
      '</div></div></article>';
  }
  $$('[data-events]').forEach(function (list) {
    list.innerHTML = D.events.map(list.getAttribute('data-events') === 'full' ? eventDetail : agendaItem).join('');
  });
  var fb = $('#filter-bar');
  if (fb) fb.innerHTML = D.events.map(function (ev) {
    var p = D.parse(ev.date);
    return '<a href="#' + ev.id + '">' + cap(D.weekday(ev.date)).slice(0, 3) + ' ' + p.d + ' · ' + esc(ev.short || ev.place) + '</a>';
  }).join('');

  /* ---------- Saltar a un elemento dejándolo justo debajo de la cabecera (y la barra sticky) ---------- */
  function jumpTo(el, smooth) {
    var head = $('.site-header');
    var offset = (head ? head.getBoundingClientRect().bottom : 0) + 14;
    var bar = el.closest('[data-events="full"]') && fb;
    if (bar) offset = bar.getBoundingClientRect().height + (head ? head.offsetHeight : 0) + 10;
    el.classList.add('in');
    $$('.reveal', el).forEach(function (r) { r.classList.add('in'); });
    var reduceMo = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: smooth && !reduceMo ? 'smooth' : 'instant' });
    // al terminar, corrige si algo se ha movido durante el desplazamiento
    clearTimeout(jumpTo.t);
    jumpTo.t = setTimeout(function () {
      var diff = el.getBoundingClientRect().top - offset;
      if (Math.abs(diff) > 3) window.scrollTo({ top: window.scrollY + diff, behavior: 'instant' });
    }, smooth && !reduceMo ? 900 : 60);
  }
  if (fb) fb.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    var el = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    e.preventDefault();
    if (history.replaceState) history.replaceState(null, '', '#' + el.id);
    jumpTo(el, true);
  });

  /* ---------- Barra sticky de eventos: resalta el que se está viendo ---------- */
  if (fb && 'IntersectionObserver' in window) {
    var fbLinks = $$('a', fb);
    var setActive = function (id) {
      fbLinks.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        var was = a.classList.contains('is-active');
        a.classList.toggle('is-active', on);
        if (on) {
          a.setAttribute('aria-current', 'true');
          if (!was && fb.scrollWidth > fb.clientWidth) fb.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
        } else a.removeAttribute('aria-current');
      });
      $$('.ev-detail').forEach(function (d) { d.classList.toggle('is-viewing', d.id === id); });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-42% 0px -52% 0px' });
    $$('.ev-detail').forEach(function (d) { spy.observe(d); });
    var evList = $('[data-events="full"]');
    window.addEventListener('scroll', function () {
      // por encima del primer evento o por debajo del último: ninguno activo
      if (!evList) return;
      var r = evList.getBoundingClientRect(), mid = window.innerHeight * .45;
      if (r.top > mid || r.bottom < mid) setActive('');
    }, { passive: true });
  }

  /* ---------- FAQ ---------- */
  var faq = $('#faq');
  if (faq) faq.innerHTML = D.faqs.map(function (f) { return '<details class="reveal"><summary>' + esc(f.q) + '</summary><p>' + f.aHtml + '</p></details>'; }).join('');

  /* ---------- Contacto ---------- */
  $$('[data-contact]').forEach(function (el) {
    var C = D.contact || {}, k = el.getAttribute('data-contact'), v = C[k];
    if (!v) { el.hidden = true; return; } // los datos vacíos no se muestran
    if (k === 'email') el.innerHTML = '<a href="mailto:' + esc(v) + '">' + esc(v) + '</a>';
    else if (k === 'whatsapp') el.innerHTML = '<a href="https://wa.me/' + esc(v.replace(/\D/g, '')) + '" target="_blank" rel="noopener">WhatsApp</a>';
    else if (k === 'instagram') el.innerHTML = '<a href="' + esc(v) + '" target="_blank" rel="noopener">Instagram</a>';
    else if (k === 'phone') el.innerHTML = '<a href="tel:+34' + esc(v.replace(/\D/g, '').replace(/^34(?=\d{9}$)/, '')) + '">' + esc(v) + '</a>';
    else el.textContent = v;
  });
  // una fila/tarjeta de contacto sin ningún dato se oculta entera
  $$('[data-contact-row]').forEach(function (row) {
    if (!$$('[data-contact]', row).some(function (c) { return !c.hidden; })) row.hidden = true;
  });

  /* ---------- Kit gratuito: enlace al Google Form ---------- */
  $$('[data-kit-form]').forEach(function (a) {
    var url = (D.contact || {}).kitFormUrl;
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else {
      a.hidden = true;
      var soon = a.parentNode.querySelector('.kit-soon');
      if (soon) soon.hidden = false;
    }
  });

  /* ---------- Pestañas ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) {
          var on = x === t;
          x.setAttribute('aria-selected', String(on));
          var panel = document.getElementById(x.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
      });
    });
  });

  /* ---------- Menú: «Eventos» con la fecha del próximo encendido ---------- */
  if (nextEv) (function () {
    var np = D.parse(nextEv.date);
    $$('.nav-cta, .head-cta').forEach(function (a) {
      a.insertAdjacentHTML('beforeend', '<span class="nav-when" aria-hidden="true">' + np.d + ' dic</span>');
    });
    // en el menú del móvil, una línea más con el próximo encendido
    var cta = $('.nav .nav-cta');
    if (cta) cta.insertAdjacentHTML('beforeend', '<span class="nav-next">Próximo: ' + D.weekday(nextEv.date) + ' ' + np.d + ' dic · ' +
      nextEv.start + ' h · ' + esc(nextEv.short || nextEv.place) + '</span>');
  })();

  // Portada: chispas doradas que llegan desde fuera hasta el botón de los encendidos
  // justo antes de que aparezca (el botón entra con CSS, así se ve aunque falle esto)
  (function () {
    var stage = $('.cta-stage');
    if (!stage || window.scrollY > 40 || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    setTimeout(function () {
      var n = window.innerWidth < 700 ? 12 : 18;
      for (var i = 0; i < n; i++) {
        var sp = document.createElement('i');
        var a = (i / n) * Math.PI * 2 + Math.random() * .5, r = (window.innerWidth < 700 ? 120 : 170) + Math.random() * 120;
        sp.className = 'cta-spark';
        sp.style.setProperty('--x', Math.round(Math.cos(a) * r) + 'px');
        sp.style.setProperty('--y', Math.round(Math.sin(a) * r * .55) + 'px');
        sp.style.animationDelay = (Math.random() * .2).toFixed(2) + 's';
        stage.appendChild(sp);
        setTimeout(function (x) { return function () { x.remove(); }; }(sp), 1400);
      }
    }, 1150);
  })();


  /* ---------- Barra flotante: próximo encendido (todas las páginas salvo Eventos) ---------- */
  // No se cierra. En la portada sale cuando ha terminado el efecto de entrada (y ya se han
  // pasado los encendidos, que van justo después); en el resto, al pasar la cabecera.
  // Se aparta mientras se ven los encendidos o el pie, para no taparlos.
  (function () {
    if (!nextEv || $('[data-events="full"]')) return;
    var p = D.parse(nextEv.date);
    var bar = document.createElement('aside');
    bar.className = 'next-bar';
    bar.setAttribute('aria-label', 'Próximo encendido');
    bar.innerHTML = '<a class="nb-link" href="eventos#' + esc(nextEv.id) + '">' +
        '<img src="assets/img/' + nextEv.art + '.svg" alt="" width="72" height="45">' +
        '<span class="nb-txt"><small>Próximo encendido · ' + soonLabel(nextEv) + '</small>' +
        '<b>' + cap(D.weekday(nextEv.date)).slice(0, 3) + ' ' + p.d + ' dic · ' + nextEv.start + ' h</b>' +
        '<span class="nb-place"><span class="loc">' + esc(nextEv.place) + '</span> · ' + esc(nextEv.city) + '</span></span>' +
        '<span class="nb-go">Ver ' + I.arrow + '</span></a>';
    document.body.appendChild(bar);
    var sec = $('#encendidos'), foot = $('.site-footer'), head = $('.site-header'), ticking = false;
    var hero = $('.hero-scroll'), pageHero = $('.page-hero');
    var upd = function () {
      ticking = false;
      var vh = window.innerHeight, show, r;
      if (hero) show = hero.getBoundingClientRect().bottom <= vh + 1; // portada: cuando ha terminado el efecto de entrada
      else if (pageHero) show = pageHero.getBoundingClientRect().bottom <= (head ? head.offsetHeight : 0) + 1; // resto: pasada la cabecera de la página
      else show = window.scrollY > vh * .4;
      // no tapar los encendidos de la portada (en cuanto asoman) ni el pie
      if (sec) { r = sec.getBoundingClientRect(); if (r.top < vh + 2 && r.bottom > vh * .15) show = false; }
      if (foot) { r = foot.getBoundingClientRect(); if (r.top < vh * .85) show = false; }
      bar.classList.toggle('show', show);
      document.body.classList.toggle('nb-on', show);
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ---------- Acciones globales ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-ics],[data-share],[data-ics-all],[data-print]');
    if (!t) {
      $$('.ev-cal[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
      return;
    }
    if (t.hasAttribute('data-ics')) { eventIcs(evById(t.getAttribute('data-ics'))); var d = t.closest('details'); if (d) d.removeAttribute('open'); }
    else if (t.hasAttribute('data-share')) share(evById(t.getAttribute('data-share')));
    else if (t.hasAttribute('data-ics-all')) nightsIcs();
    else if (t.hasAttribute('data-print')) window.print();
  });

  /* ---------- Cuenta atrás / estado de hoy ---------- */
  /* Ensayo (uso interno, no enlazado en ninguna parte):
       #jb-ensayo          → cuenta atrás de 5 s y luego la 1.ª noche
       #jb-ensayo-10       → 10 s
       #jb-ensayo-10-3     → 10 s y luego la 3.ª noche
     Cualquier valor raro vuelve a los valores por defecto (5 s, 1.ª noche). */
  var ensayo = (function () {
    try {
      var m = /^#jb-ensayo(.*)$/i.exec(decodeURIComponent(location.hash || ''));
      if (!m) return null;
      var partes = m[1].replace(/^[-:/]/, '').split(/[-:/]/); // posición 1: segundos, posición 2: noche
      var num = function (x) { return /^\d+$/.test(x || '') ? parseInt(x, 10) : NaN; };
      var secs = num(partes[0]), noche = num(partes[1]);
      if (!(secs >= 1 && secs <= 600)) secs = 5;
      if (!(noche >= 1 && noche <= 8)) noche = 1;
      return { secs: secs, noche: noche };
    } catch (e) { return null; }
  })();
  window.JANUCA_ENSAYO = ensayo;
  var demoSecs = ensayo ? ensayo.secs : 0;
  var cd = $('[data-countdown]');
  function pill(msg, extra) { return '<span class="today-pill' + (extra || '') + '">' + msg + '</span>'; }
  function burst(host) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < 26; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      e.style.left = (50 + (Math.random() * 70 - 35)) + '%';
      e.style.top = (40 + Math.random() * 40) + '%';
      e.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      e.style.animationDelay = (Math.random() * .6) + 's';
      host.appendChild(e);
      setTimeout(function (x) { return function () { x.remove(); }; }(e), 3600);
    }
  }
  // Al llegar a cero: la cuenta atrás se desvanece, aparece el aviso y se enciende la 1.ª vela
  function arrived() {
    var n = ensayo ? ensayo.noche : 1, nd = D.nights[n - 1] || D.nights[0];
    var aviso = n === 1
      ? '¡Ha llegado Janucá! Enciende la 1.ª vela · ' + nd.time.toLowerCase()
      : 'Esta noche: ' + D.ord[n] + ' vela de Janucá · ' + nd.time.toLowerCase();
    cd.classList.add('cd-out');
    setTimeout(function () {
      cd.innerHTML = pill(aviso, ' is-arrived');
      cd.classList.remove('cd-out');
      cd.classList.add('cd-in');
      burst(cd);
      try { if (window.JanucaMenorah) window.JanucaMenorah.play(n); } catch (e) {}
    }, 600);
  }
  if (cd) {
    var st = demoSecs ? { phase: 'pre' } : D.status();
    if (st.phase === 'pre') {
      var target = demoSecs ? Date.now() + demoSecs * 1000 : D.firstLight.getTime();
      var nowMs = function () { return demoSecs ? Date.now() : D.now().getTime(); };
      var cells = {};
      ['d', 'h', 'm', 's'].forEach(function (k) { cells[k] = cd.querySelector('[data-cd="' + k + '"]'); });
      var timer;
      var tick = function () {
        var s = Math.max(0, Math.ceil((target - nowMs()) / 1000));
        cells.d.textContent = Math.floor(s / 86400);
        cells.h.textContent = String(Math.floor(s / 3600) % 24).padStart(2, '0');
        cells.m.textContent = String(Math.floor(s / 60) % 60).padStart(2, '0');
        cells.s.textContent = String(s % 60).padStart(2, '0');
        cd.classList.toggle('cd-final', s <= 10 && s > 0);
        if (s === 0) { clearInterval(timer); setTimeout(arrived, 400); }
      };
      tick(); timer = setInterval(tick, 250);
    } else {
      var nd = D.nights[st.night - 1];
      var msg = st.phase === 'during'
        ? 'Hoy: ' + D.ord[st.night] + ' noche de Janucá · ' + nd.time
        : st.phase === 'last' ? 'Último día de Janucá: la festividad concluye esta noche'
        : 'Janucá 5787 ha concluido. ¡Que la luz siga con nosotros!';
      cd.innerHTML = pill(msg);
    }
  }

  /* ---------- Resaltar hoy en el calendario ---------- */
  var s2 = D.status();
  if (s2.phase === 'during') { var row = $('tr[data-night="' + s2.night + '"]'); if (row) row.classList.add('today'); }

  /* ---------- Aparición al hacer scroll ---------- */
  // Regla común para toda la web: un bloque que ocupa más de ~70 % de la pantalla
  // (p. ej. en móvil) no aparece de golpe; se reparte entre sus hijos, que van
  // apareciendo uno a uno al deslizar.
  var vh = window.innerHeight;
  function visibleKids(el) {
    return [].filter.call(el.children, function (c) { return c.offsetHeight > 0 && !/^(SCRIPT|STYLE|TEMPLATE)$/.test(c.tagName); });
  }
  function split(el, depth) {
    if (depth > 4 || el.offsetHeight < vh * .7) return [el];
    var kids = visibleKids(el);
    if (!kids.length) return [el];
    if (kids.length === 1) return split(kids[0], depth + 1);
    return kids.reduce(function (acc, k) { return acc.concat(split(k, depth + 1)); }, []);
  }
  $$('.reveal').forEach(function (el) {
    var parts = split(el, 0);
    if (parts.length === 1 && parts[0] === el) return;
    el.classList.remove('reveal');
    parts.forEach(function (p) { p.classList.add('reveal'); });
  });

  var items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (en) { return en.isIntersecting; });
      shown.forEach(function (en, i) {
        var t = en.target;
        if (shown.length > 1) {
          // si entran varios a la vez, se escalonan; luego se quita el retardo
          t.style.transitionDelay = Math.min(i * .08, .4).toFixed(2) + 's';
          setTimeout(function () { t.style.transitionDelay = ''; }, 1400);
        }
        t.classList.add('in');
        io.unobserve(t);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .06 });
    items.forEach(function (it) { io.observe(it); });
  } else {
    items.forEach(function (it) { it.classList.add('in'); });
  }
  // Si se llega con #ancla (p. ej. a un evento), mostrarlo ya
  if (location.hash) {
    var tgt = document.getElementById(location.hash.slice(1));
    if (tgt) {
      // que el navegador no restaure la posición anterior encima del salto (p. ej. al recargar)
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      setTimeout(function () { jumpTo(tgt, false); }, 60);
      setTimeout(function () { jumpTo(tgt, false); }, 450);
    }
  }

  /* ---------- Cielo estrellado (estrellas que titilan) ---------- */
  (function () {
    var sf = document.createElement('div');
    sf.className = 'starfield';
    sf.setAttribute('aria-hidden', 'true');
    var n = window.innerWidth < 700 ? 26 : 46, h = '';
    for (var i = 0; i < n; i++) {
      h += '<i' + (Math.random() < .18 ? ' class="g"' : '') + ' style="left:' + (Math.random() * 100).toFixed(2) + '%;top:' + (Math.random() * 100).toFixed(2) +
        '%;--s:' + (1 + Math.random() * 1.6).toFixed(2) + 'px;--d:' + (2.2 + Math.random() * 4).toFixed(2) + 's;--l:-' + (Math.random() * 6).toFixed(2) + 's"></i>';
    }
    sf.innerHTML = h;
    document.body.insertBefore(sf, document.body.firstChild);
  })();

  /* ---------- Luz suave que sigue al ratón ---------- */
  if (window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var glow = document.createElement('div');
    glow.className = 'cursor-light';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    var mx = 0, my = 0, queued = false;
    var paintGlow = function () { queued = false; glow.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)'; };
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      glow.classList.add('on');
      if (!queued) { queued = true; requestAnimationFrame(paintGlow); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { glow.classList.remove('on'); });
  }

  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
