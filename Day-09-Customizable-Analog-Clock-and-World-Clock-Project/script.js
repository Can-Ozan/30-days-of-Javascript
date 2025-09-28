// DOM elementlerini seçme
const themeBtn = document.getElementById('themeBtn');
const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');
const timezoneSelect = document.getElementById('timezone');
const clockStyleSelect = document.getElementById('clockStyle');
const handColorInput = document.getElementById('handColor');
const secondHandColorInput = document.getElementById('secondHandColor');
const clock = document.querySelector('.clock');
const addClockBtn = document.getElementById('addClockBtn');
const resetClocksBtn = document.getElementById('resetClocksBtn');
const worldClocksContainer = document.getElementById('worldClocks');

// Tema değiştirme
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') 
        ? 'Açık Mod' 
        : 'Koyu Mod';
});

// Saat dilimi seçimi
let selectedTimezone = 'local';

timezoneSelect.addEventListener('change', (e) => {
    selectedTimezone = e.target.value;
});

// Saat stili seçimi
clockStyleSelect.addEventListener('change', (e) => {
    // Mevcut stil sınıflarını kaldır
    clock.classList.remove('classic', 'modern', 'minimal');
    // Yeni stili ekle
    clock.classList.add(e.target.value);
});

// Akrep ve yelkovan rengi
handColorInput.addEventListener('input', (e) => {
    const color = e.target.value;
    hourHand.style.background = color;
    minHand.style.background = color;
    document.querySelector('.center-dot').style.background = color;
});

// Saniye rengi
secondHandColorInput.addEventListener('input', (e) => {
    secondHand.style.background = e.target.value;
});

// Analog saat fonksiyonu
function setAnalogClock() {
    const now = selectedTimezone === 'local' 
        ? new Date() 
        : new Date(new Date().toLocaleString("en-US", {timeZone: selectedTimezone}));
    
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hours = now.getHours() % 12;
    
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    const hoursDegrees = ((hours / 12) * 360) + ((mins/60)*30) + 90;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// Dünya saatleri için veri
const timezones = [
    { id: 'local', name: 'Yerel Saat' },
    { id: 'UTC', name: 'UTC' },
    { id: 'Europe/Istanbul', name: 'İstanbul' },
    { id: 'America/New_York', name: 'New York' },
    { id: 'Europe/London', name: 'Londra' },
    { id: 'Asia/Tokyo', name: 'Tokyo' },
    { id: 'Australia/Sydney', name: 'Sidney' },
    { id: 'America/Los_Angeles', name: 'Los Angeles' },
    { id: 'Europe/Paris', name: 'Paris' },
    { id: 'Asia/Dubai', name: 'Dubai' }
];

// Dünya saatlerini saklamak için dizi
let worldClocks = JSON.parse(localStorage.getItem('worldClocks')) || [
    { id: 'Europe/Istanbul', name: 'İstanbul' },
    { id: 'America/New_York', name: 'New York' },
    { id: 'Europe/London', name: 'Londra' }
];

// Dünya saatlerini render etme
function renderWorldClocks() {
    worldClocksContainer.innerHTML = '';
    
    worldClocks.forEach(clock => {
        const now = new Date(new Date().toLocaleString("en-US", {timeZone: clock.id}));
        const timeString = now.toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const clockElement = document.createElement('div');
        clockElement.className = 'world-clock-item';
        clockElement.innerHTML = `
            <button class="remove-clock" data-id="${clock.id}">×</button>
            <div class="world-clock-name">${clock.name}</div>
            <div class="world-clock-time">${timeString}</div>
            <div class="world-clock-date">${dateString}</div>
        `;
        
        worldClocksContainer.appendChild(clockElement);
    });
    
    // Saat silme butonlarına event listener ekleme
    document.querySelectorAll('.remove-clock').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeWorldClock(id);
        });
    });
}

// Yeni saat ekleme
addClockBtn.addEventListener('click', () => {
    // Mevcut saatlerin dışındaki saat dilimlerini filtrele
    const availableTimezones = timezones.filter(tz => 
        !worldClocks.some(clock => clock.id === tz.id)
    );
    
    if (availableTimezones.length === 0) {
        alert('Tüm saat dilimleri zaten eklenmiş!');
        return;
    }
    
    // Rastgele bir saat dilimi seç
    const randomTimezone = availableTimezones[Math.floor(Math.random() * availableTimezones.length)];
    
    // Saati ekle
    worldClocks.push(randomTimezone);
    saveWorldClocks();
    renderWorldClocks();
});

// Saatleri sıfırlama
resetClocksBtn.addEventListener('click', () => {
    if (confirm('Tüm dünya saatlerini sıfırlamak istediğinizden emin misiniz?')) {
        worldClocks = [
            { id: 'Europe/Istanbul', name: 'İstanbul' },
            { id: 'America/New_York', name: 'New York' },
            { id: 'Europe/London', name: 'Londra' }
        ];
        saveWorldClocks();
        renderWorldClocks();
    }
});

// Saat silme
function removeWorldClock(id) {
    worldClocks = worldClocks.filter(clock => clock.id !== id);
    saveWorldClocks();
    renderWorldClocks();
}

// Dünya saatlerini localStorage'a kaydetme
function saveWorldClocks() {
    localStorage.setItem('worldClocks', JSON.stringify(worldClocks));
}

// Saatleri güncelleme
function updateClocks() {
    setAnalogClock();
    renderWorldClocks();
}

// İlk yükleme
document.addEventListener('DOMContentLoaded', () => {
    renderWorldClocks();
    setInterval(updateClocks, 1000);
    updateClocks(); // Hemen çalıştır
});