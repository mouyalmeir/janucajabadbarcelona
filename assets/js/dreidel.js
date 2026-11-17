/* Dréidel interactivo con bote de monedas */
(function () {
  'use strict';
  var btn = document.getElementById('dreidel-spin');
  var reset = document.getElementById('dreidel-reset');
  var svg = document.getElementById('dreidel');
  var face = document.getElementById('dreidel-face');
  var letter = document.getElementById('dreidel-letter');
  var out = document.getElementById('dreidel-result');
  var potEl = document.getElementById('pot-coins');
  var myEl = document.getElementById('my-coins');
  var items = document.querySelectorAll('#letters li');
  if (!btn || !svg) return;

  var D = window.JANUCA, T = D.t;
  var L = [
    { l: 'נ', name: 'Nun', word: 'Nisht' },
    { l: 'ג', name: 'Guímel', word: 'Gantz' },
    { l: 'ה', name: 'Hei', word: 'Jalb' },
    { l: 'ש', name: 'Shin', word: 'Shtel' }
  ];
  // En catalán e inglés, el yidis se transcribe «Halb» (y en inglés, «Gimel»)
  if (D.lang !== 'es') L[2].word = 'Halb';
  if (D.lang === 'en') L[1].name = 'Gimel';
  // En hebreo: el nombre de la letra y la palabra de «נס גדול היה שם»
  if (D.lang === 'he') [['נון', 'נס'], ['גימל', 'גדול'], ['הא', 'היה'], ['שין', 'שם']].forEach(function (x, i) { L[i].name = x[0]; L[i].word = x[1]; });
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var spinning = false, pot = 10, mine = 10;

  function paint() {
    if (potEl) potEl.textContent = pot;
    if (myEl) myEl.textContent = mine;
    btn.disabled = spinning || mine <= 0;
  }
  // Si el bote se vacía, todos ponen una moneda
  function ante() { if (pot <= 0 && mine > 0) { mine--; pot = 2; return T('dAnte'); } return ''; }

  function apply(r) {
    var txt;
    if (r.l === 'נ') txt = T('dNun');
    else if (r.l === 'ג') { mine += pot; txt = T('dGimel', { x: pot === 1 ? T('dGimel1') : T('dGimelN', { n: pot }) }); pot = 0; }
    else if (r.l === 'ה') { var h = Math.ceil(pot / 2); mine += h; pot -= h; txt = T('dHei', { n: h, coins: h === 1 ? T('coin') : T('coins') }); }
    else { mine--; pot++; txt = T('dShin'); }
    txt += ante();
    if (mine <= 0) txt += T('dBroke');
    letter.textContent = r.l;
    out.innerHTML = '<b>' + r.name + ' · ' + r.word + '</b><br>' + txt;
    [].forEach.call(items, function (li) { li.classList.toggle('hit', li.getAttribute('data-l') === r.l); });
    paint();
  }

  btn.addEventListener('click', function () {
    if (spinning || mine <= 0) return;
    var result = L[Math.floor(Math.random() * 4)];
    if (reduce || !face.animate) { apply(result); return; }
    spinning = true; paint();
    out.textContent = T('dSpinning');
    [].forEach.call(items, function (li) { li.classList.remove('hit'); });
    svg.classList.add('spinning');
    var flips = 10 + Math.floor(Math.random() * 4), i = 0, idx = Math.floor(Math.random() * 4);
    (function flip() {
      var dur = 55 + i * i * 1.1;
      face.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(.05)' }, { transform: 'scaleX(1)' }], { duration: dur * 2, easing: 'linear' });
      setTimeout(function () { i++; letter.textContent = i >= flips ? result.l : L[(idx + i) % 4].l; }, dur);
      // temporizadores (no onfinish) para que nunca se quede girando
      setTimeout(function () {
        if (i < flips) flip();
        else { svg.classList.remove('spinning'); spinning = false; apply(result); }
      }, dur * 2 + 10);
    })();
  });

  if (reset) reset.addEventListener('click', function () {
    if (spinning) return;
    pot = 10; mine = 10;
    out.textContent = T('dNew');
    [].forEach.call(items, function (li) { li.classList.remove('hit'); });
    paint();
  });
  paint();
})();
