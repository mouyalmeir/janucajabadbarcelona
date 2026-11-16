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

Después de tocar algo dentro de `src/`, regenera las páginas desde la carpeta del proyecto:

```bash
node src/construir.js
```

Los `.html` de la raíz se generan solos: no los edites a mano, porque se sobrescriben.

### Otros generadores

- `node src/partes/generar-ilustraciones.js` vuelve a dibujar las ilustraciones de los encendidos (`assets/img/ev-*.svg`).
- La imagen para compartir (`assets/img/compartir.jpg`) se hace desde `src/partes/compartir.html`. Dentro de ese archivo están las instrucciones.

### Dominio

La web está configurada para **https://janucabarcelona.com** (`DOMINIO` en `src/construir.js`). De ahí salen la imagen al compartir, la URL canónica y el `sitemap.xml`.

## Ver la web en local

```bash
python3 -m http.server 8787
```

Abre http://localhost:8787. Para simular otro día, añade `?fecha=2026-12-08T19:00` a la dirección; para abrir una noche concreta, `?noche=5`.

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
