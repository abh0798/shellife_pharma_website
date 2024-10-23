document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('open');
});

// Auto-slide for image slider every 5 seconds
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('prevBtn').addEventListener('click', showPrevSlide);
document.getElementById('nextBtn').addEventListener('click', showNextSlide);

function showNextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    document.getElementById('slides').style.transform = `translateX(${-slideIndex * 100}%)`;
}

function showPrevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    document.getElementById('slides').style.transform = `translateX(${-slideIndex * 100}%)`;
}

// Auto-slide for every 5 seconds
setInterval(() => {
    showNextSlide();
}, 5000);

