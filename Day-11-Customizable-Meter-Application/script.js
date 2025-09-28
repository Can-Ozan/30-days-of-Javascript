// DOM elementlerini seçme
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageElement = document.getElementById('message');

let countdownInterval;

// Varsayılan tarih ve saat ayarları
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.valueAsDate = tomorrow;
timeInput.value = "12:00";

// Sayaç başlatma fonksiyonu
function startCountdown() {
    // Önceki sayaç varsa temizle
    clearInterval(countdownInterval);
    
    // Tarih ve saat bilgilerini al
    const targetDate = new Date(dateInput.value);
    const targetTime = timeInput.value.split(':');
    
    // Hedef tarih ve saati birleştir
    targetDate.setHours(parseInt(targetTime[0]), parseInt(targetTime[1]), 0, 0);
    
    // Geçmiş tarih kontrolü
    if (targetDate <= new Date()) {
        messageElement.textContent = "Lütfen gelecekte bir tarih seçin!";
        return;
    }
    
    messageElement.textContent = "";
    
    // Sayaç güncelleme fonksiyonu
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        // Zaman dolduysa
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            messageElement.textContent = "Sayaç tamamlandı!";
            return;
        }
        
        // Zaman hesaplamaları
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // DOM'u güncelle
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // İlk güncelleme
    updateCountdown();
    
    // Saniyede bir güncelle
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Sayaç sıfırlama fonksiyonu
function resetCountdown() {
    clearInterval(countdownInterval);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    messageElement.textContent = "Sayaç sıfırlandı!";
    
    // Varsayılan değerlere dön
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.valueAsDate = tomorrow;
    timeInput.value = "12:00";
}

// Event listener'ları ekle
startButton.addEventListener('click', startCountdown);
resetButton.addEventListener('click', resetCountdown);

// Sayfa yüklendiğinde varsayılan değerleri ayarla
window.addEventListener('load', () => {
    resetCountdown();
});