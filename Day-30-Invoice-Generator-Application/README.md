# Invoice Generator

A simple and responsive web application for generating invoices with product details and prices, then exporting them as PDF files.

## Features

- Add products with names and prices
- Automatic total calculation
- Automatic invoice number and date generation
- Real-time invoice preview
- PDF export functionality
- Responsive design for all devices
- Clean and modern user interface
- Built with vanilla JavaScript, HTML5, and CSS3

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with Flexbox and responsive design
- **JavaScript (ES6+)**: DOM manipulation and application logic
- **jsPDF**: PDF generation and export
- **html2canvas**: Capturing HTML content as images for PDF conversion

## File Structure

```
invoice-generator/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript application logic
└── README.md           # This file
```

## Installation

1. Clone or download the project files
2. Ensure all three files (index.html, style.css, script.js) are in the same directory
3. Open `index.html` in a web browser
4. The application will automatically load with all required CDN dependencies

## Usage

### Adding Products
1. Enter the product name in the "Product Name" field
2. Enter the price in the "Price (₺)" field
3. Click "Add Product" or press Enter to add the product to the invoice
4. Repeat for all products you want to include

### Managing the Invoice
- **Clear All**: Removes all products and resets the invoice
- **PDF Download**: Exports the current invoice as a PDF file (available when products are added)

### Invoice Features
- Automatic invoice number generation (format: FTR-YYYYMMDD-RRR)
- Current date display
- Sequential product numbering
- Running total calculation
- Professional invoice layout

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Dependencies

The application uses the following CDN-hosted libraries:

- **jsPDF** (v2.5.1): For PDF generation and export
- **html2canvas** (v1.4.1): For capturing HTML content as images

These are automatically loaded when the application starts.

## Customization

### Styling
Modify `style.css` to change:
- Color scheme
- Font families
- Layout dimensions
- Responsive breakpoints

### Functionality
Extend `script.js` to add:
- Customer information fields
- Tax calculations
- Discount options
- Multiple currency support
- Invoice templates

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure you have internet connectivity (for CDN dependencies)
3. Verify all files are in the same directory

## Future Enhancements

- Customer database integration
- Multiple invoice templates
- Tax and discount calculations
- Local storage for draft invoices
- Print functionality
- Multi-language support

---

**Note**: This application requires an internet connection to load the jsPDF and html2canvas libraries from CDN.