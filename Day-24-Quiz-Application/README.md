# Quiz Application (Question-Answer Game)

A responsive, interactive quiz application built with HTML, CSS, and JavaScript that tests your knowledge across various topics.

## Features

- **Multiple Question Types**: 10 diverse questions covering different subjects
- **Timer Functionality**: 15-second countdown for each question
- **Score Tracking**: Real-time score display during the quiz
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Answer Review**: Detailed review of all answers after completing the quiz
- **Performance Feedback**: Personalized messages based on your score

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **JavaScript**: Interactive functionality and game logic
- **Responsive Design**: Mobile-first approach

## Project Structure

```
quiz-app/
│
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── script.js           # Quiz logic and functionality
└── README.md           # Project documentation
```

## How to Use

1. **Start Screen**
   - Read the instructions
   - Click "Start Quiz" to begin

2. **Quiz Screen**
   - Read each question carefully
   - Select one of the four options
   - Monitor your time (15 seconds per question)
   - Track your progress with the question counter
   - Click "Next Question" to proceed

3. **Results Screen**
   - View your final score
   - Read personalized feedback
   - Choose to play again or review answers

4. **Review Screen**
   - Examine all questions and your answers
   - See correct answers for questions you missed
   - Return to results when finished

## Installation

1. Clone or download the project files
2. Ensure all three files (`index.html`, `style.css`, `script.js`) are in the same directory
3. Open `index.html` in your web browser
4. No additional dependencies or setup required

## Customization

### Adding New Questions

To add your own questions, modify the `quizData` array in `script.js`:

```javascript
const quizData = [
    {
        question: "Your question here?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0 // Index of correct option (0-3)
    },
    // Add more questions...
];
```

### Styling Changes

Modify `style.css` to customize the appearance:
- Colors: Update CSS variables in the `:root` selector
- Layout: Adjust container sizes and spacing
- Typography: Change font families and sizes

### Timer Settings

Change the question time limit in `script.js`:
```javascript
timeLeft = 15; // Change to desired seconds
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Features in Detail

### Timer System
- 15-second countdown per question
- Visual timer display
- Automatic progression when time expires

### Scoring System
- +1 point for each correct answer
- Real-time score updates
- Final performance evaluation

### Responsive Design
- Flexible grid layouts
- Mobile-optimized interfaces
- Touch-friendly buttons

### Answer Review
- Comprehensive answer analysis
- Color-coded correct/incorrect indicators
- Side-by-side comparison of user answers and correct answers

## Contributing

Feel free to fork this project and submit pull requests for any improvements:
- Additional question categories
- Enhanced animations
- Sound effects
- Local storage for high scores
- Multiple difficulty levels

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] User authentication
- [ ] Leaderboard system
- [ ] Multiple quiz categories
- [ ] Question difficulty levels
- [ ] Sound effects and animations
- [ ] Progress saving
- [ ] Social sharing features

## Support

If you encounter any issues or have questions about the quiz application, please create an issue in the project repository.

---

**Enjoy testing your knowledge with this interactive quiz application!**