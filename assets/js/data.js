/* ==========================================================================
   Janucá 5787 · Jabad Barcelona — DATOS EDITABLES
   Todas las páginas leen de aquí: horarios de cada noche y los 4 eventos.
   Para cambiar un evento basta con editar este archivo.
   ========================================================================== */
window.JANUCA = (function () {
  'use strict';

  // Noches de Janucá 5787 (Barcelona). blessings = bendiciones que se recitan.
  var nights = [
    { n: 1, date: '2026-12-04', time: 'Antes de las 17:03 h', note: 'Antes de las velas de Shabat', blessings: [1, 2, 3], alert: 'Viernes: enciende la menorá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.' },
    { n: 2, date: '2026-12-05', time: 'A partir de las 18:10 h', note: 'Tras finalizar Shabat y recitar Havdalá', blessings: [1, 2], alert: 'Sábado: espera a que termine Shabat (18:10 h) y recita la Havdalá antes de encender.' },
    { n: 3, date: '2026-12-06', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2] },
    { n: 4, date: '2026-12-07', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2] },
    { n: 5, date: '2026-12-08', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2] },
    { n: 6, date: '2026-12-09', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2] },
    { n: 7, date: '2026-12-10', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2] },
    { n: 8, date: '2026-12-11', time: 'Antes de las 17:03 h', note: 'Antes de las velas de Shabat', blessings: [1, 2], alert: 'Viernes: enciende la menorá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.' }
  ];

  // ⚠️ Los 4 encendidos de Jabad Barcelona.
  // Lugares, direcciones y enlaces son PROVISIONALES: sustitúyelos por los reales.
  // Horas en hora local de Barcelona (formato HH:MM). url de "cta" opcional.
  var events = [
    {
      id: 'janucalive',
      night: 2,
      date: '2026-12-05',
      start: '18:45',
      end: '20:30',
      kicker: 'Havdalá + concierto',
      title: 'Janucá Live: Motzaei Shabat',
      place: 'Centro Jabad Barcelona',
      address: 'Dirección por confirmar',
      mapsUrl: '',
      description: 'Despedimos el Shabat con Havdalá y encendemos juntos la segunda vela. Música en directo, sufganiot recién hechas y ambiente de fiesta para toda la familia.',
      cta: { label: 'Más información', url: 'eventos.html#janucalive' }
    },
    {
      id: 'gran-encendido',
      night: 3,
      date: '2026-12-06',
      start: '17:45',
      end: '19:00',
      kicker: 'Menorá gigante en la calle',
      title: 'Gran Encendido Público',
      place: 'Plaza céntrica de Barcelona',
      address: 'Ubicación por confirmar',
      mapsUrl: '',
      description: 'El acto central de Janucá en Barcelona: encendemos la gran menorá en plena calle para difundir el milagro. Dréidels, Janucá guelt para los niños y sufganiot para todos.',
      cta: { label: 'Más información', url: 'eventos.html#gran-encendido' }
    },
    {
      id: 'fiesta-familiar',
      night: 5,
      date: '2026-12-08',
      start: '17:30',
      end: '19:30',
      kicker: 'Talleres para niños',
      title: 'Fiesta Familiar de Janucá',
      place: 'Centro Jabad Barcelona',
      address: 'Dirección por confirmar',
      mapsUrl: '',
      description: 'Encendemos la quinta vela en familia: taller de sufganiot, torneo de dréidel y manualidades. ¡Cada niño se lleva a casa su propia menorá!',
      cta: { label: 'Más información', url: 'eventos.html#fiesta-familiar' }
    },
    {
      id: 'cena-januca',
      night: 7,
      date: '2026-12-10',
      start: '19:30',
      end: '22:00',
      kicker: 'Comunidad a la mesa',
      title: 'Cena de Janucá',
      place: 'Lugar por confirmar',
      address: 'Barcelona',
      mapsUrl: '',
      description: 'Encendemos la séptima vela y compartimos una cena festiva con latkes, sufganiot y palabras de Torá. Plazas limitadas: reserva la tuya.',
      cta: { label: 'Reservar plaza', url: 'eventos.html#cena-januca' }
    }
  ];

  var WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var ORD = ['', '1.ª', '2.ª', '3.ª', '4.ª', '5.ª', '6.ª', '7.ª', '8.ª'];

  function parse(s) { var p = s.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function weekday(s) { var p = parse(s); return WEEKDAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()]; }

  // Barcelona en diciembre = UTC+1
  function toUTC(dateStr, hm) {
    var p = parse(dateStr), t = hm.split(':');
    return new Date(Date.UTC(p.y, p.m - 1, p.d, +t[0] - 1, +t[1]));
  }

  // Permite probar otra fecha: ?fecha=2026-12-08T19:00
  function now() {
    try {
      var q = new URLSearchParams(location.search).get('fecha');
      if (q) { var t = new Date(q); if (!isNaN(t)) return t; }
    } catch (e) {}
    return new Date();
  }

  function madridParts(date) {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(date).forEach(function (x) { o[x.type] = x.value; });
      return { y: +o.year, m: +o.month, d: +o.day, h: +o.hour };
    } catch (e) {
      return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate(), h: date.getHours() };
    }
  }

  // ¿En qué punto de Janucá estamos? (en Barcelona)
  function status(date) {
    var p = madridParts(date || now());
    // de madrugada (antes de las 4:00) seguimos en la noche anterior
    var day = Date.UTC(p.y, p.m - 1, p.d) - (p.h < 4 ? 864e5 : 0);
    var diff = Math.round((day - Date.UTC(2026, 11, 4)) / 864e5);
    if (diff < 0) return { phase: 'pre', night: 1, daysLeft: -diff };
    if (diff <= 7) return { phase: 'during', night: diff + 1 };
    if (diff === 8) return { phase: 'last', night: 8 };
    return { phase: 'post', night: 8 };
  }

  return {
    year: '5787',
    nights: nights,
    events: events,
    weekdays: WEEKDAYS,
    months: MONTHS,
    ord: ORD,
    parse: parse,
    weekday: weekday,
    toUTC: toUTC,
    now: now,
    status: status,
    firstLight: toUTC('2026-12-04', '17:03')
  };
})();
