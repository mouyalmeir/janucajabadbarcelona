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
// Súbelo (+1) cada vez que cambies assets/img/compartir.jpg, para que WhatsApp y las redes no usen la copia vieja
const VERSION_IMAGEN = 2;

// Idiomas: el español va en la raíz; el catalán en /ca/, el inglés en /en/ y el hebreo en /he/ (src/idiomas.js)
const IDIOMAS = require('./idiomas');
const LENGUAS = Object.keys(IDIOMAS);

// Menú principal (también se usa en el pie). El segundo valor es una clase opcional.
// Los nombres de cada idioma están en src/idiomas.js
const MENU = [
  ['index.html'], ['historia.html'], ['como-encender.html'], ['horarios.html'],
  ['bendiciones.html'], ['tradiciones.html'], ['receta.html'], ['eventos.html', 'nav-cta']
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

// Ruta de una página dentro de la web (sin dominio): '' · 'historia' · 'ca/' · 'ca/historia'
const ruta = (lg, f) => {
  const c = IDIOMAS[lg].carpeta;
  const nombre = f === 'index.html' ? '' : (URLS_LIMPIAS ? f.replace(/\.html$/, '') : f);
  return (c ? c + '/' : '') + nombre;
};
const urlDe = (lg, f) => `${DOMINIO}/${ruta(lg, f)}`;
// Enlace relativo desde una página de «desde» a la misma página en «lg»
const enlaceA = (desde, lg, f) => (IDIOMAS[desde].carpeta ? '../' : '') + ruta(lg, f) || './';
const ICONO_IDIOMA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/></svg>';

function pagina(lg, archivo, meta, cuerpo) {
  const L = IDIOMAS[lg];
  const menu = MENU.map(([href, cls]) =>
    `<a href="${href}"${cls ? ` class="${cls}"` : ''}${href === archivo ? ' aria-current="page"' : ''}>` +
    (cls === 'nav-cta' ? `<span class="nav-lbl">${L.menu[href]}</span>` : L.menu[href]) + '</a>').join('\n        ');
  // En el móvil, «Eventos» se ve siempre junto al menú (salvo en la propia página de eventos)
  const cta = MENU.find((m) => m[1] === 'nav-cta');
  const headCta = cta && cta[0] !== archivo ? `<a class="head-cta" href="${cta[0]}"><span class="nav-lbl">${L.menu[cta[0]]}</span></a>` : '';
  const menuPie = MENU.map(([href]) => `<a href="${href}">${L.menu[href]}</a>`).join('\n            ');
  // Selector de idioma: desplegable en el ordenador; fila de cuatro en el menú del móvil
  const opciones = LENGUAS.map((x) => `<li><a href="${enlaceA(lg, x, archivo)}" hreflang="${IDIOMAS[x].html}" lang="${IDIOMAS[x].html}"` +
    (x === lg ? ' aria-current="true"' : '') + `><b>${IDIOMAS[x].corto}</b>${IDIOMAS[x].nombre}</a></li>`).join('');
  const idiomas = `<div class="lang" data-lang>\n          <button class="lang-btn" type="button" aria-expanded="false" aria-controls="lang-list" aria-label="${L.t.IDIOMA}: ${L.nombre}">` +
    `${ICONO_IDIOMA}<span>${L.corto}</span></button>\n          <ul class="lang-list" id="lang-list" aria-label="${L.t.IDIOMA}">${opciones}</ul>\n        </div>`;
  const idiomasPie = `<nav class="foot-lang" aria-label="${L.t.IDIOMA}">` + LENGUAS.map((x) =>
    `<a href="${enlaceA(lg, x, archivo)}" hreflang="${IDIOMAS[x].html}" lang="${IDIOMAS[x].html}"${x === lg ? ' aria-current="true"' : ''}>${IDIOMAS[x].nombre}</a>`).join('') + '</nav>';
  const datosIdioma = lg === 'es' ? [] : [`data-${lg}.js`];
  const scripts = ['data.js', 'textos.js'].concat(datosIdioma, ['main.js'], meta.scripts || [])
    .map((s) => `<script src="assets/js/${s}" defer></script>`).join('\n  ');
  const fuentes = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600' +
    (lg === 'he' ? '&family=Frank+Ruhl+Libre:wght@400..700' : meta.hebrew ? '&family=Frank+Ruhl+Libre:wght@400;500' : '') + '&display=swap';
  const url = DOMINIO ? urlDe(lg, archivo) : '';
  const alternativas = DOMINIO ? LENGUAS.map((x) => `<link rel="alternate" hreflang="${IDIOMAS[x].html}" href="${urlDe(x, archivo)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${urlDe('es', archivo)}">`).join('\n  ') : '';

  const cabeza = rellenar(CABEZA, Object.assign({}, L.t, {
    TITULO: meta.title,
    DESCRIPCION: meta.description,
    CANONICA: url ? `<link rel="canonical" href="${url}">\n  <meta property="og:url" content="${url}">` : '',
    ALTERNATIVAS: alternativas,
    OG_LOCALE: L.og,
    OG_ALTERNATIVAS: LENGUAS.filter((x) => x !== lg).map((x) => `<meta property="og:locale:alternate" content="${IDIOMAS[x].og}">`).join('\n  '),
    IMAGEN_COMPARTIR: (DOMINIO ? DOMINIO + '/' : '') + 'assets/img/' + (lg === 'es' ? 'compartir' : 'compartir-' + lg) + '.jpg?v=' + VERSION_IMAGEN,
    FUENTES: fuentes,
    SCRIPTS: scripts
  })).replace(/\n\s*\n/g, '\n');

  const html = `<!doctype html>
<html lang="${L.html}"${L.dir ? ` dir="${L.dir}"` : ''}${L.carpeta ? ' data-base="../"' : ''}>
<head>
${cabeza.trimEnd()}
</head>
<body>
${rellenar(CABECERA, Object.assign({}, L.t, { MENU: menu, HEAD_CTA: headCta, IDIOMAS: idiomas })).trimEnd()}

  <main id="contenido">
${cuerpo.trim().replace('{{SKYLINE}}', SKYLINE)}
  </main>

${rellenar(PIE, Object.assign({}, L.t, { MENU_PIE: menuPie, IDIOMAS_PIE: idiomasPie })).trimEnd()}
</body>
</html>
`;
  // En /ca/ y /en/, los archivos de assets/ están una carpeta más arriba
  return L.carpeta ? html.replace(/(src|href)="assets\//g, '$1="../assets/') : html;
}

// Enlaces internos sin «.html» (historia.html → historia, index.html → ./)
function enlacesLimpios(html) {
  if (!URLS_LIMPIAS) return html;
  return html.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, (m, nombre, ancla) =>
    `href="${nombre === 'index' ? './' : nombre}${ancla || ''}"`);
}

const ARCHIVOS = fs.readdirSync(PAGINAS).filter((f) => f.endsWith('.html'));
const generadas = [];
for (const lg of LENGUAS) {
  const c = IDIOMAS[lg].carpeta;
  const origen = c ? path.join(PAGINAS, c) : PAGINAS;
  const destino = c ? path.join(RAIZ, c) : RAIZ;
  if (c) { fs.rmSync(destino, { recursive: true, force: true }); fs.mkdirSync(destino); }
  for (const f of ARCHIVOS) {
    const fuente = path.join(origen, f);
    if (!fs.existsSync(fuente)) { console.warn('⚠️  falta la traducción', path.relative(RAIZ, fuente)); continue; }
    const raw = fs.readFileSync(fuente, 'utf8');
    const i = raw.indexOf('\n');
    const meta = JSON.parse(raw.slice(0, i)); // 1.ª línea: {"title", "description", "scripts", "hebrew"}
    fs.writeFileSync(path.join(destino, f), enlacesLimpios(pagina(lg, f, meta, raw.slice(i + 1))));
    generadas.push([lg, f]);
    console.log('✓', (c ? c + '/' : '') + f);
  }
}

// Carpeta «publicar/»: solo lo que hay que subir al hosting (las páginas y assets/)
const PUB = path.join(RAIZ, 'publicar');
fs.rmSync(PUB, { recursive: true, force: true });
fs.mkdirSync(PUB);
generadas.forEach(([lg, f]) => {
  const c = IDIOMAS[lg].carpeta;
  if (c) fs.mkdirSync(path.join(PUB, c), { recursive: true });
  fs.copyFileSync(path.join(RAIZ, c, f), path.join(PUB, c, f));
});
fs.cpSync(path.join(RAIZ, 'assets'), path.join(PUB, 'assets'), { recursive: true });
fs.writeFileSync(path.join(PUB, 'robots.txt'), `User-agent: *\nAllow: /\n${DOMINIO ? `Sitemap: ${DOMINIO}/sitemap.xml\n` : ''}`);
if (DOMINIO) {
  const urls = generadas.map(([lg, f]) => `  <url><loc>${urlDe(lg, f)}</loc>` +
    LENGUAS.map((x) => `<xhtml:link rel="alternate" hreflang="${IDIOMAS[x].html}" href="${urlDe(x, f)}"/>`).join('') + '</url>').join('\n');
  fs.writeFileSync(path.join(PUB, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
}
console.log('✓ carpeta publicar/ lista para subir');
