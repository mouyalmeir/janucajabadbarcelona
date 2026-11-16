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
    var url = new URL('eventos.html#' + ev.id, location.href).href;
    var text = ev.title + ' · ' + D.weekday(ev.date) + ' ' + p.d + ' de diciembre, ' + ev.start + ' h. Janucá con Jabad Barcelona ✨';
    if (navigator.share) { navigator.share({ title: ev.title, text: text, url: url }).catch(function () {}); return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank', 'noopener');
  }
  function calMenu(ev) {
    return '<details class="ev-cal"><summary class="btn btn-ghost btn-sm">' + I.cal + 'Calendario</summary><div class="ev-cal-menu">' +
      '<a href="' + gcal(ev) + '" target="_blank" rel="noopener">Google Calendar</a>' +
      '<button type="button" data-ics="' + esc(ev.id) + '">Apple / Outlook (.ics)</button></div></details>';
  }

  /* ---------- Envío de formularios (WhatsApp o email de Jabad) ---------- */
  function send(subject, lines, msgEl) {
    var text = subject + '\n\n' + lines.filter(Boolean).join('\n');
    var C = D.contact || {};
    if (C.whatsapp) {
      window.open('https://wa.me/' + C.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      msgEl.textContent = '¡Gracias! Se ha abierto WhatsApp con tu mensaje: solo tienes que enviarlo.';
    } else if (C.email) {
      location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      msgEl.textContent = '¡Gracias! Se ha abierto tu correo con el mensaje preparado.';
    } else {
      msgEl.textContent = 'Muy pronto podrás enviarlo desde aquí: estamos activando las inscripciones online. ¡Gracias por tu interés!';
      if (window.console) console.info('[Janucá] Configura contact.whatsapp o contact.email en assets/js/data.js para activar los formularios.');
    }
    return true;
  }
  function val(form, name) { var f = form.elements[name]; return f ? String(f.value || '').trim() : ''; }

  /* ---------- Diálogo genérico ---------- */
  var dlg;
  function openDialog(opts) {
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.className = 'modal';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    }
    dlg.innerHTML = '<form class="modal-in" method="dialog" novalidate>' +
      '<button class="modal-close" type="button" aria-label="Cerrar">×</button>' +
      '<p class="eyebrow">' + esc(opts.kicker) + '</p><h3>' + esc(opts.title) + '</h3><p>' + esc(opts.text) + '</p>' +
      '<div class="form-grid">' + opts.fields + '</div>' +
      '<div class="form-foot"><p class="form-note">Te contestaremos por WhatsApp o email.</p><button class="btn btn-gold" type="submit">' + esc(opts.submit) + '</button></div>' +
      '<p class="form-msg" role="status"></p></form>';
    var form = dlg.querySelector('form');
    dlg.querySelector('.modal-close').addEventListener('click', function () { dlg.close(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      opts.onSubmit(form, dlg.querySelector('.form-msg'));
    });
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var first = form.querySelector('input'); if (first) first.focus();
  }
  var F = {
    name: '<div class="field full"><label for="f-name">Nombre y apellidos</label><input id="f-name" name="name" autocomplete="name" required></div>',
    phone: '<div class="field"><label for="f-phone">Teléfono / WhatsApp</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>',
    people: '<div class="field"><label for="f-people">¿Cuántos venís?</label><select id="f-people" name="people"><option>1 persona</option><option selected>2 personas</option><option>3 personas</option><option>4 personas (familia)</option><option>5 o más</option></select></div>',
    role: '<div class="field"><label for="f-role">¿Cómo quieres ayudar?</label><select id="f-role" name="role"><option>Reparto de sufganiot y kits</option><option>Acogida e información</option><option>Talleres infantiles</option><option>Montaje y logística</option></select></div>',
    note: '<div class="field full"><label for="f-note">Comentario (opcional)</label><textarea id="f-note" name="note"></textarea></div>'
  };
  function openRsvp(ev) {
    var p = D.parse(ev.date);
    openDialog({
      kicker: D.ord[ev.night] + ' noche · ' + cap(D.weekday(ev.date)) + ' ' + p.d + ' dic', title: ev.title,
      text: 'Es gratis. Confirmar nos ayuda a preparar suficientes sufganiot y kits para todos.',
      fields: F.name + F.phone + F.people + F.note, submit: ev.cta || 'Confirmar asistencia',
      onSubmit: function (form, msg) {
        send('Asistencia · ' + ev.title + ' (' + p.d + ' dic, ' + ev.start + ' h)',
          ['Nombre: ' + val(form, 'name'), 'Teléfono: ' + val(form, 'phone'), 'Personas: ' + val(form, 'people'), val(form, 'note') && 'Comentario: ' + val(form, 'note')], msg);
      }
    });
  }
  function openVolunteer() {
    openDialog({
      kicker: 'Voluntariado', title: 'Ayúdanos a llevar la luz a Barcelona',
      text: 'Necesitamos manos para repartir sufganiot, acoger a la gente y animar los talleres de los niños.',
      fields: F.name + F.phone + F.role + F.note, submit: 'Quiero ser voluntario',
      onSubmit: function (form, msg) {
        send('Voluntariado Janucá 5787', ['Nombre: ' + val(form, 'name'), 'Teléfono: ' + val(form, 'phone'), 'Área: ' + val(form, 'role'), val(form, 'note') && 'Comentario: ' + val(form, 'note')], msg);
      }
    });
  }
  function openSponsor() {
    openDialog({
      kicker: 'Patrocinio', title: 'Patrocina Janucá en honor o memoria',
      text: 'Dedica una noche, una janukiá pública o las sufganiot en honor o en memoria de un ser querido.',
      fields: F.name + F.phone + '<div class="field full"><label for="f-ded">Dedicatoria</label><input id="f-ded" name="ded" placeholder="En memoria de… / En honor de…"></div>' + F.note,
      submit: 'Quiero patrocinar',
      onSubmit: function (form, msg) {
        send('Patrocinio Janucá 5787', ['Nombre: ' + val(form, 'name'), 'Teléfono: ' + val(form, 'phone'), 'Dedicatoria: ' + val(form, 'ded'), val(form, 'note') && 'Comentario: ' + val(form, 'note')], msg);
      }
    });
  }

  /* ---------- Eventos ---------- */
  var nowT = D.now().getTime(), nextFound = false;
  var flags = {};
  D.events.forEach(function (ev) {
    var past = D.toUTC(ev.date, endHM(ev)).getTime() < nowT;
    var next = !past && !nextFound;
    if (next) nextFound = true;
    flags[ev.id] = { past: past, next: next };
  });
  function badge(ev) {
    var f = flags[ev.id];
    return f.past ? '<span class="ev-badge">Finalizado</span>' : (f.next ? '<span class="ev-badge">Próximo</span>' : '');
  }
  function media(ev) {
    var p = D.parse(ev.date);
    return '<img src="assets/img/' + ev.art + '.svg" alt="" width="960" height="600" loading="lazy" decoding="async">' +
      badge(ev) +
      '<span class="ev-chip">' + miniMenorah(ev.night) + D.ord[ev.night] + ' noche</span>' +
      '<span class="ev-date"><span class="ev-day">' + p.d + '</span><span class="ev-mon">dic<small>' + D.weekday(ev.date) + '</small></span></span>';
  }
  function eventCard(ev) {
    var f = flags[ev.id];
    return '<article class="event-card reveal' + (f.past ? ' is-past' : '') + (f.next ? ' is-next' : '') + '">' +
      '<div class="ev-media">' + media(ev) + '</div>' +
      '<div class="ev-body"><p class="ev-kicker">' + esc(ev.org) + '</p>' +
      '<h3>' + esc(ev.title) + '</h3>' +
      '<ul class="ev-meta"><li>' + I.clock + '<span>' + cap(D.weekday(ev.date)) + ', ' + timeLabel(ev) + '</span></li><li>' + I.pin + '<span>' + esc(ev.place) + '<small>' + esc(ev.area) + '</small></span></li></ul>' +
      '<p class="ev-desc">' + esc(ev.description) + '</p>' +
      '<div class="ev-actions"><a class="btn btn-gold btn-sm" href="eventos.html#' + esc(ev.id) + '">Ver detalles</a>' + calMenu(ev) +
      '<button class="btn btn-ghost btn-sm icon-btn" type="button" data-share="' + esc(ev.id) + '" aria-label="Compartir ' + esc(ev.title) + '">' + I.share + '</button></div></div></article>';
  }
  function eventDetail(ev) {
    var f = flags[ev.id];
    return '<article class="ev-detail reveal' + (ev.featured ? ' featured' : '') + (f.past ? ' is-past' : '') + '" id="' + esc(ev.id) + '">' +
      '<div class="ev-detail-media ev-media">' + media(ev) + '</div>' +
      '<div class="ev-detail-body"><p class="ev-kicker">' + D.ord[ev.night] + ' noche · ' + esc(ev.org) + '</p>' +
      '<h2>' + esc(ev.title) + '</h2><p>' + esc(ev.description) + '</p>' +
      '<div class="ev-facts">' +
        '<div class="fact">' + I.cal + '<span><small>Fecha</small>' + cap(D.dateLong(ev.date)) + '</span></div>' +
        '<div class="fact">' + I.clock + '<span><small>Hora</small>' + timeLabel(ev) + '</span></div>' +
        '<div class="fact fact-wide">' + I.pin + '<span><small>Lugar</small>' + esc(ev.place) + '<em>' + esc(ev.address) + '</em></span></div>' +
        (ev.transport ? '<div class="fact fact-wide">' + I.metro + '<span><small>Cómo llegar</small>' + esc(ev.transport) + '</span></div>' : '') +
      '</div>' +
      '<ul class="ev-program">' + ev.program.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      (ev.notice ? '<p class="ev-notice">' + esc(ev.notice) + '</p>' : '') +
      '<div class="ev-actions">' + (f.past ? '' : '<button class="btn btn-gold btn-sm" type="button" data-rsvp="' + esc(ev.id) + '">' + esc(ev.cta) + '</button>') +
        '<a class="btn btn-ghost btn-sm" href="' + mapsUrl(ev) + '" target="_blank" rel="noopener">' + I.map + 'Cómo llegar</a>' + calMenu(ev) +
        '<button class="btn btn-ghost btn-sm icon-btn" type="button" data-share="' + esc(ev.id) + '" aria-label="Compartir ' + esc(ev.title) + '">' + I.share + '</button>' +
      '</div></div></article>';
  }
  $$('[data-events]').forEach(function (list) {
    var full = list.getAttribute('data-events') === 'full';
    list.classList.toggle('compact', !full);
    list.innerHTML = D.events.map(full ? eventDetail : eventCard).join('');
  });
  var fb = $('#filter-bar');
  if (fb) fb.innerHTML = D.events.map(function (ev) {
    var p = D.parse(ev.date);
    return '<a href="#' + ev.id + '">' + cap(D.weekday(ev.date)).slice(0, 3) + ' ' + p.d + ' · ' + esc(ev.short || ev.place) + '</a>';
  }).join('');

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
  if (faq) faq.innerHTML = D.faqs.map(function (f) { return '<details class="reveal"><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('');

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

  /* ---------- Acciones globales ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-ics],[data-share],[data-rsvp],[data-open],[data-ics-all],[data-print],[data-donate]');
    if (!t) {
      $$('.ev-cal[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
      return;
    }
    if (t.hasAttribute('data-ics')) { eventIcs(evById(t.getAttribute('data-ics'))); var d = t.closest('details'); if (d) d.removeAttribute('open'); }
    else if (t.hasAttribute('data-share')) share(evById(t.getAttribute('data-share')));
    else if (t.hasAttribute('data-rsvp')) openRsvp(evById(t.getAttribute('data-rsvp')));
    else if (t.hasAttribute('data-ics-all')) nightsIcs();
    else if (t.hasAttribute('data-print')) window.print();
    else if (t.hasAttribute('data-donate')) {
      e.preventDefault();
      if (D.contact.donateUrl) window.open(D.contact.donateUrl, '_blank', 'noopener');
      else openSponsor();
    }
    else if (t.getAttribute('data-open') === 'volunteer') openVolunteer();
    else if (t.getAttribute('data-open') === 'sponsor') openSponsor();
  });

  /* ---------- Cuenta atrás / estado de hoy ---------- */
  var cd = $('[data-countdown]');
  if (cd) {
    var st = D.status();
    if (st.phase === 'pre') {
      var cells = {};
      ['d', 'h', 'm', 's'].forEach(function (k) { cells[k] = cd.querySelector('[data-cd="' + k + '"]'); });
      var tick = function () {
        var s = Math.floor(Math.max(0, D.firstLight - D.now()) / 1000);
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
      tgt.classList.add('in');
      $$('.reveal', tgt).forEach(function (r) { r.classList.add('in'); });
      setTimeout(function () { tgt.scrollIntoView(); }, 50);
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
