# Markdown Önizleme Uygulaması

![Markdown Önizleyici](https://img.shields.io/badge/Markdown-Önizleyici-blue)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Multi-Language](https://img.shields.io/badge/Çoklu%20Dil-5%20dil-brightgreen)
![License](https://img.shields.io/badge/Lisans-MIT-green)

Türkçe | [English](README_EN.md) | [Deutsch](README_DE.md) | [Français](README_FR.md) | [Español](README_ES.md)

Modern, kullanıcı dostu ve çok dilli bir Markdown düzenleyici ve önizleyici uygulaması. Gerçek zamanlı önizleme, dosya sürükle-bırak, çoklu dil desteği ve daha birçok özellik sunar.

![Markdown Preview App](https://i.imgur.com/mockup-image.png)

## ✨ Özellikler

- **🔁 Gerçek Zamanlı Önizleme**: Yazdığınız Markdown anında HTML'e dönüştürülür
- **🌐 Çoklu Dil Desteği**: 5 farklı dil (Türkçe, İngilizce, Almanca, Fransızca, İspanyolca)
- **📁 Dosya Sürükle & Bırak**: Markdown dosyalarını doğrudan editöre sürükleyip bırakabilirsiniz
- **💾 Çoklu İndirme Seçenekleri**: Farklı dillerde ve formatlarda (.md, .txt) indirme
- **📱 Responsive Tasarım**: Mobil cihazlarda da mükemmel çalışır
- **🖥️ Tam Ekran Modu**: Önizlemeyi tam ekranda görüntüleyebilirsiniz
- **🎨 Modern Arayüz**: Kullanıcı dostu ve estetik tasarım
- **⚡ Yüksek Performans**: marked.js kütüphanesi ile hızlı dönüşüm
- **📋 Panodan Yapıştırma**: Kolay içerik yapıştırma özelliği

## 🚀 Hızlı Başlangıç

### Ön Koşullar

Bu projeyi çalıştırmak için aşağıdaki yazılımlara ihtiyacınız var:

- Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)
- İnternet bağlantısı (CDN'den kütüphaneler yüklenmesi için)

### Kurulum

1. Depoyu klonlayın veya indirin:

```bash
git clone https://github.com/kullanici-adi/markdown-onizleme.git
cd markdown-onizleme
```

2. Dosyaları bir web sunucusunda barındırın veya doğrudan açın:

```bash
# Yerel sunucu ile çalıştırma (Python)
python -m http.server 8000

# Veya Node.js ile
npx http-server

# Veya doğrudan dosyayı açın
open index.html
```

3. Tarayıcınızda `http://localhost:8000` (veya ilgili port) adresine gidin

### Docker ile Çalıştırma

Projeyi Docker ile de çalıştırabilirsiniz:

```bash
# Docker image oluşturma
docker build -t markdown-preview .

# Container çalıştırma
docker run -p 8080:80 markdown-preview
```

Dockerfile:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## 🛠️ Teknolojiler

- **HTML5**: Yapısal elemanlar ve semantik işaretleme
- **CSS3**: Modern stillendirme, Flexbox/Grid, animasyonlar
- **JavaScript (ES6+)**: Dinamik işlevsellik ve etkileşim
- **marked.js**: Markdown'dan HTML'e dönüşüm kütüphanesi
- **Font Awesome**: İkon seti

## 📦 Bağımlılıklar

Proje şu harici kaynakları kullanır:

```html
<!-- CDN üzerinden yüklenen kütüphaneler -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## 🎯 Kullanım

### Temel Kullanım

1. Sol taraftaki editöre Markdown metninizi yazın
2. Sağ tarafta otomatik olarak oluşturulan HTML önizlemesini görün
3. Dil değiştirmek için sağ üstteki dil seçiciyi kullanın

### Dosya İşlemleri

- **Dosya Yükleme**: `.md` dosyalarını doğrudan editör alanına sürükleyip bırakın
- **İndirme**: "İndir" butonuna tıklayarak farklı dillerde ve formatlarda indirin
- **Panodan Yapıştırma**: "Yapıştır" butonu ile panodaki içeriği editöre ekleyin

### Klavye Kısayolları

- `Tab`: Girinti ekleme
- `Ctrl/Cmd + Z`: Geri alma
- `Ctrl/Cmd + Y`: İleri alma
- `Ctrl/Cmd + S`: İndirme dialogunu açma (tarayıcıya göre değişir)

## 🌐 Çoklu Dil Desteği

Uygulama aşağıdaki dilleri destekler:

| Dil | Kod | Durum |
|------|-----|-------|
| Türkçe | `tr` | ✅ Tam destek |
| İngilizce | `en` | ✅ Tam destek |
| Almanca | `de` | ✅ Tam destek |
| Fransızca | `fr` | ✅ Tam destek |
| İspanyolca | `es` | ✅ Tam destek |

## 📁 Proje Yapısı

```
markdown-onizleme/
│
├── index.html          # Ana HTML dosyası
├── style.css           # Stil dosyası
├── script.js           # JavaScript dosyası
├── README.md           # Bu dosya (Türkçe)
├── README_EN.md        # İngilizce dokümantasyon
├── README_DE.md        # Almanca dokümantasyon
├── README_FR.md        # Fransızca dokümantasyon
├── README_ES.md        # İspanyolca dokümantasyon
├── LICENSE             # Lisans dosyası
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment yapılandırması
```

## 🔧 Geliştirme

### Yerel Geliştirme Ortamı Kurulumu

1. Depoyu klonlayın:
```bash
git clone https://github.com/kullanici-adi/markdown-onizleme.git
```

2. Geliştirme sunucusu başlatın:
```bash
# Live Server (VSCode eklentisi) önerilir
# veya
npx live-server
```

### Yeni Dil Ekleme

1. `script.js` dosyasındaki `translations` nesnesine yeni dil ekleyin
2. `exampleContent` nesnesine yeni dil için örnek içerik ekleyin
3. HTML'e dil seçici için yeni seçenek ekleyin
4. Yeni dil için README dosyası oluşturun

Örnek dil ekleme:
```javascript
// script.js içinde
const translations = {
    // ... mevcut diller
    it: { // İtalyanca
        header_desc: "Scrivi Markdown a sinistra, vedi l'anteprima istantanea a destra.",
        // ... diğer çeviriler
    }
};

const exampleContent = {
    // ... mevcut diller
    it: `# Benvenuto nell'app Anteprima Markdown!...`
};
```

## 🚀 Deployment

### GitHub Pages ile Deployment

1. Repository ayarlarından GitHub Pages'i etkinleştirin
2. `gh-pages` branch'ı veya `main` branch'ın `/docs` klasörünü seçin

Alternatif olarak:
```bash
# gh-pages paketi ile
npm install --save-dev gh-pages
npm run deploy
```

### Netlify ile Deployment

1. Dosyaları GitHub'a push edin
2. Netlify'da yeni site oluşturun ve GitHub repository'sini bağlayın
3. Build ayarlarını yapılandırın:
   - Build command: (boş bırakın)
   - Publish directory: `.`

### Vercel ile Deployment

1. Vercel'i GitHub hesabınıza bağlayın
2. İlgili repository'i seçin
3. Varsayılan ayarlarla deploy edin

## 🤝 Katkıda Bulunma

Katkıda bulunmak isterseniz:

1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi: XYZ'`)
4. Dalınıza push edin (`git push origin feature/yeni-ozellik`)
5. Bir Pull Request oluşturun

### Katkı Yönergeleri

- Kod stil kurallarına uyun
- Yeni özellikler için testler ekleyin
- Dokümantasyonu güncelleyin
- Anlamlı commit mesajları kullanın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 🐛 Hata Bildirimleri

Hata bulursanız lütfen [issue tracker](https://github.com/kullanici-adi/markdown-onizleme/issues) üzerinden bildirin. Mümkünse:

1. Hatayı nasıl reproduce edeceğimizi açıklayın
2. Beklenen ve gerçekleşen davranışı belirtin
3. Ekran görüntüsü veya kod örneği ekleyin
4. Kullandığınız tarayıcı ve işletim sistemi bilgilerini paylaşın

## 💡 Bilinen Sorunlar

- Internet Explorer desteklenmemektedir
- Çok büyük dosyalar (>5MB) performans sorunlarına neden olabilir
- Bazı tarayıcılarda panoya erişim için kullanıcı izni gerekebilir

## 🔮 Gelecek Güncellemeler

- [ ] Markdown syntax vurgulama
- [ ] Temalar ve koyu mod desteği
- [ ] Yerel depolama ile otomatik kaydetme
- [ ] Dışa aktarma seçenekleri (PDF, HTML)
- [ ] Eklenti sistemi
- [ ] Bulut senkronizasyonu
- [ ] Kullanıcı hesabı entegrasyonu

## 📞 İletişim

Proje ile ilgili sorularınız için:

- **E-posta**: ornek@email.com
- **GitHub Issues**: [Issue Tracker](https://github.com/kullanici-adi/markdown-onizleme/issues)
- **Discord**: [Sunucumuz](https://discord.gg/orneklink)

## 🙏 Teşekkürler

- [marked.js](https://github.com/markedjs/marked) ekibine Markdown parser için
- [Font Awesome](https://fontawesome.com/) ekibine ikonlar için
- Tüm katkıda bulunanlara

---

**Not**: Bu proje eğitim amaçlı olarak geliştirilmiştir ve profesyonel kullanım için ek özellikler gerektirebilir.

---

<div align="center">

**Markdown Önizleme Uygulaması** - [Canlı Demo](https://kullanici-adi.github.io/markdown-onizleme) · [Raporla Hata](https://github.com/kullanici-adi/markdown-onizleme/issues) · [İstek Özellik](https://github.com/kullanici-adi/markdown-onizleme/issues/new)

</div>