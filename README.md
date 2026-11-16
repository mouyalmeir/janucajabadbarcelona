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

Cada vez que ejecutas `node src/construir.js` se crea la carpeta **`publicar/`**. Contiene solo lo que hay que subir: las páginas, `assets/`, `robots.txt` y `sitemap.xml`.

### Cloudflare Pages (gratis, ancho de banda ilimitado)

**Primera vez**

1. Crea una cuenta gratuita en https://dash.cloudflare.com.
2. Ve a **Workers & Pages → Create → Pages → Upload assets** (subida directa). Ponle de nombre `januca-barcelona` y arrastra la carpeta `publicar/`. La web queda publicada en `januca-barcelona.pages.dev`.
3. Pasa el dominio a Cloudflare: **Add a domain** → `janucabarcelona.com` → plan **Free**. Cloudflare te dará 2 *nameservers*.
4. En **Namecheap → Domain List → Manage → Nameservers**, elige **Custom DNS** y pega esos 2 nameservers. Puede tardar desde unos minutos hasta 24 h.
5. Vuelve al proyecto de Pages: **Custom domains → Set up a custom domain**. Añade `janucabarcelona.com` y después `www.janucabarcelona.com`. El certificado https se crea solo.

**Para actualizar la web**

Ejecuta `node src/construir.js` y, en el proyecto de Pages, pulsa **Create new deployment** y vuelve a arrastrar `publicar/`.

También se puede publicar desde la terminal:

```bash
npx wrangler pages deploy publicar --project-name januca-barcelona
```

> Si el dominio tiene configurado en Namecheap el reenvío de correo u otros registros, hay que recrearlos en el DNS de Cloudflare antes de cambiar los nameservers.

### Hosting clásico (FTP)

Sube el contenido de `publicar/` a la carpeta raíz del hosting (`public_html` o `httpdocs`). Antes, pon `URLS_LIMPIAS = false` en `src/construir.js` y vuelve a ejecutarlo.
