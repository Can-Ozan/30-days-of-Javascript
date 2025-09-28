# Analog Saat ve Dünya Saati Projesi

🌍 **Modern, Dinamik ve Özelleştirilebilir Saat Uygulaması**

Bu proje, tamamen özelleştirilebilir bir analog saat ve çoklu dünya saatleri görüntüleyen modern bir web uygulamasıdır.

![Proje Görseli](https://via.placeholder.com/800x400/3498db/ffffff?text=Analog+Saat+ve+Dünya+Saati)

## ✨ Özellikler

### 🕐 Analog Saat
- **Gerçek zamanlı** analog saat görüntüleme
- **Özelleştirilebilir tasarım**:
  - 3 farklı saat stili (Klasik, Modern, Minimal)
  - Akrep ve yelkovan renk değiştirme
  - Saniye ibresi renk özelleştirme
- **Çoklu saat dilimi** desteği
- Yumuşak geçişli animasyonlar

### 🌍 Dünya Saatleri
- **Birden fazla şehir** için saat görüntüleme
- **Dinamik saat ekleme/çıkarma**
- **Otomatik yerel tarih** gösterimi
- **10+ farklı şehir** seçeneği

### 🎨 Kullanıcı Arayüzü
- **Koyu/Açık tema** desteği
- **Tamamen duyarlı** tasarım
- **Modern ve şık** arayüz
- Kullanıcı dostu kontroller

## 🚀 Kurulum

Projeyi çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın** veya dosyaları indirin
```bash
git clone https://github.com/kullanici/analog-saat-projesi.git
```

2. **Dosya yapısı**:
```
proje-klasoru/
│
├── index.html
├── style.css
└── script.js
```

3. **Tarayıcıda açın**:
   - `index.html` dosyasını herhangi bir modern tarayıcıda açın
   - **Local server** kullanmanız önerilir:
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx http-server

# PHP ile
php -S localhost:8000
```

## 🛠️ Teknolojiler

- **HTML5** - Yapısal temel
- **CSS3** - Modern stillendirme ve animasyonlar
  - Flexbox ve Grid layout
  - CSS değişkenleri ile tema desteği
  - Media queries ile duyarlı tasarım
- **Vanilla JavaScript** - Dinamik işlevsellik
  - DOM manipülasyonu
  - LocalStorage entegrasyonu
  - Real-time saat güncellemeleri

## 📁 Dosya Yapısı

```plaintext
analog-saat-projesi/
├── index.html          # Ana HTML dosyası
├── style.css           # Tüm stil tanımlamaları
├── script.js           # JavaScript işlevselliği
└── README.md           # Proje dokümantasyonu
```

## 🎯 Kullanım

### Analog Saat Özelleştirme
1. **Saat dilimi** seçin (Yerel, UTC, İstanbul, vb.)
2. **Saat stili** seçin (Klasik, Modern, Minimal)
3. **Renkleri özelleştirin**:
   - Akrep ve yelkovan rengi
   - Saniye ibresi rengi

### Dünya Saatleri Yönetimi
1. **Yeni saat ekleme**: "Yeni Saat Ekle" butonuna tıklayın
2. **Saat kaldırma**: Saatin yanındaki "×" butonuna tıklayın
3. **Sıfırlama**: "Saatleri Sıfırla" butonu ile varsayılanlara dönün

### Tema Değiştirme
- **Koyu/Açık mod** butonu ile tema değiştirin

## 🌐 Desteklenen Şehirler

- ✅ İstanbul (Türkiye)
- ✅ New York (ABD)
- ✅ Londra (İngiltere)
- ✅ Tokyo (Japonya)
- ✅ Paris (Fransa)
- ✅ Dubai (BAE)
- ✅ Sidney (Avustralya)
- ✅ Los Angeles (ABD)
- ✅ UTC
- ✅ Yerel Saat

## 🔧 Özelleştirme

### Yeni Saat Dilimi Ekleme
`script.js` dosyasındaki `timezones` dizisine yeni girişler ekleyin:

```javascript
const timezones = [
    // ... mevcut girişler
    { id: 'Asia/Singapore', name: 'Singapur' },
    { id: 'Europe/Berlin', name: 'Berlin' }
];
```

### Stil Özelleştirme
`style.css` dosyasındaki CSS değişkenlerini değiştirerek renk temasını özelleştirin:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #f5f5f5;
    /* ... diğer değişkenler */
}
```

## 📱 Responsive Tasarım

Proje tüm cihazlarla uyumludur:
- **Masaüstü** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobil** (480px - 767px)
- **Küçük mobil** (< 480px)

## 🎨 Tasarım Özellikleri

- **Modern gradient** ve gölge efektleri
- **Yumuşak geçiş** animasyonları
- **Kullanıcı dostu** arayüz elementleri
- **Erişilebilir** renk kontrastları
- **Tutarlı** tipografi ölçeklemesi

## 🔄 Güncellemeler

### v1.0.0 - Başlangıç Sürümü
- ✅ Temel analog saat işlevselliği
- ✅ Dünya saatleri görüntüleme
- ✅ Tema desteği
- ✅ Responsive tasarım
- ✅ LocalStorage entegrasyonu

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Katkıda bulunmak için:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**İsim Soyisim**
- GitHub: [@kullaniciadi](https://github.com/kullaniciadi)
- Email: ornek@email.com

## 🙏 Teşekkürler

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript ve CSS referansları için
- [CSS-Tricks](https://css-tricks.com/) - Modern CSS teknikleri için
- [Stack Overflow](https://stackoverflow.com/) - Problem çözümleri için

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

---
