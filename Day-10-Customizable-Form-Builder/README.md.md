# Özelleştirilebilir Form Oluşturucu (Form Builder)

Türkçe dilinde geliştirilmiş, sürükle-bırak mantığıyla çalışan, kullanıcı dostu bir form oluşturma aracı.

## 🚀 Özellikler

- **Sürükle-Bırak Arayüzü**: Form elemanlarını kolayca sürükleyip form alanına bırakabilirsiniz
- **Çoklu Form Elemanları**: 
  - Metin Alanı
  - E-posta
  - Sayı
  - Metin Kutusu
  - Açılır Liste
  - Onay Kutusu
  - Radyo Düğmesi
  - Tarih
  - Dosya Yükleme
  - Buton
- **Gerçek Zamanlı Önizleme**: Formunuzu anında görüntüleyebilirsiniz
- **HTML Kodu Çıktısı**: Oluşturduğunuz formun HTML kodunu alabilirsiniz
- **Responsive Tasarım**: Tüm cihazlarla uyumlu
- **Özelleştirilebilir Özellikler**: Her form elemanı için ayrıntılı özellik ayarları

## 🛠️ Kurulum

1. Bu projeyi bilgisayarınıza indirin veya klonlayın
2. Tüm dosyaların aynı klasörde olduğundan emin olun:
   - `index.html`
   - `style.css`
   - `script.js`

3. `index.html` dosyasını tarayıcınızda açın

## 📖 Kullanım Kılavuzu

### Form Elemanı Ekleme

1. **Sürükle-Bırak Yöntemi**:
   - Sol taraftaki araç kutusundan istediğiniz form elemanını seçin
   - Form elemanını form tasarım alanına sürükleyip bırakın

2. **Tıklama Yöntemi**:
   - Araç kutusundaki form elemanlarına tıklayarak da ekleyebilirsiniz

### Form Elemanlarını Özelleştirme

1. Form tasarım alanındaki bir elemana tıklayarak seçin
2. Sağ taraftaki özellikler panelinde:
   - **Etiket**: Form elemanının başlığını değiştirin
   - **Zorunlu Alan**: Form alanını zorunlu yapın
   - **Placeholder**: Açıklayıcı metin ekleyin
   - **Seçenekler**: Açılır liste ve radyo düğmeleri için seçenekleri düzenleyin
   - **Buton Metni**: Butonların üzerindeki yazıyı değiştirin

### Form Önizleme

1. "Formu Önizle" butonuna tıklayın
2. Açılan pencerede formunuzun nasıl görüneceğini görebilirsiniz
3. Formu test edebilirsiniz

### HTML Kodu Alma

1. "HTML Kodunu Al" butonuna tıklayın
2. Oluşturulan HTML kodunu görüntüleyin
3. "Kodu Kopyala" butonu ile panonuza kopyalayın
4. Kodu projenizde kullanabilirsiniz

### Formu Temizleme

1. "Formu Temizle" butonuna tıklayın
2. Onay penceresinde "Tamam" diyerek formu sıfırlayın

## 🎯 Kullanım Senaryoları

- **İletişim Formları**: Web siteleri için özelleştirilmiş iletişim formları
- **Anketler**: Müşteri memnuniyeti anketleri
- **Kayıt Formları**: Üyelik ve kayıt formları
- **Sipariş Formları**: E-ticaret siteleri için sipariş formları
- **Veri Toplama**: Çeşitli veri toplama ihtiyaçları için

## 🏗️ Teknik Özellikler

- **Frontend Teknolojileri**: HTML5, CSS3, Vanilla JavaScript
- **Drag & Drop API**: HTML5 Drag and Drop API kullanılmıştır
- **Responsive Design**: CSS Grid ve Flexbox ile responsive tasarım
- **Cross-browser Uyumluluk**: Modern tarayıcılarla uyumludur

## 📁 Dosya Yapısı

```
form-builder/
│
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript dosyası
└── README.md           # Bu dosya
```

## 🔧 Geliştirici Notları

### Form Elemanı Eklemek İçin

Yeni bir form elemanı eklemek için:

1. `elementTemplates` objesine yeni elemanı ekleyin
2. Gerekli switch case'leri güncelleyin
3. CSS stillerini ekleyin

Örnek:
```javascript
// script.js içinde
newElement: {
    label: 'Yeni Eleman',
    type: 'newtype',
    placeholder: 'Yer tutucu metin'
}
```

### Özellik Paneli Eklemek İçin

1. `renderPropertiesPanel` fonksiyonuna yeni özellik grubu ekleyin
2. Event listener'ları ekleyin

## 🐛 Bilinen Sorunlar ve Çözümler

- **Sürükleme Sorunu**: Bazı tarayıcılarda sürükleme sorunları olabilir. Bu durumda tıklama yöntemini kullanın.
- **Mobil Uyumluluk**: Mobil cihazlarda sürükle-bırak desteklenmeyebilir, tıklama yöntemi kullanılmalıdır.

## 🔮 Gelecek Sürümler İçin Planlanan Özellikler

- [ ] Form validasyon kuralları
- [ ] CSS özelleştirme seçenekleri
- [ ] Form şablonları
- [ ] JSON çıktısı
- [ ] Form verilerini işleme
- [ ] Çoklu dil desteği
- [ ] Karanlık mod

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

Bu proje Türkçe dilinde geliştirilmiş açık kaynaklı bir form builder uygulamasıdır.

## 📞 Destek

Sorularınız veya önerileriniz için issue açabilirsiniz.

---

**Not**: Bu proje tamamen frontend teknolojileri kullanılarak geliştirilmiştir. Backend entegrasyonu için ek geliştirmeler gerekebilir.