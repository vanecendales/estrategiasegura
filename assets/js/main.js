$(function() {
    $('#sidebar-toggle').on('click', function() {
        const $sidebar = $('#sidebar');
        if ($sidebar.hasClass('collapsed')) {
            $sidebar.removeClass('collapsed');
            $('#sidebar-toggle-icon').removeClass('bi-chevron-right').addClass('bi-chevron-left');
        } else {
            $sidebar.addClass('collapsed');
            $('#sidebar-toggle-icon').removeClass('bi-chevron-left').addClass('bi-chevron-right');
        }
    });
});