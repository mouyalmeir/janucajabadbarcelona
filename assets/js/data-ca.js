/* ==========================================================================
   Hanukkà 5787 · Jabad Barcelona — DADES EN CATALÀ
   Només els textos: les dates, les hores, els llocs i els enllaços són els de data.js.
   Si canvies un esdeveniment a data.js, canvia'l també aquí i a data-en.js.
   ========================================================================== */
(function (D) {
  'use strict';
  if (!D) return;
  function merge(list, key, tr) { list.forEach(function (x) { var t = tr[x[key]]; if (t) for (var k in t) x[k] = t[k]; }); }

  var VIERNES = 'Divendres: encén la hanukkià abans que les espelmes de Shabat, amb espelmes grans que durin almenys fins a les 18:30 h.';
  var DESDE = 'A partir de les 17:30 h', NOCHE = 'Cau la nit: 17:54 h';
  merge(D.nights, 'n', {
    1: { hebrew: '25 de Kislev', time: 'Abans de les 17:03 h', note: 'Abans de les espelmes de Shabat', alert: VIERNES,
         thought: 'N’hi ha prou amb una sola flama fidel per començar a dissipar la foscor.',
         idea: 'Regala una hanukkià o un kit de Hanukkà a algú que enguany no en tingui.' },
    2: { hebrew: '26 de Kislev', time: 'A partir de les 18:10 h', note: 'Quan acaba Shabat i després de recitar l’Havdalà',
         alert: 'Dissabte: espera que acabi Shabat (18:10 h) i recita l’Havdalà abans d’encendre.',
         thought: 'Acomiadem el Shabat i portem la seva llum a tota la setmana.',
         idea: 'Truca a un familiar o a un amic llunyà i desitja-li un feliç Hanukkà.' },
    3: { hebrew: '27 de Kislev', time: DESDE, note: NOCHE,
         thought: 'En allò sagrat sempre s’ascendeix: cada nit, una llum més que ahir.',
         idea: 'Convida un amic o un veí a encendre la hanukkià amb tu.' },
    4: { hebrew: '28 de Kislev', time: DESDE, note: NOCHE,
         thought: 'La llum de la teva finestra il·lumina també qui passa pel carrer.',
         idea: 'Posa la teva hanukkià on es vegi des del carrer i difon el miracle.' },
    5: { hebrew: '29 de Kislev', time: DESDE, note: NOCHE,
         thought: 'Aquesta nit ja brillen més espelmes enceses que apagades.',
         idea: 'Juga al dreidel amb els nens i explica’ls la història del miracle.' },
    6: { hebrew: '30 de Kislev', time: DESDE, note: NOCHE,
         thought: 'Rosh Hodesh Tevet: un mes nou comença envoltat de llum.',
         idea: 'Dedica uns minuts aquesta nit a estudiar Torà en família.' },
    7: { hebrew: '1 de Tevet', time: DESDE, note: NOCHE,
         thought: 'Cap llum no és massa petita: cada bona acció suma.',
         idea: 'Reparteix Hanukkà guelt i anima els nens a donar-ne una part en tsedakà.' },
    8: { hebrew: '2 de Tevet', time: 'Abans de les 17:03 h', note: 'Abans de les espelmes de Shabat', alert: VIERNES,
         thought: 'La hanukkià completa: una llum que ens acompanya tot l’any.',
         idea: 'Encén les vuit espelmes i rep el Shabat en família.' }
  });

  merge(D.events, 'id', {
    'sant-cugat': {
      title: 'Encesa al [[Turó de Can Matas]]',
      address: 'Carrer de Josep Irla, davant del carrer Safir · Sant Cugat del Vallès',
      description: 'Jabad Sant Cugat encén la tercera espelma de Hanukkà a l’aire lliure, al [[Turó de Can Matas]] de [[Sant Cugat del Vallès]]. Obert a tothom: vine amb la teva família i els teus amics.',
      program: ['Encesa de la 3a espelma', 'A l’aire lliure', 'Obert a tothom']
    },
    'girona': {
      org: 'Centre Jueu de Girona', area: 'Girona · Barri Vell, l’antic Call',
      title: 'Encesa al [[Call de Girona]]',
      description: 'El Centre Jueu de Girona encén la cinquena espelma al cor de l’antic barri jueu, al [[Carrer de la Força, 20]] de [[Girona]]. Obert a tothom.',
      program: ['Encesa de la 5a espelma', 'Al Call de Girona', 'Obert a tothom']
    },
    'turo-parc': {
      title: 'Encesa al [[Turó Parc]]',
      description: 'Jabad Barcelona encén la sisena espelma al [[Turó Parc]] de [[Barcelona]]. Una cita a l’aire lliure per a tota la família, oberta a tothom.',
      program: ['Encesa de la 6a espelma', 'Per a tota la família', 'Obert a tothom']
    },
    'placa-sant-jaume': {
      title: 'Gran Encesa a la [[Plaça Sant Jaume]]',
      description: 'La gran encesa pública de Hanukkà a [[Barcelona]]: a la [[Plaça de Sant Jaume]], davant de l’Ajuntament i el Palau de la Generalitat. Encenem junts la setena espelma.',
      program: ['Encesa de la 7a espelma', 'Davant de l’Ajuntament', 'Obert a tothom']
    }
  });

  // Les transliteracions de l'hebreu són les mateixes que a la versió en castellà
  merge(D.blessings, 'n', {
    1: { name: 'Lehadlik ner Hanukkà', when: 'Totes les nits',
         es: 'Beneït ets Tu, Etern, Déu nostre, Rei de l’univers, que ens has santificat amb els Teus manaments i ens has ordenat encendre la llum de Hanukkà.' },
    2: { when: 'Totes les nits',
         es: 'Beneït ets Tu, Etern, Déu nostre, Rei de l’univers, que vas fer miracles per als nostres avantpassats en aquells dies, en aquesta època.' },
    3: { when: 'Només la primera nit',
         es: 'Beneït ets Tu, Etern, Déu nostre, Rei de l’univers, que ens has donat la vida, ens has sostingut i ens has permès arribar fins a aquest moment.' }
  });
  merge(D.songs, 'key', {
    hanerot: { when: 'Després d’encendre',
      es: 'Encenem aquestes llums per les salvacions, els miracles i les meravelles que vas fer per als nostres avantpassats en aquells dies, en aquesta època, per mitjà dels Teus sants sacerdots. Durant els vuit dies de Hanukkà aquestes llums són sagrades, i no ens és permès fer-ne ús, sinó només contemplar-les per donar gràcies i lloar el Teu gran Nom pels Teus miracles, les Teves meravelles i les Teves salvacions.' },
    mizmor: { name: 'Mizmor Shir Hanukkat Habáit', when: 'Salm 30',
      es: 'Salm. Càntic per a la inauguració de la Casa, de David. T’enaltiré, Etern, perquè m’has aixecat i no has deixat que els meus enemics s’alegressin de mi. Etern, Déu meu, a Tu vaig clamar i em vas guarir. Etern, vas fer pujar la meva ànima de l’abisme; em vas donar vida perquè no baixés a la fossa. Canteu a l’Etern, els Seus fidels, i lloeu la memòria de la Seva santedat. Perquè la Seva ira dura un instant i el Seu favor, tota una vida; al vespre arriba el plor i al matí, l’alegria. Jo vaig dir en la meva tranquil·litat: «Mai no trontollaré». Etern, amb el Teu favor em vas afermar com una muntanya forta; vas amagar el Teu rostre i vaig quedar trasbalsat. A Tu, Etern, clamo; al meu Senyor supliquo: «Quin profit hi ha en la meva sang si baixo a la tomba? Et lloarà la pols? Proclamarà la Teva veritat?». Escolta, Etern, i tingues pietat de mi; Etern, sigues el meu ajut. Vas canviar el meu plany en dansa; em vas treure el dol i em vas cenyir d’alegria, perquè la meva ànima et canti i no calli. Etern, Déu meu, per sempre et donaré gràcies.' },
    maoz: { when: 'Cançó tradicional',
      es: 'Fortalesa, Roca de la meva salvació, és grat lloar-te. Restableix la meva Casa d’oració i allà t’oferirem gratitud. Quan facis callar l’enemic que ens assetja, conclouré amb càntics la inauguració de l’altar.' }
  });

  D.faqs = [
    { q: 'Cal pagar o reservar entrada?', a: 'No. Totes les enceses són obertes i gratuïtes.' },
    { q: 'Són actes per a nens?', a: 'Sí. Són enceses a l’aire lliure per a tota la família: porta els nens a veure com s’encén la hanukkià.' },
    { q: 'Hi ha enceses fora de Barcelona?', a: 'Sí: el diumenge 6 al [[Turó de Can Matas]] de [[Sant Cugat del Vallès]], amb Jabad Sant Cugat, i el dimarts 8 al [[Carrer de la Força, 20]] de [[Girona]], amb el Centre Jueu de Girona. A [[Barcelona]] encenem el dimecres 9 al [[Turó Parc]] i el dijous 10 a la [[Plaça Sant Jaume]].' },
    { q: 'No tinc hanukkià ni espelmes, què faig?', a: 'Demana el teu kit gratuït amb hanukkià i 44 espelmes a través del formulari del web o trucant al 93 410 06 85.' },
    { q: 'Puc venir encara que no sigui jueu?', a: 'És clar. Hanukkà celebra que la llum venç la foscor: tothom és benvingut a compartir la festa al carrer.' }
  ];
})(window.JANUCA);
