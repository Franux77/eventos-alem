/* Eventos Alem — home nuevo: reels, galería, visor, animaciones y WhatsApp */
(function () {
  'use strict';
  var D = 'img/nuevo/';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fotos y videos: una sola lista para reels, galería y visor
  var MEDIA = [
    { id: 'v-pista', tipo: 'video', titulo: 'Panorama de la pista', sub: 'Caminando bajo las luces', tags: ['pista'] },
    { id: 'v-recorrido', tipo: 'video', titulo: 'Recorrido del salón', sub: 'De la bienvenida a la pista', tags: ['pista', 'deco'] },
    { id: 'v-salon', tipo: 'video', titulo: 'El salón encendido', sub: 'Luces y Cielo Dubai', tags: ['pista'] },
    { id: 'v-cielo', tipo: 'video', titulo: 'Cielo Dubai', sub: 'Lo nuevo del salón', tags: ['pista', 'deco'] },
    { id: 'v-dj', tipo: 'video', titulo: 'Climatización y pista', sub: 'Salón climatizado frío / calor', tags: ['pista'] },
    { id: 'v-trono', tipo: 'video', titulo: 'Trono y cortina de luces', sub: 'Para las fotos', tags: ['deco'] },
    { id: 'v-mesa', tipo: 'video', titulo: 'Mesa principal', sub: 'Ambientación', tags: ['deco'] },
    { id: 'v-cielo-2', tipo: 'video', titulo: 'Cielo Dubai', sub: 'Otra vista', tags: ['pista', 'deco'] },
    { id: 'hero-pista', tipo: 'foto', titulo: 'Pista de baile', alt: 'Pista de baile con bolas de espejos, láser y pantalla', tags: ['pista'] },
    { id: 'dj-cabina', tipo: 'foto', titulo: 'Cabina de DJ', alt: 'Cabina de DJ con el logo de Eventos Alem, parlantes y luces', tags: ['pista'] },
    { id: 'barra', tipo: 'foto', titulo: 'Barra', alt: 'Barra con cartel luminoso de Eventos Alem y banquetas', tags: ['parrilla'] },
    { id: 'rincon-fotos', tipo: 'foto', titulo: 'Rincón para fotos', alt: 'Rincón para fotos con fondo brillante, arco de luces, globos y posa tortas', tags: ['deco'] },
    { id: 'parrilla', tipo: 'foto', titulo: 'Parrilla hasta 150 kg', alt: 'Parrilla de ladrillo con tres sectores y fogón encendido', tags: ['parrilla'] },
    { id: 'mesa-principal', tipo: 'foto', titulo: 'Mesa principal', alt: 'Mesa principal con caminos de mesa bordados y arco de flores', tags: ['deco'] },
    { id: 'heladera', tipo: 'foto', titulo: 'Heladera exhibidora', alt: 'Heladera exhibidora para las bebidas', tags: ['parrilla'] },
    { id: 'dj-luces', tipo: 'foto', titulo: 'Frente de las cabinas', alt: 'Frente de las cabinas de DJ con cabezales móviles', tags: ['pista'] },
    { id: 'bienvenida', tipo: 'foto', titulo: 'Cartel de bienvenida', alt: 'Carteles de bienvenida con las fotos de los homenajeados en la entrada', tags: ['deco'] },
    { id: 'bienvenida-arco', tipo: 'foto', titulo: 'Bienvenida con arco', alt: 'Arco con flores, silla y cartel de bienvenida con fotos', tags: ['deco'] },
    { id: 'pista-globos', tipo: 'foto', titulo: 'Luces y show láser', alt: 'Globos de luz y bolas de espejos sobre la pista', tags: ['pista'] },
    { id: 'pista-pantalla', tipo: 'foto', titulo: 'Pista y pantalla', alt: 'Pista iluminada con la pantalla encendida', tags: ['pista'] },
    { id: 'salon-mesas', tipo: 'foto', titulo: 'Salón armado', alt: 'Salón con mesas armadas y luces violetas', tags: ['deco'] },
    { id: 'entrada-arco', tipo: 'foto', titulo: 'Entrada de película', alt: 'Arco de entrada iluminado con alfombra roja', tags: ['deco'] },
    { id: 'trono', tipo: 'foto', titulo: 'Trono', alt: 'Trono blanco frente a una cortina de luces', tags: ['deco'] },
    { id: 'cielo-dubai', tipo: 'foto', titulo: 'Cielo Dubai', alt: 'Cientos de hilos de luz cálida sobre las mesas', tags: ['deco', 'pista'] },
    { id: 'parrilla-2', tipo: 'foto', titulo: 'Quincho', alt: 'Quincho vidriado con la parrilla', tags: ['parrilla'] },
    { id: 'clima-ventiladores', tipo: 'foto', titulo: 'Climatizado', alt: 'Pared con ventiladores y aire acondicionado', tags: ['comodidad'] },
    { id: 'frente', tipo: 'foto', titulo: 'Frente del salón', alt: 'Frente del salón Eventos Alem sobre Av. Leandro N. Alem', tags: ['llegar'] },
    { id: 'estacionamiento', tipo: 'foto', titulo: 'Estacionamiento', alt: 'Estacionamiento al costado del salón', tags: ['llegar'] },
    { id: 'seg-plano-evacuacion', tipo: 'foto', titulo: 'Plano de evacuación', alt: 'Plano de evacuación con salidas y puntos de encuentro', tags: ['seguridad'] },
    { id: 'seg-matafuego-plano', tipo: 'foto', titulo: 'Matafuegos y cartelería', alt: 'Matafuegos junto al plano y la cartelería', tags: ['seguridad'] },
    { id: 'seg-matafuego', tipo: 'foto', titulo: 'Matafuegos', alt: 'Matafuegos en una columna del salón', tags: ['seguridad'] },
    { id: 'seg-cartel', tipo: 'foto', titulo: 'Plan de emergencia', alt: 'Plan de emergencia con roles asignados y teléfonos de bomberos, policía y hospital', tags: ['seguridad'] }
  ];
  // En la grilla, la seguridad va como un solo collage (las fotos sueltas se ven en el visor)
  var COLLAGE = { id: 'collage-seguridad', titulo: 'Seguridad: matafuegos, plano y plan de emergencia', abre: 'seg-plano-evacuacion' };
  var LIMITE = 8;
  MEDIA.forEach(function (m) {
    m.src = D + m.id + (m.tipo === 'video' ? '.mp4' : '.jpg');
    m.poster = D + m.id + '.jpg';
    if (m.tipo === 'video') m.tags = m.tags.concat('video');
  });
  function idx(id) { for (var i = 0; i < MEDIA.length; i++) if (MEDIA[i].id === id) return i; return 0; }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  }
  var PLAY = '<span class="play-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>';

  // ---------- WhatsApp ----------
  var S = window.SITE || {};
  function waNum() {
    var n = String(S.whatsapp || '').replace(/\D/g, '');
    if (n && n.indexOf('54') !== 0) n = '549' + n;
    return n;
  }
  function waUrl(txt) {
    var n = waNum();
    return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(txt) : '';
  }
  var fab = document.getElementById('fab');
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function pintarContacto() {
    var u = waUrl('¡Hola! Quiero consultar por el salón.');
    if (u) { fab.href = u; fab.target = '_blank'; fab.rel = 'noopener'; }
    var c = document.getElementById('footContacto'); if (!c) return;
    var h = '';
    if (u) h += '<a href="' + u + '" target="_blank" rel="noopener">WhatsApp ' + String(S.whatsapp).replace(/^(\d{4})(\d{6})$/, '$1 $2') + '</a>';
    if (S.instagram) h += '<a href="https://instagram.com/' + encodeURIComponent(String(S.instagram).replace('@', '')) + '" target="_blank" rel="noopener">@' + esc(String(S.instagram).replace('@', '')) + '</a>';
    if (S.direccion) {
      var m = S.mapsUrl ? (/^https?:/.test(S.mapsUrl) ? S.mapsUrl : 'https://' + S.mapsUrl) : '';
      h += m ? '<a href="' + esc(m) + '" target="_blank" rel="noopener">' + esc(S.direccion) + ', Goya</a>' : '<span>' + esc(S.direccion) + ', Goya</span>';
    }
    c.innerHTML = h;
    if (S.direccion) document.getElementById('llegarDir').textContent = S.direccion + ', Goya, Corrientes.';
    if (S.mapsUrl) document.getElementById('llegarMapa').href = /^https?:/.test(S.mapsUrl) ? S.mapsUrl : 'https://' + S.mapsUrl;
  }
  pintarContacto();
  // Preguntas: las mismas que la versión original (site-data + base de datos)
  function pintarFaq() {
    var box = document.getElementById('faqLista');
    if (!box || !(S.faq || []).length) return;
    box.innerHTML = S.faq.map(function (q) {
      return '<details><summary>' + esc(q.p) + '<i></i></summary><p>' + esc(q.r) + '</p></details>';
    }).join('');
  }
  pintarFaq();
  // Contacto cargado desde el panel (WhatsApp, Instagram, dirección)
  if (S.api && S.api.url && S.api.anonKey) {
    fetch(String(S.api.url).replace(/\/$/, '') + '/rest/v1/contenido?select=clave,valor&clave=in.(whatsapp,instagram,direccion,maps_url,faq)',
      { headers: { apikey: S.api.anonKey, Authorization: 'Bearer ' + S.api.anonKey } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (filas) {
        filas.forEach(function (f) {
          if (f.clave === 'faq') { if (Array.isArray(f.valor) && f.valor.length) { S.faq = S.ajustarFaq ? S.ajustarFaq(f.valor) : f.valor; pintarFaq(); } return; }
          var v = f.valor && typeof f.valor === 'object' ? f.valor.v : f.valor;
          if (!v) return;
          if (f.clave === 'maps_url') S.mapsUrl = v; else S[f.clave] = v;
        });
        pintarContacto();
      }).catch(function () {});
  }

  // ---------- Nav sólida al bajar ----------
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- Reels ----------
  var rail = document.getElementById('rail');
  MEDIA.filter(function (m) { return m.tipo === 'video'; }).forEach(function (m) {
    var b = el('button', { type: 'button', class: 'reel', 'aria-label': 'Ver video: ' + m.titulo });
    var v = el('video', { muted: '', loop: '', playsinline: '', preload: 'none', poster: m.poster, 'aria-hidden': 'true' });
    v.muted = true; v.dataset.src = m.src;
    b.appendChild(v);
    b.appendChild(el('span', { class: 'reel-tag' }, 'VIDEO'));
    b.appendChild(el('span', { class: 'reel-cap' }, m.titulo + '<small>' + m.sub + '</small>'));
    b.addEventListener('click', function () { openVisor(idx(m.id)); });
    rail.appendChild(b);
  });
  function railBy(dir) { rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' }); }
  document.getElementById('railPrev').addEventListener('click', function () { railBy(-1); });
  document.getElementById('railNext').addEventListener('click', function () { railBy(1); });

  // Los videos de los reels se reproducen solo cuando se ven
  if ('IntersectionObserver' in window && !reduce) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.5 });
    rail.querySelectorAll('video').forEach(function (v) { vio.observe(v); });
  }

  // ---------- Galería: collage en movimiento (se desliza de costado) ----------
  var gal = document.getElementById('galeria');
  var galRail = document.getElementById('galRail');
  var galBar = document.getElementById('galBar');
  var galCount = document.getElementById('galCount');
  var filtroActual = 'todo';
  var dir = 1, quieto = false, visible = false, arrastro = false, ultimo = 0;
  // Formas del mosaico, se repiten en este orden
  var FORMAS = ['g-big', '', '', 'g-tall', 'g-wide', '', '', 'g-tall', 'g-big', '', 'g-wide', ''];
  function itemGaleria(src, alt, label, tags, alHacerClick, esVideo, texto) {
    var b = el('button', { type: 'button', class: 'g-item', 'data-tags': tags.join(' '), 'aria-label': label });
    b.appendChild(el('img', { src: src, alt: alt, loading: 'lazy', draggable: 'false' }));
    if (esVideo) b.insertAdjacentHTML('beforeend', PLAY);
    b.appendChild(el('span', { class: 'g-cap' }, esc(texto)));
    b.addEventListener('click', function (e) { if (arrastro) { e.preventDefault(); return; } alHacerClick(); });
    gal.appendChild(b);
  }
  var collagePuesto = false;
  // Fotos fuertes primero, con videos intercalados
  var fotosG = MEDIA.filter(function (m) { return m.tipo === 'foto'; });
  var videosG = MEDIA.filter(function (m) { return m.tipo === 'video'; });
  var ordenG = [];
  fotosG.forEach(function (m, k) { ordenG.push(m); if (k % 3 === 1 && videosG.length) ordenG.push(videosG.shift()); });
  ordenG = ordenG.concat(videosG);
  ordenG.forEach(function (m) {
    var i = MEDIA.indexOf(m);
    if (m.tags.indexOf('seguridad') >= 0 && m.id.indexOf('seg-') === 0) {
      if (collagePuesto) return;
      collagePuesto = true;
      itemGaleria(D + COLLAGE.id + '.jpg', 'Collage de seguridad: matafuegos, plano de evacuación y plan de emergencia',
        'Ver fotos de seguridad', ['seguridad'], function () { openVisor(idx(COLLAGE.abre)); }, false, 'Seguridad · 4 fotos');
      return;
    }
    itemGaleria(m.poster, m.alt || '', (m.tipo === 'video' ? 'Ver video: ' : 'Ver foto: ') + m.titulo, m.tags,
      function () { openVisor(i); }, m.tipo === 'video', m.titulo);
  });

  // Lente: las del centro se ven grandes y brillantes; las de los bordes, más chicas y suaves
  function lente() {
    var r = galRail.getBoundingClientRect(), cx = r.left + r.width / 2;
    var max = galRail.scrollWidth - galRail.clientWidth;
    galBar.style.transform = 'scaleX(' + (max > 0 ? Math.max(0.04, galRail.scrollLeft / max) : 1) + ')';
    if (reduce) return;
    gal.querySelectorAll('.g-item:not([hidden])').forEach(function (it) {
      var b = it.getBoundingClientRect();
      if (b.right < r.left - 300 || b.left > r.right + 300) return;
      var d = Math.min(1, Math.abs(b.left + b.width / 2 - cx) / (r.width / 2));
      it.style.setProperty('--s', (1 - d * 0.08).toFixed(3));
      it.style.setProperty('--o', (1 - d * 0.4).toFixed(3));
    });
  }
  galRail.addEventListener('scroll', function () { requestAnimationFrame(lente); }, { passive: true });
  window.addEventListener('resize', lente);

  function pintarGaleria() {
    var k = 0, fotos = 0, vids = 0;
    gal.querySelectorAll('.g-item').forEach(function (it) {
      var entra = filtroActual === 'todo' || it.dataset.tags.split(' ').indexOf(filtroActual) >= 0;
      it.hidden = !entra;
      FORMAS.forEach(function (f) { if (f) it.classList.remove(f); });
      if (entra) {
        var f = FORMAS[k % FORMAS.length]; if (f) it.classList.add(f); k++;
        if (it.querySelector('.play-badge')) vids++; else fotos++;
      }
    });
    galCount.textContent = fotos + (fotos === 1 ? ' foto' : ' fotos') + (vids ? ' · ' + vids + (vids === 1 ? ' video' : ' videos') : '');
    galRail.scrollLeft = 0; dir = 1;
    requestAnimationFrame(lente);
  }
  var filtros = document.querySelectorAll('#filtros .chip');
  filtros.forEach(function (c) {
    c.addEventListener('click', function () {
      filtros.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
      filtroActual = c.dataset.f; pintarGaleria();
    });
  });

  // Avanza sola y despacio; se frena con el mouse encima, al tocarla, al arrastrar o con el visor abierto
  galRail.addEventListener('mouseenter', function () { quieto = true; });
  galRail.addEventListener('mouseleave', function () { quieto = false; });
  galRail.addEventListener('focusin', function () { quieto = true; });
  galRail.addEventListener('focusout', function () { quieto = false; });
  galRail.addEventListener('touchstart', function () { quieto = true; clearTimeout(galRail._t); }, { passive: true });
  galRail.addEventListener('touchend', function () { galRail._t = setTimeout(function () { quieto = false; }, 3000); }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.2 }).observe(galRail);
  } else visible = true;
  var acum = 0;
  function avanzar(t) {
    var dt = ultimo ? Math.min(50, t - ultimo) : 16; ultimo = t;
    if (!reduce && visible && !quieto && !visor.open && !document.hidden) {
      var max = galRail.scrollWidth - galRail.clientWidth;
      if (max > 0) {
        acum += dir * dt * 0.04;
        var paso = acum > 0 ? Math.floor(acum) : Math.ceil(acum);
        if (paso) { galRail.scrollLeft += paso; acum -= paso; }
        if (galRail.scrollLeft >= max - 1) dir = -1;
        else if (galRail.scrollLeft <= 0) dir = 1;
      }
    }
    requestAnimationFrame(avanzar);
  }
  requestAnimationFrame(avanzar);

  // Arrastrar con el mouse (con el dedo se desliza de forma nativa)
  var ini = null;
  galRail.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    ini = { x: e.clientX, s: galRail.scrollLeft }; arrastro = false;
  });
  window.addEventListener('pointermove', function (e) {
    if (!ini) return;
    var dx = e.clientX - ini.x;
    if (Math.abs(dx) > 6) { arrastro = true; galRail.classList.add('arrastrando'); }
    if (arrastro) galRail.scrollLeft = ini.s - dx;
  });
  window.addEventListener('pointerup', function () {
    if (!ini) return; ini = null; galRail.classList.remove('arrastrando');
    setTimeout(function () { arrastro = false; }, 0);
  });
  function galBy(d) { dir = d; galRail.scrollBy({ left: d * galRail.clientWidth * 0.7, behavior: reduce ? 'auto' : 'smooth' }); }
  document.getElementById('galPrev').addEventListener('click', function () { galBy(-1); });
  document.getElementById('galNext').addEventListener('click', function () { galBy(1); });
  galRail.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); galBy(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); galBy(-1); }
  });
  pintarGaleria();

  // ---------- Visor ----------
  var visor = document.getElementById('visor');
  var track = document.getElementById('visorTrack');
  var thumbs = document.getElementById('visorThumbs');
  var tit = document.getElementById('visorTit');
  var count = document.getElementById('visorCount');
  var cur = 0, built = false;

  function build() {
    MEDIA.forEach(function (m, i) {
      var s = el('div', { class: 'v-slide', role: 'group', 'aria-roledescription': 'diapositiva', 'aria-label': (i + 1) + ' de ' + MEDIA.length });
      if (m.tipo === 'video') {
        var v = el('video', { controls: '', loop: '', playsinline: '', preload: 'none', poster: m.poster });
        v.muted = true; v.dataset.src = m.src;
        s.appendChild(v);
      } else {
        s.appendChild(el('img', { src: m.src, alt: m.alt || m.titulo, loading: 'lazy' }));
      }
      track.appendChild(s);
      var t = el('button', { type: 'button', class: m.tipo === 'video' ? 'vt' : '', 'aria-label': 'Ir a ' + m.titulo });
      t.appendChild(el('img', { src: m.poster, alt: '' }));
      t.addEventListener('click', function () { go(i); });
      thumbs.appendChild(t);
    });
    built = true;
  }
  function setActive(i) {
    cur = i;
    var m = MEDIA[i];
    tit.textContent = m.titulo;
    count.textContent = (i + 1) + ' / ' + MEDIA.length;
    thumbs.querySelectorAll('button').forEach(function (b, j) {
      b.setAttribute('aria-current', String(j === i));
      if (j === i) b.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
    track.querySelectorAll('video').forEach(function (v, j) { v.pause(); });
    var v = track.children[i].querySelector('video');
    if (v) { if (!v.src) v.src = v.dataset.src; v.play().catch(function () {}); }
  }
  function go(i) {
    i = (i + MEDIA.length) % MEDIA.length;
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    setActive(i);
  }
  function openVisor(i) {
    if (!built) build();
    if (typeof visor.showModal === 'function') visor.showModal(); else visor.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'auto' });
      setActive(i);
      track.focus();
    });
  }
  function closeVisor() {
    track.querySelectorAll('video').forEach(function (v) { v.pause(); });
    document.body.style.overflow = '';
    if (visor.open) visor.close();
  }
  var st;
  track.addEventListener('scroll', function () {
    clearTimeout(st);
    st = setTimeout(function () {
      var i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== cur) setActive(i);
    }, 90);
  }, { passive: true });
  document.getElementById('visorPrev').addEventListener('click', function () { go(cur - 1); });
  document.getElementById('visorNext').addEventListener('click', function () { go(cur + 1); });
  document.getElementById('visorClose').addEventListener('click', closeVisor);
  visor.addEventListener('close', function () { document.body.style.overflow = ''; track.querySelectorAll('video').forEach(function (v) { v.pause(); }); });
  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
  });
  window.addEventListener('resize', function () { if (visor.open) track.scrollTo({ left: cur * track.clientWidth }); });

  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openVisor(+b.dataset.open || 0); });
  });
  document.querySelectorAll('[data-open-id]').forEach(function (b) {
    b.addEventListener('click', function () { openVisor(idx(b.dataset.openId)); });
  });

  // ---------- Calendario: el cliente elige el día que tiene pensado y consulta por WhatsApp ----------
  // No muestra días ocupados: el dueño confirma la disponibilidad por WhatsApp.
  var TZ = 'America/Argentina/Buenos_Aires';
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var TIPOS = [
    { id: 'casamiento', nombre: 'Casamiento', msg: 'un casamiento' },
    { id: 'quince', nombre: '15 años', msg: 'una fiesta de 15 años' },
    { id: 'cumple', nombre: 'Cumpleaños', msg: 'un cumpleaños' },
    { id: 'infantil', nombre: 'Cumple infantil', msg: 'un cumpleaños infantil' },
    { id: 'empresa', nombre: 'Empresa', msg: 'un evento de empresa' },
    { id: 'otros', nombre: 'Otro', msg: 'un evento' }
  ];
  var cal = { hoy: '', mes: 0, meses: 18, sel: '', tipo: '', inv: '' };
  var $ = function (s) { return document.querySelector(s); };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  function parseISO(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function hoyISO() { return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date()); }
  function fechaLarga(s) { var d = parseISO(s); return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear(); }
  function sumarMeses(s, n) { var d = parseISO(s); d.setMonth(d.getMonth() + n); return iso(d.getFullYear(), d.getMonth(), d.getDate()); }
  function estadoDe(f) { return f < cal.hoy ? 'pasado' : 'libre'; }

  function renderMes() {
    var base = parseISO(cal.hoy);
    var primero = new Date(base.getFullYear(), base.getMonth() + cal.mes, 1);
    var y = primero.getFullYear(), m = primero.getMonth();
    var vacios = (primero.getDay() + 6) % 7, dias = new Date(y, m + 1, 0).getDate(), h = '';
    for (var i = 0; i < vacios; i++) h += '<span class="dia vacio" aria-hidden="true"></span>';
    for (var d = 1; d <= dias; d++) {
      var f = iso(y, m, d), est = estadoDe(f), off = est !== 'libre';
      h += '<button type="button" class="dia ' + est + (f === cal.hoy ? ' hoy' : '') + '" data-f="' + f + '"' + (off ? ' disabled' : '') +
        ' aria-pressed="' + (f === cal.sel) + '" aria-label="' + esc(fechaLarga(f) + (off ? ', ya pasó' : '')) + '">' + d + '</button>';
    }
    $('#calGrid').innerHTML = h;
    $('#calMes').textContent = MESES[m] + ' ' + y;
    $('#calPrev').disabled = cal.mes <= 0;
    $('#calNext').disabled = cal.mes >= cal.meses - 1;
  }
  function mensajeWa() {
    var o = TIPOS.filter(function (t) { return t.id === cal.tipo; })[0];
    if (!cal.sel) return '¡Hola! Quiero consultar una fecha para el salón.';
    return '¡Hola! Quiero consultar si el salón está disponible el ' + fechaLarga(cal.sel) + (o ? ' para ' + o.msg : '') +
      (cal.inv ? '. Seríamos unas ' + cal.inv + ' personas' : '') + '. ¡Gracias!';
  }
  function waHref(t) { return waUrl(t) || '#consultar'; }
  function renderSel() {
    var box = $('#sel');
    if (!cal.sel) {
      box.innerHTML = '<div class="sel-vacio"><span class="ico ico-cyan"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></span>' +
        '<h3>Tocá el día de tu evento</h3><p>Te armamos el mensaje para WhatsApp y te confirmamos si la fecha está disponible.</p>' +
        '<a class="btn btn-glass" href="' + esc(waHref(mensajeWa())) + '" target="_blank" rel="noopener">Escribinos por WhatsApp</a></div>';
      return;
    }
    var aviso = (S.calendario || {}).avisoMeses || 6;
    var lejos = parseISO(cal.sel) > parseISO(sumarMeses(cal.hoy, aviso));
    box.innerHTML = '<div class="sel-in">' +
      '<span class="badge-ok">Fecha elegida</span>' +
      '<p class="sel-fecha">' + esc(fechaLarga(cal.sel)) + '</p>' +
      '<p class="sel-txt">Mandanos el mensaje y te confirmamos si está disponible.</p>' +
      (lejos ? '<p class="sel-nota">Con más de ' + aviso + ' meses de anticipación se reserva con una seña y el precio final se confirma más adelante.</p>' : '') +
      '<fieldset><legend>¿Qué festejás? <small>(opcional)</small></legend><div class="chips" id="selTipos">' +
      TIPOS.map(function (t) { return '<button type="button" class="chip" data-t="' + t.id + '" aria-pressed="' + (t.id === cal.tipo) + '">' + t.nombre + '</button>'; }).join('') +
      '</div></fieldset>' +
      '<label class="sel-lbl">¿Cuántas personas? <small>(opcional)</small><input id="selInv" type="number" inputmode="numeric" min="1" max="1000" placeholder="Ej: 120" value="' + esc(cal.inv) + '"></label>' +
      '<a class="btn btn-wa btn-lg" id="selWa" href="' + esc(waHref(mensajeWa())) + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span>Enviar por WhatsApp</span></a>' +
      '</div>';
    wireSel();
  }
  function wireSel() {
    document.querySelectorAll('#selTipos .chip').forEach(function (b) {
      b.addEventListener('click', function () {
        cal.tipo = cal.tipo === b.dataset.t ? '' : b.dataset.t;
        document.querySelectorAll('#selTipos .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.t === cal.tipo)); });
        $('#selWa').href = waHref(mensajeWa());
      });
    });
    var inv = $('#selInv');
    inv.addEventListener('input', function () { var n = parseInt(inv.value, 10); cal.inv = n > 0 && n <= 1000 ? String(n) : ''; $('#selWa').href = waHref(mensajeWa()); });
    $('#selWa').addEventListener('click', function (e) {
      if (!waUrl('x')) { e.preventDefault(); alert('Falta cargar el número de WhatsApp del salón.\n\nMensaje:\n' + mensajeWa()); }
    });
  }
  function initCal() {
    cal.hoy = hoyISO();
    cal.meses = Math.max(1, Math.min(24, (S.calendario || {}).mesesAdelante || 18));
    renderMes();
    renderSel();
    $('#calPrev').addEventListener('click', function () { cal.mes = Math.max(0, cal.mes - 1); renderMes(); });
    $('#calNext').addEventListener('click', function () { cal.mes = Math.min(cal.meses - 1, cal.mes + 1); renderMes(); });
    $('#calGrid').addEventListener('click', function (e) {
      var b = e.target.closest('.dia[data-f]');
      if (!b || b.disabled) return;
      cal.sel = b.dataset.f; renderMes(); renderSel();
      if (matchMedia('(max-width: 899px)').matches) $('#sel').scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    });
  }
  initCal();

  // ---------- Fotos y videos de eventos (los sube el dueño desde el panel) ----------
  // Tabla "fotos" de Supabase. tipos: quince, casamiento, cumple, infantil, empresa, otros...
  // Si el archivo es .mp4 se muestra como video (path_min es la portada).
  var EV_NOMBRES = { quince: '15 años', casamiento: 'Casamientos', cumple: 'Cumpleaños', infantil: 'Infantiles', empresa: 'Empresas', egresados: 'Egresados' };
  (function cargarEventos() {
    var sec = document.getElementById('eventos');
    if (!sec || !S.api || !S.api.url || !S.api.anonKey) return;
    var base = String(S.api.url).replace(/\/$/, '');
    var pub = base + '/storage/v1/object/public/galeria/';
    function url(p) { return pub + String(p).split('/').map(encodeURIComponent).join('/'); }
    fetch(base + '/rest/v1/fotos?select=id,tipos,titulo,alt,path,path_min&order=orden.asc,created_at.desc&limit=200',
      { headers: { apikey: S.api.anonKey, Authorization: 'Bearer ' + S.api.anonKey } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (filas) {
        filas = (filas || []).filter(function (f) { return f && f.path; });
        if (!filas.length) return;
        var grid = document.getElementById('evGrid'), chips = document.getElementById('evFiltros');
        var usados = [];
        filas.forEach(function (f) {
          var esVideo = /\.mp4$/i.test(f.path);
          var tipos = (f.tipos || []).filter(function (t) { return EV_NOMBRES[t]; });
          tipos.forEach(function (t) { if (usados.indexOf(t) < 0) usados.push(t); });
          var titulo = f.titulo || (tipos[0] ? EV_NOMBRES[tipos[0]] : 'Evento en el salón');
          var m = { id: 'ev-' + f.id, tipo: esVideo ? 'video' : 'foto', titulo: titulo, sub: '', alt: f.alt || titulo, tags: tipos,
            src: url(f.path), poster: url(f.path_min || f.path) };
          MEDIA.push(m);
          var b = el('button', { type: 'button', class: 'ev-item', 'data-tags': tipos.join(' '), 'aria-label': (esVideo ? 'Ver video: ' : 'Ver foto: ') + titulo });
          b.appendChild(el('img', { src: m.poster, alt: m.alt, loading: 'lazy' }));
          if (esVideo) b.insertAdjacentHTML('beforeend', PLAY);
          b.appendChild(el('span', { class: 'g-cap' }, esc(titulo)));
          b.addEventListener('click', function () { openVisor(MEDIA.indexOf(m)); });
          grid.appendChild(b);
        });
        // Si el visor ya se armó, se rearma con las fotos nuevas
        if (built) { track.innerHTML = ''; thumbs.innerHTML = ''; built = false; }
        var orden = ['casamiento', 'quince', 'cumple', 'infantil', 'egresados', 'empresa'];
        usados.sort(function (a, b) { return orden.indexOf(a) - orden.indexOf(b); });
        if (usados.length > 1) {
          chips.innerHTML = '<button type="button" class="chip" aria-pressed="true" data-f="todo">Todos</button>' +
            usados.map(function (t) { return '<button type="button" class="chip" aria-pressed="false" data-f="' + t + '">' + EV_NOMBRES[t] + '</button>'; }).join('');
          chips.addEventListener('click', function (e) {
            var c = e.target.closest('.chip'); if (!c) return;
            chips.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
            grid.querySelectorAll('.ev-item').forEach(function (it) {
              it.hidden = c.dataset.f !== 'todo' && it.dataset.tags.split(' ').indexOf(c.dataset.f) < 0;
            });
          });
        }
        sec.hidden = false;
        var navEv = document.getElementById('navEventos'); if (navEv) navEv.hidden = false;
      }).catch(function () {});
  })();

  // ---------- Todo lo que incluye (sale de la misma ficha que usa la versión original) ----------
  (function renderFicha() {
    var box = document.getElementById('ficha');
    if (!box) return;
    box.innerHTML = (S.ficha || []).map(function (g) {
      return '<article class="ficha-g" data-reveal><h3>' + esc(g.grupo) + '</h3><ul>' + g.items.map(function (it) {
        return '<li><div><b>' + esc(it.nombre) + '</b>' + (it.nota ? '<small>' + esc(it.nota) + '</small>' : '') + '</div>' +
          (it.valor ? '<span class="ficha-v">' + esc(it.valor) + '</span>' : '') + '</li>';
      }).join('') + '</ul></article>';
    }).join('');
  })();

  // ---------- Animación al bajar + contadores ----------
  var rev = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    rev.forEach(function (r, i) { r.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(r); });
  } else rev.forEach(function (r) { r.classList.add('in'); });

  function countUp(n) {
    var end = +n.dataset.count, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1200, 1);
      n.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (reduce) document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
})();
