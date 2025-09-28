# Canlı Metin İstatistikleri ve Okunabilirlik Kontrolü

![Proje Görseli](https://via.placeholder.com/800x400?text=Metin+İstatistikleri+Analiz+Aracı)

Türkçe metinler için geliştirilmiş, kullanıcı dostu bir metin analiz aracı. Kullanıcıların yazdığı metinleri anlık olarak analiz ederek detaylı istatistikler ve okunabilirlik puanı sunar.

## ✨ Özellikler

### 📊 Temel İstatistikler
- **Kelime Sayısı**: Metindeki toplam kelime sayısı
- **Karakter Sayısı**: Toplam karakter sayısı (boşluklar dahil)
- **Cümle Sayısı**: Nokta, soru işareti ve ünlem ile ayrılan cümleler
- **Paragraf Sayısı**: Yeni satırlarla ayrılan paragraflar
- **Ortalama Kelime Uzunluğu**: Kelime başına düşen ortalama karakter sayısı
- **Tahmini Okuma Süresi**: 200 kelime/dakika hızına göre hesaplanan süre

### 📝 Okunabilirlik Analizi
- **Flesch-Kincaid Puanı**: 0-100 arası okunabilirlik skoru
- **Seviye Değerlendirmesi**: Metnin hangi eğitim seviyesi tarafından anlaşılabileceği
- **Görsel Skor Göstergesi**: Renkli daire grafik ile puan görselleştirmesi

### 🎯 Türkçe Desteği
- Türkçe karakterler (ğ, ü, ş, ı, ö, ç) için optimize edilmiş hesaplamalar
- Türkçe'ye uyarlanmış hece tahmin algoritması
- Yerelleştirilmiş kullanıcı arayüzü

## 🚀 Kurulum

### Yöntem 1: Doğrudan Çalıştırma
1. Proje dosyalarını indirin:
   - `index.html`
   - `style.css`
   - `script.js`

2. Tüm dosyaları aynı klasöre koyun

3. `index.html` dosyasını web tarayıcınızda açın

### Yöntem 2: Geliştirme Ortamında Çalıştırma
```bash
# Proje klasörünü oluşturun
mkdir metin-istatistikleri
cd metin-istatistikleri

# Dosyaları oluşturun veya kopyalayın
touch index.html style.css script.js

# Live server ile çalıştırın (opsiyonel)
# npm install -g live-server
# live-server
```

## 📁 Dosya Yapısı

```
metin-istatistikleri/
│
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript fonksiyonları
└── README.md           # Proje dokümantasyonu
```

## 🛠️ Teknolojiler

- **HTML5**: Yapısal elemanlar ve semantik markup
- **CSS3**: 
  - Grid ve Flexbox layout sistemleri
  - Responsive tasarım
  - CSS transitions ve transformations
- **Vanilla JavaScript**:
  - DOM manipülasyonu
  - Event handling
  - Metin analiz algoritmaları

## 📈 Kullanım

1. **Metin Girişi**: "Metninizi yazın" alanına metninizi girin
2. **Anlık Analiz**: Yazarken tüm istatistikler otomatik olarak güncellenir
3. **Sonuçları İnceleme**:
   - Temel istatistikleri üst bölümde görün
   - Okunabilirlik puanını ve açıklamasını alt bölümde inceleyin

### Okunabilirlik Skorları Anlamları

| Puan Aralığı | Seviye | Açıklama |
|-------------|--------|----------|
| 90-100 | Çok Kolay | 5. sınıf öğrencisi tarafından anlaşılabilir |
| 80-89 | Kolay | 6. sınıf öğrencisi tarafından anlaşılabilir |
| 70-79 | Oldukça Kolay | 7. sınıf öğrencisi tarafından anlaşılabilir |
| 60-69 | Standart | 8-9. sınıf öğrencisi tarafından anlaşılabilir |
| 50-59 | Biraz Zor | 10-12. sınıf öğrencisi tarafından anlaşılabilir |
| 30-49 | Zor | Üniversite öğrencisi tarafından anlaşılabilir |
| 0-29 | Çok Zor | Üniversite mezunu tarafından anlaşılabilir |

## 🔧 Özelleştirme

### Renk Temasını Değiştirme
`style.css` dosyasında CSS değişkenlerini düzenleyerek renk temasını değiştirebilirsiniz:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #2ecc71;
    --warning-color: #f1c40f;
    --danger-color: #e74c3c;
}
```

### Okuma Hızını Ayarlama
`script.js` dosyasında `calculateReadingTime` fonksiyonundaki `wordsPerMinute` değerini değiştirin:

```javascript
const wordsPerMinute = 250; // Varsayılan: 200
```

## 🌐 Tarayıcı Desteği

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 50+

## 📱 Responsive Tasarım

Proje mobil cihazlarda da sorunsuz çalışacak şekilde tasarlanmıştır:
- Masaüstü: 4x2 grid layout
- Tablet: 2x4 grid layout  
- Mobil: 1x8 stack layout

## 🧮 Algoritma Detayları

### Flesch-Kincaid Formülü
```
206.835 - (1.015 × (kelime_sayısı / cümle_sayısı)) - (84.6 × (hece_sayısı / kelime_sayısı))
```

### Hece Tahmini
Türkçe kelimeler için optimize edilmiş basit hece tahmin algoritması:
- Her sesli harf bir hece olarak sayılır
- Ardışık sesli harfler tek hece sayılır
- Kelime sonundaki 'e' harfi genellikle hece oluşturmaz

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🐛 Hata Bildirimi

Bir hata bulursanız lütfen [Issues](https://github.com/kullanici/metin-istatistikleri/issues) sayfasından bildirin.

## ✨ Geliştirici

  **Yusuf Can Ozan**
- GitHub: https://github.com/Can-Ozan
- Email: yusufcanozan9@gmail.com

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir. Türkçe dil işleme için basit algoritmalar kullanılmıştır. Profesyonel kullanım için daha gelişmiş NLP kütüphaneleri önerilir.