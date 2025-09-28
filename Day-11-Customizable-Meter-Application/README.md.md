# Özelleştirilebilir Sayaç Uygulaması (Countdown Timer)

Bu proje, kullanıcıların özelleştirilebilir geri sayım zamanlayıcıları oluşturabileceği modern ve responsive bir web uygulamasıdır.

## 🚀 Özellikler

- **Kullanıcı Dostu Arayüz**: Modern ve temiz tasarım
- **Responsive Tasarım**: Tüm cihazlarda mükemmel çalışır
- **Özelleştirilebilir**: İstediğiniz tarih ve saate geri sayım
- **Gerçek Zamanlı Güncelleme**: Saniye bazında geri sayım
- **Kolay Kullanım**: Basit ve anlaşılır kontroller
- **Sıfırlama Özelliği**: Sayaçı istediğiniz zaman sıfırlayabilme

## 📋 Gereksinimler

Bu projeyi çalıştırmak için herhangi bir ek paket veya kütüphaneye ihtiyaç yoktur. Sadece modern bir web tarayıcısı yeterlidir.

## 🛠️ Kurulum

1. Proje dosyalarını bilgisayarınıza indirin:
   ```bash
   git clone https://github.com/kullanici-adi/countdown-timer.git
   ```

2. Tüm dosyaların aynı klasörde olduğundan emin olun:
   ```
   countdown-timer/
   ├── index.html
   ├── style.css
   └── script.js
   ```

3. `index.html` dosyasını web tarayıcınızda açın.

## 🎮 Kullanım

1. **Tarih Seçimi**: "Hedef Tarih" alanından geri sayımın biteceği tarihi seçin
2. **Saat Seçimi**: "Hedef Saat" alanından geri sayımın biteceği saati seçin
3. **Başlat**: "Sayaç Başlat" butonuna tıklayarak geri sayımı başlatın
4. **İzleme**: Geri sayımı gün, saat, dakika ve saniye olarak takip edin
5. **Sıfırlama**: "Sıfırla" butonu ile sayaçı sıfırlayıp yeni bir geri sayım başlatın

## 📁 Dosya Yapısı

```
countdown-timer/
│
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript fonksiyonları
└── README.md           # Proje dokümantasyonu
```

## 🎨 Teknolojiler

- **HTML5**: Yapısal elemanlar ve form kontrolleri
- **CSS3**: 
  - Flexbox layout
  - CSS Grid
  - Gradient background
  - Responsive tasarım
  - Modern animasyonlar
- **Vanilla JavaScript**:
  - DOM manipülasyonu
  - setInterval fonksiyonu
  - Date objesi işlemleri
  - Event handling

## 🌟 Özellik Detayları

### Giriş Kontrolleri
- **Tarih Seçici**: Kullanıcı dostu tarih seçim arayüzü
- **Saat Seçici**: 24 saat formatında saat seçimi
- **Varsayılan Değerler**: Yarın 12:00 olarak otomatik ayarlanır

### Geri Sayım Ekranı
- **Gün Gösterimi**: 2 haneli gün sayacı
- **Saat Gösterimi**: 24 saat formatında
- **Dakika Gösterimi**: 60 dakika formatında
- **Saniye Gösterimi**: Gerçek zamanlı saniye güncellemesi

### Mesaj Sistemi
- **Hata Mesajları**: Geçersiz tarih seçimlerinde uyarı
- **Tamamlanma Mesajı**: Geri sayım sona erdiğinde bildirim
- **Sıfırlama Mesajı**: Sayaç sıfırlandığında feedback

## 📱 Responsive Özellikler

- **Masaüstü**: Tam ekran optimizasyonu
- **Tablet**: Orta boyutlu ekranlar için uyarlanmış layout
- **Mobil**: Küçük ekranlar için stacked tasarım

## 🔧 Özelleştirme

### Renk Teması
CSS dosyasındaki gradient değerlerini değiştirerek renk temasını özelleştirebilirsiniz:
```css
background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
```

### Zaman Formatı
JavaScript dosyasındaki zaman hesaplama fonksiyonlarını değiştirerek farklı zaman formatları ekleyebilirsiniz.

## 🐛 Bilinen Sorunlar

- Internet Explorer tarayıcısında tam destek sağlanmamaktadır
- Çok eski tarayıcı versiyonlarında CSS özellikleri çalışmayabilir

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

Bu proje açık kaynak olarak geliştirilmiştir. Katkıda bulunmak isterseniz pull request gönderebilirsiniz.

## 📞 İletişim

Sorularınız veya önerileriniz için [issue](https://github.com/kullanici-adi/countdown-timer/issues) oluşturabilirsiniz.

---

**Not**: Bu proje eğitim amaçlı olarak geliştirilmiştir ve production kullanım için optimize edilmemiştir.