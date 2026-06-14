$(function() {
    $('#sidebar-toggle').on('click', function() {
        $('#sidebar').toggleClass('open');
        $('#sidebar-overlay').toggleClass('open');
    });

    $('#sidebar-overlay').on('click', function() {
        $('#sidebar').removeClass('open');
        $(this).removeClass('open');
    });
});