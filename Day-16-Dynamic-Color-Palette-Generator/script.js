// DOM elementlerini seçme
const colorPicker = document.getElementById('color-picker');
const hexInput = document.getElementById('hex-input');
const schemeBtns = document.querySelectorAll('.scheme-btn');
const paletteContainer = document.getElementById('palette-container');
const toast = document.getElementById('toast');

// Başlangıç değerleri
let currentColor = '#3498db';
let currentScheme = 'monochromatic';

// Renk dönüşüm fonksiyonları
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function adjustHsl(h, s, l) {
    return { h: (h + 360) % 360, s: Math.max(0, Math.min(100, s)), l: Math.max(0, Math.min(100, l)) };
}

// Renk şemalarını oluşturma
function generateMonochromatic(color) {
    const hsl = rgbToHsl(color.r, color.g, color.b);
    const colors = [];
    
    // Ana renk
    colors.push({ h: hsl.h, s: hsl.s, l: hsl.l });
    
    // Daha açık tonlar
    for (let i = 1; i <= 2; i++) {
        colors.push({ h: hsl.h, s: hsl.s, l: Math.min(95, hsl.l + 15 * i) });
    }
    
    // Daha koyu tonlar
    for (let i = 1; i <= 2; i++) {
        colors.push({ h: hsl.h, s: hsl.s, l: Math.max(5, hsl.l - 15 * i) });
    }
    
    return colors;
}

function generateComplementary(color) {
    const hsl = rgbToHsl(color.r, color.g, color.b);
    const colors = [];
    
    // Ana renk
    colors.push({ h: hsl.h, s: hsl.s, l: hsl.l });
    
    // Tamamlayıcı renk
    colors.push({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l });
    
    // Ana rengin açık tonu
    colors.push({ h: hsl.h, s: hsl.s, l: Math.min(95, hsl.l + 20) });
    
    // Tamamlayıcı rengin açık tonu
    colors.push({ h: (hsl.h + 180) % 360, s: hsl.s, l: Math.min(95, hsl.l + 20) });
    
    // Ana rengin koyu tonu
    colors.push({ h: hsl.h, s: hsl.s, l: Math.max(5, hsl.l - 20) });
    
    return colors;
}

function generateAnalogous(color) {
    const hsl = rgbToHsl(color.r, color.g, color.b);
    const colors = [];
    
    // Ana renk
    colors.push({ h: hsl.h, s: hsl.s, l: hsl.l });
    
    // Sol ve sağ analog renkler
    colors.push({ h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l });
    colors.push({ h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l });
    
    // Daha fazla varyasyon
    colors.push({ h: (hsl.h - 15 + 360) % 360, s: hsl.s, l: Math.min(95, hsl.l + 15) });
    colors.push({ h: (hsl.h + 15) % 360, s: hsl.s, l: Math.max(5, hsl.l - 15) });
    
    return colors;
}

function generateTriadic(color) {
    const hsl = rgbToHsl(color.r, color.g, color.b);
    const colors = [];
    
    // Ana renk
    colors.push({ h: hsl.h, s: hsl.s, l: hsl.l });
    
    // Diğer iki triadic renk
    colors.push({ h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l });
    colors.push({ h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l });
    
    // Varyasyonlar
    colors.push({ h: hsl.h, s: hsl.s, l: Math.min(95, hsl.l + 20) });
    colors.push({ h: (hsl.h + 120) % 360, s: hsl.s, l: Math.max(5, hsl.l - 20) });
    
    return colors;
}

function generateTetradic(color) {
    const hsl = rgbToHsl(color.r, color.g, color.b);
    const colors = [];
    
    // Ana renk
    colors.push({ h: hsl.h, s: hsl.s, l: hsl.l });
    
    // Diğer üç tetradic renk
    colors.push({ h: (hsl.h + 90) % 360, s: hsl.s, l: hsl.l });
    colors.push({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l });
    colors.push({ h: (hsl.h + 270) % 360, s: hsl.s, l: hsl.l });
    
    // Bir varyasyon
    colors.push({ h: hsl.h, s: hsl.s, l: Math.min(95, hsl.l + 15) });
    
    return colors;
}

// Renk paletini oluşturma
function generatePalette() {
    const rgbColor = hexToRgb(currentColor);
    let colorScheme;
    
    switch (currentScheme) {
        case 'monochromatic':
            colorScheme = generateMonochromatic(rgbColor);
            break;
        case 'complementary':
            colorScheme = generateComplementary(rgbColor);
            break;
        case 'analogous':
            colorScheme = generateAnalogous(rgbColor);
            break;
        case 'triadic':
            colorScheme = generateTriadic(rgbColor);
            break;
        case 'tetradic':
            colorScheme = generateTetradic(rgbColor);
            break;
        default:
            colorScheme = generateMonochromatic(rgbColor);
    }
    
    displayPalette(colorScheme);
}

// Paleti görüntüleme
function displayPalette(colors) {
    paletteContainer.innerHTML = '';
    
    colors.forEach(color => {
        const rgb = hslToRgb(color.h, color.s, color.l);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        
        colorCard.innerHTML = `
            <div class="color-swatch" style="background-color: ${hex};" data-hex="${hex}"></div>
            <div class="color-info">
                <div class="color-hex">${hex}</div>
            </div>
        `;
        
        paletteContainer.appendChild(colorCard);
    });
    
    // Kopyalama işlevselliği ekleme
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const hex = swatch.getAttribute('data-hex');
            copyToClipboard(hex);
            showToast();
        });
    });
}

// Panoya kopyalama
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Toast mesajı gösterme
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Olay dinleyicileri
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    hexInput.value = currentColor;
    generatePalette();
});

hexInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
        currentColor = value.length === 4 ? 
            `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value;
        colorPicker.value = currentColor;
        generatePalette();
    }
});

schemeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        schemeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScheme = btn.getAttribute('data-scheme');
        generatePalette();
    });
});

// Sayfa yüklendiğinde paleti oluştur
document.addEventListener('DOMContentLoaded', generatePalette);