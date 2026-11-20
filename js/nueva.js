/* Eventos Alem — versión 3 "Armá tu fiesta". Sin librerías. */
(function () {
  'use strict';
  var S = window.SITE || {};
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var TZ = 'America/Argentina/Buenos_Aires';
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  // Lo que va eligiendo la persona
  var F = { tipo: '', nombre: '', gente: 120, fecha: '', cuando: '', franja: '' };

  var TIPOS = {
    '15': { nom: '15 años', de: 'Los 15 de ', msg: 'unos 15 años', quien: '¿Cómo se llama la quinceañera?' },
    cumple: { nom: 'Cumpleaños', de: 'El cumple de ', msg: 'un cumpleaños', quien: '¿Cómo se llama quien cumple?' },
    empresa: { nom: 'Fiesta de empresa', de: 'La fiesta de ', msg: 'una fiesta de empresa', quien: '¿Cómo se llama la empresa?' },
    otra: { nom: 'Tu fiesta', de: 'La fiesta de ', msg: 'una fiesta', quien: '¿A nombre de quién es la fiesta?' }
  };

  // ---------- Pasos tipo historia ----------
  var pasos = $$('.st'), actual = 0;
  var bars = $('#bars');
  bars.innerHTML = pasos.map(function () { return '<i></i>'; }).join('');
  function ir(n) {
    if (n < 0 || n >= pasos.length || n === actual) return;
    var ant = pasos[actual], adelante = n > actual;
    ant.classList.remove('on'); ant.classList.toggle('atras', adelante);
    pasos[n].classList.remove('atras'); pasos[n].classList.add('on');
    actual = n;
    $$('.bars i').forEach(function (b, i) { b.classList.toggle('full', i <= n); });
    $('#atras').hidden = n === 0;
    $('#pasoTxt').textContent = n === 0 ? '' : (n <= 4 ? 'Pregunta ' + n + ' de 4' : '');
    var nombre = pasos[n].getAttribute('data-st');
    // pausar videos que no se ven
    $$('.st video').forEach(function (v) { if (!pasos[n].contains(v)) v.pause(); });
    pasos[n].querySelectorAll('video').forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
    var t = pasos[n].querySelector('h1,h2'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
    var sc = pasos[n].querySelector('.in'); if (sc) sc.scrollTop = 0;
    if (al[nombre]) al[nombre]();
  }
  var al = {};
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-next]') && !e.target.closest('[data-next]').disabled) ir(actual + 1);
  });
  $('#atras').addEventListener('click', function () { ir(actual - 1); });
  document.addEventListener('keydown', function (e) {
    if (e.target.matches('input')) return;
    if (e.key === 'ArrowLeft') ir(actual - 1);
  });
  // Deslizar a la derecha para volver
  var x0 = null;
  $('#story').addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  $('#story').addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (dx > 80 && !e.target.closest('input,.cal')) ir(actual - 1);
  }, { passive: true });

  // ---------- 1 · Tipo ----------
  $$('.tipo').forEach(function (b) {
    b.addEventListener('click', function () {
      F.tipo = b.getAttribute('data-tipo');
      $$('.tipo').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $('#t2txt').textContent = TIPOS[F.tipo].quien;
      setTimeout(function () { ir(actual + 1); }, 220);
    });
  });

  // ---------- 2 · Nombre (bordado en vivo) ----------
  var inp = $('#nombre'), bord = $('#bordado');
  function bordar() {
    F.nombre = inp.value.replace(/\s+/g, ' ').trim().slice(0, 24);
    bord.textContent = F.nombre || 'Tu nombre acá';
    bord.classList.toggle('vacio', !F.nombre);
  }
  inp.addEventListener('input', bordar);
  inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { inp.blur(); ir(actual + 1); } });
  bordar();

  // ---------- 3 · Cuántos (plano con personitas) ----------
  var plano = $('#plano'), rg = $('#gente');
  plano.innerHTML = new Array(301).join('<i></i>');
  var puntos = plano.querySelectorAll('i');
  function gente() {
    F.gente = +rg.value;
    $('#genteNum').textContent = F.gente;
    for (var i = 0; i < puntos.length; i++) puntos[i].className = i < F.gente ? (i < 200 ? 's' : 'p') : '';
    var m = $('#genteMsg');
    if (F.gente <= 200) { m.className = 'aviso'; m.textContent = 'Entran todos sentados y queda la pista libre para bailar.'; }
    else { m.className = 'aviso warn'; m.textContent = 'Para ' + F.gente + ' personas va fiesta de pie: entran hasta 300 parados.'; }
  }
  rg.addEventListener('input', gente); gente();

  // ---------- 4 · Fecha (calendario real) ----------
  var cal = { hoy: '', mapa: {}, mes: 0, meses: 12, ok: false };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function larga(s) { var d = parse(s); return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()] + ' de ' + d.getFullYear(); }
  function corta(s) { var d = parse(s); return DIAS[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()]; }
  cal.hoy = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
  function estado(f) { return f < cal.hoy ? 'pasado' : (cal.mapa[f] ? 'res' : 'libre'); }
  function pintarMes() {
    var b = parse(cal.hoy), p = new Date(b.getFullYear(), b.getMonth() + cal.mes, 1), y = p.getFullYear(), m = p.getMonth();
    var h = '', vac = (p.getDay() + 6) % 7, dias = new Date(y, m + 1, 0).getDate(), ocupadosFinde = 0;
    for (var i = 0; i < vac; i++) h += '<span></span>';
    for (var d = 1; d <= dias; d++) {
      var f = iso(y, m, d), e = estado(f), dw = new Date(y, m, d).getDay();
      if (e === 'res' && (dw === 5 || dw === 6)) ocupadosFinde++;
      h += '<button type="button" class="d ' + e + '" data-f="' + f + '"' + (e !== 'libre' ? ' disabled' : '') +
        ' aria-pressed="' + (f === F.fecha) + '" aria-label="' + larga(f) + (e === 'res' ? ', ocupada' : e === 'libre' ? ', libre' : '') + '">' + d + '</button>';
    }
    $('#calGrid').innerHTML = h;
    $('#calMes').textContent = MESES[m] + ' ' + y;
    $('#calPrev').disabled = cal.mes <= 0;
    $('#calNext').disabled = cal.mes >= cal.meses - 1;
    // Escasez solo si es real: viernes y sábados ya tomados este mes
    if (!F.fecha) {
      var msg = $('#fechaMsg');
      msg.className = 'aviso warn';
      msg.textContent = ocupadosFinde > 0 ? 'En ' + MESES[m] + ' ya hay ' + ocupadosFinde + (ocupadosFinde === 1 ? ' viernes o sábado reservado.' : ' viernes y sábados reservados.') : '';
    }
  }
  $('#calGrid').addEventListener('click', function (e) {
    var b = e.target.closest('.d.libre'); if (!b) return;
    F.fecha = b.getAttribute('data-f');
    pintarMes();
    var ok = $('#fechaOk'); ok.disabled = false; ok.textContent = 'Seguir con el ' + corta(F.fecha);
    var msg = $('#fechaMsg'); msg.className = 'aviso'; msg.textContent = '¡Está libre! La reservamos cuando vengas a conocer el salón.';
  });
  $('#calPrev').addEventListener('click', function () { if (cal.mes > 0) { cal.mes--; pintarMes(); } });
  $('#calNext').addEventListener('click', function () { if (cal.mes < cal.meses - 1) { cal.mes++; pintarMes(); } });
  $('#sinFecha').addEventListener('click', function () { F.fecha = ''; ir(actual + 1); });
  function cargarCal() {
    var a = S.api || {};
    if (!a.url || !a.anonKey) return Promise.reject();
    var d = parse(cal.hoy); d.setMonth(d.getMonth() + cal.meses);
    return fetch(String(a.url).replace(/\/$/, '') + '/rest/v1/rpc/calendario_publico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: a.anonKey, Authorization: 'Bearer ' + a.anonKey },
      body: JSON.stringify({ desde: cal.hoy, hasta: iso(d.getFullYear(), d.getMonth(), d.getDate()) })
    }).then(function (r) { if (!r.ok) throw 0; return r.json(); });
  }
  cargarCal().then(function (rows) {
    (rows || []).forEach(function (r) { cal.mapa[r.fecha] = r.estado; });
    cal.ok = true; pintarMes();
  }).catch(function () {
    // Nunca mostramos días libres que no pudimos confirmar
    $('#cal').innerHTML = '<p class="aviso warn">No pudimos cargar las fechas ahora. Seguí y te confirmamos la fecha por WhatsApp.</p>';
    $('#fechaOk').disabled = false; $('#fechaOk').textContent = 'Seguir';
  });

  // ---------- 5 · Tu noche (se arma con lo que eligió) ----------
  function media(src, video) {
    return '<div class="m">' + (video
      ? '<video src="img/nuevo/' + src + '.mp4" poster="img/nuevo/' + src + '.jpg" muted loop playsinline autoplay></video>'
      : '<img src="img/nuevo/' + src + '.jpg" alt="" loading="lazy">') + '</div>';
  }
  al.noche = function () {
    var t = TIPOS[F.tipo] || TIPOS.otra, n = F.nombre;
    var tit = $('#nocheTit');
    tit.textContent = n ? t.de + n : (F.tipo === '15' ? 'Tus 15' : F.tipo === 'cumple' ? 'Tu cumple' : 'Tu noche');
    var quien = n || (F.tipo === 'empresa' ? 'el equipo' : 'vos');
    var items = [
      { h: 'Llegada', b: 'Arco de entrada y alfombra roja', p: 'Los ' + F.gente + ' invitados llegan y ya se sacan la primera foto.', m: media('entrada-arco') },
      { h: 'La entrada', b: F.tipo === '15' ? 'Entrás bajo el Cielo Dubai' : 'Se prende el Cielo Dubai', p: 'Cientos de luces cálidas sobre el salón. El momento que todos filman.', m: media('v-cielo', true) },
      { h: 'La mesa principal', b: 'Con el nombre bordado, de regalo', p: 'El camino de mesa lleva el nombre. Es tuyo, te lo llevás.', m: media('mesa-principal'), chapa: n },
      { h: 'La pista', b: F.tipo === '15' ? 'Vals, y después a bailar' : 'DJ incluido, láser y luces', p: 'Sonido con 2 cabinas de DJ, bola, barras de luces y show láser.', m: media('v-pista', true) },
      { h: 'La comida', b: 'Parrilla para hasta 150 kg', p: 'Asado para todos. Freezer y heladera para que las bebidas estén siempre frías.', m: media('parrilla') },
      { h: 'Para el recuerdo', b: 'Rincón para fotos', p: 'Fondo brillante, arco de luces y posa tortas. Las fotos que después se suben a Instagram.', m: media('rincon-fotos') },
      { h: 'Toda la noche', b: quien === 'vos' ? 'Vos solo disfrutás' : quien + ' solo disfruta', p: 'Seguridad en la entrada, limpieza antes, durante y después, y el salón climatizado.', m: '' }
    ];
    $('#linea').innerHTML = items.map(function (it) {
      var ch = it.chapa ? '<span class="chapa"></span>' : '';
      return '<li><span class="h">' + it.h + '</span><b>' + it.b + '</b>' + ch + '<p>' + it.p + '</p>' + it.m + '</li>';
    }).join('');
    var c = $('#linea .chapa'); if (c) c.textContent = n; // texto del usuario siempre como texto
  };

  // ---------- 6 · Dudas ----------
  var DUDAS = [
    ['¿Y si hace calor o frío?', 'Salón climatizado frío / calor. Cómodo todo el año.'],
    ['¿Y si se corta la luz?', 'La fiesta sigue: el grupo electrógeno mantiene las luces y el sonido.'],
    ['¿Es seguro?', 'Matafuegos, plano de evacuación, plan de emergencia y 2 personas de seguridad en la entrada.'],
    ['¿Tengo que contratar DJ?', 'No. El DJ está incluido.'],
    ['¿Y las bebidas?', 'Las traés vos. Hay barra, freezer y heladera exhibidora.'],
    ['¿Dónde se estaciona?', 'Estacionamiento para motos y algunos autos, y más lugar sobre la calle.'],
    ['¿Quién limpia?', 'Nosotros: antes, durante y después del evento.']
  ];
  var TIC = '<span class="tic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';
  $('#dudas').innerHTML = DUDAS.map(function (d) { return '<li>' + TIC + '<div><b>' + d[0] + '</b><small>' + d[1] + '</small></div></li>'; }).join('');
  al.dudas = function () {
    var lis = $$('#dudas li'); lis.forEach(function (l) { l.classList.remove('ver'); });
    lis.forEach(function (l, i) { setTimeout(function () { l.classList.add('ver'); }, 150 + i * 170); });
  };

  // ---------- 7 · Cierre ----------
  function waNum() { var n = String(S.whatsapp || '').replace(/\D/g, ''); if (n && n.indexOf('54') !== 0) n = '549' + n; return n; }
  function mensaje() {
    var t = TIPOS[F.tipo];
    var l = ['¡Hola! Armé mi fiesta en la web y quiero coordinar una visita al salón.'];
    l.push('• Festejo: ' + (t ? t.nom : 'una fiesta') + (F.nombre ? ' de ' + F.nombre : ''));
    l.push('• Invitados: unas ' + F.gente + ' personas');
    l.push('• Fecha: ' + (F.fecha ? larga(F.fecha) + ' (figuraba libre)' : 'todavía no la tengo'));
    if (F.cuando || F.franja) l.push('• Para la visita me queda mejor ' + [F.cuando, F.franja].filter(Boolean).join(', '));
    l.push('¿Cuándo puedo pasar?');
    return l.join('\n');
  }
  function actualizarWa() {
    var n = waNum(), a = $('#waCta');
    a.href = n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(mensaje()) : './#consultar';
  }
  al.fin = function () {
    var t = TIPOS[F.tipo];
    $('#paseTipo').textContent = t ? t.nom : 'Tu fiesta';
    $('#paseNom').textContent = F.nombre;
    $('#paseGente').textContent = F.gente + ' personas';
    $('#paseFecha').textContent = F.fecha ? larga(F.fecha) : 'A definir';
    actualizarWa();
  };
  $$('.chips').forEach(function (g) {
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      var on = b.getAttribute('aria-pressed') !== 'true';
      g.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', String(on));
      F[g.getAttribute('data-grupo')] = on ? b.getAttribute('data-v') : '';
      actualizarWa();
    });
  });

  // WhatsApp desde el panel (si cambia el número, se toma solo)
  var a = S.api || {};
  if (a.url && a.anonKey) {
    fetch(String(a.url).replace(/\/$/, '') + '/rest/v1/contenido?select=clave,valor&clave=eq.whatsapp',
      { headers: { apikey: a.anonKey, Authorization: 'Bearer ' + a.anonKey } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (f) { f.forEach(function (x) { var v = x.valor && typeof x.valor === 'object' ? x.valor.v : x.valor; if (v) S.whatsapp = v; }); actualizarWa(); })
      .catch(function () {});
  }
  actualizarWa();
  ir(0); $$('.bars i')[0].classList.add('full');
})();
