const BADGE_TIPO = {
  'Felicitación': 'badge-soft priority-baja',
  'Sugerencia':   'badge-soft status-asignado',
  'Reclamo':      'badge-soft priority-critica',
  'Queja':        'badge-soft priority-alta',
  'Petición':     'badge-soft status-radicado'
};

const BADGE_PRIORIDAD = {
  'Alta':   'badge-soft priority-critica',
  'Normal': 'badge-soft priority-alta',
  'Baja':   'badge-soft priority-baja'
};

const BADGE_ESTADO = {
  'Radicado':      'badge-soft status-radicado',
  'En Gestión':    'badge-soft status-engestion',
  'Pendiente':     'badge-soft status-pendiente',
  'Respondido':    'badge-soft status-respondido',
  'Cerrado':       'badge-soft status-cerrado',
  'Reabierto':     'badge-soft status-reabierto',
  'Anulado':       'badge-soft status-anulado',
  'Asignado':      'badge-soft status-asignado',
  'Escalado':      'badge-soft status-reabierto' // si no existe status-escalado
};

const SEMAFORO = {
  'En tiempo': {
    cls: 'badge-sla sla-verde',
    dot: 'var(--sla-verde)'
  },
  'Próximo a vencer': {
    cls: 'badge-sla sla-amarillo',
    dot: 'var(--sla-amarillo)'
  },
  'Vencido': {
    cls: 'badge-sla sla-rojo',
    dot: 'var(--sla-rojo)'
  },
  'Cerrado': {
    cls: 'badge-sla sla-gris',
    dot: 'var(--sla-gris)'
  }
};

let casosOriginal  = [];
let casosFiltrados = [];
let paginaActual   = 1;
let porPagina      = 10;

function renderTabla() {
  const tbody  = document.getElementById('tabla-body');
  const inicio = (paginaActual - 1) * porPagina;
  const slice  = casosFiltrados.slice(inicio, inicio + porPagina);

  if (slice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="text-center py-5 x-small">
      <i class="bi bi-inbox me-2"></i>No se encontraron casos.
    </td></tr>`;
    renderPaginacion();
    actualizarContador();
    return;
  }

  tbody.innerHTML = slice.map((c, i) => {
    // Corrección aquí: Aseguramos que busque la llave exacta del objeto SEMAFORO o caiga en 'Cerrado'
    const valorSemaforo = c.semaforo || 'Cerrado';
    const sla = SEMAFORO[valorSemaforo] || SEMAFORO['Cerrado'];
    
    const alt = i % 2 !== 0 ? 'class="table-row-alt"' : '';
    const slaFecha = (valorSemaforo === 'Próximo a vencer' || valorSemaforo === 'Vencido')
      ? 'fw-semibold text-warning' : 'x-small';

    return `<tr ${alt}>
      <td class="px-3 py-3 xs-small text-gray-7">${c.id}</td>
      <td class="px-3 py-3 xs-small text-gray-5">${c.fecha}</td>
      <td class="px-3 py-3 xxs-small "><span class="${BADGE_TIPO[c.tipo] || 'badge text-bg-secondary'}">${c.tipo}</span></td>
      <td class="px-3 py-3 xs-small text-gray-7">${c.servicio}</td>
      <td class="px-3 py-3 xs-small text-wrap text-gray-7">${c.categoria}</td>
      <td class="px-3 py-3 xs-small text-gray-5" ><span class="cell-truncate" title="${c.subcategoria}">${c.subcategoria}</span></td>
      <td class="px-3 py-3 xs-small text-gray-7" title="${c.asociado}">${c.asociado}</td>
      <td class="px-3 py-3 xs-small text-gray-5" title="${c.responsable}">${c.responsable}</td>
      <td class="px-3 py-3 xs-small text-gray-5"><span class="${BADGE_PRIORIDAD[c.prioridad] || 'badge text-bg-secondary'}">${c.prioridad}</span></td>
      <td class="px-3 py-3 xs-small text-gray-5 text-wrap"><span class="${BADGE_ESTADO[c.estado] || 'badge text-bg-secondary'}">${c.estado}</span></td>
      <td class="px-3 py-3 xs-small text-gray-5 ${slaFecha}">${c.limiteSla}</td>
      <td class="px-3 py-3 xs-small text-gray-5"><span class="${sla.cls}"><span class="sla-dot" style="background:${sla.dot};"></span>${valorSemaforo}</span></td>
      <td class="px-3 py-3 xs-small text-gray-5 text-end"><a href="case-detail.html" class="btn-action" title="Ver detalle"><i class="bi bi-eye"></i></a></td>
    </tr>`;

  }).join('');

  renderPaginacion();
  actualizarContador();
}

function renderPaginacion() {
  const total   = Math.ceil(casosFiltrados.length / porPagina);
  const wrapper = document.getElementById('paginacion-btns');

  let desde = Math.max(1, paginaActual - 2);
  let hasta  = Math.min(total, desde + 4);
  if (hasta - desde < 4) desde = Math.max(1, hasta - 4);

  let html = `<button class="page-btn xs-small" id="btn-prev" ${paginaActual === 1 ? 'disabled' : ''}><i class="bi bi-chevron-left"></i></button>`;
  for (let p = desde; p <= hasta; p++) {
    html += `<button class="page-btn xs-small ${p === paginaActual ? 'active' : ''}" data-page="${p}">${p}</button>`;
  }
  html += `<button class="page-btn xs-small" id="btn-next" ${paginaActual === total || total === 0 ? 'disabled' : ''}><i class="bi bi-chevron-right"></i></button>`;

  wrapper.innerHTML = html;

  wrapper.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => { paginaActual = +btn.dataset.page; renderTabla(); });
  });
  document.getElementById('btn-prev')?.addEventListener('click', () => { paginaActual--; renderTabla(); });
  document.getElementById('btn-next')?.addEventListener('click', () => { paginaActual++; renderTabla(); });
}

function actualizarContador() {
  const inicio = casosFiltrados.length === 0 ? 0 : (paginaActual - 1) * porPagina + 1;
  const fin    = Math.min(paginaActual * porPagina, casosFiltrados.length);
  document.getElementById('contador-inicio').textContent = inicio;
  document.getElementById('contador-fin').textContent   = fin;
  document.getElementById('contador-total').textContent = casosFiltrados.length;
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const btn     = document.getElementById('sidebar-toggle');
  const icon    = document.getElementById('sidebar-toggle-icon');
  let collapsed = false;

  btn.addEventListener('click', () => {
    collapsed = !collapsed;
    sidebar.style.width = collapsed ? '60px' : '240px';
    sidebar.querySelectorAll('.sidebar-text').forEach(el => {
      el.style.display = collapsed ? 'none' : '';
    });
    icon.className     = collapsed ? 'bi bi-chevron-right' : 'bi bi-chevron-left';
    icon.style.fontSize = '.65rem';
    icon.style.color    = '#64748b';
  });
}

function initBusqueda() {
  document.getElementById('input-busqueda').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    casosFiltrados = q
      ? casosOriginal.filter(c =>
          c.id.toLowerCase().includes(q) ||
          c.asociado.toLowerCase().includes(q))
      : [...casosOriginal];
    paginaActual = 1;
    renderTabla();
  });
}

function initSelector() {
  document.getElementById('selector-pagina').addEventListener('change', function () {
    porPagina    = +this.value;
    paginaActual = 1;
    renderTabla();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res  = await fetch('../assets/js/data.json');
    const data = await res.json();
    casosOriginal  = data.casos;
    casosFiltrados = [...casosOriginal];
    renderTabla();
    initSidebar();
    initBusqueda();
    initSelector();
  } catch (err) {
    console.error(err);
    document.getElementById('tabla-body').innerHTML = `
      <tr><td colspan="13" class="text-center py-5 text-danger">
        <i class="bi bi-exclamation-circle me-2"></i>Error al cargar los casos.
      </td></tr>`;
  }
});