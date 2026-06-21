$(function () {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        fetch('../components/sidebar.html')
            .then(res => res.text())
            .then(html => {
                sidebarContainer.innerHTML = html;
                initSidebar();
            });
    }

    function initSidebar() {
        const $sidebar = $('#sidebar');
        const $toggleBtn = $('#sidebar-toggle');
        const $toggleIcon = $('#sidebar-toggle-icon');

        const currentPage = window.location.pathname.split('/').pop();
        $sidebar.find('.nav-link').each(function () {
            const href = $(this).attr('href');
            if (href && href.split('/').pop().toLowerCase() === currentPage.toLowerCase()) {
                $(this).addClass('active bg-white bg-opacity-10 text-white').removeClass('text-white-50');
            }
        });

        function collapseSidebar() {
            $sidebar.css('width', '80px');
            $toggleIcon.removeClass('bi-chevron-left').addClass('bi-chevron-right');
            $sidebar.addClass('collapsed');
        }

        function expandSidebar() {
            $sidebar.css('width', '260px');
            $toggleIcon.removeClass('bi-chevron-right').addClass('bi-chevron-left');
            $sidebar.removeClass('collapsed');
        }

        if ($(window).width() < 768) {
            collapseSidebar();
        }

        $toggleBtn.on('click', function (e) {
            e.preventDefault();
            if ($sidebar.hasClass('collapsed')) {
                expandSidebar();
            } else {
                collapseSidebar();
            }
        });
    }

    const tabsConfig = [
        { target: '#pane-desc', file: 'tab-desc.html' },
        { target: '#pane-com', file: 'tab-com.html' },
        { target: '#pane-adj', file: 'tab-adj.html' },
        { target: '#pane-hist', file: 'tab-hist.html' },
        { target: '#pane-resp', file: 'tab-resp.html' }
    ];

    const loaded = {};

    tabsConfig.forEach(function (tab) {
        const btn = document.querySelector('[data-bs-target="' + tab.target + '"]');
        if (!btn) return;

        const pane = document.querySelector(tab.target);

        function loadTab() {
            if (loaded[tab.target]) return;
            fetch('../components/tabs/' + tab.file)
                .then(res => res.text())
                .then(html => {
                    pane.innerHTML = html;
                    loaded[tab.target] = true;
                    initTabScripts(tab.target);
                });
        }

        btn.addEventListener('shown.bs.tab', loadTab);

        if (btn.classList.contains('active')) {
            loadTab();
        }
    });

    function initTabScripts(target) {
        document.querySelectorAll(target + ' [data-bs-toggle="collapse"]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                const targetSelector = this.getAttribute('data-bs-target');
                const collapseEl = document.querySelector(targetSelector);
                if (collapseEl) {
                    const instance = bootstrap.Collapse.getOrCreateInstance(collapseEl);
                    instance.toggle();
                }
            });
        });

        if (target === '#pane-adj') {
            const filtroTipo = document.getElementById('filtro-tipo');
            if (filtroTipo) {
                filtroTipo.addEventListener('change', function () {
                    const valor = this.value;
                    document.querySelectorAll('#lista-adjuntos .card[data-tipo]').forEach(function (card) {
                        card.classList.toggle('d-none', valor !== '' && card.dataset.tipo !== valor);
                    });
                });
            }
        }

        if (target === '#pane-com') {
            const filtros = document.querySelectorAll('#pane-com .d-flex.gap-4 span[role="button"]');
            const mapa = { 'todos': '', 'internos': 'interno', 'visibles': 'visible' };
            filtros.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    filtros.forEach(f => f.classList.remove('fw-medium', 'shadow-sm', 'text-gray-9', 'bg-white', 'rounded-3', 'p-1'));
                    this.classList.add('fw-medium', 'shadow-sm', 'text-gray-9', 'bg-white', 'rounded-3', 'p-1');

                    const filtro = mapa[this.textContent.trim().toLowerCase()];
                    document.querySelectorAll('#pane-com [data-tipo]').forEach(function (card) {
                        if (filtro === '') {
                            card.classList.remove('d-none');
                        } else {
                            card.classList.toggle('d-none', card.dataset.tipo !== filtro);
                        }
                    });
                });
            });
        }

        if (target === '#pane-hist') {
            const pillsFiltro = document.querySelectorAll('#pane-hist .hist-pill-filtro');
            pillsFiltro.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    pillsFiltro.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');
                    const filtro = this.getAttribute('data-filtro');
                    document.querySelectorAll('#lista-historial [data-tipo]').forEach(function (item) {
                        if (filtro === '') {
                            item.classList.remove('d-none');
                        } else {
                            item.classList.toggle('d-none', item.dataset.tipo !== filtro);
                        }
                    });
                });
            });

            document.querySelectorAll('#pane-hist .collapse').forEach(function (el) {
                el.addEventListener('show.bs.collapse', function () {
                    const userCard = this.closest('.flex-fill, .border').querySelector('.user-card');
                    if (userCard) userCard.classList.add('d-none');
                });
                el.addEventListener('hide.bs.collapse', function () {
                    const userCard = this.closest('.flex-fill, .border').querySelector('.user-card');
                    if (userCard) userCard.classList.remove('d-none');
                });
            });
        }
    }
});