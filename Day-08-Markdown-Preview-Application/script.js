// DOM elemanlarını seçme
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear-btn');
const exampleBtn = document.getElementById('example-btn');
const pasteBtn = document.getElementById('paste-btn');
const downloadBtn = document.getElementById('download-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const closeFullscreen = document.getElementById('close-fullscreen');
const fullscreenPreview = document.getElementById('fullscreen-preview');
const fullscreenContent = document.getElementById('fullscreen-content');
const dropArea = document.getElementById('drop-area');
const toast = document.getElementById('toast');
const languageSelect = document.getElementById('language-select');
const formatSelect = document.getElementById('format-select');
const fileLangSelect = document.getElementById('file-lang-select');
const confirmDownload = document.getElementById('confirm-download');

// Çoklu dil desteği için metinler
const translations = {
    tr: {
        header_desc: "Sol tarafta Markdown yazın, sağ tarafta anında önizlemesini görün. Dosyaları sürükle bırak ile de yükleyebilirsiniz.",
        editor_title: "Markdown Girişi",
        editor_placeholder: "Markdown metninizi buraya yazın... Veya bir dosyayı bu alana sürükleyip bırakın.",
        drop_message: "Dosyaları buraya sürükleyip bırakın",
        preview_title: "Önizleme",
        clear_btn: "Temizle",
        example_btn: "Örnek",
        paste_btn: "Yapıştır",
        download_btn: "İndir",
        fullscreen_btn: "Tam Ekran",
        close_btn: "Kapat",
        fullscreen_title: "Markdown Önizleme",
        feature1_title: "Gerçek Zamanlı Önizleme",
        feature1_desc: "Yazdığınız her şey anında önizlemede görüntülensin",
        feature2_title: "Sürükle & Bırak",
        feature2_desc: "Markdown dosyalarını doğrudan sürükleyip bırakın",
        feature3_title: "Çoklu Dil Desteği",
        feature3_desc: "Farklı dillerde içerik oluşturun ve indirin",
        download_options: "İndirme Seçenekleri",
        file_format: "Dosya Formatı:",
        file_language: "Dosya Dili:",
        confirm_download: "Dosyayı İndir",
        toast_success: "İşlem başarılı!",
        toast_file_loaded: "Dosya başarıyla yüklendi!",
        toast_file_error: "Lütfen sadece Markdown veya metin dosyaları yükleyin.",
        toast_empty_content: "İndirilecek içerik bulunamadı!",
        toast_file_downloaded: "Dosya indirildi!",
        toast_content_cleared: "İçerik temizlendi!",
        toast_example_loaded: "Örnek içerik yüklendi!",
        toast_paste_success: "Panodaki içerik yapıştırıldı!",
        toast_paste_error: "Panoya erişim izni gerekli!"
    },
    en: {
        header_desc: "Write Markdown on the left, see instant preview on the right. You can also upload files by drag and drop.",
        editor_title: "Markdown Input",
        editor_placeholder: "Write your Markdown here... Or drag and drop a file into this area.",
        drop_message: "Drag and drop files here",
        preview_title: "Preview",
        clear_btn: "Clear",
        example_btn: "Example",
        paste_btn: "Paste",
        download_btn: "Download",
        fullscreen_btn: "Fullscreen",
        close_btn: "Close",
        fullscreen_title: "Markdown Preview",
        feature1_title: "Real-time Preview",
        feature1_desc: "Everything you write appears instantly in the preview",
        feature2_title: "Drag & Drop",
        feature2_desc: "Drag and drop Markdown files directly",
        feature3_title: "Multi-language Support",
        feature3_desc: "Create and download content in different languages",
        download_options: "Download Options",
        file_format: "File Format:",
        file_language: "File Language:",
        confirm_download: "Download File",
        toast_success: "Operation successful!",
        toast_file_loaded: "File loaded successfully!",
        toast_file_error: "Please only upload Markdown or text files.",
        toast_empty_content: "No content found to download!",
        toast_file_downloaded: "File downloaded!",
        toast_content_cleared: "Content cleared!",
        toast_example_loaded: "Example content loaded!",
        toast_paste_success: "Content from clipboard pasted!",
        toast_paste_error: "Clipboard access permission required!"
    },
    de: {
        header_desc: "Schreiben Sie Markdown links, sehen Sie sofortige Vorschau rechts. Sie können auch Dateien per Drag & Drop hochladen.",
        editor_title: "Markdown Eingabe",
        editor_placeholder: "Schreiben Sie Ihr Markdown hier... Oder ziehen Sie eine Datei in diesen Bereich.",
        drop_message: "Ziehen Sie Dateien hierher",
        preview_title: "Vorschau",
        clear_btn: "Löschen",
        example_btn: "Beispiel",
        paste_btn: "Einfügen",
        download_btn: "Herunterladen",
        fullscreen_btn: "Vollbild",
        close_btn: "Schließen",
        fullscreen_title: "Markdown Vorschau",
        feature1_title: "Echtzeit-Vorschau",
        feature1_desc: "Alles, was Sie schreiben, erscheint sofort in der Vorschau",
        feature2_title: "Drag & Drop",
        feature2_desc: "Ziehen Sie Markdown-Dateien direkt per Drag & Drop",
        feature3_title: "Mehrsprachen-Unterstützung",
        feature3_desc: "Erstellen und laden Sie Inhalte in verschiedenen Sprachen herunter",
        download_options: "Download-Optionen",
        file_format: "Dateiformat:",
        file_language: "Dateisprache:",
        confirm_download: "Datei herunterladen",
        toast_success: "Vorgang erfolgreich!",
        toast_file_loaded: "Datei erfolgreich geladen!",
        toast_file_error: "Bitte laden Sie nur Markdown- oder Textdateien hoch.",
        toast_empty_content: "Kein Inhalt zum Herunterladen gefunden!",
        toast_file_downloaded: "Datei heruntergeladen!",
        toast_content_cleared: "Inhalt gelöscht!",
        toast_example_loaded: "Beispielinhalt geladen!",
        toast_paste_success: "Inhalt aus Zwischenablage eingefügt!",
        toast_paste_error: "Zugriffsberechtigung für Zwischenablage erforderlich!"
    },
    fr: {
        header_desc: "Écrivez Markdown à gauche, voyez l'aperçu instantané à droite. Vous pouvez également télécharger des fichiers par glisser-déposer.",
        editor_title: "Saisie Markdown",
        editor_placeholder: "Écrivez votre Markdown ici... Ou glissez-déposez un fichier dans cette zone.",
        drop_message: "Glissez-déposez des fichiers ici",
        preview_title: "Aperçu",
        clear_btn: "Effacer",
        example_btn: "Exemple",
        paste_btn: "Coller",
        download_btn: "Télécharger",
        fullscreen_btn: "Plein écran",
        close_btn: "Fermer",
        fullscreen_title: "Aperçu Markdown",
        feature1_title: "Aperçu en temps réel",
        feature1_desc: "Tout ce que vous écrivez apparaît instantanément dans l'aperçu",
        feature2_title: "Glisser-Déposer",
        feature2_desc: "Glissez-déposez des fichiers Markdown directement",
        feature3_title: "Support multilingue",
        feature3_desc: "Créez et téléchargez du contenu dans différentes langues",
        download_options: "Options de téléchargement",
        file_format: "Format de fichier:",
        file_language: "Langue du fichier:",
        confirm_download: "Télécharger le fichier",
        toast_success: "Opération réussie!",
        toast_file_loaded: "Fichier chargé avec succès!",
        toast_file_error: "Veuillez uniquement télécharger des fichiers Markdown ou texte.",
        toast_empty_content: "Aucun contenu à télécharger!",
        toast_file_downloaded: "Fichier téléchargé!",
        toast_content_cleared: "Contenu effacé!",
        toast_example_loaded: "Contenu exemple chargé!",
        toast_paste_success: "Contenu du presse-papiers collé!",
        toast_paste_error: "Autorisation d'accès au presse-papiers requise!"
    },
    es: {
        header_desc: "Escribe Markdown a la izquierda, ve la vista previa instantánea a la derecha. También puedes subir archivos arrastrando y soltando.",
        editor_title: "Entrada Markdown",
        editor_placeholder: "Escribe tu Markdown aquí... O arrastra y suelta un archivo en esta área.",
        drop_message: "Arrastra y suelta archivos aquí",
        preview_title: "Vista previa",
        clear_btn: "Borrar",
        example_btn: "Ejemplo",
        paste_btn: "Pegar",
        download_btn: "Descargar",
        fullscreen_btn: "Pantalla completa",
        close_btn: "Cerrar",
        fullscreen_title: "Vista previa de Markdown",
        feature1_title: "Vista previa en tiempo real",
        feature1_desc: "Todo lo que escribas aparece instantáneamente en la vista previa",
        feature2_title: "Arrastrar y Soltar",
        feature2_desc: "Arrastra y suelta archivos Markdown directamente",
        feature3_title: "Soporte multilingüe",
        feature3_desc: "Crea y descarga contenido en diferentes idiomas",
        download_options: "Opciones de descarga",
        file_format: "Formato de archivo:",
        file_language: "Idioma del archivo:",
        confirm_download: "Descargar archivo",
        toast_success: "¡Operación exitosa!",
        toast_file_loaded: "¡Archivo cargado con éxito!",
        toast_file_error: "Por favor, suba solo archivos Markdown o de texto.",
        toast_empty_content: "¡No se encontró contenido para descargar!",
        toast_file_downloaded: "¡Archivo descargado!",
        toast_content_cleared: "¡Contenido borrado!",
        toast_example_loaded: "¡Contenido de ejemplo cargado!",
        toast_paste_success: "¡Contenido del portapapeles pegado!",
        toast_paste_error: "¡Se requiere permiso de acceso al portapapeles!"
    }
};

// Mevcut dil
let currentLanguage = 'tr';

// Marked.js ayarları
marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function(code, lang) {
        // Kod vurgulama için basit bir yaklaşım
        return code;
    }
});

// Örnek Markdown içeriği - farklı dillerde
const exampleContent = {
    tr: `# Markdown Önizleme Uygulamasına Hoş Geldiniz!

## Bu bir alt başlık
### Ve daha da küçük bir başlık

Markdown ile metinleri biçimlendirebilirsiniz: **kalın**, _italik_, ~~üstü çizili~~.

Kod yazabilirsiniz: \`inline code\` ya da:

\`\`\`javascript
// Kod bloğu
function merhabaDunya() {
  console.log("Merhaba Dünya!");
}
\`\`\`

Listeler oluşturabilirsiniz:

- Liste öğesi 1
- Liste öğesi 2
  - Girintili öğe

Numaralı liste:

1. İlk öğe
2. İkinci öğe

Bağlantılar: [Markdown Kılavuzu](https://www.markdownguide.org)

Alıntılar:
> Bu bir alıntıdır.
> Çok ilham verici!

Tablo:

| Sütun 1 | Sütun 2 | Sütun 3 |
|---------|---------|---------|
| Hücre 1 | Hücre 2 | Hücre 3 |
| Hücre 4 | Hücre 5 | Hücre 6 |

Resim:
![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

Yukarıdaki içeriği düzenleyerek veya silerek kendi Markdown içeriğinizi oluşturabilirsiniz. Sağ tarafta gerçek zamanlı önizlemesini göreceksiniz.

**Dosya sürükle bırak özelliği:** Markdown dosyalarını doğrudan editör alanına sürükleyip bırakabilirsiniz.

**İndirme özelliği:** Oluşturduğunuz Markdown'ı dosya olarak indirebilirsiniz.

**Çoklu dil desteği:** Farklı dillerde içerik oluşturabilir ve indirebilirsiniz.
`,
    en: `# Welcome to the Markdown Preview App!

## This is a subheading
### And an even smaller heading

With Markdown you can format text: **bold**, _italic_, ~~strikethrough~~.

You can write code: \`inline code\` or:

\`\`\`javascript
// Code block
function helloWorld() {
  console.log("Hello World!");
}
\`\`\`

You can create lists:

- List item 1
- List item 2
  - Indented item

Numbered list:

1. First item
2. Second item

Links: [Markdown Guide](https://www.markdownguide.org)

Quotes:
> This is a quote.
> Very inspiring!

Table:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

Image:
![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

You can create your own Markdown content by editing or deleting the content above. You will see the real-time preview on the right.

**Drag and drop feature:** You can drag and drop Markdown files directly into the editor area.

**Download feature:** You can download your Markdown as a file.

**Multi-language support:** You can create and download content in different languages.
`,
    de: `# Willkommen bei der Markdown-Vorschau-App!

## Dies ist eine Unterüberschrift
### Und eine noch kleinere Überschrift

Mit Markdown können Sie Text formatieren: **fett**, _kursiv_, ~~durchgestrichen~~.

Sie können Code schreiben: \`inline code\` oder:

\`\`\`javascript
// Codeblock
function halloWelt() {
  console.log("Hallo Welt!");
}
\`\`\`

Sie können Listen erstellen:

- Listenelement 1
- Listenelement 2
  - Eingerücktes Element

Nummerierte Liste:

1. Erstes Element
2. Zweites Element

Links: [Markdown Guide](https://www.markdownguide.org)

Zitate:
> Dies ist ein Zitat.
> Sehr inspirierend!

Tabelle:

| Spalte 1 | Spalte 2 | Spalte 3 |
|----------|----------|----------|
| Zelle 1  | Zelle 2  | Zelle 3  |
| Zelle 4  | Zelle 5  | Zelle 6  |

Bild:
![Markdown Logo](https://markdown-here.com/img/icon256.png)

---

Sie können Ihren eigenen Markdown-Inhalt erstellen, indem Sie den obigen Inhalt bearbeiten oder löschen. Sie sehen die Echtzeit-Vorschau auf der rechten Seite.

**Drag-and-Drop-Funktion:** Sie können Markdown-Dateien direkt in den Editorbereich ziehen und ablegen.

**Download-Funktion:** Sie können Ihren Markdown als Datei herunterladen.

**Mehrsprachen-Unterstützung:** Sie können Inhalte in verschiedenen Sprachen erstellen und herunterladen.
`,
    fr: `# Bienvenue dans l'application d'aperçu Markdown !

## Ceci est un sous-titre
### Et un titre encore plus petit

Avec Markdown, vous pouvez formater le texte : **gras**, _italique_, ~~barré~~.

Vous pouvez écrire du code : \`code en ligne\` ou :

\`\`\`javascript
// Bloc de code
function bonjourMonde() {
  console.log("Bonjour le monde !");
}
\`\`\`

Vous pouvez créer des listes :

- Élément de liste 1
- Élément de liste 2
  - Élément en retrait

Liste numérotée :

1. Premier élément
2. Deuxième élément

Liens : [Guide Markdown](https://www.markdownguide.org)

Citations :
> Ceci est une citation.
> Très inspirant !

Tableau :

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Cellule 1 | Cellule 2 | Cellule 3 |
| Cellule 4 | Cellule 5 | Cellule 6 |

Image :
![Logo Markdown](https://markdown-here.com/img/icon256.png)

---

Vous pouvez créer votre propre contenu Markdown en modifiant ou en supprimant le content ci-dessus. Vous verrez l'aperçu en temps réel à droite.

**Fonction glisser-déposer :** Vous pouvez glisser-déposer des fichiers Markdown directement dans la zone de l'éditeur.

**Fonction de téléchargement :** Vous pouvez télécharger votre Markdown sous forme de fichier.

**Prise en charge multilingue :** Vous pouvez créer et télécharger du contenu dans différentes langues.
`,
    es: `# ¡Bienvenido a la aplicación de vista previa de Markdown!

## Este es un subtítulo
### Y un título aún más pequeño

Con Markdown puedes formatear texto: **negrita**, _cursiva_, ~~tachado~~.

Puedes escribir código: \`código en línea\` o:

\`\`\`javascript
// Bloque de código
function holaMundo() {
  console.log("¡Hola Mundo!");
}
\`\`\`

Puedes crear listas:

- Elemento de lista 1
- Elemento de lista 2
  - Elemento sangrado

Lista numerada:

1. Primer elemento
2. Segundo elemento

Enlaces: [Guía de Markdown](https://www.markdownguide.org)

Citas:
> Esta es una cita.
> ¡Muy inspirador!

Tabla:

| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Celda 1   | Celda 2   | Celda 3   |
| Celda 4   | Celda 5   | Celda 6   |

Imagen:
![Logo de Markdown](https://markdown-here.com/img/icon256.png)

---

Puedes crear tu propio contenido Markdown editando o eliminando el contenido anterior. Verás la vista previa en tiempo real a la derecha.

**Función de arrastrar y soltar:** Puedes arrastrar y soltar archivos Markdown directamente en el área del editor.

**Función de descarga:** Puedes descargar tu Markdown como archivo.

**Soporte multilingüe:** Puedes crear y descargar contenido en diferentes idiomas.
`
};

// Editör değiştiğinde önizlemeyi güncelle
function updatePreview() {
    const markdownText = editor.value;
    preview.innerHTML = marked.parse(markdownText);
    
    // Önizleme alanına animasyon ekle
    preview.style.opacity = '0.7';
    setTimeout(() => {
        preview.style.opacity = '1';
    }, 300);
}

// Fullscreen önizleme
function showFullscreenPreview() {
    fullscreenContent.innerHTML = preview.innerHTML;
    fullscreenPreview.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideFullscreenPreview() {
    fullscreenPreview.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Dosya yükleme işlevi
function loadFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        editor.value = e.target.result;
        updatePreview();
        showToast(translations[currentLanguage].toast_file_loaded);
    };
    
    reader.readAsText(file);
}

// Toast mesajı göster
function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Dosya indirme işlevi
function downloadMarkdown() {
    const markdownText = editor.value;
    
    if (!markdownText.trim()) {
        showToast(translations[currentLanguage].toast_empty_content);
        return;
    }
    
    const format = formatSelect.value;
    const lang = fileLangSelect.value;
    
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Dosya adını oluştur (dil ve uzantıya göre)
    const fileName = `markdown-${lang}.${format}`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Temizlik
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showToast(translations[currentLanguage].toast_file_downloaded);
}

// Sürükle bırak olayları
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add('drag-over');
}

function unhighlight() {
    dropArea.classList.remove('drag-over');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length) {
        const file = files[0];
        
        // Sadece .md ve text dosyalarını kabul et
        if (file.type === 'text/markdown' || file.type === 'text/plain' || file.name.endsWith('.md')) {
            loadFile(file);
        } else {
            showToast(translations[currentLanguage].toast_file_error);
        }
    }
}

// Pano içeriğini yapıştır
async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        editor.value += text;
        updatePreview();
        showToast(translations[currentLanguage].toast_paste_success);
    } catch (err) {
        showToast(translations[currentLanguage].toast_paste_error);
        console.error('Panoya erişilemedi:', err);
        
        // Fallback: Kullanıcıya manuel yapıştırma için odaklan
        editor.focus();
        document.execCommand('paste');
        updatePreview();
    }
}

// Dil değiştirme işlevi
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Tüm çevirilebilir öğeleri güncelle
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Buton metinlerini güncelle
    document.querySelectorAll('.btn-text').forEach(element => {
        const button = element.closest('button');
        if (button && button.getAttribute('data-translate')) {
            const key = button.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Dil seçiciyi güncelle
    languageSelect.value = lang;
    
    // Örnek içeriği güncelle
    if (editor.value === exampleContent[currentLanguage] || 
        Object.values(exampleContent).includes(editor.value)) {
        editor.value = exampleContent[lang];
        updatePreview();
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Varsayılan içeriği yükle
    editor.value = exampleContent[currentLanguage];
    updatePreview();
    
    // Input olayı dinleyicisi - debounce ile
    let timeout;
    editor.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(updatePreview, 300);
    });
    
    // Temizle butonu
    clearBtn.addEventListener('click', () => {
        if (confirm(currentLanguage === 'tr' ? 
            'Editör içeriği temizlenecek. Emin misiniz?' : 
            'Editor content will be cleared. Are you sure?')) {
            editor.value = '';
            updatePreview();
            showToast(translations[currentLanguage].toast_content_cleared);
        }
    });
    
    // Örnek içerik butonu
    exampleBtn.addEventListener('click', () => {
        editor.value = exampleContent[currentLanguage];
        updatePreview();
        showToast(translations[currentLanguage].toast_example_loaded);
    });
    
    // Yapıştır butonu
    pasteBtn.addEventListener('click', pasteFromClipboard);
    
    // İndirme butonu
    confirmDownload.addEventListener('click', downloadMarkdown);
    
    // Tam ekran butonu
    fullscreenBtn.addEventListener('click', showFullscreenPreview);
    
    // Tam ekrandan çıkış butonu
    closeFullscreen.addEventListener('click', hideFullscreenPreview);
    
    // Dil değiştirme olayı
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    
    // ESC tuşu ile tam ekrandan çıkış
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenPreview.classList.contains('active')) {
            hideFullscreenPreview();
        }
    });
    
    // Enter tuşuna basıldığında otomatik tamamlama
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = editor.selectionStart;
            const end = editor.selectionEnd;
            
            editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
        }
    });
    
    // Sayfa yüklendiğinde animasyon
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Varsayılan dili ayarla (tarayıcı diline göre)
    const browserLang = navigator.language.substring(0, 2);
    if (translations[browserLang]) {
        changeLanguage(browserLang);
    }
});

// Pencere boyutu değiştiğinde önizleme alanını yeniden boyutlandır
window.addEventListener('resize', () => {
    // Yeniden boyutlandırma için herhangi bir işlem gerekmiyor,
    // CSS flex yapısı otomatik olarak hallediyor
});