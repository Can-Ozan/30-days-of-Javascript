# Text Comparison Tool (Diff Tool)

A simple web-based text comparison tool that highlights differences between two text versions. This tool provides a clean interface for comparing old and new versions of text with visual highlighting.

## Features

- **Side-by-Side Comparison**: View old and new text versions in synchronized columns
- **Visual Difference Highlighting**:
  - 🟥 Red background for removed lines
  - 🟩 Green background for added lines
  - ⬜ White background for unchanged lines
- **Synchronized Scrolling**: Scroll both text areas simultaneously for easy comparison
- **Line Numbering**: Each line is numbered for easy reference
- **Responsive Design**: Works on both desktop and mobile devices
- **Real-time Comparison**: Instant results after clicking the compare button

## How to Use

1. **Enter Text**:
   - Paste or type your original text in the "Eski Metin" (Old Text) textarea
   - Paste or type your modified text in the "Yeni Metin" (New Text) textarea

2. **Compare**:
   - Click the "Karşılaştır" (Compare) button to see the differences

3. **Review Results**:
   - Removed lines appear in red in the left column
   - Added lines appear in green in the right column
   - Unchanged lines appear in white in both columns
   - Scroll either panel to view both texts simultaneously

## Technical Details

### Algorithm
The tool uses a simple line-by-line comparison algorithm that:
- Splits text into individual lines
- Compares lines sequentially
- Identifies additions, deletions, and unchanged content
- Handles empty lines appropriately

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Responsive design and visual styling
- **Vanilla JavaScript**: Comparison logic and interactive features

### Browser Compatibility
Works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
text-comparison-tool/
│
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── script.js           # Comparison logic and interactivity
└── README.md           # This documentation file
```

## Installation

No installation required! Simply:

1. Download all three files (`index.html`, `style.css`, `script.js`)
2. Open `index.html` in your web browser
3. Start comparing texts!

## Customization

### Styling
Modify `style.css` to change colors, fonts, or layout:
- Change highlight colors by modifying `.added` and `.removed` classes
- Adjust spacing and sizing in the container classes
- Modify fonts in the `body` and `.diff-result` selectors

### Functionality
Extend `script.js` to add features like:
- Character-level diffing
- Export functionality
- Different comparison algorithms
- Session history

## Example Use Cases

- **Code Reviews**: Compare different versions of source code
- **Document Editing**: Track changes between document revisions
- **Content Management**: Verify updates to articles or posts
- **Translation Work**: Compare original and translated texts
- **Educational Purposes**: Demonstrate text differences to students

## Limitations

- Line-based comparison only (no character-level diffing)
- Basic comparison algorithm (not as sophisticated as professional diff tools)
- No save/export functionality
- No undo/redo features

## Contributing

Feel free to fork this project and submit pull requests for:
- Bug fixes
- New features
- Performance improvements
- Additional language support

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have suggestions for improvements, please create an issue in the project repository.

---

**Note**: This is a simplified version of diff tools and is intended for basic text comparison needs. For more advanced features, consider using professional diff tools like Beyond Compare, WinMerge, or online services.