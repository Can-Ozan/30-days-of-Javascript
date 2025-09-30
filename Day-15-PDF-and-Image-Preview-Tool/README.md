# PDF and Image Preview Tool

A modern web application that allows users to preview PDF and image files by either dragging and dropping them into the browser or selecting them through a file picker.

![Preview](https://img.shields.io/badge/Preview-Available-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Drag & Drop Interface**: Intuitive drag-and-drop area for easy file uploads
- **Multiple File Support**: Supports PDF, JPG, JPEG, PNG, and GIF files
- **PDF Preview**: Full PDF rendering with page navigation controls
- **Image Preview**: Direct image display with proper scaling
- **File Information**: Displays file name, size, and type
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Server Required**: Entirely client-side processing

## 🚀 Live Demo

You can try the application directly by opening the `index.html` file in your web browser or hosting it on a web server.

## 🛠️ Installation

1. **Clone or Download the Project**
   ```bash
   git clone Day-15-PDF-and-Image-Preview-Tool.git
   ```
   Or download the project files directly.

2. **File Structure**
   ```
   pdf-image-previewer/
   ├── index.html
   ├── style.css
   └── script.js
   ```

3. **Run the Application**
   - Open `index.html` in your web browser
   - Or serve it through a local web server

## 📖 Usage

### Uploading Files

1. **Drag and Drop**
   - Simply drag any supported file (PDF or image) and drop it into the designated area

2. **File Selection**
   - Click the "Dosya Seç" (File Select) button
   - Choose a file from your device's file system

### Preview Features

- **PDF Files**:
  - Use "Önceki" (Previous) and "Sonraki" (Next) buttons to navigate pages
  - Current page and total pages are displayed
  - High-quality rendering using PDF.js

- **Image Files**:
  - Automatic scaling to fit the preview area
  - Maintains aspect ratio
  - Supports common image formats

### File Information

The application displays:
- File name
- File size (formatted appropriately)
- File type/MIME type

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: File API and Drag-and-Drop API
- **CSS3**: Modern styling with flexbox and responsive design
- **Vanilla JavaScript**: Core functionality and event handling
- **PDF.js**: Mozilla's PDF rendering library for client-side PDF processing

### Browser Compatibility

- Chrome 76+
- Firefox 70+
- Safari 13+
- Edge 79+

### Key JavaScript APIs

- **Drag-and-Drop API**: Handles `dragover`, `dragleave`, and `drop` events
- **File API**: Uses `FileReader` to read file contents
- **Canvas API**: Renders PDF pages to canvas elements

## 🔧 Customization

### Supported File Types

You can modify the accepted file types by editing the `accept` attribute in the HTML:

```html
<input type="file" id="fileInput" accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp" hidden>
```

### Styling

The application uses CSS custom properties that can be easily modified:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --background-color: #f5f7fa;
}
```

### PDF Rendering Quality

Adjust the PDF rendering scale in the JavaScript:

```javascript
const scale = 1.5; // Increase for higher quality, decrease for better performance
```

## 📦 Dependencies

- **PDF.js v3.4.120**: Loaded from CDN for PDF rendering capabilities
  - Main library: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js`
  - Worker: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`

## 🐛 Troubleshooting

### Common Issues

1. **PDF not loading**
   - Check internet connection (PDF.js requires network for worker)
   - Ensure PDF file is not corrupted or password protected

2. **Drag and drop not working**
   - Verify browser supports HTML5 Drag and Drop API
   - Check browser security settings

3. **Large files not loading**
   - The application handles files in memory, very large files may cause performance issues

### Error Handling

- Unsupported file types show an alert message
- PDF loading errors are caught and displayed to the user
- File reading errors are handled gracefully

## 🌐 Deployment

### Local Development
Simply open `index.html` in a web browser.

### Web Server Deployment
Upload all files to your web server. The application works with any standard web server (Apache, Nginx, etc.).

### Static Site Hosting
Compatible with services like:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 Static Hosting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the browser compatibility requirements
3. Ensure all dependencies are loading properly

## 🎯 Learning Outcomes

This project demonstrates intermediate web development concepts:

- **Drag-and-Drop API**: Handling file drag and drop operations
- **HTML5 File API**: Reading and processing files client-side
- **External Library Integration**: Using PDF.js for complex PDF rendering
- **Asynchronous Operations**: Managing file reading and PDF processing with async/await
- **Canvas Manipulation**: Rendering PDF pages to canvas elements
- **Responsive UI Design**: Creating adaptable user interfaces

---

**Note**: This application processes files entirely in the browser. No files are uploaded to any server, ensuring your privacy and security.