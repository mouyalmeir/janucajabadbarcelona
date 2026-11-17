/* Servidor local para ver la web con direcciones limpias (/historia → historia.html),
   igual que en GitHub Pages.
   Uso: node src/servidor.js   →   http://localhost:8787 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const PUERTO = Number(process.env.PORT) || 8787;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon'
};

function archivo(ruta) {
  const limpia = decodeURIComponent(ruta.split('?')[0]);
  const base = path.normalize(path.join(RAIZ, limpia));
  if (!base.startsWith(RAIZ)) return null; // nada fuera del proyecto
  const opciones = limpia.endsWith('/') ? [path.join(base, 'index.html')] : [base, base + '.html', path.join(base, 'index.html')];
  return opciones.find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) || null;
}

http.createServer((req, res) => {
  // /ca → /ca/ (como GitHub Pages), para que los enlaces relativos de la carpeta funcionen
  const [camino, consulta] = req.url.split('?');
  const carpeta = path.normalize(path.join(RAIZ, decodeURIComponent(camino)));
  if (!camino.endsWith('/') && carpeta.startsWith(RAIZ) && fs.existsSync(carpeta) && fs.statSync(carpeta).isDirectory()) {
    res.writeHead(301, { Location: camino + '/' + (consulta ? '?' + consulta : '') }); res.end(); return;
  }
  const f = archivo(req.url);
  if (!f) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('No encontrado'); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(f).pipe(res);
}).listen(PUERTO, () => console.log(`Janucá 5787 en http://localhost:${PUERTO}`));
