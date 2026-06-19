$(function() {
    const $sidebar = $('#sidebar');
    const $toggleBtn = $('#sidebar-toggle');
    const $toggleIcon = $('#sidebar-toggle-icon');

    if ($(window).width() < 768) {
        $sidebar.addClass('collapsed');
        $toggleIcon.removeClass('bi-chevron-left').addClass('bi-chevron-right');
    }

    $toggleBtn.on('click', function(e) {
        e.preventDefault();
        $sidebar.toggleClass('collapsed');

        if ($sidebar.hasClass('collapsed')) {
            $toggleIcon.removeClass('bi-chevron-left').addClass('bi-chevron-right');
        } else {
            $toggleIcon.removeClass('bi-chevron-right').addClass('bi-chevron-left');
        }
    });
});

document.getElementById('filtro-tipo').addEventListener('change', function () {
    const valor = this.value;
    document.querySelectorAll('#lista-adjuntos .card[data-tipo]').forEach(function (card) {
        card.classList.toggle('d-none', valor !== '' && card.dataset.tipo !== valor);
    });
});
