const track = document.querySelector('.carousel-track');
let index = 0;
const totalSlides = 3;

function moverCarrusel() {
    index++;
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * 25}%)`;

    if (index === totalSlides) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = `translateX(0%)`;
        }, 800); 
    }
}

setInterval(moverCarrusel, 6000);