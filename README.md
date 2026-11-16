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

### Antes de publicar

En `src/construir.js`, rellena `DOMINIO` con la dirección final de la web, por ejemplo `'https://januca.chabadbarcelona.org'`. Después ejecuta `node src/construir.js`. Sin ese dato, WhatsApp y las redes sociales no muestran la imagen al compartir el enlace.

## Ver la web en local

```bash
python3 -m http.server 8787
```

Abre http://localhost:8787. Para simular otro día, añade `?fecha=2026-12-08T19:00` a la dirección; para abrir una noche concreta, `?noche=5`.

## Qué hay que subir al hosting

Solo esto: los 8 `.html` de la raíz y la carpeta `assets/`. **No** hace falta subir `src/`, `.git`, `.claude` ni este README.

Para preparar un zip con lo necesario:

```bash
zip -r web-januca.zip *.html assets
```
