/* ==========================================================================
   Chanukah 5787 · Chabad Barcelona — DATA IN ENGLISH
   Texts only: dates, times, places and links come from data.js.
   If you change an event in data.js, change it here and in data-ca.js too.
   ========================================================================== */
(function (D) {
  'use strict';
  if (!D) return;
  function merge(list, key, tr) { list.forEach(function (x) { var t = tr[x[key]]; if (t) for (var k in t) x[k] = t[k]; }); }

  var FRIDAY = 'Friday: light the menorah before the Shabbat candles, using large candles that will burn at least until 18:30.';
  var FROM = 'From 17:30', NIGHTFALL = 'Nightfall: 17:54';
  merge(D.nights, 'n', {
    1: { hebrew: '25 Kislev', time: 'Before 17:03', note: 'Before the Shabbat candles', alert: FRIDAY,
         thought: 'A single faithful flame is enough to begin dispelling the darkness.',
         idea: 'Give a menorah or a Chanukah kit to someone who doesn’t have one this year.' },
    2: { hebrew: '26 Kislev', time: 'From 18:10', note: 'After Shabbat ends and Havdalah is said',
         alert: 'Saturday: wait until Shabbat ends (18:10) and say Havdalah before lighting.',
         thought: 'We say goodbye to Shabbat and carry its light into the whole week.',
         idea: 'Call a relative or a faraway friend and wish them Chag Sameach.' },
    3: { hebrew: '27 Kislev', time: FROM, note: NIGHTFALL,
         thought: 'In holiness we always go up: each night, one more light than the night before.',
         idea: 'Invite a friend or a neighbour to light the menorah with you.' },
    4: { hebrew: '28 Kislev', time: FROM, note: NIGHTFALL,
         thought: 'The light in your window also shines for whoever walks past in the street.',
         idea: 'Place your menorah where it can be seen from the street and spread the miracle.' },
    5: { hebrew: '29 Kislev', time: FROM, note: NIGHTFALL,
         thought: 'Tonight there are already more candles lit than unlit.',
         idea: 'Play dreidel with the children and tell them the story of the miracle.' },
    6: { hebrew: '30 Kislev', time: FROM, note: NIGHTFALL,
         thought: 'Rosh Chodesh Tevet: a new month begins surrounded by light.',
         idea: 'Spend a few minutes tonight studying Torah as a family.' },
    7: { hebrew: '1 Tevet', time: FROM, note: NIGHTFALL,
         thought: 'No light is too small: every good deed adds up.',
         idea: 'Hand out Chanukah gelt and encourage the children to give part of it to tzedakah.' },
    8: { hebrew: '2 Tevet', time: 'Before 17:03', note: 'Before the Shabbat candles', alert: FRIDAY,
         thought: 'The menorah complete: a light that stays with us all year round.',
         idea: 'Light all eight candles and welcome Shabbat with your family.' }
  });

  merge(D.events, 'id', {
    'sant-cugat': {
      org: 'Chabad Sant Cugat',
      title: 'Menorah lighting at [[Turó de Can Matas]]',
      address: 'Carrer de Josep Irla, opposite Carrer Safir · Sant Cugat del Vallès',
      description: 'Chabad Sant Cugat lights the third Chanukah candle in the open air at [[Turó de Can Matas]] in [[Sant Cugat del Vallès]]. Open to all: come with your family and friends.',
      program: ['Lighting of the 3rd candle', 'In the open air', 'Open to all']
    },
    'girona': {
      org: 'Jewish Centre of Girona', area: 'Girona · Barri Vell, the old Jewish Quarter',
      title: 'Menorah lighting in [[Girona’s Jewish Quarter]]',
      description: 'The Jewish Centre of Girona lights the fifth candle in the heart of the old Jewish quarter, at [[Carrer de la Força, 20]] in [[Girona]]. Open to all.',
      program: ['Lighting of the 5th candle', 'In Girona’s old Jewish Quarter', 'Open to all']
    },
    'turo-parc': {
      org: 'Chabad Barcelona',
      title: 'Menorah lighting at [[Turó Parc]]',
      description: 'Chabad Barcelona lights the sixth candle at [[Turó Parc]] in [[Barcelona]]. An open-air gathering for the whole family, open to all.',
      program: ['Lighting of the 6th candle', 'For the whole family', 'Open to all']
    },
    'placa-sant-jaume': {
      org: 'Chabad Barcelona',
      title: 'Grand Menorah Lighting at [[Plaça Sant Jaume]]',
      description: 'The grand public Chanukah lighting in [[Barcelona]]: at [[Plaça de Sant Jaume]], in front of City Hall and the Palau de la Generalitat. Together we light the seventh candle.',
      program: ['Lighting of the 7th candle', 'In front of City Hall', 'Open to all']
    }
  });

  merge(D.blessings, 'n', {
    1: { name: 'Lehadlik ner Chanukah', when: 'Every night',
         tr: 'Baruch atah A-do-nai, E-lo-heinu Melech haolam, asher kideshanu bemitzvotav vetzivanu lehadlik ner Chanukah.',
         es: 'Blessed are You, L-rd our G-d, King of the universe, who has sanctified us with His commandments and commanded us to kindle the Chanukah light.' },
    2: { name: 'She’asah nissim', when: 'Every night',
         tr: 'Baruch atah A-do-nai, E-lo-heinu Melech haolam, she’asah nissim la’avoteinu bayamim hahem bizman hazeh.',
         es: 'Blessed are You, L-rd our G-d, King of the universe, who performed miracles for our forefathers in those days, at this time.' },
    3: { name: 'Shehecheyanu', when: 'First night only',
         tr: 'Baruch atah A-do-nai, E-lo-heinu Melech haolam, shehecheyanu vekiyemanu vehigianu lizman hazeh.',
         es: 'Blessed are You, L-rd our G-d, King of the universe, who has granted us life, sustained us and enabled us to reach this time.' }
  });
  merge(D.songs, 'key', {
    hanerot: { when: 'After lighting',
      tr: 'Hanerot halalu anu madlikin al hateshuot ve’al hanissim ve’al hanifla’ot, she’asita la’avoteinu bayamim hahem bizman hazeh, al yedei kohanecha hakedoshim. Vechol shemonat yemei Chanukah hanerot halalu kodesh hem, ve’ein lanu reshut lehishtamesh bahem, ela lirotam bilvad, kedei lehodot ulehalel leshimcha hagadol al nissecha ve’al nifle’otecha ve’al yeshuatecha.',
      es: 'We kindle these lights for the salvations, the miracles and the wonders that You performed for our forefathers in those days, at this time, through Your holy priests. Throughout the eight days of Chanukah these lights are sacred; we are not permitted to make use of them, but only to look at them, in order to thank and praise Your great Name for Your miracles, Your wonders and Your salvations.' },
    mizmor: { name: 'Mizmor Shir Chanukat Habayit', when: 'Psalm 30',
      tr: 'Mizmor shir chanukat habayit leDavid.<br>Aromimcha A-do-nai ki dilitani, velo simachta oyevai li.<br>A-do-nai E-lohai, shivati elecha vatirpa’eni.<br>A-do-nai, he’elita min she’ol nafshi, chiyitani miyardi vor.<br>Zameru lA-do-nai chasidav, vehodu lezecher kodsho.<br>Ki rega be’apo, chayim birtzono, ba’erev yalin bechi velaboker rinah.<br>Va’ani amarti veshalvi, bal emot le’olam.<br>A-do-nai, birtzoncha he’emadta leharerei oz, histarta fanecha hayiti nivhal.<br>Elecha A-do-nai ekra, ve’el A-do-nai etchanan.<br>Mah betza bedami berideti el shachat, hayodcha afar, hayagid amitecha.<br>Shema A-do-nai vechoneni, A-do-nai heyeh ozer li.<br>Hafachta mispedi lemachol li, pitachta saki vate’azreni simchah.<br>Lema’an yezamercha chavod velo yidom, A-do-nai E-lohai le’olam odeka.',
      es: 'A psalm. A song for the dedication of the House, by David. I will exalt You, L-rd, for You have raised me up and have not let my enemies rejoice over me. L-rd my G-d, I cried out to You and You healed me. L-rd, You brought my soul up from the depths; You kept me alive so that I would not go down to the pit. Sing to the L-rd, you His pious ones, and give thanks to the memory of His holiness. For His anger lasts but a moment, and His favour a lifetime; in the evening there is weeping, and in the morning, joy. I said in my tranquillity: “I shall never be shaken.” L-rd, by Your favour You made me stand firm as a mighty mountain; You hid Your face and I was dismayed. To You, L-rd, I call; to my L-rd I plead: “What gain is there in my blood if I go down to the grave? Will the dust praise You? Will it proclaim Your truth?” Hear, L-rd, and be gracious to me; L-rd, be my help. You turned my mourning into dancing; You removed my sackcloth and girded me with joy, so that my soul may sing to You and not be silent. L-rd my G-d, I will thank You for ever.' },
    maoz: { name: 'Ma’oz Tzur', when: 'Traditional song',
      tr: 'Ma’oz tzur yeshuati, lecha na’eh leshabe’ach,<br>tikon beit tefilati, vesham todah nezabe’ach.<br>Le’et tachin matbe’ach mitzar hamnabe’ach,<br>az egmor beshir mizmor chanukat hamizbe’ach.',
      es: 'Stronghold, Rock of my salvation, it is fitting to praise You. Restore my House of prayer, and there we will offer You thanks. When You silence the enemy who torments us, I will complete with song and psalm the dedication of the altar.' }
  });

  D.faqs = [
    { q: 'Do I need to pay or book a ticket?', a: 'No. All the menorah lightings are free and open to everyone.' },
    { q: 'Are they suitable for children?', a: 'Yes. They are open-air lightings for the whole family: bring the children to watch the menorah being lit.' },
    { q: 'Are there lightings outside Barcelona?', a: 'Yes: on Sunday 6th at [[Turó de Can Matas]] in [[Sant Cugat del Vallès]], with Chabad Sant Cugat, and on Tuesday 8th at [[Carrer de la Força, 20]] in [[Girona]], with the Jewish Centre of Girona. In [[Barcelona]] we light on Wednesday 9th at [[Turó Parc]] and on Thursday 10th at [[Plaça Sant Jaume]].' },
    { q: 'I don’t have a menorah or candles. What can I do?', a: 'Order your free kit with a menorah and 44 candles using the form on this website, or call us on 93 410 06 85.' },
    { q: 'Can I come if I’m not Jewish?', a: 'Of course. Chanukah celebrates light overcoming darkness: everyone is welcome to share the celebration in the street.' }
  ];
})(window.JANUCA);
