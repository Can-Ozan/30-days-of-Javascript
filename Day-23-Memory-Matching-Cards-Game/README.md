# Memory Card Matching Game

A modern, responsive memory card matching game built with HTML, CSS, and JavaScript.

## Features

- 🎮 **Interactive Gameplay**: Flip cards to find matching pairs
- ⏱️ **Live Timer**: Track your completion time
- 🔢 **Move Counter**: Count how many moves you make
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations
- 🔄 **Restart Function**: Play again with randomized card positions
- 🏆 **Win Screen**: Celebration message with final stats

## How to Play

1. Click on any card to flip it over
2. Click on another card to find its match
3. If the two flipped cards match, they stay face up
4. If they don't match, they flip back over
5. Continue until all pairs are found
6. Try to complete the game in the fewest moves and shortest time!

## Game Rules

- The game consists of 8 pairs of cards (16 total)
- Cards are randomly shuffled at the start
- Each move counts when you flip two cards
- The timer starts when you flip your first card
- Complete the game by finding all matching pairs

## Technologies Used

- **HTML5**: Game structure and layout
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript**: Game logic, card matching, and interactive features

## Installation

1. Download or clone the repository
2. Ensure you have these three files in the same directory:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in your web browser

## File Structure

```
memory-game/
│
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
└── script.js           # JavaScript game logic
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Game Controls

- **Click/Tap**: Flip cards
- **Restart Button**: Start a new game
- **Play Again**: Restart after winning

## Customization

You can easily customize the game by:

- Changing the card symbols in the `symbols` array in `script.js`
- Modifying colors in the CSS gradient properties
- Adjusting the grid size by changing the CSS `grid-template-columns`
- Modifying animation timing in the CSS transitions

## Features in Detail

### Card Design
- Smooth flip animations using CSS transforms
- Color-coded states (default, flipped, matched)
- Visual feedback for user interactions

### Game Statistics
- Real-time move counter
- Live timer that starts on first move
- Final score display with moves and time

### Responsive Layout
- Adapts to different screen sizes
- Mobile-friendly touch interactions
- Flexible grid system

## Development

This project uses vanilla JavaScript with no external dependencies. The code is organized into clear functions for:

- Game initialization
- Card shuffling and creation
- Game logic and matching
- Timer management
- UI updates

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy playing the Memory Card Matching Game!** 🎯