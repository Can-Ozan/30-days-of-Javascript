# Advanced URL Shortener

A modern, feature-rich URL shortener web application built with HTML, CSS, and JavaScript.

![URL Shortener Preview](https://via.placeholder.com/800x400/6a11cb/ffffff?text=Advanced+URL+Shortener)

## 🌟 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Aliases**: Create personalized short URLs with custom slugs
- **Expiration Dates**: Set expiration times for shortened links (1 day, 1 week, 1 month, 1 year, or never)
- **One-Click Copy**: Easily copy shortened URLs to clipboard
- **QR Code Generation**: Generate QR codes for shortened URLs with download option

### Advanced Features
- **Click Analytics**: Track click counts for each shortened URL
- **Link History**: View and manage your previously created short links
- **Local Storage**: All data is stored locally in your browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Quick Start

### Method 1: Direct File Opening
1. Download all project files
2. Open `index.html` in your web browser
3. Start shortening URLs immediately!

### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
url-shortener/
│
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ How to Use

### Basic URL Shortening
1. Enter your long URL in the input field
2. Click the "Shorten" button
3. Copy your shortened URL using the copy button

### Advanced Options
- **Custom Alias**: Add a custom slug for your URL (letters, numbers, and hyphens only)
- **Expiration Date**: Choose when your shortened link should expire
- **QR Code**: Generate and download QR codes for easy sharing

### Managing Links
- View your link history in the "Your Link History" section
- Track click counts for each shortened URL
- All data is automatically saved in your browser's local storage

## 💻 Technology Stack

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Flexbox, Grid, gradients, and animations
- **JavaScript (ES6+)**: Modern JavaScript with local storage API
- **QRCode.js**: Client-side QR code generation
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Poppins font family

## 🔧 Customization

### Changing the Base URL
In `script.js`, modify the `generateShortUrl` function:

```javascript
function generateShortUrl(customAlias) {
    const baseUrl = 'https://yourdomain.com/'; // Change this
    // ... rest of the function
}
```

### Styling Modifications
The app uses CSS custom properties for easy theming. Key colors in `style.css`:

```css
:root {
    --primary-color: #6a11cb;
    --secondary-color: #2575fc;
    --success-color: #28a745;
    --info-color: #17a2b8;
}
```

### Adding New Expiration Options
In `index.html`, add new options to the expiration select:

```html
<option value="custom_days">Custom Label</option>
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 767px and below

## 🔒 Privacy & Data

- All data is stored locally in your browser
- No external API calls or server communication
- Complete privacy - your URLs never leave your device
- Data persists until you clear browser storage

## 🚨 Limitations

- This is a client-side only application
- Shortened URLs only work within the same browser
- No actual URL redirection (demonstration purposes only)
- For production use, backend integration is required

## 🛠️ Production Deployment

For a production environment, you'll need to:

1. **Backend API**: Implement URL shortening logic
2. **Database**: Store URLs and analytics
3. **Redirection Service**: Handle short URL redirections
4. **Domain**: Use a custom domain for short URLs

### Example Backend Integration
```javascript
// Pseudo-code for backend integration
async function shortenUrl(originalUrl, customAlias, expiration) {
    const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, customAlias, expiration })
    });
    return await response.json();
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**QR Code not generating:**
- Check internet connection (QRCode.js loads from CDN)
- Ensure the URL is valid

**Links not saving:**
- Check if local storage is enabled in your browser
- Try in incognito/private mode

**Copy to clipboard not working:**
- Ensure you're using HTTPS or localhost
- Check browser permissions

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Ensure all files are in the same directory
3. Verify your browser supports ES6+ features
4. Try refreshing the page and clearing browser cache

## 🔄 Future Enhancements

- [ ] Password protection for shortened links
- [ ] Link analytics with geographic data
- [ ] Bulk URL shortening
- [ ] Social media sharing integration
- [ ] Link preview customization
- [ ] API for developers
- [ ] User accounts and cloud synchronization

---

**Note**: This is a frontend demonstration. For a fully functional URL shortener, backend integration is required to handle actual URL redirection and persistent storage across devices.