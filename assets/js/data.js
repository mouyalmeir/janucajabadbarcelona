/* ==========================================================================
   Janucá 5787 · Jabad Barcelona — DATOS EDITABLES
   Todas las páginas leen de aquí: contacto, noches y los 4 eventos.
   ========================================================================== */
window.JANUCA = (function () {
  'use strict';

  // CONTACTO de Jabad Barcelona. Los campos vacíos no se muestran en la web.
  // El patrocinio se envía por WhatsApp (si hay número) o por email.
  var contact = {
    email: 'info@chabadbarcelona.org',
    phone: '93 410 06 85',
    whatsapp: '',        // solo dígitos con prefijo, p. ej. '34600000000'
    address: '',         // dirección del centro
    kitFormUrl: '',      // ⚠️ enlace al Google Form del kit gratuito
    donateUrl: '',       // enlace a la pasarela de donaciones
    instagram: ''        // enlace al perfil
  };

  // Noches de Janucá 5787 (Barcelona)
  var nights = [
    { n: 1, date: '2026-12-04', hebrew: '25 de Kislev', time: 'Antes de las 17:03 h', note: 'Antes de las velas de Shabat', blessings: [1, 2, 3],
      alert: 'Viernes: enciende la janukiá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.',
      thought: 'Basta una sola llama fiel para empezar a disipar la oscuridad.',
      idea: 'Regala una janukiá o un kit de Janucá a alguien que este año no tenga.' },
    { n: 2, date: '2026-12-05', hebrew: '26 de Kislev', time: 'A partir de las 18:10 h', note: 'Tras finalizar Shabat y recitar Havdalá', blessings: [1, 2],
      alert: 'Sábado: espera a que termine Shabat (18:10 h) y recita la Havdalá antes de encender.',
      thought: 'Despedimos el Shabat y llevamos su luz a toda la semana.',
      idea: 'Llama a un familiar o a un amigo lejano y deséale Jag Saméaj.' },
    { n: 3, date: '2026-12-06', hebrew: '27 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'En lo sagrado siempre se asciende: cada noche, una luz más que ayer.',
      idea: 'Invita a un amigo o a un vecino a encender la janukiá contigo.' },
    { n: 4, date: '2026-12-07', hebrew: '28 de Kislev', time: 'A partir de las 17:30 h', note: 'Anochecer: 17:54 h', blessings: [1, 2],
      thought: 'La luz de tu ventana ilumina también a quien pasa por la calle.',
      idea: 'Coloca tu janukiá donde se vea desde la calle y difunde el milagro.' },
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
      alert: 'Viernes: enciende la janukiá antes que las velas de Shabat, con velas grandes que duren al menos hasta las 18:30 h.',
      thought: 'La janukiá completa: una luz que nos acompaña todo el año.',
      idea: 'Enciende las ocho velas y recibe el Shabat en familia.' }
  ];

  // Los 4 encendidos públicos. Horas en hora local (HH:MM); "end" es opcional.
  // "art" es la ilustración de assets/img/<art>.svg
  var events = [
    {
      id: 'sant-cugat', short: 'Sant Cugat', night: 3, date: '2026-12-06', start: '17:30', end: '',
      org: 'Jabad Sant Cugat', area: 'Sant Cugat del Vallès',
      title: 'Encendido en el Turó de Can Matas',
      place: 'Turó de Can Matas', address: 'Calle Josep Irla, frente a la calle Safir · Sant Cugat del Vallès',
      mapsQuery: 'Turó de Can Matas, Carrer de Josep Irla, Sant Cugat del Vallès',
      transport: '', art: 'ev-sant-cugat',
      description: 'Jabad Sant Cugat enciende la tercera vela de Janucá al aire libre, en el Turó de Can Matas. Abierto a todos: ven con tu familia y tus amigos.',
      program: ['Encendido de la 3.ª vela', 'Al aire libre', 'Abierto a todos']
    },
    {
      id: 'girona', short: 'Girona', night: 5, date: '2026-12-08', start: '18:00', end: '',
      org: 'Centro Judío de Girona', area: 'Girona · Barri Vell',
      title: 'Encendido en el Call de Girona',
      place: 'Carrer de la Força, 20', address: 'Carrer de la Força, 20 · Girona',
      mapsQuery: 'Carrer de la Força 20, Girona',
      transport: '', art: 'ev-girona',
      description: 'El Centro Judío de Girona enciende la quinta vela en el corazón del antiguo barrio judío, el Call. Abierto a todos.',
      program: ['Encendido de la 5.ª vela', 'En el Call de Girona', 'Abierto a todos']
    },
    {
      id: 'turo-parc', short: 'Turó Parc', night: 6, date: '2026-12-09', start: '18:00', end: '',
      org: 'Jabad Barcelona', area: 'Sant Gervasi · Barcelona',
      title: 'Encendido en el Turó Parc',
      place: 'Turó Parc', address: 'Turó Parc · Barcelona',
      mapsQuery: 'Turó Parc, Barcelona',
      transport: 'Tram T1 · T2 · T3 Francesc Macià', art: 'ev-turo-parc',
      description: 'Jabad Barcelona enciende la sexta vela en el Turó Parc. Una cita al aire libre para toda la familia, abierta a todos.',
      program: ['Encendido de la 6.ª vela', 'Para toda la familia', 'Abierto a todos']
    },
    {
      id: 'placa-sant-jaume', short: 'Plaça Sant Jaume', night: 7, date: '2026-12-10', start: '18:00', end: '', featured: true,
      org: 'Jabad Barcelona', area: 'Ciutat Vella · Barcelona',
      title: 'Gran Encendido en la Plaça Sant Jaume',
      place: 'Plaça de Sant Jaume', address: 'Plaça de Sant Jaume · Barcelona',
      mapsQuery: 'Plaça de Sant Jaume, Barcelona',
      transport: 'Metro L4 Jaume I · L3 Liceu', art: 'ev-sant-jaume',
      description: 'El gran encendido público de Janucá en Barcelona, frente al Ayuntamiento y el Palau de la Generalitat. Encendemos juntos la séptima vela.',
      program: ['Encendido de la 7.ª vela', 'Frente al Ayuntamiento', 'Abierto a todos']
    }
  ];

  // Bendiciones del encendido (se abren en un diálogo desde la janukiá)
  var blessings = [
    { n: 1, name: 'Lehadlik ner Janucá', when: 'Todas las noches',
      he: 'בָּרוּךְ אַתָּה ה\' אֱ-לֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר חֲנֻכָּה.',
      tr: 'Baruj atá A-do-nai, E-lo-heinu Mélej haolam, asher kideshanu bemitzvotav vetzivanu lehadlik ner Janucá.',
      es: 'Bendito eres Tú, Eterno nuestro Dios, Rey del universo, que nos has santificado con Tus mandamientos y nos has ordenado encender la vela de Janucá.' },
    { n: 2, name: 'Sheasá nisim', when: 'Todas las noches',
      he: 'בָּרוּךְ אַתָּה ה\' אֱ-לֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה.',
      tr: 'Baruj atá A-do-nai, E-lo-heinu Mélej haolam, sheasá nisim laavoteinu baiamim hahem bizmán hazé.',
      es: 'Bendito eres Tú, Eterno nuestro Dios, Rey del universo, que hiciste milagros para nuestros antepasados en aquellos días, en esta época.' },
    { n: 3, name: 'Shehejeianu', when: 'Solo la primera noche',
      he: 'בָּרוּךְ אַתָּה ה\' אֱ-לֹהֵינוּ מֶלֶךְ הָעוֹלָם, שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה.',
      tr: 'Baruj atá A-do-nai, E-lo-heinu Mélej haolam, shehejeianu vekimanu vehiguianu lizman hazé.',
      es: 'Bendito eres Tú, Eterno nuestro Dios, Rey del universo, que nos has dado la vida, nos has sostenido y nos has permitido llegar hasta este momento.' }
  ];

  // Después de encender (se abren en el mismo diálogo que las bendiciones)
  var songs = [
    { key: 'hanerot', name: 'Hanerot Halalu', when: 'Después de encender',
      he: 'הַנֵּרוֹת הַלָּלוּ אָנוּ מַדְלִיקִין עַל הַתְּשׁוּעוֹת וְעַל הַנִּסִּים וְעַל הַנִּפְלָאוֹת, שֶׁעָשִׂיתָ לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה, עַל יְדֵי כֹּהֲנֶיךָ הַקְּדוֹשִׁים. וְכָל שְׁמוֹנַת יְמֵי חֲנֻכָּה הַנֵּרוֹת הַלָּלוּ קֹדֶשׁ הֵם, וְאֵין לָנוּ רְשׁוּת לְהִשְׁתַּמֵּשׁ בָּהֶם, אֶלָּא לִרְאוֹתָם בִּלְבָד, כְּדֵי לְהוֹדוֹת וּלְהַלֵּל לְשִׁמְךָ הַגָּדוֹל עַל נִסֶּיךָ וְעַל נִפְלְאוֹתֶיךָ וְעַל יְשׁוּעָתֶךָ.',
      tr: 'Hanerot halalu anu madlikin al hateshuot veal hanisim veal haniflaot, sheasita laavoteinu baiamim hahem bizmán hazé, al iedei kohaneja hakedoshim. Vejol shemonat iemei Janucá hanerot halalu kódesh hem, veein lanu reshut lehishtamesh bahem, ela lirotam bilvad, kedei lehodot ulehalel leshimjá hagadol al niseja veal nifleoteja veal ieshuateja.',
      es: 'Encendemos estas luces con motivo de las salvaciones, milagros y maravillas que has realizado para con nuestros antepasados en aquellos días en esta época, por medio de Tus santos sacerdotes. Estas luces son sagradas durante los ocho días de Janucá, y no nos está permitido hacer uso de ellas, sino únicamente contemplarlas para agradecer y alabar Tu gran Nombre por Tus milagros, Tus maravillas y Tus salvaciones.' },
    { key: 'mizmor', name: 'Mizmor Shir Janucat Habáit', when: 'Salmo 30',
      he: 'מִזְמוֹר שִׁיר חֲנֻכַּת הַבַּיִת לְדָוִד.<br>אֲרוֹמִמְךָ ה\' כִּי דִלִּיתָנִי, וְלֹא שִׂמַּחְתָּ אֹיְבַי לִי.<br>ה\' אֱ-לֹהָי, שִׁוַּעְתִּי אֵלֶיךָ וַתִּרְפָּאֵנִי.<br>ה\', הֶעֱלִיתָ מִן שְׁאוֹל נַפְשִׁי, חִיִּיתַנִי מִיָּרְדִי בוֹר.<br>זַמְּרוּ לַה\' חֲסִידָיו, וְהוֹדוּ לְזֵכֶר קָדְשׁוֹ.<br>כִּי רֶגַע בְּאַפּוֹ, חַיִּים בִּרְצוֹנוֹ, בָּעֶרֶב יָלִין בֶּכִי וְלַבֹּקֶר רִנָּה.<br>וַאֲנִי אָמַרְתִּי בְשַׁלְוִי, בַּל אֶמּוֹט לְעוֹלָם.<br>ה\', בִּרְצוֹנְךָ הֶעֱמַדְתָּה לְהַרְרִי עֹז, הִסְתַּרְתָּ פָנֶיךָ הָיִיתִי נִבְהָל.<br>אֵלֶיךָ ה\' אֶקְרָא, וְאֶל אֲ-דֹנָי אֶתְחַנָּן.<br>מַה בֶּצַע בְּדָמִי בְּרִדְתִּי אֶל שָׁחַת, הֲיוֹדְךָ עָפָר, הֲיַגִּיד אֲמִתֶּךָ.<br>שְׁמַע ה\' וְחָנֵּנִי, ה\' הֱיֵה עֹזֵר לִי.<br>הָפַכְתָּ מִסְפְּדִי לְמָחוֹל לִי, פִּתַּחְתָּ שַׂקִּי וַתְּאַזְּרֵנִי שִׂמְחָה.<br>לְמַעַן יְזַמֶּרְךָ כָבוֹד וְלֹא יִדֹּם, ה\' אֱ-לֹהַי לְעוֹלָם אוֹדֶךָּ.',
      tr: 'Mizmor shir janucat habáit leDavid.<br>Aromimjá A-do-nai ki dilitani, veló simajta oievai li.<br>A-do-nai E-lohai, shivati eleja vatirpaeni.<br>A-do-nai, heelita min sheol nafshi, jiitani miiardi vor.<br>Zamerú lA-do-nai jasidav, vehodú lezéjer kodshó.<br>Ki rega beapó, jaim birtzonó, baérev ialin beji velabóker riná.<br>Vaaní amarti veshalví, bal emot leolam.<br>A-do-nai, birtzonjá heemadta leharerí oz, histarta faneja haiti nivhal.<br>Eleja A-do-nai ekrá, veel A-do-nai etjanán.<br>Ma betza bedamí berideti el shájat, hayodjá afar, hayaguid amiteja.<br>Shemá A-do-nai vejoneni, A-do-nai heié ozer li.<br>Hafajta mispedí lemajol li, pitajta sakí vateazreni simjá.<br>Lemaan iezamerjá javod veló idom, A-do-nai E-lohai leolam odeka.',
      es: 'Salmo. Cántico para la inauguración de la Casa, de David. Te ensalzaré, Eterno, porque me has levantado y no dejaste que mis enemigos se alegraran de mí. Eterno, Dios mío, a Ti clamé y me sanaste. Eterno, hiciste subir mi alma del abismo; me diste vida para que no descendiera a la fosa. Cantad al Eterno, Sus fieles, y alabad la memoria de Su santidad. Porque Su enojo dura un instante y Su favor, toda una vida; por la noche llega el llanto y por la mañana, la alegría. Yo dije en mi tranquilidad: «Jamás vacilaré». Eterno, con Tu favor me afirmaste como un monte fuerte; ocultaste Tu rostro y quedé turbado. A Ti, Eterno, clamo; a mi Señor suplico: «¿Qué provecho hay en mi sangre si desciendo a la tumba? ¿Te alabará el polvo? ¿Proclamará Tu verdad?». Escucha, Eterno, y ten piedad de mí; Eterno, sé mi ayuda. Cambiaste mi lamento en danza; quitaste mi luto y me ceñiste de alegría, para que mi alma Te cante y no calle. Eterno, Dios mío, por siempre Te daré gracias.' },
    { key: 'maoz', name: 'Maoz Tzur', when: 'Canción tradicional',
      he: 'מָעוֹז צוּר יְשׁוּעָתִי, לְךָ נָאֶה לְשַׁבֵּחַ,<br>תִּכּוֹן בֵּית תְּפִלָּתִי, וְשָׁם תּוֹדָה נְזַבֵּחַ.<br>לְעֵת תָּכִין מַטְבֵּחַ, מִצָּר הַמְנַבֵּחַ,<br>אָז אֶגְמוֹר בְּשִׁיר מִזְמוֹר, חֲנֻכַּת הַמִּזְבֵּחַ.',
      tr: 'Maoz Tzur ieshuatí, lejá naé leshabeaj,<br>tikón bet tefilatí, vesham todá nezabeaj.<br>Leet tajín matbeaj mitzar hamnabeaj,<br>az egmor beshir mizmor janucat hamizbeaj.',
      es: 'Fortaleza, Roca de mi salvación, a Ti es grato alabarte. Restablece mi Casa de oración y allí te ofreceremos gratitud. Cuando silencies al enemigo que nos acosa, concluiré con cánticos la inauguración del altar.' }
  ];

  var faqs = [
    { q: '¿Hay que pagar o reservar entrada?', a: 'No. Todos los encendidos son abiertos y gratuitos.' },
    { q: '¿Son actos para niños?', a: 'Sí. Son encendidos al aire libre para toda la familia: trae a los niños a ver cómo se enciende la janukiá.' },
    { q: '¿Hay encendidos fuera de Barcelona?', a: 'Sí: el domingo 6 en Sant Cugat, con Jabad Sant Cugat, y el martes 8 en Girona, con el Centro Judío de Girona.' },
    { q: 'No tengo janukiá ni velas, ¿qué hago?', a: 'Pide tu kit gratuito con janukiá y 44 velas a través del formulario de la web o llamando al 93 410 06 85.' },
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
    blessings: blessings,
    songs: songs,
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
