# Markdown Preview Application

![Markdown Previewer](https://img.shields.io/badge/Markdown-Önizleyici-blue)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Multi-Language](https://img.shields.io/badge/Çoklu%20Dil-5%20dil-brightgreen)
![License](https://img.shields.io/badge/Lisans-MIT-green)

Turkish | [English](README_EN.md) | [Deutsch](README_DE.md) | [Français](README_FR.md) | [Español](README_ES.md)

A modern, user-friendly, and multilingual Markdown editor and previewer application. It offers real-time preview, drag-and-drop file support, multilingual support, and many more features.


## ✨ Features

- **🔁 Real-Time Preview**: Your Markdown is instantly converted to HTML
- **🌐 Multi-Language Support**: 5 different languages (Turkish, English, German, French, Spanish)
- **📁 File Drag & Drop**: Drag and drop Markdown files directly into the editor
- **💾 Multiple Download Options**: Download in different languages and formats (.md, .txt)
- **📱 Responsive Design**: Works perfectly on mobile devices
- **🖥️ Full Screen Mode**: View the preview in full screen
- **🎨 Modern Interface**: User-friendly and aesthetically pleasing design
- **⚡ High Performance**: Fast conversion with the marked.js library
- **📋 Paste from Clipboard**: Easy content pasting feature


## 🚀 Quick Start

### Prerequisites

You need the following software to run this project:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading libraries from the CDN)

### Setup

1. Clone or download the repository:

```bash
git clone https://github.com/Can-Ozan/30-days-of-Javascript/Day-8-Markdown-Preview-Application.git

cd 30-days-of-Javascript/Day-8-Markdown-Preview-Application
```

2. Host the files on a web server or open them directly:

```bash
# Run with a local server (Python)
python -m http.server 8000

# Or with Node.js
npx http-server

# Or open the file directly
open index.html
```

3. Go to `http://localhost:8000` (or the relevant port) in your browser.

### Running with Docker

You can also run the project with Docker:

```bash
# Build the Docker image
docker build -t markdown-preview .

# Run the container
docker run -p 8080:80 markdown-preview
```

Dockerfile:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## 🛠️ Technologies

- **HTML5**: Structural elements and semantic markup
- **CSS3**: Modern styling, Flexbox/Grid, animations
- **JavaScript (ES6+)**: Dynamic functionality and interaction
- **marked.js**: Markdown to HTML conversion library
- **Font Awesome**: Icon set

## 📦 Dependencies

The project uses the following external resources:

```html
<!-- Libraries loaded via CDN -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## 🎯 Usage

### Basic Usage

1. Write your Markdown text in the editor on the left
2. View the automatically generated HTML preview on the right
3. Use the language selector in the top right to change the language

### File Operations

- **File Upload**: Drag and drop `.md` files directly into the editor area
- **Download**: Click the “Download” button to download in different languages and formats
- **Paste from Clipboard**: Add content from the clipboard to the editor using the “Paste” button

### Keyboard Shortcuts

- `Tab`: Add indentation
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Ctrl/Cmd + S`: Open the download dialog (varies by browser)

## 🌐 Multi-Language Support

The application supports the following languages:

| Language | Code | Status |
|------|-----|-------|
| Turkish | `tr` | ✅ Full support |
| English | `en` | ✅ Full support |
| German | `de` | ✅ Full support |
| French | `fr` | ✅ Full support |
| Spanish | `es` | ✅ Full support |

## 📁 Project Structure

```
markdown-onizleme/
│
├── index.html          # Main HTML file
├── style.css           # Style sheet
├── script.js           # JavaScript file
├── README.md           # This file (Turkish)
├── README_EN.md        # English documentation
├── README_DE.md        # German documentation
├── README_FR.md        # French documentation
├── README_ES.md        # Spanish documentation
├── LICENSE             # License file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment configuration
```

## 🔧 Development

### Setting Up a Local Development Environment

1. Clone the repository:
```bash
git clone https://github.com/Can-Ozan/30-days-of-Javascript/Day-8-Markdown-Preview-Application.git

```

2. Start the development server:
```bash
# Live Server (VSCode extension) is recommended
# or
npx live-server
```

### Adding a New Language

1. Add the new language to the `translations` object in the `script.js` file
2. Add sample content for the new language to the `exampleContent` object
3. Add a new option for the language selector in HTML
4. Create a README file for the new language

Example language addition:
```javascript
// inside script.js
const translations = {
    // ... existing languages
    it: { // Italian
        header_desc: “Scrivi Markdown a sinistra, vedi l'anteprima istantanea a destra.”,
        // ... other translations
    }
};

const exampleContent = {
    // ... existing languages
    it: `# Welcome to the Markdown Preview app!...`
};
```

## 🚀 Deployment

### Deployment with GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Select the `gh-pages` branch or the `/docs` folder in the `main` branch

Alternatively:
```bash
# With the gh-pages package
npm install --save-dev gh-pages
npm run deploy
```

### Deployment with Netlify

1. Push files to GitHub
2. Create a new site on Netlify and connect the GitHub repository
3. Configure the build settings:
   - Build command: (leave blank)
   - Publish directory: `.`

### Deployment with Vercel

1. Connect Vercel to your GitHub account
2. Select the relevant repository
3. Deploy with the default settings

## 🤝 Contributing

If you want to contribute:

1. Fork this repository
2. Create a new feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am ‘New feature added: XYZ’)
4. Push to your branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Contribution Guidelines

- Follow the code style guidelines
- Add tests for new features
- Update the documentation
- Use meaningful commit messages

## 📝 License

This project is licensed under the MIT License. For more information, see the `LICENSE` file.

## 🐛 Bug Reports

If you find a bug, please report it via the [issue tracker](https://github.com/Can-Ozan/30-days-of-Javascript/Day-8-Markdown-Preview-Application/issues). If possible:

1. Explain how to reproduce the bug
2. Describe the expected and actual behavior
3. Include a screenshot or code example
4. Share your browser and operating system information

## 💡 Known Issues

- Internet Explorer is not supported
- Very large files (>5MB) may cause performance issues
- Some browsers may require user permission to access the clipboard

## 🔮 Future Updates

- [ ] Markdown syntax highlighting
- [ ] Themes and dark mode support
- [ ] Auto-save with local storage
- [ ] Export options (PDF, HTML)
- [ ] Plugin system
- [ ] Cloud synchronization
- [ ] User account integration

## 📞 Contact

For questions about the project:

- **Email**: yusufcanozan9@gmail.com
- **GitHub Issues**: [Issue Tracker](https://github.com/kullanici-adi/30-days-of-Javascript/Day-8-Markdown-Preview-Application/issues)

## 🙏 Thank you

- The [marked.js](https://github.com/markedjs/marked) team for the Markdown parser
- The [Font Awesome](https://fontawesome.com/) team for the icons
- All contributors

---

**Note**: This project was developed for educational purposes and may require additional features for professional use.

---
