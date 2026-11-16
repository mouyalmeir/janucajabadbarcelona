/* Genera las ilustraciones de los 4 encendidos (assets/img/ev-*.svg).
   Uso: node src/partes/generar-ilustraciones.js
   Cada escena lleva una janukiá con las velas encendidas de esa noche. */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', '..', 'assets', 'img');

let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const DEFS = (sky) => `<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">${sky.map((c, i) => `<stop offset="${i / (sky.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient>
  <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="800" y2="500"><stop offset="0" stop-color="#8a5a18"/><stop offset=".3" stop-color="#f2c46d"/><stop offset=".45" stop-color="#fff1c1"/><stop offset=".6" stop-color="#d9a24a"/><stop offset="1" stop-color="#7a4d12"/></linearGradient>
  <radialGradient id="fl" cx=".5" cy=".85" r=".8"><stop offset="0" stop-color="#fffbe6"/><stop offset=".3" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ffab2e"/><stop offset="1" stop-color="#ff6a00" stop-opacity="0"/></radialGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#ffd678" stop-opacity=".55"/><stop offset=".45" stop-color="#ffaa3c" stop-opacity=".16"/><stop offset="1" stop-color="#ff9632" stop-opacity="0"/></radialGradient>
  <radialGradient id="moon"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#ffe2a3"/></radialGradient>
</defs>`;

function stars(n, maxY) {
  let s = '';
  for (let i = 0; i < n; i++) s += `<circle cx="${(rnd() * 960).toFixed(0)}" cy="${(rnd() * maxY).toFixed(0)}" r="${(0.6 + rnd() * 1.3).toFixed(1)}" fill="#fff" opacity="${(0.35 + rnd() * 0.6).toFixed(2)}"/>`;
  return s;
}
const flame = (x, y, w, h) => `M${x},${y}C${x - w},${y} ${x - w * .95},${y - h * .42} ${x},${y - h}C${x + w * .95},${y - h * .42} ${x + w},${y} ${x},${y}Z`;

// Janukiá estilo Jabad (brazos rectos en diagonal) en coordenadas 800×500, escalada
function janukia(tx, ty, sc, night) {
  const CX = 400, CUP = 250, GAP = 86, SL = 0.55, SH = 166, CH = 78;
  const px = (i) => (i <= 4 ? CX - (5 - i) * GAP : CX + (i - 4) * GAP);
  const k = (i) => (i <= 4 ? 5 - i : i - 4);
  let g = `<g transform="translate(${tx} ${ty}) scale(${sc})">`;
  g += `<circle cx="400" cy="200" r="330" fill="url(#halo)" opacity=".9"/>`;
  for (let i = 1; i <= 8; i++) g += `<path d="M${px(i)},${CUP + 6}L${CX},${CUP + k(i) * GAP * SL}" stroke="url(#gold)" stroke-width="10" stroke-linecap="round" fill="none"/>`;
  g += `<rect x="393" y="${SH + 4}" width="14" height="${462 - SH}" rx="5" fill="url(#gold)"/><path d="M340,482 Q400,436 460,482 Z" fill="url(#gold)"/><rect x="318" y="478" width="164" height="9" rx="4.5" fill="url(#gold)"/>`;
  const candle = (x, cup, lit, sh) => {
    const top = cup - CH;
    let c = `<rect x="${x - 11}" y="${top}" width="22" height="${CH}" rx="3" fill="${sh ? '#e6ecff' : '#f6efe0'}"/>`;
    if (lit) c += `<circle cx="${x}" cy="${top - 24}" r="46" fill="url(#halo)"/><path d="${flame(x, top - 2, 13, 46)}" fill="url(#fl)"/><path d="${flame(x, top - 4, 6, 22)}" fill="#fff8d8"/>`;
    return c;
  };
  for (let i = 1; i <= 8; i++) if (i >= 9 - night) g += candle(px(i), CUP, true, false);
  g += candle(CX, SH, true, true);
  for (let i = 1; i <= 8; i++) g += `<path d="M${px(i) - 18},${CUP - 2}L${px(i) + 18},${CUP - 2}L${px(i) + 11},${CUP + 11}L${px(i) - 11},${CUP + 11}Z" fill="url(#gold)"/>`;
  g += `<path d="M382,${SH - 2}L418,${SH - 2}L411,${SH + 11}L389,${SH + 11}Z" fill="url(#gold)"/>`;
  return g + '</g>';
}

function svg(sky, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" preserveAspectRatio="xMidYMid slice">${DEFS(sky)}<rect width="960" height="600" fill="url(#sky)"/>${body}</svg>\n`;
}
const windows = (x0, y0, cols, rows, dx, dy, w, h, p) => {
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (rnd() < p) s += `<rect x="${x0 + c * dx}" y="${y0 + r * dy}" width="${w}" height="${h}" fill="#ffcf7a" opacity="${(0.5 + rnd() * 0.45).toFixed(2)}"/>`;
  return s;
};

/* 1 · Sant Cugat: monasterio al fondo, Turó de Can Matas con pinos */
seed = 3;
let b = stars(70, 300) + `<circle cx="820" cy="96" r="34" fill="url(#moon)"/><circle cx="806" cy="88" r="34" fill="#141b46"/>`;
b += `<circle cx="300" cy="300" r="230" fill="url(#halo)" opacity=".35"/><g fill="#2a3168"><rect x="120" y="190" width="96" height="260"/><path d="M112 190h112l-56-40z"/><rect x="216" y="270" width="250" height="180"/><path d="M206 270h270l-135-70z"/></g>`;
b += `<circle cx="341" cy="320" r="38" fill="none" stroke="#3d4690" stroke-width="10"/><circle cx="341" cy="320" r="8" fill="#ffcf7a" opacity=".6"/>`;
b += `<g fill="#ffcf7a" opacity=".55"><rect x="140" y="220" width="16" height="30" rx="8"/><rect x="180" y="220" width="16" height="30" rx="8"/><rect x="140" y="290" width="16" height="30" rx="8"/><rect x="180" y="290" width="16" height="30" rx="8"/><rect x="330" y="390" width="22" height="60" rx="11"/></g>`;
b += `<path d="M0 600V430Q220 360 470 400T960 380V600z" fill="#0f1433"/>`;
for (let i = 0; i < 9; i++) { const x = 40 + i * 52 + rnd() * 20, y = 400 + Math.sin(i) * 10, h = 60 + rnd() * 40; b += `<rect x="${x - 3}" y="${y - h * .4}" width="6" height="${h * .5}" fill="#0a0e26"/><ellipse cx="${x}" cy="${y - h * .55}" rx="${26 + rnd() * 10}" ry="${16 + rnd() * 6}" fill="#0a0e26"/>`; }
b += `<path d="M0 600V500Q300 455 600 480T960 470V600z" fill="#080b1f"/>`;
b += janukia(560, 222, .44, 3);
fs.writeFileSync(path.join(OUT, 'ev-sant-cugat.svg'), svg(['#0d1238', '#24215a', '#5a3355'], b));

/* 2 · Girona: catedral con escalinata y casas del Onyar sobre el río */
seed = 7;
b = stars(60, 260);
b += `<g fill="#1c1f4c"><rect x="230" y="110" width="150" height="230"/><rect x="268" y="62" width="74" height="50"/><path d="M276 62q29-34 58 0z"/><rect x="300" y="20" width="10" height="20"/></g>`;
b += `<circle cx="305" cy="170" r="20" fill="none" stroke="#2c3270" stroke-width="7"/><rect x="292" y="260" width="26" height="80" rx="13" fill="#ffcf7a" opacity=".45"/>`;
b += `<g fill="#232659">${[0, 1, 2, 3, 4].map((i) => `<rect x="${200 - i * 22}" y="${340 + i * 14}" width="${210 + i * 44}" height="14"/>`).join('')}</g>`;
const cols = ['#c9763e', '#d79a4a', '#b5534a', '#e0b45c', '#a8584a', '#cf8a4c', '#e2c070', '#b8673f', '#d9a35d', '#9e4f44', '#c98a52', '#e0aa62'];
let x = 0;
let houses = '';
cols.forEach((c, i) => {
  const w = 70 + rnd() * 20, h = 90 + rnd() * 70, y = 430 - h;
  houses += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${c}" opacity=".78"/>` + windows(x + 10, y + 14, 3, Math.floor(h / 30), 20, 28, 9, 13, .55);
  x += w;
});
b += `<g>${houses}</g><rect y="430" width="960" height="170" fill="#0b1133"/>`;
b += `<g transform="translate(0 860) scale(1 -1)" opacity=".22">${houses}</g>`;
b += `<g stroke="#ffcf7a" stroke-width="2" opacity=".25">${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${80 + i * 150} ${470 + (i % 3) * 30}h${40 + i * 6}"/>`).join('')}</g>`;
b += janukia(560, 250, .42, 5);
fs.writeFileSync(path.join(OUT, 'ev-girona.svg'), svg(['#0b1136', '#1f2560', '#4a2f5c'], b));

/* 3 · Turó Parc: árboles, estanque y edificios del Eixample alto */
seed = 13;
b = stars(55, 220);
let blds = '';
[[0, 210, 140], [130, 170, 120], [240, 230, 110], [340, 190, 150], [480, 160, 120], [590, 220, 130], [710, 180, 130], [830, 210, 140]].forEach(([bx, by, bw]) => {
  blds += `<rect x="${bx}" y="${by}" width="${bw}" height="${420 - by}" fill="#171c48"/>` + windows(bx + 12, by + 16, Math.floor(bw / 24), Math.floor((420 - by) / 26), 24, 26, 10, 12, .35);
});
b += blds;
b += `<rect y="360" width="960" height="240" fill="#0d1532"/>`;
for (let i = 0; i < 14; i++) { const tx = i * 72 + rnd() * 30, ty = 380 + rnd() * 20, r = 40 + rnd() * 26; b += `<rect x="${tx - 4}" y="${ty}" width="8" height="40" fill="#0a0f26"/><circle cx="${tx}" cy="${ty - r * .4}" r="${r}" fill="#0f2a33"/><circle cx="${tx - r * .4}" cy="${ty - r * .1}" r="${r * .7}" fill="#0c2129"/>`; }
b += `<ellipse cx="300" cy="510" rx="230" ry="38" fill="#162457"/><ellipse cx="300" cy="510" rx="230" ry="38" fill="none" stroke="#2d3c80" stroke-width="2"/>`;
b += `<g stroke="#ffcf7a" stroke-width="2" opacity=".35"><path d="M210 505h60M300 520h70M240 530h40"/></g>`;
[120, 470, 860].forEach((lx) => { b += `<rect x="${lx - 2}" y="420" width="4" height="90" fill="#0a0e26"/><circle cx="${lx}" cy="418" r="7" fill="#ffd78a"/><circle cx="${lx}" cy="418" r="34" fill="url(#halo)"/>`; });
b += janukia(560, 262, .42, 6);
fs.writeFileSync(path.join(OUT, 'ev-turo-parc.svg'), svg(['#0c1238', '#1d2a63', '#3b3a6a'], b));

/* 4 · Plaça Sant Jaume: Palau de la Generalitat y la gran janukiá */
seed = 21;
b = stars(45, 140);
b += `<rect x="40" y="150" width="880" height="330" fill="#1b2050"/>`;
b += `<rect x="40" y="140" width="880" height="14" fill="#242a62"/>`;
b += `<g fill="#242a62">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<rect x="${60 + i * 86}" y="170" width="16" height="310"/>`).join('')}</g>`;
b += windows(96, 186, 10, 2, 86, 120, 34, 70, .8).replace(/opacity="[\d.]+"/g, 'opacity=".42"');
b += `<path d="M430 480V360a50 50 0 0 1 100 0v120z" fill="#ffcf7a" opacity=".5"/><rect x="400" y="300" width="160" height="10" fill="#2d3474"/>`;
b += `<circle cx="480" cy="230" r="30" fill="none" stroke="#2d3474" stroke-width="8"/>`;
b += `<g><rect x="476" y="60" width="4" height="82" fill="#2a2f66"/><path d="M480 62h46v28h-46z" fill="#c8a94a" opacity=".55"/><path d="M480 69h46M480 76h46M480 83h46" stroke="#a63a3a" stroke-width="3" opacity=".6"/></g>`;
b += `<rect y="480" width="960" height="120" fill="#0c1130"/>`;
let crowd = '';
for (let i = 0; i < 48; i++) { const cx = 10 + i * 20 + rnd() * 8, cy = 560 + rnd() * 14; crowd += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(8 + rnd() * 3).toFixed(1)}" fill="#070a1c"/><rect x="${(cx - 11).toFixed(0)}" y="${(cy + 6).toFixed(0)}" width="22" height="40" rx="9" fill="#070a1c"/>`; }
b += janukia(150, 168, .58, 7) + crowd;
fs.writeFileSync(path.join(OUT, 'ev-sant-jaume.svg'), svg(['#0b1036', '#1a2160', '#3c2d5e'], b));

/* Janukiá con las 8 velas (para la imagen de compartir) */
fs.writeFileSync(path.join(__dirname, 'janukia-8.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 800 540">${DEFS(['#000', '#000'])}${janukia(0, 0, 1, 8).replace(/<circle cx="400" cy="200" r="330"[^>]*\/>/, '')}</svg>\n`);

console.log('✓ ilustraciones generadas');
