// script.js

// DOM elementlerini seçme
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Sayfa yüklendiğinde tema kontrolü
document.addEventListener('DOMContentLoaded', () => {
    // Kullanıcının tercih ettiği temayı kontrol et
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === 'light') {
        enableLightMode();
    } else {
        // Sistem tercihini kontrol et
        checkSystemPreference();
    }
});

// Tema değiştirici için event listener
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

// Karanlık modu etkinleştirme
function enableDarkMode() {
    body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
}

// Aydınlık modu etkinleştirme
function enableLightMode() {
    body.removeAttribute('data-theme');
    themeSwitch.checked = false;
    localStorage.setItem('theme', 'light');
}

// Sistem tercihini kontrol etme
function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

// Sistem tercihi değiştiğinde güncelleme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    // Sadece kullanıcı manuel olarak değiştirmediyse
    if (!localStorage.getItem('theme')) {
        if (event.matches) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});