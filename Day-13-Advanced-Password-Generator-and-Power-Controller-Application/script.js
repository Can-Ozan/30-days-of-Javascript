// DOM Elementleri
const generatedPasswordEl = document.getElementById('generated-password');
const copyPasswordBtn = document.getElementById('copy-password');
const passwordLengthEl = document.getElementById('password-length');
const lengthValueEl = document.getElementById('length-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const excludeSimilarEl = document.getElementById('exclude-similar');
const generatePasswordBtn = document.getElementById('generate-password');
const passwordInputEl = document.getElementById('password-input');
const toggleVisibilityBtn = document.getElementById('toggle-visibility');
const strengthFillEl = document.getElementById('strength-fill');
const strengthTextEl = document.getElementById('strength-text');
const feedbackListEl = document.getElementById('feedback-list');
const crackTimeEl = document.getElementById('crack-time');
const combinationsEl = document.getElementById('combinations');

// Karakter Setleri
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Benzer karakterler (kullanıcı hatasına neden olabilecek karakterler)
const similarChars = 'il1Lo0O';

// Parola üretme fonksiyonu
function generatePassword() {
    const length = parseInt(passwordLengthEl.value);
    const includeUppercase = uppercaseEl.checked;
    const includeLowercase = lowercaseEl.checked;
    const includeNumbers = numbersEl.checked;
    const includeSymbols = symbolsEl.checked;
    const excludeSimilar = excludeSimilarEl.checked;
    
    // En az bir karakter türü seçildiğinden emin ol
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Lütfen en az bir karakter türü seçin!');
        return;
    }
    
    let charSet = '';
    
    if (includeUppercase) {
        charSet += uppercaseChars;
    }
    
    if (includeLowercase) {
        charSet += lowercaseChars;
    }
    
    if (includeNumbers) {
        charSet += numberChars;
    }
    
    if (includeSymbols) {
        charSet += symbolChars;
    }
    
    // Benzer karakterleri hariç tut
    if (excludeSimilar) {
        for (let char of similarChars) {
            charSet = charSet.replace(char, '');
        }
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    
    generatedPasswordEl.value = password;
    
    // Üretilen parolanın gücünü kontrol et
    checkPasswordStrength(password);
}

// Parola gücünü kontrol etme fonksiyonu
function checkPasswordStrength(password) {
    let score = 0;
    const feedback = [];
    
    // Parola uzunluğu kontrolü
    if (password.length >= 12) {
        score += 2;
        feedback.push({text: "Parola uzunluğu yeterli (12+ karakter)", valid: true});
    } else if (password.length >= 8) {
        score += 1;
        feedback.push({text: "Parola uzunluğu orta seviyede (8-11 karakter)", valid: true});
    } else {
        feedback.push({text: "Parola çok kısa (en az 8 karakter önerilir)", valid: false});
    }
    
    // Büyük harf kontrolü
    if (/[A-Z]/.test(password)) {
        score += 1;
        feedback.push({text: "Büyük harf içeriyor", valid: true});
    } else {
        feedback.push({text: "Büyük harf içermiyor", valid: false});
    }
    
    // Küçük harf kontrolü
    if (/[a-z]/.test(password)) {
        score += 1;
        feedback.push({text: "Küçük harf içeriyor", valid: true});
    } else {
        feedback.push({text: "Küçük harf içermiyor", valid: false});
    }
    
    // Rakam kontrolü
    if (/[0-9]/.test(password)) {
        score += 1;
        feedback.push({text: "Rakam içeriyor", valid: true});
    } else {
        feedback.push({text: "Rakam içermiyor", valid: false});
    }
    
    // Sembol kontrolü
    if (/[^A-Za-z0-9]/.test(password)) {
        score += 1;
        feedback.push({text: "Sembol içeriyor", valid: true});
    } else {
        feedback.push({text: "Sembol içermiyor", valid: false});
    }
    
    // Tekrar eden karakter kontrolü
    if (/(.)\1{2,}/.test(password)) {
        score -= 1;
        feedback.push({text: "Tekrar eden karakterler var", valid: false});
    } else {
        feedback.push({text: "Tekrar eden karakter yok", valid: true});
    }
    
    // Sıralı karakter kontrolü (abc, 123, vb.)
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
        score -= 1;
        feedback.push({text: "Sıralı karakterler içeriyor", valid: false});
    } else {
        feedback.push({text: "Sıralı karakterler yok", valid: true});
    }
    
    // Güç seviyesini belirle
    let strengthLevel, strengthText, strengthClass;
    
    if (score >= 6) {
        strengthLevel = 5;
        strengthText = "Çok Güçlü";
        strengthClass = "very-strong";
    } else if (score >= 4) {
        strengthLevel = 4;
        strengthText = "Güçlü";
        strengthClass = "strong";
    } else if (score >= 3) {
        strengthLevel = 3;
        strengthText = "Orta";
        strengthClass = "medium";
    } else if (score >= 2) {
        strengthLevel = 2;
        strengthText = "Zayıf";
        strengthClass = "weak";
    } else {
        strengthLevel = 1;
        strengthText = "Çok Zayıf";
        strengthClass = "very-weak";
    }
    
    // Güç göstergesini güncelle
    strengthFillEl.className = "strength-fill " + strengthClass;
    strengthTextEl.textContent = strengthText;
    
    // Geri bildirim listesini güncelle
    feedbackListEl.innerHTML = "";
    feedback.forEach(item => {
        const li = document.createElement("li");
        li.className = `feedback-item ${item.valid ? 'valid' : 'invalid'}`;
        li.textContent = item.text;
        feedbackListEl.appendChild(li);
    });
    
    // İstatistikleri hesapla ve göster
    calculatePasswordStats(password);
}

// Parola istatistiklerini hesaplama
function calculatePasswordStats(password) {
    // Karakter seti boyutunu tahmin et
    let charSetSize = 0;
    if (/[a-z]/.test(password)) charSetSize += 26;
    if (/[A-Z]/.test(password)) charSetSize += 26;
    if (/[0-9]/.test(password)) charSetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charSetSize += 32; // Yaklaşık sembol sayısı
    
    // Olası kombinasyon sayısı
    const combinations = Math.pow(charSetSize, password.length);
    combinationsEl.textContent = formatNumber(combinations);
    
    // Tahmini kırılma süresi (saniye cinsinden)
    // Varsayılan: 10^9 hash/saniye (modern bir bilgisayar için)
    const hashesPerSecond = 1e9;
    const secondsToCrack = combinations / hashesPerSecond;
    
    crackTimeEl.textContent = formatTime(secondsToCrack);
}

// Büyük sayıları formatlama
function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(2) + " kentilyon";
    if (num >= 1e15) return (num / 1e15).toFixed(2) + " katrilyon";
    if (num >= 1e12) return (num / 1e12).toFixed(2) + " trilyon";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + " milyar";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + " milyon";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + " bin";
    return num.toString();
}

// Zamanı formatlama
function formatTime(seconds) {
    if (seconds >= 3.154e7 * 1e6) return (seconds / (3.154e7 * 1e6)).toFixed(0) + " milyon yıl";
    if (seconds >= 3.154e7 * 1e3) return (seconds / (3.154e7 * 1e3)).toFixed(0) + " bin yıl";
    if (seconds >= 3.154e7) return (seconds / 3.154e7).toFixed(1) + " yıl";
    if (seconds >= 86400) return (seconds / 86400).toFixed(1) + " gün";
    if (seconds >= 3600) return (seconds / 3600).toFixed(1) + " saat";
    if (seconds >= 60) return (seconds / 60).toFixed(1) + " dakika";
    if (seconds >= 1) return seconds.toFixed(1) + " saniye";
    return "anında";
}

// Parolayı panoya kopyalama
function copyToClipboard() {
    if (!generatedPasswordEl.value) {
        alert("Önce bir parola oluşturun!");
        return;
    }
    
    generatedPasswordEl.select();
    document.execCommand("copy");
    
    // Kopyalama butonunun metnini geçici olarak değiştir
    const originalText = copyPasswordBtn.textContent;
    copyPasswordBtn.textContent = "Kopyalandı!";
    
    setTimeout(() => {
        copyPasswordBtn.textContent = originalText;
    }, 2000);
}

// Parola görünürlüğünü değiştirme
function togglePasswordVisibility() {
    if (passwordInputEl.type === "password") {
        passwordInputEl.type = "text";
        toggleVisibilityBtn.textContent = "Gizle";
    } else {
        passwordInputEl.type = "password";
        toggleVisibilityBtn.textContent = "Göster";
    }
}

// Olay Dinleyicileri
document.addEventListener('DOMContentLoaded', () => {
    // İlk parolayı oluştur
    generatePassword();
    
    // Uzunluk değerini güncelle
    lengthValueEl.textContent = passwordLengthEl.value;
});

passwordLengthEl.addEventListener('input', () => {
    lengthValueEl.textContent = passwordLengthEl.value;
});

generatePasswordBtn.addEventListener('click', generatePassword);
copyPasswordBtn.addEventListener('click', copyToClipboard);
toggleVisibilityBtn.addEventListener('click', togglePasswordVisibility);

passwordInputEl.addEventListener('input', () => {
    checkPasswordStrength(passwordInputEl.value);
});