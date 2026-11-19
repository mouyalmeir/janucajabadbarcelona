# Janucá 5787 · Jabad Barcelona

Web estática (HTML, CSS y JavaScript, sin dependencias): se puede alojar en cualquier hosting.

## Qué se edita y dónde

| Quiero cambiar… | Archivo |
| --- | --- |
| Eventos, horarios de cada noche, contacto, enlace del Google Form del kit, preguntas frecuentes, bendiciones y cantos | `assets/js/data.js` |
| El texto de una página | `src/paginas/<página>.html` |
| La cabecera (logo y menú) | `src/partes/cabecera.html` y el menú en `src/construir.js` |
| El pie de página | `src/partes/pie.html` |
| Metadatos, iconos y fuentes del `<head>` | `src/partes/cabeza.html` |
| Estilos | `assets/css/styles.css` |
| Textos de la web en catalán e inglés | ver «Idiomas», más abajo |

Después de tocar algo dentro de `src/`, regenera las páginas desde la carpeta del proyecto:

```bash
node src/construir.js
```

Los `.html` de la raíz se generan solos: no los edites a mano, porque se sobrescriben.

### Idiomas

La web está en **español** (raíz: `/historia`), **catalán** (`/ca/historia`), **inglés** (`/en/historia`) y **hebreo** (`/he/historia`, de derecha a izquierda). Cada página tiene un selector de idioma en la cabecera, en el menú del móvil y en el pie.

| Quiero cambiar… | Español | Catalán | Inglés | Hebreo |
| --- | --- | --- | --- | --- |
| El texto de una página | `src/paginas/<página>.html` | `src/paginas/ca/<página>.html` | `src/paginas/en/<página>.html` | `src/paginas/he/<página>.html` |
| Menú, cabecera y pie | `src/idiomas.js` | `src/idiomas.js` | `src/idiomas.js` | `src/idiomas.js` |
| Eventos, noches, bendiciones y preguntas | `assets/js/data.js` | `assets/js/data-ca.js` | `assets/js/data-en.js` | `assets/js/data-he.js` |
| Textos que escriben los scripts (agenda, janukiá, dréidel…) | `assets/js/textos.js` | `assets/js/textos.js` | `assets/js/textos.js` | `assets/js/textos.js` |

Si cambias un texto en español, cámbialo también en las otras versiones. Las fechas, horas y enlaces de los eventos solo están en `data.js`: los archivos `data-ca.js`, `data-en.js` y `data-he.js` traducen los textos.

El hebreo se lee de derecha a izquierda: las páginas de `/he/` llevan `dir="rtl"` y los ajustes de diseño están al final de `assets/css/styles.css` (bloque «Hebreo»). La janukiá y los esquemas no se invierten, porque izquierda y derecha son las reales.

### Archivos sueltos en la raíz

Lo que hay en `src/estaticos/` se publica tal cual en la raíz de la web. Ahí está el archivo de verificación de Google Search Console (`google7cdbb29aa767072c.html`): no lo borres, o Google dejará de reconocer la web como verificada.

### Otros generadores

- `node src/partes/generar-ilustraciones.js` vuelve a dibujar las ilustraciones de los encendidos (`assets/img/ev-*.svg`).
- La imagen para compartir (`assets/img/compartir.jpg`, y `compartir-ca.jpg` / `compartir-en.jpg` / `compartir-he.jpg`) se hace desde `src/partes/compartir.html`. Dentro de ese archivo están las instrucciones.

### Dominio

La web está configurada para **https://janucabarcelona.com** (`DOMINIO` en `src/construir.js`). De ahí salen la imagen al compartir, la URL canónica y el `sitemap.xml`.

## Ver la web en local

```bash
node src/servidor.js
```

Abre http://localhost:8787. Las direcciones van sin «.html» (`/historia`), igual que en la web publicada. Para simular otro día, añade `?fecha=2026-12-08T19:00` a la dirección; para abrir una noche concreta, `?noche=5`.

## Publicar

La web está publicada con **GitHub Pages** desde el repositorio https://github.com/mouyalmeir/janucajabadbarcelona.

**Para actualizarla**, basta con subir los cambios a `main`. GitHub ejecuta `node src/construir.js` y publica la carpeta `publicar/` en un par de minutos (ver `.github/workflows/publicar.yml`):

```bash
git add -A && git commit -m "Describe el cambio" && git push
```

El estado de cada publicación se ve en la pestaña **Actions** del repositorio.

### Dominio (Namecheap → GitHub Pages)

En **Namecheap → Domain List → Manage → Advanced DNS**, borra los registros de *parking* y deja estos:

| Tipo | Host | Valor |
| --- | --- | --- |
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME Record | www | mouyalmeir.github.io. |

Cuando el dominio ya funcione, activa **Enforce HTTPS** en *Settings → Pages* del repositorio.

### Alternativas

- **Cloudflare Pages:** sube la carpeta `publicar/` desde *Workers & Pages → Create → Pages → Upload assets* y mueve los nameservers del dominio a Cloudflare.
- **Hosting clásico (FTP):** sube el contenido de `publicar/` a `public_html` o `httpdocs`. Antes, pon `URLS_LIMPIAS = false` en `src/construir.js`.
