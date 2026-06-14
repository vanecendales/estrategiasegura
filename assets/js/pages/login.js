$(function() {

    $('.demo-item').on('click', function(e) {
        if ($(e.target).closest('.btn-copy').length) return;
        $('#email').val($(this).data('email'));
        $('#password').val($(this).data('pass'));
    });

    $('.btn-copy').on('click', function(e) {
        e.stopPropagation();
        navigator.clipboard.writeText($(this).data('value'));
        $(this).find('i').removeClass('bi-clipboard').addClass('bi-clipboard-check copied');
        var btn = this;
        setTimeout(function() {
            $(btn).find('i').removeClass('bi-clipboard-check copied').addClass('bi-clipboard');
        }, 1500);
    });

    $('#toggle-pass').on('click', function() {
        var $input = $('#password');
        var $icon = $('#eye-icon');
        if ($input.attr('type') === 'password') {
            $input.attr('type', 'text');
            $icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            $input.attr('type', 'password');
            $icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });

    $('#btn-login').on('click', function() {
        window.location.href = 'dashboard.html';
    });

});