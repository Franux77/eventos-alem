# Eventos Alem — web oficial

Salón familiar de eventos en Goya, Corrientes. Sitio estático (HTML + CSS + JS, sin build).

- `index.html` — la web (diseño elegido: "Fiesta / Neón").
- `js/site-data.js` — servicios ("Todo lo que incluye") y preguntas frecuentes. Acá se cambian los textos.
- `js/nuevo.js` — videos, galería, visor, calendario de fechas y WhatsApp.
- `img/nuevo/` — fotos y videos reales del salón. `img/marca/` — logos.

WhatsApp, Instagram, dirección y fechas ocupadas se cargan desde el panel (Supabase, clave pública).

## Ver en tu compu
Abrí `index.html` en el navegador, o servilo con `npx serve .`.

## Publicar
Cualquier hosting estático (Netlify, GitHub Pages). `_headers` tiene los encabezados de seguridad para Netlify.
