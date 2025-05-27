// Main application initialization and coordination
import { detectLanguage, setLanguage, getCurrentLanguage, updateAllText } from './translations.js';
import { applyTheme, getInitialTheme, setupThemeListeners } from './theme.js';
import { initializeFormOptions, setupFormListeners, updateOptionsVisibility } from './ui.js';
import { calculatePrice } from './calculator.js';

function initializeApplication() {
    // Setup internationalization
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
    
    // Setup theme
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Initialize form elements
    initializeFormOptions();
    
    // Apply all translations
    updateAllText();
    
    // Set up event listeners
    setupFormListeners();
    setupThemeListeners();
    
    // Set language dropdown to current language
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = getCurrentLanguage();
    
    // Initial UI state and calculation
    updateOptionsVisibility();
    calculatePrice();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApplication);
