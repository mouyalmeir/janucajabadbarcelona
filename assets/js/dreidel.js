/* Dréidel interactivo */
(function () {
  'use strict';
  var btn = document.getElementById('dreidel-spin');
  var svg = document.getElementById('dreidel');
  var face = document.getElementById('dreidel-face');
  var letter = document.getElementById('dreidel-letter');
  var out = document.getElementById('dreidel-result');
  var items = document.querySelectorAll('#letters li');
  if (!btn || !svg) return;

  var L = [
    { l: 'נ', name: 'Nun', word: 'Nisht', txt: 'No pones ni coges nada.' },
    { l: 'ג', name: 'Guímel', word: 'Gantz', txt: '¡Te llevas todo el bote!' },
    { l: 'ה', name: 'Hei', word: 'Jalb', txt: 'Te llevas la mitad del bote.' },
    { l: 'ש', name: 'Shin', word: 'Shtel', txt: 'Añades una ficha al bote.' }
  ];
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var spinning = false;

  function show(r) {
    letter.textContent = r.l;
    out.innerHTML = '<b>' + r.name + ' · ' + r.word + '</b><br>' + r.txt;
    [].forEach.call(items, function (li) { li.classList.toggle('hit', li.getAttribute('data-l') === r.l); });
  }

  btn.addEventListener('click', function () {
    if (spinning) return;
    var result = L[Math.floor(Math.random() * 4)];
    if (reduce || !face.animate) { show(result); return; }
    spinning = true;
    btn.disabled = true;
    out.textContent = 'Girando…';
    [].forEach.call(items, function (li) { li.classList.remove('hit'); });
    svg.classList.add('spinning');
    var flips = 10 + Math.floor(Math.random() * 4), i = 0, idx = Math.floor(Math.random() * 4);
    (function flip() {
      var dur = 55 + i * i * 1.1;
      var a = face.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(.05)' }, { transform: 'scaleX(1)' }], { duration: dur * 2, easing: 'linear' });
      setTimeout(function () {
        i++;
        letter.textContent = i >= flips ? result.l : L[(idx + i) % 4].l;
      }, dur);
      a.onfinish = function () {
        if (i < flips) flip();
        else { svg.classList.remove('spinning'); show(result); spinning = false; btn.disabled = false; }
      };
    })();
  });
})();
