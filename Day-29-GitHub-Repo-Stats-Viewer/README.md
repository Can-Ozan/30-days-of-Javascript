# GitHub Repository Stats Viewer

A comprehensive web application for analyzing GitHub repositories with detailed statistics and visualizations.

## Features

- **Repository Overview**: Basic info like stars, forks, watchers, and issues
- **Detailed Statistics**: Creation date, last update, size, main language, license
- **Contribution Analytics**: Contributors count, commit history, PR and release counts
- **Language Distribution**: Visual pie chart showing programming language usage
- **Commit Activity**: Line chart displaying recent commit patterns
- **Popular Forks**: List of most-starred forks
- **Recent Releases**: Latest release information
- **Export Options**: Download analysis as PDF or JSON
- **Responsive Design**: Works perfectly on all devices
- **Example Repositories**: Quick access to popular repos for testing

## Installation

1. Clone or download the project files
2. Ensure you have all three files in the same directory:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in a web browser

## Usage

1. Enter a GitHub repository URL in the format: `https://github.com/username/repository`
2. Click "Analyze" or press Enter
3. View detailed statistics and visualizations
4. Use export buttons to download results

### Quick Start with Example Repositories

Click on any of the example repositories:
- React
- Vue.js
- Angular

## API Information

This application uses the public GitHub REST API v3. Please note:

- No authentication required for basic usage
- Rate limiting applies (60 requests per hour for unauthenticated requests)
- For higher rate limits, consider adding a GitHub personal access token

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technical Details

### Dependencies
- [Chart.js](https://www.chartjs.org/) - For data visualizations
- [Font Awesome](https://fontawesome.com/) - For icons
- [jsPDF](https://parall.ax/products/jspdf) - For PDF export functionality

### API Endpoints Used
- `/repos/{owner}/{repo}`
- `/repos/{owner}/{repo}/languages`
- `/repos/{owner}/{repo}/contributors`
- `/repos/{owner}/{repo}/commits`
- `/repos/{owner}/{repo}/forks`
- `/repos/{owner}/{repo}/releases`

## Project Structure

```
github-repo-stats-viewer/
│
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
└── script.js           # Application logic and API calls
```

## Features in Detail

### Repository Header
- Avatar and basic information
- Star, fork, watcher, and issue counts
- Repository description

### Statistics Cards
1. **General Statistics**
   - Creation date
   - Last update
   - Repository size
   - Main language
   - License information

2. **Contribution Statistics**
   - Total contributors
   - Last commit date
   - Total commits
   - Pull request count
   - Release count

3. **Language Distribution**
   - Interactive doughnut chart
   - Percentage breakdown
   - Color-coded languages

4. **Commit Activity**
   - 10-day commit history
   - Interactive line chart
   - Daily commit patterns

### Additional Information
- **Popular Forks**: Top 5 forks by star count
- **Recent Releases**: Latest 5 releases with dates

### Export Options
- **PDF Export**: Download analysis as PDF (premium feature demo)
- **JSON Export**: Download raw data as JSON file

## Error Handling

- Invalid URL validation
- Repository not found errors
- API rate limit warnings
- Network error handling

## Responsive Design

- Mobile-first approach
- Flexible grid layout
- Adaptive charts and components
- Touch-friendly interface

## Contributing

Feel free to submit issues and enhancement requests!

## Limitations

- Rate limited by GitHub API (60 requests/hour unauthenticated)
- Some data may be cached by GitHub
- Private repositories cannot be accessed without authentication

## Future Enhancements

- GitHub authentication for higher rate limits
- Advanced analytics and comparisons
- Historical trend analysis
- More export formats
- Repository comparison feature

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue in the project repository.

---

**Note**: This is a frontend-only application that uses GitHub's public API. For production use with higher rate limits, consider implementing backend services with proper authentication.