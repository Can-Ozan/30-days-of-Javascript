# Theme Switcher (Light/Dark Mode) Project

This project is a modern and responsive web application that allows users to easily switch between light and dark modes.

![Theme Switcher Project](https://img.shields.io/badge/Status-Active-brightgreen)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 🌟 Features

- ✅ **Easy Theme Switching** - One-click toggle between light/dark modes
- ✅ **User Preference Memory** - Selected theme is saved in browser storage
- ✅ **System Theme Support** - Automatic theme based on user's system preference
- ✅ **Responsive Design** - Perfect appearance on all devices
- ✅ **Smooth Animations** - CSS transitions for seamless switching
- ✅ **Modern Interface** - Clean and user-friendly design

## 🚀 Quick Start

### Requirements

- A modern web browser
- Localhost server (recommended) or direct file opening

### Installation

1. Download the project files:
```bash
git clone https://github.com/Can-Ozan/Theme-Switching-Light-Dark-Mode.git
```

2. Place all files in the same folder:
```
project-folder/
│
├── index.html
├── style.css
└── script.js
```

3. Open the `index.html` file in your browser

### Alternative Installation

To run files directly:

1. Right-click on `index.html` file
2. Select "Open with" and choose your preferred browser

## 📁 File Structure

```
theme-switcher-project/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet (theme management with CSS variables)
├── script.js           # JavaScript file (theme logic and localStorage)
└── README.md           # Project documentation
```

## 🎨 Theme Features

### Light Mode (Default)
- Background: Light gray (#f5f5f5)
- Text: Dark gray (#333333)
- Primary color: Blue tones (#4a6fa5)

### Dark Mode
- Background: Dark gray (#121212)
- Text: Light gray (#f5f5f5)
- Primary color: Light blue tones (#6b8cbc)

## 🔧 Usage

### Basic Usage
1. When you open the page, the theme will load based on your system preference or previous selection
2. Click the theme switcher button in the top right corner to toggle between themes
3. Your selection will be automatically saved

### Developer Usage

#### Customizing CSS Variables
```css
:root {
    --primary-color: #your-color;
    --background-color: #your-bg-color;
    /* Other variables... */
}

[data-theme="dark"] {
    --primary-color: #your-dark-color;
    --background-color: #your-dark-bg-color;
    /* Other variables... */
}
```

#### Theme Control with JavaScript
```javascript
// Enable dark mode
enableDarkMode();

// Enable light mode
enableLightMode();

// Check system theme
checkSystemPreference();
```

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ 60+ |
| Firefox | ✅ 55+ |
| Safari | ✅ 12.1+ |
| Edge | ✅ 79+ |

## 📱 Responsive Features

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 767px and below

## 🔄 Changelog

### v1.0.0 (2023-12-01)
- Initial release
- Light/Dark theme switching
- localStorage support
- System theme detection

## 🛠 Development

### Local Development
1. Edit project files
2. Test your changes
3. Use browser developer tools for responsive testing

### Suggested Improvements
- [ ] Additional color themes (blue, green, purple, etc.)
- [ ] Theme customization panel
- [ ] Configurable animation durations
- [ ] High contrast mode support

## 🤝 Contributing

We welcome your contributions! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Name Surname**
- GitHub: [@username](https://github.com/Can-Ozan)
- Email: yusufcanozan9@gmail.com

---



## ❓ Frequently Asked Questions

### Theme switcher not working?
- Make sure JavaScript is enabled in your browser
- Check that localStorage is enabled

### My theme preference isn't saving?
- Ensure your browser isn't blocking cookies and site data
- localStorage may not work in private browsing mode

### Layout broken on mobile devices?
- Verify the viewport meta tag is properly set
- Check that CSS media queries are working correctly

## 📞 Support

For questions or suggestions:
- Use GitHub Issues
- Send email: support@example.com

---

**⭐ If you like this project, don't forget to give it a star!**