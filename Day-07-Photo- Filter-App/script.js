// DOM elementlerini seçme
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
const editorSection = document.querySelector('.editor-section');
const loadingSection = document.querySelector('.loading');
const filterButtons = document.querySelectorAll('.filter-btn');
const intensitySlider = document.getElementById('intensity-slider');
const intensityValue = document.getElementById('intensity-value');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

// Değişkenler
let originalImage = null;
let currentFilter = 'original';
let filterIntensity = 1.0;

// Web Worker oluşturma
const workerCode = `
self.onmessage = function(e) {
    const { imageData, filter, intensity } = e.data;
    const data = imageData.data;
    
    switch(filter) {
        case 'grayscale':
            for(let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                const amount = intensity / 100;
                data[i] = data[i] * (1 - amount) + avg * amount;
                data[i + 1] = data[i + 1] * (1 - amount) + avg * amount;
                data[i + 2] = data[i + 2] * (1 - amount) + avg * amount;
            }
            break;
            
        case 'sepia':
            for(let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const amount = intensity / 100;
                
                const tr = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                const tg = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                const tb = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                
                data[i] = data[i] * (1 - amount) + tr * amount;
                data[i + 1] = data[i + 1] * (1 - amount) + tg * amount;
                data[i + 2] = data[i + 2] * (1 - amount) + tb * amount;
            }
            break;
            
        case 'invert':
            for(let i = 0; i < data.length; i += 4) {
                const amount = intensity / 100;
                data[i] = data[i] * (1 - amount) + (255 - data[i]) * amount;
                data[i + 1] = data[i + 1] * (1 - amount) + (255 - data[i + 1]) * amount;
                data[i + 2] = data[i + 2] * (1 - amount) + (255 - data[i + 2]) * amount;
            }
            break;
            
        case 'brightness':
            for(let i = 0; i < data.length; i += 4) {
                const amount = (intensity - 50) * 5; // -250 to 250
                data[i] = Math.min(255, Math.max(0, data[i] + amount));
                data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + amount));
                data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + amount));
            }
            break;
            
        case 'contrast':
            for(let i = 0; i < data.length; i += 4) {
                const factor = (259 * (intensity + 255)) / (255 * (259 - intensity));
                data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
                data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
                data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
            }
            break;
            
        case 'blur':
            // Basit bir kutu filtresi (blur) uygulama
            const width = imageData.width;
            const height = imageData.height;
            const tempData = new Uint8ClampedArray(data);
            const radius = Math.floor(intensity / 10);
            
            for(let y = 0; y < height; y++) {
                for(let x = 0; x < width; x++) {
                    let r = 0, g = 0, b = 0, count = 0;
                    
                    for(let dy = -radius; dy <= radius; dy++) {
                        for(let dx = -radius; dx <= radius; dx++) {
                            const nx = x + dx;
                            const ny = y + dy;
                            
                            if(nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                const idx = (ny * width + nx) * 4;
                                r += tempData[idx];
                                g += tempData[idx + 1];
                                b += tempData[idx + 2];
                                count++;
                            }
                        }
                    }
                    
                    const idx = (y * width + x) * 4;
                    data[idx] = r / count;
                    data[idx + 1] = g / count;
                    data[idx + 2] = b / count;
                }
            }
            break;
            
        case 'vintage':
            for(let i = 0; i < data.length; i += 4) {
                const amount = intensity / 100;
                data[i] = data[i] * (1 - amount) + (data[i] * 0.9) * amount;
                data[i + 1] = data[i + 1] * (1 - amount) + (data[i + 1] * 0.7) * amount;
                data[i + 2] = data[i + 2] * (1 - amount) + (data[i + 2] * 0.4) * amount;
            }
            break;
    }
    
    self.postMessage(imageData);
};
`;

const workerBlob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(workerBlob));

// Event listener'lar
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', handleImageUpload);

intensitySlider.addEventListener('input', () => {
    filterIntensity = parseInt(intensitySlider.value);
    intensityValue.textContent = `${filterIntensity}%`;
    applyFilter();
});

downloadBtn.addEventListener('click', downloadImage);
resetBtn.addEventListener('click', resetFilters);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        applyFilter();
    });
});

// Worker'dan mesaj geldiğinde
worker.onmessage = function(e) {
    ctx.putImageData(e.data, 0, 0);
    loadingSection.style.display = 'none';
};

// Resim yükleme işlemi
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file || !file.type.match('image.*')) {
        alert('Lütfen bir resim dosyası seçin.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Canvas boyutlarını ayarla
            const maxWidth = 800;
            const maxHeight = 600;
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = (maxHeight / height) * width;
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Orijinal resmi çiz
            ctx.drawImage(img, 0, 0, width, height);
            originalImage = ctx.getImageData(0, 0, width, height);
            
            // Editörü göster
            editorSection.style.display = 'block';
            
            // Varsayılan filtreyi uygula
            filterButtons[0].classList.add('active');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Filtre uygulama
function applyFilter() {
    if (!originalImage) return;
    
    loadingSection.style.display = 'block';
    
    // Ana iş parçacığını bloke etmemek için setTimeout kullan
    setTimeout(() => {
        if (currentFilter === 'original') {
            ctx.putImageData(originalImage, 0, 0);
            loadingSection.style.display = 'none';
        } else {
            // Web Worker'a gönder
            const imageDataCopy = new ImageData(
                new Uint8ClampedArray(originalImage.data),
                originalImage.width,
                originalImage.height
            );
            
            worker.postMessage({
                imageData: imageDataCopy,
                filter: currentFilter,
                intensity: filterIntensity
            });
        }
    }, 50);
}

// İndirme işlemi
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Filtreleri sıfırlama
function resetFilters() {
    intensitySlider.value = 100;
    filterIntensity = 100;
    intensityValue.textContent = '100%';
    currentFilter = 'original';
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active');
    
    applyFilter();
}