document.addEventListener('DOMContentLoaded', function() {
    // Elementleri seçme
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const dotsContainer = document.querySelector('.dots');
    const autoPlayCheckbox = document.getElementById('auto-play-checkbox');
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Nokta göstergelerini oluştur
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    // Belirli bir slayta gitme fonksiyonu
    function goToSlide(slideIndex) {
        // Slider'ı kaydır
        slider.style.transform = `translateX(-${slideIndex * 25}%)`;
        
        // Aktif noktayı güncelle
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlide = slideIndex;
    }
    
    // Sonraki slayta gitme
    function nextSlide() {
        let nextSlideIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextSlideIndex);
    }
    
    // Önceki slayta gitme
    function prevSlide() {
        let prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevSlideIndex);
    }
    
    // Otomatik oynatma fonksiyonu
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Olay dinleyicileri
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    autoPlayCheckbox.addEventListener('change', function() {
        if (this.checked) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    });
    
    // Klavye ile kontrol
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Varsayılan olarak otomatik oynatmayı başlat
    autoPlayCheckbox.checked = true;
    startAutoPlay();
});