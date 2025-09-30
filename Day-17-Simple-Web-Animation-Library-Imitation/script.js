// Animasyon motoru
class Animator {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.animations = [];
        this.currentAnimation = null;
        this.isAnimating = false;
        
        // Easing fonksiyonları
        this.easingFunctions = {
            linear: t => t,
            easeInQuad: t => t * t,
            easeOutQuad: t => t * (2 - t),
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (--t) * t * t + 1,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            easeInBack: t => {
                const s = 1.70158;
                return t * t * ((s + 1) * t - s);
            }
        };
    }
    
    // Animasyon ekleme
    to(properties, duration = 1000, easing = 'linear') {
        this.animations.push({
            properties,
            duration,
            easing,
            startTime: null,
            startValues: {}
        });
        
        // Eğer animasyon yapılmıyorsa, başlat
        if (!this.isAnimating) {
            this.startNextAnimation();
        }
        
        return this; // Zincirleme için this döndür
    }
    
    // Sonraki animasyon için bekletme
    then() {
        // Yeni bir animasyon nesnesi döndürerek zincirlemeye devam et
        return this;
    }
    
    // Sonraki animasyonu başlat
    startNextAnimation() {
        if (this.animations.length === 0) {
            this.isAnimating = false;
            return;
        }
        
        this.isAnimating = true;
        this.currentAnimation = this.animations.shift();
        
        // Başlangıç değerlerini kaydet
        const computedStyle = window.getComputedStyle(this.element);
        const transform = computedStyle.transform;
        
        // Transform matrisini parse et
        let matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
        if (transform && transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            matrix = {
                a: parseFloat(values[0]),
                b: parseFloat(values[1]),
                c: parseFloat(values[2]),
                d: parseFloat(values[3]),
                e: parseFloat(values[4]),
                f: parseFloat(values[5])
            };
        }
        
        // Başlangıç değerlerini ayarla
        this.currentAnimation.startValues = {
            x: matrix.e || 0,
            y: matrix.f || 0,
            opacity: parseFloat(computedStyle.opacity) || 1,
            scaleX: matrix.a || 1,
            scaleY: matrix.d || 1
        };
        
        // Animasyonu başlat
        this.currentAnimation.startTime = performance.now();
        this.animateFrame();
    }
    
    // Animasyon frame'i
    animateFrame() {
        if (!this.currentAnimation) return;
        
        const now = performance.now();
        const elapsed = now - this.currentAnimation.startTime;
        const progress = Math.min(elapsed / this.currentAnimation.duration, 1);
        const easedProgress = this.easingFunctions[this.currentAnimation.easing](progress);
        
        // Özellikleri güncelle
        this.updateProperties(easedProgress);
        
        if (progress < 1) {
            // Devam et
            requestAnimationFrame(() => this.animateFrame());
        } else {
            // Animasyon tamamlandı, sonraki animasyona geç
            this.startNextAnimation();
        }
    }
    
    // Özellikleri güncelle
    updateProperties(progress) {
        const { properties, startValues } = this.currentAnimation;
        let transform = '';
        
        // X ve Y pozisyonları
        const x = startValues.x + (properties.x || 0) * progress;
        const y = startValues.y + (properties.y || 0) * progress;
        
        // Ölçek
        const scaleX = startValues.scaleX + ((properties.scale || properties.scaleX || 1) - startValues.scaleX) * progress;
        const scaleY = startValues.scaleY + ((properties.scale || properties.scaleY || 1) - startValues.scaleY) * progress;
        
        // Transform string'ini oluştur
        transform = `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
        
        // Elementi güncelle
        this.element.style.transform = transform;
        
        // Opaklık
        if (properties.opacity !== undefined) {
            const opacity = startValues.opacity + (properties.opacity - startValues.opacity) * progress;
            this.element.style.opacity = opacity;
        }
    }
    
    // Animasyonu sıfırla
    reset() {
        this.animations = [];
        this.currentAnimation = null;
        this.isAnimating = false;
        this.element.style.transform = 'translate(0px, 0px) scale(1, 1)';
        this.element.style.opacity = '1';
    }
}

// Global animator fonksiyonu
function animator(selector) {
    return new Animator(selector);
}

// DOM yüklendikten sonra
document.addEventListener('DOMContentLoaded', function() {
    const box = document.getElementById('animatedBox');
    const moveRightBtn = document.getElementById('moveRight');
    const moveDownBtn = document.getElementById('moveDown');
    const fadeOutBtn = document.getElementById('fadeOut');
    const scaleUpBtn = document.getElementById('scaleUp');
    const chainAnimationsBtn = document.getElementById('chainAnimations');
    const resetBtn = document.getElementById('reset');
    
    // Animasyon butonlarına event listener'lar ekle
    moveRightBtn.addEventListener('click', function() {
        animator('#animatedBox').to({ x: 100 }, 1000, 'easeOutQuad');
    });
    
    moveDownBtn.addEventListener('click', function() {
        animator('#animatedBox').to({ y: 100 }, 1000, 'easeOutQuad');
    });
    
    fadeOutBtn.addEventListener('click', function() {
        animator('#animatedBox').to({ opacity: 0.3 }, 800, 'easeInOutQuad');
    });
    
    scaleUpBtn.addEventListener('click', function() {
        animator('#animatedBox').to({ scale: 1.5 }, 600, 'easeOutCubic');
    });
    
    chainAnimationsBtn.addEventListener('click', function() {
        animator('#animatedBox')
            .to({ x: 200 }, 1000, 'easeInOutQuad')
            .then()
            .to({ y: 150, opacity: 0.5 }, 800, 'easeOutCubic')
            .then()
            .to({ scale: 1.5 }, 600, 'easeInBack');
    });
    
    resetBtn.addEventListener('click', function() {
        animator('#animatedBox').reset();
    });
});