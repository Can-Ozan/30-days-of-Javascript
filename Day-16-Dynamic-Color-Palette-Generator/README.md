# Dynamic Color Palette Generator

A web application that allows users to select a base color and automatically generates harmonious color schemes based on color theory principles.

## Features

- **Color Selection**: Choose a base color using a color picker or by entering a HEX code
- **Multiple Color Schemes**: Generate 5 different color harmony schemes:
  - Monochromatic (variations of a single hue)
  - Complementary (opposite colors)
  - Analogous (adjacent colors)
  - Triadic (three evenly spaced colors)
  - Tetradic (four evenly spaced colors)
- **Visual Color Display**: Large color swatches with HEX codes
- **Copy to Clipboard**: Click any color swatch to copy its HEX code
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant palette regeneration when color or scheme changes

## How to Use

1. **Select Base Color**:
   - Use the color picker or enter a valid HEX code
   - The input fields are synchronized in real-time

2. **Choose Color Scheme**:
   - Click on any of the five scheme buttons
   - The active scheme will be highlighted

3. **Explore Palette**:
   - View the generated color palette
   - Each color is displayed as a large swatch with its HEX code below

4. **Copy Colors**:
   - Click on any color swatch to copy its HEX code to clipboard
   - A toast notification confirms the copy action

## Color Theory Implemented

The application uses HSL (Hue, Saturation, Lightness) color space for calculations:

- **Monochromatic**: Variations in lightness of the base hue
- **Complementary**: 180° hue rotation from base color
- **Analogous**: ±30° hue rotation from base color
- **Triadic**: 120° and 240° hue rotations from base color
- **Tetradic**: 90°, 180°, and 270° hue rotations from base color

## Technical Implementation

### Color Conversion Functions
- HEX to RGB conversion
- RGB to HSL conversion
- HSL to RGB conversion
- RGB to HEX conversion

### Algorithmic Design
- Mathematical hue rotation for different color relationships
- Lightness adjustments for creating variations
- Input validation for HEX codes

### User Experience
- Event listeners for real-time updates
- Visual feedback for user interactions
- Responsive grid layout for color display

## File Structure

```
color-palette-generator/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Color logic and interactivity
└── README.md           # Project documentation
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Additional color schemes (split-complementary, square)
- RGB and HSL color value display
- Color contrast checking
- Palette export functionality
- Save favorite palettes
- Color blindness simulation

## Development Concepts Practiced

- Color space calculations (RGB, HEX, HSL)
- Mathematical color manipulation
- Event handling and user interactions
- DOM manipulation and dynamic content
- Responsive web design
- Algorithm implementation based on color theory

## Getting Started

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Start exploring color harmonies!

No build process or dependencies required - it's pure HTML, CSS, and JavaScript.

## License

This project is open source and available under the [MIT License](LICENSE).