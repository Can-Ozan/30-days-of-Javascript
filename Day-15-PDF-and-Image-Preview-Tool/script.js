// PDF.js worker'ı ayarla
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// DOM elementlerini seç
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileSelectBtn = document.getElementById('fileSelectBtn');
const previewContainer = document.getElementById('previewContainer');
const closeBtn = document.getElementById('closeBtn');
const imagePreview = document.getElementById('imagePreview');
const pdfPreview = document.getElementById('pdfPreview');
const pdfCanvas = document.getElementById('pdfCanvas');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const fileNameSpan = document.getElementById('fileName');
const fileInfo = document.getElementById('fileInfo');
const infoFileName = document.getElementById('infoFileName');
const infoFileSize = document.getElementById('infoFileSize');
const infoFileType = document.getElementById('infoFileType');

// PDF değişkenleri
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const scale = 1.5;

// Dosya seçme butonuna tıklama olayı
fileSelectBtn.addEventListener('click', () => {
    fileInput.click();
});

// Dosya input değişikliği
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Sürükle-bırak olayları
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Kapatma butonu
closeBtn.addEventListener('click', () => {
    previewContainer.style.display = 'none';
    fileInfo.style.display = 'none';
    fileInput.value = '';
});

// Sayfa gezinme butonları
prevPageBtn.addEventListener('click', () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
});

nextPageBtn.addEventListener('click', () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
});

// Dosya işleme fonksiyonu
function handleFile(file) {
    // Dosya bilgilerini göster
    showFileInfo(file);
    
    // Önizleme alanını göster
    previewContainer.style.display = 'block';
    fileNameSpan.textContent = file.name;
    
    // Dosya türüne göre önizleme
    if (file.type === 'application/pdf') {
        showPDFPreview(file);
    } else if (file.type.startsWith('image/')) {
        showImagePreview(file);
    } else {
        alert('Desteklenmeyen dosya türü. Lütfen PDF veya görüntü dosyası seçin.');
        return;
    }
}

// Dosya bilgilerini göster
function showFileInfo(file) {
    fileInfo.style.display = 'block';
    infoFileName.textContent = file.name;
    infoFileSize.textContent = formatFileSize(file.size);
    infoFileType.textContent = file.type || 'Bilinmiyor';
}

// Dosya boyutunu formatla
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Görüntü önizleme
function showImagePreview(file) {
    // PDF önizlemeyi gizle
    pdfPreview.style.display = 'none';
    
    // Görüntü önizlemeyi göster
    imagePreview.style.display = 'block';
    
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
    };
    reader.readAsDataURL(file);
}

// PDF önizleme
function showPDFPreview(file) {
    // Görüntü önizlemeyi gizle
    imagePreview.style.display = 'none';
    
    // PDF önizlemeyi göster
    pdfPreview.style.display = 'block';
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const typedArray = new Uint8Array(e.target.result);
        loadPDF(typedArray);
    };
    reader.readAsArrayBuffer(file);
}

// PDF yükleme
function loadPDF(data) {
    const loadingTask = pdfjsLib.getDocument(data);
    loadingTask.promise.then(pdf => {
        pdfDoc = pdf;
        totalPagesSpan.textContent = pdf.numPages;
        
        // İlk sayfayı render et
        pageNum = 1;
        renderPage(pageNum);
    }).catch(error => {
        console.error('PDF yükleme hatası:', error);
        alert('PDF yüklenirken bir hata oluştu.');
    });
}

// Sayfa render etme
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        
        // Canvas boyutunu ayarla
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;
        
        // Render context
        const renderContext = {
            canvasContext: pdfCanvas.getContext('2d'),
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(() => {
            pageRendering = false;
            
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
            
            // Sayfa bilgisini güncelle
            currentPageSpan.textContent = num;
            
            // Gezinme butonlarını güncelle
            prevPageBtn.disabled = num <= 1;
            nextPageBtn.disabled = num >= pdfDoc.numPages;
        });
    });
}

// Sayfa render sıraya koyma
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}