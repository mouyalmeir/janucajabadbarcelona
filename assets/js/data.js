/* ==========================================================================
   Janucá 5787 · Jabad Barcelona — DATOS EDITABLES
   Todas las páginas leen de aquí: contacto, noches y los 4 eventos.
   ========================================================================== */
window.JANUCA = (function () {
  'use strict';

  // ⚠️ CONTACTO — rellenar con los datos reales de Jabad Barcelona.
  // Si whatsapp y email están vacíos, los formularios (kit, reservas, voluntariado)
  // avisan de que aún no están configurados en lugar de enviar nada.
  var contact = {
    whatsapp: '',        // solo dígitos con prefijo, p. ej. '34600000000'
    email: '',           // p. ej. 'info@...'
    phone: '',           // texto visible, p. ej. '+34 600 000 000'
    address: '',         // dirección del centro
    donateUrl: '',       // enlace a la pasarela de donaciones
    instagram: ''        // enlace al perfil
  };

  // Noches de Janucá 5787 (Barcelona)
  var nights = [
    { n: 1, date: '2026-12-04', hebrew: '25 de Kislev', time: 'Antes de las 17:03 h', note: 'Antes de las velas de Shabat', blessings: [1, 2, 3],
      alert: 'Viernes: enciende la menorá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.',
      thought: 'Basta una sola llama fiel para empezar a disipar la oscuridad.',
      idea: 'Regala una menorá o un kit de Janucá a alguien que este año no tenga.' },
    { n: 2, date: '2026-12-05', hebrew: '26 de Kislev', time: 'A partir de las 18:10 h', note: 'Tras finalizar Shabat y recitar Havdalá', blessings: [1, 2],
      alert: 'Sábado: espera a que termine Shabat (18:10 h) y recita la Havdalá antes de encender.',
      thought: 'Despedimos el Shabat y llevamos su luz a toda la semana.',
      idea: 'Llama a un familiar o a un amigo lejano y deséale Jag Saméaj.' },
    { n: 3, date: '2026-12-06', hebrew: '27 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'En lo sagrado siempre se asciende: cada noche, una luz más que ayer.',
      idea: 'Ven con tu familia al Gran Encendido en Plaça Sant Jaume.' },
    { n: 4, date: '2026-12-07', hebrew: '28 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'La luz de tu ventana ilumina también a quien pasa por la calle.',
      idea: 'Coloca tu menorá donde se vea desde la calle y difunde el milagro.' },
    { n: 5, date: '2026-12-08', hebrew: '29 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'Esta noche ya brillan más velas encendidas que apagadas.',
      idea: 'Juega al dréidel con los niños y cuéntales la historia del milagro.' },
    { n: 6, date: '2026-12-09', hebrew: '30 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'Rosh Jodesh Tevet: un mes nuevo empieza rodeado de luz.',
      idea: 'Dedica unos minutos esta noche a estudiar Torá en familia.' },
    { n: 7, date: '2026-12-10', hebrew: '1 de Tevet', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'Ninguna luz es demasiado pequeña: cada buena acción suma.',
      idea: 'Reparte Janucá guelt y anima a los niños a dar una parte en Tzedaká.' },
    { n: 8, date: '2026-12-11', hebrew: '2 de Tevet', time: 'Antes de las 17:03 h', note: 'Antes de las velas de Shabat', blessings: [1, 2],
      alert: 'Viernes: enciende la menorá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.',
      thought: 'La menorá completa: una luz que nos acompaña todo el año.',
      idea: 'Enciende las ocho velas y recibe el Shabat en familia.' }
  ];

  // ⚠️ Los 4 encendidos de Jabad Barcelona — lugares y horas PROVISIONALES.
  // Fotos ilustrativas (generadas con IA): sustituir por fotos reales cuando las haya.
  var events = [
    {
      id: 'placa-del-rei', night: 1, date: '2026-12-04', start: '16:30', end: '17:00',
      kicker: 'Inauguración', area: 'Barri Gòtic',
      title: 'Primera vela en Plaça del Rei',
      place: 'Plaça del Rei', address: 'Plaça del Rei, Ciutat Vella, 08002 Barcelona',
      metro: 'L4 Jaume I · L3 Liceu',
      image: 'placa-del-rei', imageAlt: 'Encendido de Janucá en la Plaça del Rei, en el Barri Gòtic',
      description: 'Abrimos Janucá en el corazón del Gòtic: encendemos juntos la primera vela antes de Shabat, con música y las primeras sufganiot.',
      program: ['Palabras de bienvenida', 'Encendido de la primera vela', 'Música en directo', 'Sufganiot y entrega de kits'],
      notice: 'Viernes: el acto termina antes de las 17:03 h para llegar a casa a tiempo para Shabat.',
      cta: 'Confirmar asistencia'
    },
    {
      id: 'placa-sant-jaume', night: 3, date: '2026-12-06', start: '18:00', end: '20:00',
      kicker: 'Gran encendido central', area: 'Ciutat Vella', featured: true,
      title: 'Gran Encendido en Plaça Sant Jaume',
      place: 'Plaça de Sant Jaume', address: 'Plaça de Sant Jaume, Ciutat Vella, 08002 Barcelona',
      metro: 'L4 Jaume I · L3 Liceu',
      image: 'placa-sant-jaume', imageAlt: 'Menorá gigante encendida en la Plaça de Sant Jaume',
      description: 'El gran acto de Janucá en Barcelona: encendemos la menorá gigante en plena plaza con música en directo, sufganiot para todos y animación para toda la familia.',
      program: ['Encendido de la menorá gigante', 'Música jasídica en directo', 'Sufganiot y Janucá guelt', 'Animación para niños'],
      cta: 'Inscribirme gratis'
    },
    {
      id: 'rambla-catalunya', night: 5, date: '2026-12-08', start: '18:30', end: '20:30',
      kicker: 'Janucá en familia', area: 'Eixample',
      title: 'Fiesta Familiar en Rambla de Catalunya',
      place: 'Rambla de Catalunya', address: 'Rambla de Catalunya, Eixample, 08007 Barcelona',
      metro: 'L2 · L3 · L4 Passeig de Gràcia',
      image: 'rambla-catalunya', imageAlt: 'Familias celebrando Janucá en la Rambla de Catalunya',
      description: 'Una noche pensada para los más pequeños: torneo de dréidel, latkes calientes, lluvia de Janucá guelt y talleres para crear tu propia menorá.',
      program: ['Encendido de la quinta vela', 'Torneo de dréidel', 'Latkes y sufganiot', 'Taller infantil de menorás'],
      notice: 'Los talleres infantiles son gratuitos; se agradece inscribirse para preparar material.',
      cta: 'Inscribir a los niños'
    },
    {
      id: 'moll-de-la-fusta', night: 8, date: '2026-12-11', start: '16:15', end: '16:50',
      kicker: 'Clausura junto al mar', area: 'Port Vell',
      title: 'Las 8 luces frente al Mediterráneo',
      place: 'Moll de la Fusta', address: 'Passeig de Colom, Moll de la Fusta, 08002 Barcelona',
      metro: 'L4 Barceloneta · L3 Drassanes',
      image: 'moll-de-la-fusta', imageAlt: 'Menorá encendida junto al puerto de Barcelona al anochecer',
      description: 'Cerramos Janucá encendiendo las ocho velas frente al mar, cantando Hanerot Halalu y Maoz Tzur antes de recibir el Shabat.',
      program: ['Encendido de las 8 velas', 'Hanerot Halalu y Maoz Tzur', 'Brindis de Janucá', 'Despedida antes de Shabat'],
      notice: 'Viernes: terminamos con antelación para que todos lleguen a casa antes de las 17:03 h.',
      cta: 'Confirmar asistencia'
    }
  ];

  var faqs = [
    { q: '¿Hay que pagar o reservar entrada?', a: 'No. Todos los encendidos son abiertos y gratuitos. Confirmar asistencia nos ayuda a calcular cuántas sufganiot y kits preparar.' },
    { q: '¿Son actividades para niños?', a: 'Sí. Hay música, Janucá guelt y actividades para los más pequeños. La fiesta del martes 8 en Rambla de Catalunya está pensada especialmente para familias.' },
    { q: '¿Por qué los encendidos del viernes son tan pronto?', a: 'Los viernes 4 y 11 la menorá debe encenderse antes de que empiece Shabat, que en Barcelona es a las 17:03 h. Por eso quedamos a las 16:15–16:30 h: así hay tiempo de celebrar y llegar a casa.' },
    { q: 'No tengo menorá ni velas, ¿qué hago?', a: 'Pide tu kit gratuito con menorá, 44 velas e instrucciones. Puedes recogerlo en cualquiera de los encendidos.' },
    { q: '¿Puedo venir aunque no sea judío?', a: 'Claro. Janucá celebra que la luz vence a la oscuridad: todo el mundo es bienvenido a compartir la fiesta en la calle.' }
  ];

  var WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var ORD = ['', '1.ª', '2.ª', '3.ª', '4.ª', '5.ª', '6.ª', '7.ª', '8.ª'];
  // Horas de inicio/fin aproximadas para el calendario descargable de las 8 noches
  var NIGHT_SLOTS = { 1: ['16:45', '17:03'], 2: ['18:10', '18:40'], 8: ['16:45', '17:03'] };

  function parse(s) { var p = s.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function weekday(s) { var p = parse(s); return WEEKDAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()]; }
  function dateLong(s) { var p = parse(s); return weekday(s) + ' ' + p.d + ' de ' + MONTHS[p.m - 1]; }

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
    var day = Date.UTC(p.y, p.m - 1, p.d) - (p.h < 4 ? 864e5 : 0); // de madrugada sigue la noche anterior
    var diff = Math.round((day - Date.UTC(2026, 11, 4)) / 864e5);
    if (diff < 0) return { phase: 'pre', night: 1, daysLeft: -diff };
    if (diff <= 7) return { phase: 'during', night: diff + 1 };
    if (diff === 8) return { phase: 'last', night: 8 };
    return { phase: 'post', night: 8 };
  }

  function eventForNight(n) { return events.filter(function (e) { return e.night === n; })[0] || null; }

  return {
    year: '5787',
    contact: contact,
    nights: nights,
    events: events,
    faqs: faqs,
    weekdays: WEEKDAYS,
    months: MONTHS,
    ord: ORD,
    nightSlots: NIGHT_SLOTS,
    parse: parse,
    weekday: weekday,
    dateLong: dateLong,
    toUTC: toUTC,
    now: now,
    status: status,
    eventForNight: eventForNight,
    firstLight: toUTC('2026-12-04', '17:03')
  };
})();
