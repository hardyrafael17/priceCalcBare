/**
 * Material Icons Utilities
 * Helper functions for working with Material Icons in the braid calculator
 */

/**
 * Creates a Material Icon element
 * @param {string} iconName - The name of the Material Icon
 * @param {Object} options - Configuration options
 * @param {string} options.size - Size class ('sm', 'md', 'lg', 'xl')
 * @param {string} options.className - Additional CSS classes
 * @param {string} options.color - Text color (Tailwind classes)
 * @param {string} options.type - Icon type ('outlined', 'filled', 'round', 'sharp', 'two-tone')
 * @returns {HTMLElement} The icon element
 */
export function createMaterialIcon(iconName, options = {}) {
    const {
        size = 'md',
        className = '',
        color = '',
        type = 'filled'
    } = options;

    const icon = document.createElement('span');
    
    // Set the appropriate class based on icon type
    if (type === 'outlined' || type === 'symbols') {
        icon.className = 'material-symbols-outlined';
    } else {
        icon.className = 'material-icons';
        if (type !== 'filled') {
            icon.className += `-${type}`;
        }
    }
    
    // Add size class
    icon.classList.add(`icon-${size}`);
    
    // Add color classes
    if (color) {
        icon.classList.add(color);
    }
    
    // Add additional classes
    if (className) {
        icon.classList.add(...className.split(' '));
    }
    
    // Set the icon name as text content
    icon.textContent = iconName;
    
    return icon;
}

/**
 * Creates an icon with text combination
 * @param {string} iconName - The name of the Material Icon
 * @param {string} text - Text to display alongside the icon
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Container with icon and text
 */
export function createIconWithText(iconName, text, options = {}) {
    const container = document.createElement('span');
    container.className = 'flex items-center gap-2';
    
    const icon = createMaterialIcon(iconName, options);
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    
    container.appendChild(icon);
    container.appendChild(textSpan);
    
    return container;
}

/**
 * Common icons used in the braid calculator
 */
export const ICONS = {
    // UI Actions
    THEME: 'brightness_6',
    LANGUAGE: 'translate',
    CALCULATE: 'calculate',
    REFRESH: 'refresh',
    SAVE: 'save',
    PRINT: 'print',
    
    // Braid Related
    HAIR: 'content_cut',
    TIME: 'schedule',
    MONEY: 'attach_money',
    LENGTH: 'straighten',
    PATTERN: 'grid_view',
    
    // Form Elements
    DROPDOWN: 'arrow_drop_down',
    CHECK: 'check',
    CLOSE: 'close',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    
    // Navigation
    ARROW_BACK: 'arrow_back',
    ARROW_FORWARD: 'arrow_forward',
    MENU: 'menu',
    
    // Sizing
    RULER: 'straighten',
    MEASURE: 'square_foot',
    
    // Results
    PRICE_TAG: 'local_offer',
    TIMER: 'timer',
    STAR: 'star'
};

/**
 * Quick helper to add an icon to an existing element
 * @param {HTMLElement} element - Target element
 * @param {string} iconName - Icon name
 * @param {Object} options - Icon options
 * @param {string} position - 'before' or 'after' (default: 'before')
 */
export function addIconToElement(element, iconName, options = {}, position = 'before') {
    const icon = createMaterialIcon(iconName, options);
    
    if (position === 'after') {
        element.appendChild(icon);
    } else {
        element.insertBefore(icon, element.firstChild);
    }
    
    // Add flex layout if not already present
    if (!element.classList.contains('flex')) {
        element.classList.add('flex', 'items-center', 'gap-2');
    }
}
