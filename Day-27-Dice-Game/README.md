# Dice Game 🎲

A modern, interactive 2-player dice game built with HTML, CSS, and JavaScript featuring 3D dice animations and smooth gameplay.

## Features ✨

- **3D Dice Animation**: Realistic dice rolling with 3D transformations
- **Two Player Mode**: Alternate turns between Player 1 and Player 2
- **Score Tracking**: Automatic score calculation and display
- **Win Condition**: First player to reach 30 points wins
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient background with glass-morphism effects
- **Smooth Animations**: CSS transitions and keyframe animations

## How to Play 🎯

1. **Start the Game**: Open `index.html` in your web browser
2. **Roll Dice**: Click the "Roll Dice" button to roll both dice
3. **Score Calculation**: The sum of both dice is added to the current player's score
4. **Player Turn**: Players alternate turns after each roll
5. **Win Condition**: First player to reach or exceed 30 points wins the game
6. **Reset**: Use the "Reset Game" button to start a new game

## Game Rules 📋

- Each player rolls two dice on their turn
- The sum of both dice is added to the player's total score
- Players take turns automatically after each roll
- The first player to reach 30 points wins the game
- The active player is highlighted during their turn

## File Structure 📁

```
dice-game/
│
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript game logic
└── README.md           # Project documentation
```

## Installation & Setup 🚀

### Method 1: Simple Setup
1. Download all three files (`index.html`, `style.css`, `script.js`)
2. Place them in the same folder
3. Open `index.html` in your web browser

### Method 2: Using GitHub
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project folder
cd dice-game

# Open the game in your browser
open index.html
```

## Technologies Used 💻

- **HTML5**: Semantic structure and game layout
- **CSS3**: 
  - 3D Transformations for dice
  - Flexbox for responsive layout
  - CSS Animations and transitions
  - Gradient backgrounds and glass-morphism effects
- **JavaScript**:
  - Game state management
  - DOM manipulation
  - Event handling
  - Random number generation for dice rolls

## Browser Compatibility 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization Options 🎨

You can easily customize the game by modifying:

- **Winning Score**: Change the win condition in `script.js`
- **Colors**: Modify CSS variables in `style.css`
- **Dice Styles**: Adjust dice appearance and animations
- **Game Rules**: Modify scoring logic in the JavaScript

### Example: Changing Winning Score
In `script.js`, change:
```javascript
// From:
if (scores[currentPlayer] >= 30) {

// To:
if (scores[currentPlayer] >= 50) {
```

## Contributing 🤝

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements 🔮

Potential features for future versions:
- Sound effects for dice rolling
- Player name customization
- Different game modes
- Score history tracking
- Multiplayer online functionality
- Tournament mode

## Support 🆘

If you encounter any issues:
1. Check that all files are in the same directory
2. Ensure JavaScript is enabled in your browser
3. Try refreshing the page
4. Clear browser cache if needed

---

Enjoy the game! 🎲 May the odds be ever in your favor!