/* ==========================================================================
   Janucá 5787 · Jabad Barcelona — TEXTOS DE LA WEB EN CADA IDIOMA
   Lo que escriben los scripts (agenda, janukiá interactiva, dréidel, cuenta
   atrás…) en español, catalán e inglés. El idioma sale de <html lang="…">.
   {x} se sustituye por un dato (una fecha, una hora, un número…).
   El contenido de los eventos y las noches traducido está en data-ca.js y data-en.js.
   ========================================================================== */
(function () {
  'use strict';
  var D = window.JANUCA;
  if (!D) return;

  var IDIOMAS = {
    es: {
      weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      wdShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      ord: ['', '1.ª', '2.ª', '3.ª', '4.ª', '5.ª', '6.ª', '7.ª', '8.ª'],
      dateLong: function (wd, d, mon) { return wd + ' ' + d + ' de ' + mon; },
      h: ' h',
      t: {
        and: ' y ',
        calendar: 'Calendario',
        org: 'Organiza',
        icsOrg: 'Organiza: {org}.',
        icsBless: 'Bendiciones: {list}.',
        icsPublic: 'Encendido público: {title} ({org}), {time}.',
        icsNight: '🕎 Janucá · {ord} vela ({n} + shamash)',
        evSuffix: ' · Janucá',
        shareText: '{title} · {date}, {time}. Janucá con Jabad Barcelona ✨',
        finished: 'Finalizado', today: 'Hoy', tomorrow: 'Mañana', inDays: 'En {n} días',
        nextLighting: 'Próximo encendido',
        night: '{ord} noche',
        bigLighting: 'Gran encendido',
        atTime: '{date}, a las {time}',
        directions: 'Cómo llegar',
        share: 'Compartir {title}',
        place: 'Lugar', date: 'Fecha', time: 'Hora', transport: 'Cómo llegar',
        navNext: 'Próximo: {date} · {time} · {place}',
        see: 'Ver',
        arrived1: '¡Ha llegado Janucá! Enciende la 1.ª vela · {time}',
        arrivedN: 'Esta noche: {ord} vela de Janucá · {time}',
        during: 'Hoy: {ord} noche de Janucá · {time}',
        last: 'Último día de Janucá: la festividad concluye esta noche',
        post: 'Janucá 5787 ha concluido. ¡Que la luz siga con nosotros!',
        // Janukiá
        ariaTool: 'Janukiá interactiva: toca las velas para encenderlas',
        ariaDeco: 'Janukiá con las velas de esta noche',
        shamashAria: 'Shamash (vela auxiliar)',
        tapHere: 'Toca aquí',
        publicLighting: 'Encendido público',
        lastTag: 'Última',
        candleOf: 'Vela {i} de {n}',
        nightOf: 'Noche del {hebrew} de 5787',
        howPlace: 'Cómo colocarlas',
        candles1: '1 vela', candlesN: '{n} velas',
        place1: 'La vela de hoy va en el extremo derecho de la janukiá. Enciende el shamash y, con él, la vela.',
        placeN: 'Cada noche se añade una vela a la izquierda. Con el shamash, enciende primero <strong>la vela nueva, la de hoy</strong> (la que acabas de añadir) y sigue hacia la derecha.',
        blessSongs: 'Bendiciones y cantos',
        tapOne: 'Toca una para leerla o cantarla.',
        addLight: 'Suma tu luz',
        quote: '«{x}»',
        sAuto: '<strong>Encendiendo la {ord} noche…</strong><span>Primero el shamash y después, de izquierda a derecha, empezando por la vela de hoy.</span>',
        sStep0: '<strong>Paso 1 · Enciende el shamash</strong><span>Toca la vela central: con ella se encienden las demás.</span>',
        sBless: '<strong>Recita las bendiciones {list}</strong>',
        sBless1: 'Después enciende <b>la vela de hoy</b>, en el extremo derecho.',
        sBlessN: 'Después enciende primero <b>la vela nueva, la de hoy</b>: la que has añadido esta noche, la de más a la izquierda.',
        sCandle: '<strong>Vela {k} de {n}</strong><span>Sigue de izquierda a derecha.</span>',
        sDone: '¡Jag Janucá Saméaj! ✦',
        sDone1: 'La primera vela brilla',
        sDoneN: 'Las {n} velas de la {ord} noche brillan',
        sAfter: '. Ahora se recita <a href="bendiciones#hanerot" data-text="hanerot">Hanerot Halalu</a>, el <a href="bendiciones#mizmor" data-text="mizmor">Mizmor Shir</a> y se canta <a href="bendiciones#maoz-tzur" data-text="maoz">Maoz Tzur</a>.',
        sAutoHint: ' Pulsa <b>«Encenderla yo»</b> para hacerlo tú, vela a vela.',
        btnShamash: 'Encender el shamash',
        btnNext: 'Encender la siguiente',
        notYet: 'Todavía no',
        hintShamash: 'Primero se enciende el <b>shamash</b>, la vela central más alta: con él se encienden las demás.',
        hintOrder: 'Se enciende de <b>izquierda a derecha</b>, empezando por <b>la vela nueva de hoy</b>, la que has añadido esta noche. Toca la vela marcada.',
        blessKicker: '{ord} bendición · {when}',
        close: 'Cerrar',
        // Dréidel
        dAnte: ' El bote se vació: todos ponen una moneda.',
        dNun: 'Nada: ni pones ni coges.',
        dGimel: '¡Todo! Te llevas {x} del bote.', dGimel1: 'la única moneda', dGimelN: 'las {n} monedas',
        dHei: 'Mitad: te llevas {n} {coins}.', coin: 'moneda', coins: 'monedas',
        dShin: 'Pon: añades una moneda al bote.',
        dBroke: ' Te has quedado sin monedas: ¡reinicia para seguir jugando!',
        dSpinning: 'Girando…',
        dNew: 'Nueva partida: 10 monedas para ti y 10 en el bote. ¡Gira el dréidel!',
        // Idioma
        langLabel: 'Idioma'
      }
    },

    ca: {
      weekdays: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'],
      wdShort: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
      months: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'],
      monShort: ['gen', 'febr', 'març', 'abr', 'maig', 'juny', 'jul', 'ag', 'set', 'oct', 'nov', 'des'],
      ord: ['', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a'],
      dateLong: function (wd, d, mon) { return wd + ' ' + d + (/^[aeiou]/.test(mon) ? ' d’' : ' de ') + mon; },
      h: ' h',
      t: {
        and: ' i ',
        calendar: 'Calendari',
        org: 'Organitza',
        icsOrg: 'Organitza: {org}.',
        icsBless: 'Benediccions: {list}.',
        icsPublic: 'Encesa pública: {title} ({org}), {time}.',
        icsNight: '🕎 Hanukkà · {ord} espelma ({n} + shamash)',
        evSuffix: ' · Hanukkà',
        shareText: '{title} · {date}, {time}. Hanukkà amb Jabad Barcelona ✨',
        finished: 'Finalitzat', today: 'Avui', tomorrow: 'Demà', inDays: 'Falten {n} dies',
        nextLighting: 'Propera encesa',
        night: '{ord} nit',
        bigLighting: 'Gran encesa',
        atTime: '{date}, a les {time}',
        directions: 'Com arribar-hi',
        share: 'Comparteix {title}',
        place: 'Lloc', date: 'Data', time: 'Hora', transport: 'Com arribar-hi',
        navNext: 'Propera: {date} · {time} · {place}',
        see: 'Veure',
        arrived1: 'Ha arribat Hanukkà! Encén la 1a espelma · {time}',
        arrivedN: 'Aquesta nit: {ord} espelma de Hanukkà · {time}',
        during: 'Avui: {ord} nit de Hanukkà · {time}',
        last: 'Últim dia de Hanukkà: la festa acaba aquest vespre',
        post: 'Hanukkà 5787 ha acabat. Que la llum continuï amb nosaltres!',
        ariaTool: 'Hanukkià interactiva: toca les espelmes per encendre-les',
        ariaDeco: 'Hanukkià amb les espelmes d’aquesta nit',
        shamashAria: 'Shamash (espelma auxiliar)',
        tapHere: 'Toca aquí',
        publicLighting: 'Encesa pública',
        lastTag: 'Última',
        candleOf: 'Espelma {i} de {n}',
        nightOf: 'Nit del {hebrew} de 5787',
        howPlace: 'Com col·locar-les',
        candles1: '1 espelma', candlesN: '{n} espelmes',
        place1: 'L’espelma d’avui va a l’extrem dret de la hanukkià. Encén el shamash i, amb ell, l’espelma.',
        placeN: 'Cada nit s’afegeix una espelma a l’esquerra. Amb el shamash, encén primer <strong>l’espelma nova, la d’avui</strong> (la que acabes d’afegir) i continua cap a la dreta.',
        blessSongs: 'Benediccions i cants',
        tapOne: 'Toca’n una per llegir-la o cantar-la.',
        addLight: 'Suma la teva llum',
        sAuto: '<strong>Encenent la {ord} nit…</strong><span>Primer el shamash i després, d’esquerra a dreta, començant per l’espelma d’avui.</span>',
        sStep0: '<strong>Pas 1 · Encén el shamash</strong><span>Toca l’espelma central: amb ella s’encenen les altres.</span>',
        sBless: '<strong>Recita les benediccions {list}</strong>',
        sBless1: 'Després encén <b>l’espelma d’avui</b>, a l’extrem dret.',
        sBlessN: 'Després encén primer <b>l’espelma nova, la d’avui</b>: la que has afegit aquesta nit, la de més a l’esquerra.',
        sCandle: '<strong>Espelma {k} de {n}</strong><span>Continua d’esquerra a dreta.</span>',
        sDone: 'Feliç Hanukkà! ✦',
        sDone1: 'La primera espelma brilla',
        sDoneN: 'Les {n} espelmes de la {ord} nit brillen',
        sAfter: '. Ara es recita <a href="bendiciones#hanerot" data-text="hanerot">Hanerot Halalu</a>, el <a href="bendiciones#mizmor" data-text="mizmor">Mizmor Shir</a> i es canta <a href="bendiciones#maoz-tzur" data-text="maoz">Maoz Tzur</a>.',
        sAutoHint: ' Prem <b>«Encendre-la jo»</b> per fer-ho tu, espelma a espelma.',
        btnShamash: 'Encén el shamash',
        btnNext: 'Encén la següent',
        notYet: 'Encara no',
        hintShamash: 'Primer s’encén el <b>shamash</b>, l’espelma central més alta: amb ell s’encenen les altres.',
        hintOrder: 'S’encén d’<b>esquerra a dreta</b>, començant per <b>l’espelma nova d’avui</b>, la que has afegit aquesta nit. Toca l’espelma marcada.',
        blessKicker: '{ord} benedicció · {when}',
        close: 'Tanca',
        dAnte: ' El pot s’ha buidat: tothom hi posa una moneda.',
        dNun: 'Res: ni poses ni agafes.',
        dGimel: 'Tot! T’emportes {x} del pot.', dGimel1: 'l’única moneda', dGimelN: 'les {n} monedes',
        dHei: 'Meitat: t’emportes {n} {coins}.', coin: 'moneda', coins: 'monedes',
        dShin: 'Posa: afegeixes una moneda al pot.',
        dBroke: ' T’has quedat sense monedes: reinicia per continuar jugant!',
        dSpinning: 'Girant…',
        dNew: 'Nova partida: 10 monedes per a tu i 10 al pot. Fes girar el dreidel!',
        langLabel: 'Idioma'
      }
    },

    en: {
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      wdShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      ord: ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
      dateLong: function (wd, d, mon) { return wd + ' ' + d + ' ' + mon; },
      h: '',
      t: {
        and: ' and ',
        calendar: 'Calendar',
        org: 'Organised by',
        icsOrg: 'Organised by {org}.',
        icsBless: 'Blessings: {list}.',
        icsPublic: 'Public menorah lighting: {title} ({org}), {time}.',
        icsNight: '🕎 Chanukah · {ord} candle ({n} + shamash)',
        evSuffix: ' · Chanukah',
        shareText: '{title} · {date}, {time}. Chanukah with Chabad Barcelona ✨',
        finished: 'Finished', today: 'Today', tomorrow: 'Tomorrow', inDays: 'In {n} days',
        nextLighting: 'Next lighting',
        night: '{ord} night',
        bigLighting: 'Grand lighting',
        atTime: '{date}, at {time}',
        directions: 'Directions',
        share: 'Share {title}',
        place: 'Venue', date: 'Date', time: 'Time', transport: 'Getting there',
        navNext: 'Next: {date} · {time} · {place}',
        see: 'View',
        arrived1: 'Chanukah is here! Light the 1st candle · {time}',
        arrivedN: 'Tonight: {ord} Chanukah candle · {time}',
        during: 'Today: {ord} night of Chanukah · {time}',
        last: 'Last day of Chanukah: the festival ends tonight',
        post: 'Chanukah 5787 has ended. May the light stay with us!',
        ariaTool: 'Interactive menorah: tap the candles to light them',
        ariaDeco: 'Menorah with tonight’s candles',
        shamashAria: 'Shamash (helper candle)',
        tapHere: 'Tap here',
        publicLighting: 'Public menorah lighting',
        lastTag: 'Last',
        candleOf: 'Candle {i} of {n}',
        nightOf: 'Night of {hebrew} 5787',
        howPlace: 'How to place them',
        candles1: '1 candle', candlesN: '{n} candles',
        place1: 'Tonight’s candle goes on the far right of the menorah. Light the shamash and use it to light the candle.',
        placeN: 'Each night one more candle is added on the left. With the shamash, light <strong>the new candle, tonight’s</strong> (the one you just added) first, then continue to the right.',
        blessSongs: 'Blessings and songs',
        tapOne: 'Tap one to read or sing it.',
        addLight: 'Add your light',
        quote: '“{x}”',
        sAuto: '<strong>Lighting the {ord} night…</strong><span>First the shamash, then from left to right, starting with tonight’s candle.</span>',
        sStep0: '<strong>Step 1 · Light the shamash</strong><span>Tap the centre candle: it is used to light all the others.</span>',
        sBless: '<strong>Say blessings {list}</strong>',
        sBless1: 'Then light <b>tonight’s candle</b>, on the far right.',
        sBlessN: 'Then light <b>the new candle, tonight’s</b> first: the one you added this evening, furthest to the left.',
        sCandle: '<strong>Candle {k} of {n}</strong><span>Keep going from left to right.</span>',
        sDone: 'Happy Chanukah! ✦',
        sDone1: 'The first candle is shining',
        sDoneN: 'The {n} candles of the {ord} night are shining',
        sAfter: '. Now say <a href="bendiciones#hanerot" data-text="hanerot">Hanerot Halalu</a> and <a href="bendiciones#mizmor" data-text="mizmor">Mizmor Shir</a>, and sing <a href="bendiciones#maoz-tzur" data-text="maoz">Maoz Tzur</a>.',
        sAutoHint: ' Press <b>“Light it myself”</b> to do it yourself, candle by candle.',
        btnShamash: 'Light the shamash',
        btnNext: 'Light the next one',
        notYet: 'Not yet',
        hintShamash: 'The <b>shamash</b>, the tall centre candle, is lit first: it is used to light the others.',
        hintOrder: 'Light from <b>left to right</b>, starting with <b>tonight’s new candle</b>, the one you added this evening. Tap the highlighted candle.',
        blessKicker: '{ord} blessing · {when}',
        close: 'Close',
        dAnte: ' The pot was empty: everyone puts in a coin.',
        dNun: 'Nothing: you don’t add or take anything.',
        dGimel: 'Everything! You take {x} from the pot.', dGimel1: 'the only coin', dGimelN: 'all {n} coins',
        dHei: 'Half: you take {n} {coins}.', coin: 'coin', coins: 'coins',
        dShin: 'Put in: you add a coin to the pot.',
        dBroke: ' You’re out of coins: restart to keep playing!',
        dSpinning: 'Spinning…',
        dNew: 'New game: 10 coins for you and 10 in the pot. Spin the dreidel!',
        langLabel: 'Language'
      }
    }
  };

  var lang = (document.documentElement.getAttribute('lang') || 'es').slice(0, 2);
  var L = IDIOMAS[lang] || IDIOMAS.es;
  if (!IDIOMAS[lang]) lang = 'es';

  function dow(s) { var p = D.parse(s); return new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); }

  D.lang = lang;
  // En /ca/ y /en/ las imágenes están una carpeta más arriba
  D.base = document.documentElement.getAttribute('data-base') || '';
  D.weekdays = L.weekdays;
  D.months = L.months;
  D.ord = L.ord;
  D.weekday = function (s) { return L.weekdays[dow(s)]; };
  D.wdShort = function (s) { return L.wdShort[dow(s)]; };
  D.monShort = function (s) { return L.monShort[D.parse(s).m - 1]; };
  D.dateLong = function (s) { var p = D.parse(s); return L.dateLong(D.weekday(s), p.d, L.months[p.m - 1]); };
  D.hm = function (hm) { return hm + L.h; }; // 17:30 h (en inglés, 17:30)
  D.list = function (arr) { return arr.length > 2 ? arr.slice(0, -1).join(', ') + L.t.and + arr[arr.length - 1] : arr.join(L.t.and); };
  D.t = function (key, vars) {
    var s = key in L.t ? L.t[key] : (IDIOMAS.es.t[key] || key);
    return vars ? s.replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; }) : s;
  };
})();
