document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const icon = this.querySelector('i');
        if (!icon) return;
        if (icon.classList.contains('bi-chevron-down')) {
            icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
        } else {
            icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
        }
    });
});