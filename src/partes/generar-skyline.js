// Genera un skyline estilizado de Barcelona (determinista)
let seed = 7; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const W = 1600, H = 200;
let far = '', near = '', wins = '';
// Montjuïc + castillo
far += `<path d="M0 200V128Q90 96 200 98Q300 100 360 128L400 200Z"/><rect x="150" y="88" width="46" height="12"/><rect x="164" y="80" width="10" height="9"/>`;
// Tibidabo + templo
far += `<path d="M1300 200Q1420 92 1600 104V200Z"/><rect x="1446" y="72" width="16" height="30"/><path d="M1446 72L1454 52L1462 72Z"/><rect x="1453" y="40" width="2" height="12"/>`;
// Torre Glòries
far += `<path d="M1236 200V82Q1236 40 1256 32Q1276 40 1276 82V200Z"/>`;
// Sagrada Família
const spire = (x, top, w) => `<path d="M${x - w} 200V150L${x - w * .7} ${top + 26}Q${x} ${top - 4} ${x + w * .7} ${top + 26}L${x + w} 150V200Z"/>`;
far += `<rect x="1030" y="146" width="150" height="54"/>`;
[[1046, 52, 8], [1064, 40, 8], [1082, 40, 8], [1100, 52, 8], [1124, 14, 13], [1146, 60, 8], [1162, 66, 8]].forEach(([x, t, w]) => far += spire(x, t, w));
// Monumento a Colón
far += `<rect x="520" y="70" width="6" height="130"/><rect x="514" y="150" width="18" height="50"/><circle cx="523" cy="66" r="5"/>`;
// Hotel W (vela)
far += `<path d="M560 200L566 104Q600 84 628 96L618 200Z"/>`;
// Tejados cercanos
let x = 0;
while (x < W) {
  const w = 30 + Math.floor(r() * 70), h = 26 + Math.floor(r() * 46);
  const y = H - h;
  const roof = r();
  if (roof < .25) near += `<path d="M${x} 200V${y}L${x + w / 2} ${y - 12}L${x + w} ${y}V200Z"/>`;
  else if (roof < .4) near += `<path d="M${x} 200V${y}H${x + w * .3}V${y - 8}H${x + w * .7}V${y}H${x + w}V200Z"/>`;
  else near += `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  // ventanas
  for (let wy = y + 8; wy < 192; wy += 12) for (let wx = x + 6; wx < x + w - 6; wx += 10) {
    if (r() < .1) { const c = r(); wins += `<rect class="win${c < .3 ? ' t' : c < .5 ? ' t2' : ''}" x="${wx}" y="${wy}" width="4" height="5"/>`; }
  }
  x += w + Math.floor(r() * 3);
}
process.stdout.write(`<svg class="skyline" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><g class="far">${far}</g><g class="near">${near}</g><g>${wins}</g></svg>`);
