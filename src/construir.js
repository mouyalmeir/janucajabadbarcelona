/* ==========================================================================
   Generador de páginas · Janucá 5787 · Jabad Barcelona
   Une la cabeza, la cabecera y el pie (src/partes) con el contenido de cada
   página (src/paginas) y escribe los .html finales en la raíz del proyecto.

   Uso (desde la carpeta del proyecto):   node src/construir.js
   ========================================================================== */
const fs = require('fs');
const path = require('path');

// ⚠️ Dirección pública de la web, sin barra final (p. ej. 'https://januca.chabadbarcelona.org').
// Hace falta para que WhatsApp y las redes muestren la imagen al compartir.
const DOMINIO = 'https://janucabarcelona.com';
// Direcciones sin «.html» (/historia). GitHub Pages y Cloudflare Pages las entienden;
// para ver la web en local usa «node src/servidor.js». En un hosting clásico (FTP), pon false.
const URLS_LIMPIAS = true;
const urlDe = (f) => `${DOMINIO}/${f === 'index.html' ? '' : (URLS_LIMPIAS ? f.replace(/\.html$/, '') : f)}`;

// Menú principal (también se usa en el pie). El tercer valor es una clase opcional.
const MENU = [
  ['index.html', 'Inicio'],
  ['historia.html', 'Historia'],
  ['como-encender.html', 'Cómo encender'],
  ['horarios.html', 'Horarios'],
  ['bendiciones.html', 'Bendiciones'],
  ['tradiciones.html', 'Tradiciones'],
  ['receta.html', 'Recetas'],
  ['eventos.html', 'Eventos', 'nav-cta']
];

const RAIZ = path.join(__dirname, '..');
const PAGINAS = path.join(__dirname, 'paginas');
const PARTES = path.join(__dirname, 'partes');
const leer = (f) => fs.readFileSync(path.join(PARTES, f), 'utf8');
const rellenar = (tpl, datos) => tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in datos ? datos[k] : m));

const CABEZA = leer('cabeza.html');
const CABECERA = leer('cabecera.html');
const PIE = leer('pie.html');
const SKYLINE = leer('skyline.svg').trim();

function pagina(archivo, meta, cuerpo) {
  const menu = MENU.map(([href, txt, cls]) =>
    `<a href="${href}"${cls ? ` class="${cls}"` : ''}${href === archivo ? ' aria-current="page"' : ''}>${txt}</a>`).join('\n        ');
  const menuPie = MENU.map(([href, txt]) => `<a href="${href}">${txt}</a>`).join('\n            ');
  const scripts = ['data.js', 'main.js'].concat(meta.scripts || [])
    .map((s) => `<script src="assets/js/${s}" defer></script>`).join('\n  ');
  const fuentes = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600' +
    (meta.hebrew ? '&family=Frank+Ruhl+Libre:wght@400;500' : '') + '&display=swap';
  const url = DOMINIO ? urlDe(archivo) : '';

  const cabeza = rellenar(CABEZA, {
    TITULO: meta.title,
    DESCRIPCION: meta.description,
    CANONICA: url ? `<link rel="canonical" href="${url}">\n  <meta property="og:url" content="${url}">` : '',
    IMAGEN_COMPARTIR: (DOMINIO ? DOMINIO + '/' : '') + 'assets/img/compartir.jpg',
    FUENTES: fuentes,
    SCRIPTS: scripts
  }).replace(/\n\s*\n/g, '\n');

  return `<!doctype html>
<html lang="es">
<head>
${cabeza.trimEnd()}
</head>
<body>
${rellenar(CABECERA, { MENU: menu }).trimEnd()}

  <main id="contenido">
${cuerpo.trim().replace('{{SKYLINE}}', SKYLINE)}
  </main>

${rellenar(PIE, { MENU_PIE: menuPie }).trimEnd()}
</body>
</html>
`;
}

// Enlaces internos sin «.html» (historia.html → historia, index.html → ./)
function enlacesLimpios(html) {
  if (!URLS_LIMPIAS) return html;
  return html.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, (m, nombre, ancla) =>
    `href="${nombre === 'index' ? './' : nombre}${ancla || ''}"`);
}

for (const f of fs.readdirSync(PAGINAS).filter((f) => f.endsWith('.html'))) {
  const raw = fs.readFileSync(path.join(PAGINAS, f), 'utf8');
  const i = raw.indexOf('\n');
  const meta = JSON.parse(raw.slice(0, i)); // 1.ª línea: {"title", "description", "scripts", "hebrew"}
  fs.writeFileSync(path.join(RAIZ, f), enlacesLimpios(pagina(f, meta, raw.slice(i + 1))));
  console.log('✓', f);
}

// Carpeta «publicar/»: solo lo que hay que subir al hosting (las páginas y assets/)
const PUB = path.join(RAIZ, 'publicar');
fs.rmSync(PUB, { recursive: true, force: true });
fs.mkdirSync(PUB);
fs.readdirSync(RAIZ).filter((f) => f.endsWith('.html')).forEach((f) => fs.copyFileSync(path.join(RAIZ, f), path.join(PUB, f)));
fs.cpSync(path.join(RAIZ, 'assets'), path.join(PUB, 'assets'), { recursive: true });
fs.writeFileSync(path.join(PUB, 'robots.txt'), `User-agent: *\nAllow: /\n${DOMINIO ? `Sitemap: ${DOMINIO}/sitemap.xml\n` : ''}`);
if (DOMINIO) {
  const urls = fs.readdirSync(PUB).filter((f) => f.endsWith('.html'))
    .map((f) => `  <url><loc>${urlDe(f)}</loc></url>`).join('\n');
  fs.writeFileSync(path.join(PUB, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
console.log('✓ carpeta publicar/ lista para subir');
