# Eventos Alem — web oficial

Salón para todo tipo de eventos en Goya, Corrientes. Sitio estático (HTML + CSS + JS, sin build).

- `index.html` — la web (diseño elegido: mezcla neón + clásico claro, `css/nuevo.css` + `css/mezcla.css`).
- `mezcla.html` — redirige a la principal. `nueva.html` — versión 3 (historias), de muestra.
- `js/site-data.js` — servicios ("Todo lo que incluye") y preguntas frecuentes. Acá se cambian los textos.
- `js/nuevo.js` — videos, galería, visor, calendario de fechas y WhatsApp.
- `img/nuevo/` — fotos y videos reales del salón. `img/marca/` — logos.

WhatsApp, Instagram, dirección, preguntas y las fotos/videos de "Eventos en el salón" (tabla `fotos`, bucket `galeria`) se cargan desde el panel (Supabase, clave pública). El calendario no muestra días ocupados: el cliente elige el día y consulta por WhatsApp.

## Ver en tu compu
Abrí `index.html` en el navegador, o servilo con `npx serve .`.

## Publicar
Cualquier hosting estático (Netlify, GitHub Pages). `_headers` tiene los encabezados de seguridad para Netlify.
