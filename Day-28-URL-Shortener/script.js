// DOM Elementleri
const urlInput = document.getElementById('url-input');
const shortenBtn = document.getElementById('shorten-btn');
const customAliasInput = document.getElementById('custom-alias');
const expirationSelect = document.getElementById('expiration');
const resultSection = document.querySelector('.result-section');
const shortUrlInput = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');
const qrCodeContainer = document.getElementById('qr-code');
const downloadQrBtn = document.getElementById('download-qr');
const clickCountElement = document.getElementById('click-count');
const creationDateElement = document.getElementById('creation-date');
const expirationDateElement = document.getElementById('expiration-date');
const historyList = document.getElementById('history-list');

// Uygulama durumu
let currentShortUrl = '';
let currentQrCode = null;

// Sayfa yüklendiğinde geçmişi yükle
document.addEventListener('DOMContentLoaded', loadHistory);

// Kısalt butonu tıklama olayı
shortenBtn.addEventListener('click', shortenUrl);

// Kopyala butonu tıklama olayı
copyBtn.addEventListener('click', copyToClipboard);

// QR kod indirme butonu tıklama olayı
downloadQrBtn.addEventListener('click', downloadQrCode);

// URL kısaltma işlevi
function shortenUrl() {
    const originalUrl = urlInput.value.trim();
    
    // URL doğrulama
    if (!isValidUrl(originalUrl)) {
        alert('Lütfen geçerli bir URL girin!');
        return;
    }
    
    const customAlias = customAliasInput.value.trim();
    const expiration = expirationSelect.value;
    
    // Özel takma ad doğrulama
    if (customAlias && !isValidAlias(customAlias)) {
        alert('Özel takma ad yalnızca harf, rakam ve tire içerebilir!');
        return;
    }
    
    // Kısaltılmış URL oluştur
    const shortUrl = generateShortUrl(customAlias);
    currentShortUrl = shortUrl;
    
    // Sonuçları göster
    displayResult(originalUrl, shortUrl, expiration);
    
    // Geçmişe ekle
    addToHistory(originalUrl, shortUrl, expiration);
    
    // QR kodu oluştur
    generateQrCode(shortUrl);
}

// URL doğrulama
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Özel takma ad doğrulama
function isValidAlias(alias) {
    const aliasRegex = /^[a-zA-Z0-9-]+$/;
    return aliasRegex.test(alias);
}

// Kısaltılmış URL oluşturma
function generateShortUrl(customAlias) {
    const baseUrl = window.location.origin + '/';
    
    if (customAlias) {
        return baseUrl + customAlias;
    } else {
        // Rastgele 6 karakterli bir dize oluştur
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        
        for (let i = 0; i < 6; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return baseUrl + randomString;
    }
}

// Sonuçları görüntüleme
function displayResult(originalUrl, shortUrl, expiration) {
    shortUrlInput.value = shortUrl;
    
    // İstatistikleri ayarla
    clickCountElement.textContent = '0';
    
    const now = new Date();
    creationDateElement.textContent = formatDate(now);
    
    let expirationDate = 'Hiçbir zaman';
    if (expiration !== 'never') {
        const expiry = new Date(now);
        expiry.setDate(expiry.getDate() + parseInt(expiration));
        expirationDate = formatDate(expiry);
    }
    expirationDateElement.textContent = expirationDate;
    
    // Sonuç bölümünü göster
    resultSection.classList.remove('hidden');
    
    // Sayfayı sonuç bölümüne kaydır
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// QR kodu oluşturma
function generateQrCode(url) {
    // Önceki QR kodunu temizle
    qrCodeContainer.innerHTML = '';
    
    // Yeni QR kodu oluştur
    QRCode.toCanvas(url, { width: 180, height: 180 }, function(err, canvas) {
        if (err) {
            console.error('QR kodu oluşturulurken hata:', err);
            return;
        }
        
        qrCodeContainer.appendChild(canvas);
        currentQrCode = canvas;
    });
}

// Panoya kopyalama
function copyToClipboard() {
    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 99999); // Mobil cihazlar için
    
    navigator.clipboard.writeText(shortUrlInput.value)
        .then(() => {
            // Başarılı geri bildirim
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
            copyBtn.style.background = '#28a745';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        })
        .catch(err => {
            console.error('Panoya kopyalama hatası:', err);
            alert('Panoya kopyalama başarısız!');
        });
}

// QR kodu indirme
function downloadQrCode() {
    if (!currentQrCode) {
        alert('Önce bir QR kodu oluşturun!');
        return;
    }
    
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = currentQrCode.toDataURL('image/png');
    link.click();
}

// Tarih formatlama
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
}

// Geçmişe ekleme
function addToHistory(originalUrl, shortUrl, expiration) {
    // Yeni geçmiş öğesi oluştur
    const historyItem = {
        id: Date.now(),
        originalUrl,
        shortUrl,
        expiration,
        clickCount: 0,
        createdAt: new Date().toISOString()
    };
    
    // Yerel depolamadan geçmişi al
    let history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    
    // Yeni öğeyi ekle
    history.unshift(historyItem);
    
    // En fazla 10 öğe sakla
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    // Yerel depolamaya kaydet
    localStorage.setItem('urlHistory', JSON.stringify(history));
    
    // Geçmişi yeniden yükle
    loadHistory();
}

// Geçmişi yükleme
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">Henüz hiç link kısaltmadınız.</p>';
        return;
    }
    
    history.forEach(item => {
        const historyItemElement = document.createElement('div');
        historyItemElement.className = 'history-item';
        
        historyItemElement.innerHTML = `
            <div class="history-url">
                <span class="original-url">${truncateUrl(item.originalUrl, 50)}</span>
                <span class="short-url">${item.shortUrl}</span>
            </div>
            <div class="history-stats">
                <div class="history-stat">
                    <span class="history-stat-value">${item.clickCount}</span>
                    <span class="history-stat-label">Tıklanma</span>
                </div>
            </div>
        `;
        
        historyList.appendChild(historyItemElement);
    });
}

// URL'yi kısaltma (görüntüleme için)
function truncateUrl(url, maxLength) {
    if (url.length <= maxLength) {
        return url;
    }
    
    return url.substring(0, maxLength) + '...';
}

// Enter tuşu ile kısaltma
urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});