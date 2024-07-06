document.addEventListener('DOMContentLoaded', () => {
    const imagesContainer = document.querySelector('.images');
    const images = Array.from(imagesContainer.querySelectorAll('img'));
    const imgWidth = images[0].offsetWidth + 20; // Szerokość zdjęcia plus margines
    const totalImages = images.length;
    const visibleImages = 3; // Liczba widocznych zdjęć jednocześnie
    const autoScrollInterval = 3000; // Interwał automatycznego przewijania (w milisekundach)
    let index = 0;
    let autoScrollTimer;

    // Ustawienie szerokości kontenera na całkowitą szerokość zdjęć
    imagesContainer.style.width = `${totalImages * imgWidth}px`;

    function moveCarousel(direction) {
        index += direction;

        // Jeśli index przekracza lub równa się liczbie obrazów minus widoczne obrazy, wróć na początek
        if (index >= totalImages - visibleImages + 1) {
            index = 0;
        }

        // Oblicz przesunięcie
        const offset = -index * imgWidth;
        imagesContainer.style.transform = `translateX(${offset}px)`;
    }

    function startAutoScroll() {
        autoScrollTimer = setInterval(() => {
            moveCarousel(1); // Przewijanie w prawo
        }, autoScrollInterval);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }

    const prevButton = document.querySelector('.prev');
    prevButton.addEventListener('click', () => {
        moveCarousel(-1); // Przewijanie w lewo po kliknięciu na przycisk poprzedni
        stopAutoScroll(); // Zatrzymanie automatycznego przewijania po interakcji użytkownika
    });

    const nextButton = document.querySelector('.next');
    nextButton.addEventListener('click', () => {
        moveCarousel(1); // Przewijanie w prawo po kliknięciu na przycisk następny
        stopAutoScroll(); // Zatrzymanie automatycznego przewijania po interakcji użytkownika
    });

    // Automatyczne przewijanie karuzeli po załadowaniu strony
    startAutoScroll();

    // Zatrzymanie automatycznego przewijania po najechaniu myszką na karuzelę
    imagesContainer.addEventListener('mouseenter', () => {
        stopAutoScroll();
    });

    // Wznowienie automatycznego przewijania po opuszczeniu myszką karuzeli
    imagesContainer.addEventListener('mouseleave', () => {
        startAutoScroll();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1180) {
            // Przekierowanie na inną stronę dla urządzeń o szerokości <= 768px
            window.location.href = 'mobilna-wersja-strony.html';
        } else {
            moveCarousel(0); // Resetowanie pozycji na wypadek zmiany rozmiaru okna
        }
    });
});
