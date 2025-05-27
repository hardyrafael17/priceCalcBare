# Braid Cost Estimator

A modular web application for estimating braid service costs with multi-language support (English/Spanish) and dark/light theme functionality.

## 🏗️ Project Structure

The application has been refactored from a single monolithic HTML file into a well-organized modular structure:

```
priceCalcBare/
├── index.html              # Clean HTML structure
├── styles.css              # Extracted CSS styles
├── package.json            # Project configuration
├── js/                     # JavaScript modules
│   ├── main.js             # Application initialization
│   ├── data.js             # Configuration and pricing data
│   ├── translations.js     # Multi-language support
│   ├── theme.js           # Theme management
│   ├── calculator.js      # Price calculation logic
│   └── ui.js              # UI interactions and DOM management
└── .gitignore             # Git ignore rules
```

## 🚀 Features

- **Modular Architecture**: Separated concerns into focused modules
- **Multi-language Support**: English and Spanish translations
- **Theme Support**: Light, dark, and system theme options
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Price Calculation**: Complex pricing logic for different braid styles
- **Real-time Updates**: Dynamic price calculations as user inputs change

## 📋 Braid Styles Supported

- **Cornrows**: Customizable number of rows
- **Box Braids**: Different division sizes (small, medium, large)
- **Bohemian Braids**: With curly hair add-on
- **Mix Braids**: Combination of cornrows and box braids

## 🎛️ Configuration Options

- Head coverage variations (full, partial, mohawk, etc.)
- Extension options with different amounts
- Time and cost calculations with detailed breakdowns

## 🛠️ Development

### Running the Application

1. **Using Python (recommended)**:
   ```bash
   npm run serve
   # or
   python3 -m http.server 8000
   ```

2. **Using any other local server** or simply open `index.html` in a modern browser that supports ES6 modules.

### Module Overview

- **`main.js`**: Entry point, coordinates all modules
- **`data.js`**: Contains all pricing data and configuration
- **`translations.js`**: Handles internationalization
- **`theme.js`**: Manages light/dark theme switching
- **`calculator.js`**: Core price calculation algorithms
- **`ui.js`**: DOM manipulation and user interface logic

## 🔧 Customization

### Adding New Languages
1. Add translation object to `js/translations.js`
2. Update language dropdown options in `ui.js`

### Modifying Pricing
1. Update pricing data in `js/data.js`
2. Calculation logic automatically adapts

### Styling Changes
1. Modify `styles.css` for custom styles
2. Tailwind classes can be changed directly in `index.html`

## 🌟 Benefits of Modular Structure

- **Maintainability**: Each module has a single responsibility
- **Testability**: Individual modules can be unit tested
- **Scalability**: Easy to add new features or modify existing ones
- **Readability**: Code is organized and easy to understand
- **Reusability**: Modules can be reused in other projects

## 📱 Browser Support

Modern browsers with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+
