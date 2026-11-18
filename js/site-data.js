/*
  DATOS DEL SITIO — Eventos Alem (web oficial, diseño "Fiesta / Neón")
  Lo que se ve en "Todo lo que incluye" y en "Preguntas" sale de este archivo.
  WhatsApp, Instagram, dirección y preguntas también se pueden cargar desde el panel (Supabase).

  Datos confirmados por el dueño (nov. 2026):
  - Es un SALÓN familiar para todo tipo de eventos.
  - 200 personas sentadas / 300 paradas.
  - Climatizado frío / calor.
  - Grupo electrógeno: mantiene las luces de bajo consumo y el equipo de sonido (el evento sigue).
*/
window.SITE = {
  nombre: "Eventos Alem",

  // Supabase: solo la clave pública (anon). Jamás la "service_role".
  api: {
    url: "https://quiiiytffvfrruxfausg.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1aWlpeXRmZnZmcnJ1eGZhdXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MDUxNTcsImV4cCI6MjEwODI4MTE1N30.CvHUyhe7q3UldNJI9hDfw7KwM4w_AmruPgtYkH6TZ9M"
  },
  calendario: {
    mesesAdelante: 18,
    avisoMeses: 6,
    verificado: false,
    fechas: {}
  },

  // Contacto (si está vacío se toma del panel)
  whatsapp: "",
  direccion: "",
  ciudad: "Goya, Corrientes",
  mapsUrl: "",
  instagram: "",

  ficha: [
    { grupo: "Espacio", items: [
      { nombre: "Salón familiar", valor: "Todo tipo de eventos", nota: "15 años, cumpleaños, empresas y lo que quieras festejar." },
      { nombre: "Superficie del salón", valor: "500 m²" },
      { nombre: "Personas sentadas", valor: "200" },
      { nombre: "Personas paradas", valor: "300" }
    ]},
    { grupo: "Música y luces", items: [
      { nombre: "Cielo Dubai", valor: "Nuevo", nota: "Cortina de cientos de luces cálidas sobre el salón." },
      { nombre: "Sonido con 2 cabinas de DJ", valor: "DJ incluido" },
      { nombre: "Pista con bola, barras de luces y show láser" },
      { nombre: "Pantalla de proyección", nota: "Proyecta sobre la pared, montada en la estructura." },
      { nombre: "Sonido envolvente", nota: "Parlantes distribuidos a los dos lados de la pista." }
    ]},
    { grupo: "Parrilla y barra", items: [
      { nombre: "Parrilla", valor: "hasta 150 kg", nota: "El carbón o la leña los traés vos, como más te guste." },
      { nombre: "Freezer y heladera exhibidora" },
      { nombre: "Barra", nota: "Sin bebidas: las traés vos." }
    ]},
    { grupo: "Comodidad", items: [
      { nombre: "Climatizado", valor: "Frío / calor", nota: "Cómodo en verano y en invierno." },
      { nombre: "Grupo electrógeno", nota: "Si se corta la luz, siguen las luces de bajo consumo y el equipo de sonido: el evento continúa." },
      { nombre: "WiFi", nota: "Con muy buena conexión." },
      { nombre: "Limpieza", nota: "Antes, durante y después del evento." }
    ]},
    { grupo: "Seguridad", items: [
      { nombre: "Matafuegos", valor: "Todo el salón", nota: "Distribuidos y a la vista." },
      { nombre: "Plano de evacuación", nota: "Con salidas y puntos de encuentro marcados." },
      { nombre: "Salidas señalizadas y cartelería", nota: "Con recomendaciones para cada caso." },
      { nombre: "Plan de emergencia", nota: "Roles asignados y teléfonos de bomberos, policía y hospital." },
      { nombre: "Seguridad en la entrada", valor: "2 personas", nota: "Propias, autorizadas y capacitadas." }
    ]},
    { grupo: "Ambientación", items: [
      { nombre: "Mesas, sillas y manteles blanco y negro" },
      { nombre: "Cubre sillas", nota: "Si los necesitás. Muchas veces lo resuelve el catering." },
      { nombre: "Arco de entrada" },
      { nombre: "Alfombra roja", nota: "Opcional, para armar el camino de entrada." },
      { nombre: "Caminos de mesa bordados", valor: "De regalo", nota: "Con el nombre de los homenajeados, para la mesa principal." },
      { nombre: "Rincón para fotos", nota: "Fondo brillante, arco de luces y posa tortas." }
    ]},
    { grupo: "Llegada", items: [
      { nombre: "Estacionamiento", nota: "Para motos y algunos autos. Hay más lugar sobre la calle." }
    ]}
  ],

  faq: [
    { p: "¿Qué eventos se pueden hacer?", r: "Todo tipo de eventos. Es un salón familiar: 15 años, cumpleaños, fiestas de empresa y lo que quieras festejar." },
    { p: "¿Cuántas personas entran?", r: "200 personas sentadas o 300 paradas." },
    { p: "¿El DJ está incluido?", r: "Sí. El DJ está incluido y el salón tiene 2 cabinas." },
    { p: "¿Qué es el Cielo Dubai?", r: "Una cortina de cientos de luces cálidas que cuelga del techo sobre el salón. Ideal para la entrada, el vals y las fotos." },
    { p: "¿Hace calor en verano o frío en invierno?", r: "No. El salón está climatizado frío / calor, así que se está cómodo en cualquier época del año." },
    { p: "¿Qué pasa si se corta la luz?", r: "La fiesta sigue. El salón tiene grupo electrógeno que mantiene funcionando las luces de bajo consumo y el equipo de sonido." },
    { p: "¿Qué tan seguro es el salón?", r: "Hay matafuegos por todo el salón, plano de evacuación con salidas y puntos de encuentro, cartelería, plan de emergencia y 2 personas de seguridad propia en la entrada." },
    { p: "¿Tengo que traer las bebidas?", r: "Sí. La barra es sin bebidas: las traés vos. Hay freezer y heladera exhibidora." },
    { p: "¿Puedo hacer un asado?", r: "Sí. La parrilla carga hasta 150 kg de carne. El carbón o la leña los traés vos, como más te guste." },
    { p: "¿Hay WiFi?", r: "Sí. El salón tiene WiFi con muy buena conexión." },
    { p: "¿Puedo ir a conocer el salón antes de reservar?", r: "Sí. Coordinamos por WhatsApp un día y horario para que lo recorras." },
    { p: "¿Cómo es el contrato?", r: "Después de la visita te damos el reglamento y la ficha con el acuerdo. Si querés contratar en el momento, se firma ahí mismo." }
  ]
};

/*
  Las preguntas guardadas en el panel (base de datos) pueden tener datos viejos.
  Esta función corrige esos datos y suma las preguntas nuevas que falten.
*/
window.SITE.ajustarFaq = function (lista) {
  var base = window.SITE.faq;
  function buscar(re) { for (var i = 0; i < base.length; i++) if (re.test(base[i].p)) return base[i]; }
  var reglas = [
    /cu[aá]ntas personas/i, /calor|fr[ií]o/i, /asado|parrilla/i, /seguro|seguridad/i, /luz|electr/i,
    /\bDJ\b/, /cielo/i, /wifi/i, /bebidas/i, /conocer/i, /contrato/i, /qu[eé] eventos/i
  ];
  lista = (lista || []).map(function (q) {
    for (var i = 0; i < reglas.length; i++) if (reglas[i].test(q.p)) return buscar(reglas[i]) || q;
    return q;
  });
  // sin repetidas
  var vistas = {};
  lista = lista.filter(function (q) { if (vistas[q.p]) return false; vistas[q.p] = 1; return true; });
  var ya = lista.map(function (q) { return q.p; });
  return lista.concat(base.filter(function (q) { return ya.indexOf(q.p) < 0; }));
};
