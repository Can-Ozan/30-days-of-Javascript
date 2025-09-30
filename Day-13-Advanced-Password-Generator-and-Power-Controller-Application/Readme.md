# 🔐 Advanced Password Generator and Strength Checker

A user-friendly password management tool developed in Turkish. Create secure passwords and analyze the security level of your existing passwords.

![Project Preview](https://img.shields.io/badge/Status-Aktif-brightgreen) ![Version](https://img.shields.io/badge/Versiyon-1.0.0-blue) ![License](https://img.shields.io/badge/Lisans-MIT-lightgrey)

## ✨ Features

### 🔧 Password Generator
- **Customizable length**: 6-32 characters
- **Character options**:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*)
- **Advanced security**: Exclude similar characters (i, l, 1, L, o, 0, O)
- **One-click copy**: Copy the generated password to the clipboard

### 📊 Password Strength Checker
- **Real-time analysis**: Instant strength check while entering the password
- **Visual strength indicator**: 5-level color-coded meter
- **Detailed feedback**:
  - Length check
  - Character variety
  - Repeated character detection
  - Sequential character warning
- **Statistical analysis**:
  - Estimated cracking time
  - Number of possible combinations


  ### 🎨 User Interface
- **Modern design**: Clean and intuitive interface
- **Responsive design**: Mobile and desktop compatible
- **Turkish language support**: Localized user experience
- **Accessibility**: Keyboard-friendly controls

## 🚀 Installation

No installation is required to use the project. Just download the following files and open the `index.html` file in your browser.

### Requirements
- A modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled

### File Structure
```
password-generator/
│
├── index.html          # Main HTML file
├── style.css           # Style sheet
├── script.js           # JavaScript code
└── README.md           # This file
```

## 📖 Usage

### Password Creation
1. **Set the length**: Use the slider to select your desired password length (12 characters recommended)
2. **Select character types**: Check the uppercase/lowercase, number, and symbol options as needed
3. **Security options**: Enable the “Exclude Similar Characters” option to prevent confusion
4. **Generate password**: Click the “Generate Password” button
5. **Copy**: Copy the generated password to the clipboard using the “Copy” button

### Check Password Strength
1. **Enter your password**: Type the password you want to check into the “Enter your password...” field
2. **View strength level**: Track your password strength in real time
3. **Review recommendations**: Consider the security recommendations
4. **View statistics**: Analyze the estimated time to crack and the number of combinations


## 🔍 Technical Details

### Password Strength Calculation Algorithm
The project uses a comprehensive scoring system based on the following factors:

- **Length**: 8+ characters (1 point), 12+ characters (2 points)
- **Character diversity**: +1 point for each character type
- **Security breaches**: -1 point for repeated or sequential characters

### Strength Levels
- **Very Weak** (0-1 points): Red - Must be changed immediately
- **Weak** (2 points): Orange - Should be improved
- **Medium** (3 points): Yellow - Acceptable
- **Strong** (4 points): Light green - Good
- **Very Strong** (5+ points): Dark green - Excellent

### Security Assumptions
- It is assumed that an attacker can try 1 billion hashes per second
- A brute-force attack scenario is used as a basis
- Character set diversity is used in combination calculations

## 🛠️ Technologies

- **HTML5**: Structural foundation
- **CSS3**: Modern styling and animations
- **Vanilla JavaScript**: Functionality and dynamic content
- **Grid & Flexbox**: Responsive layout
- **CSS Gradients**: Visual richness

## 🌐 Browser Support

| Browser | Version | Status |
|----------|----------|-------|
| Chrome | 60+ | ✅ Fully supported |
| Firefox | 55+ | ✅ Fully supported |
| Safari | 12+ | ✅ Fully supported |
| Edge | 79+ | ✅ Fully supported |
| Internet Explorer | ❌ | Not supported |

## 🤝 Contributing

We welcome your contributions! Please follow these steps:

1. Fork
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit (`git commit -am ‘New feature added’`)
4. Push (`git push origin feature/new-feature`)
5. Create a Pull Request

### Development Recommendations
- Follow coding styles
- Maintain responsive design
- Comply with accessibility standards
- Maintain Turkish language support

## 📄 License

This project is licensed under the MIT License. For details, see the [LICENSE](LICENSE) file.

## ⚠️ Disclaimer

This tool has been developed for educational purposes. For real password security:
- Change your passwords regularly
- Use two-factor authentication
- Consider using password manager software
- Use unique passwords for sensitive accounts

## 📞 Contact

For questions or suggestions, you can create an [issue](https://github.com/Can-Ozan/Day-13-Advanced-Password-Generator-and-Power-Controller-Application/issues).

## 🙏 Thank You

Thank you for using this project. Your security is important!

---

**⚠️ Security Warning**: This tool is for educational purposes only. Follow the latest security recommendations for your critical accounts and consult professional security advisors if necessary.

**⭐ If you like the project, don't forget to give it a star!**
