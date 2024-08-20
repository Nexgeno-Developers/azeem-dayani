document.addEventListener('DOMContentLoaded', function() {
    const filmLinks = document.querySelectorAll('.film_link');
    filmLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            document.querySelectorAll('.film_img').forEach(img => {
                img.classList.remove('active');
            });
            const imgId = this.parentElement.getAttribute('data-img');
            document.getElementById(imgId).classList.add('active');
        });
    });
});
