/**
 * Example usage of Material Icons in the Braid Calculator
 * This file demonstrates how to use the Material Icons utilities
 */

import { createMaterialIcon, createIconWithText, addIconToElement, ICONS } from './utils/materialIcons.js';

// Example 1: Creating a simple icon
function addCalculateButton() {
    const button = document.createElement('button');
    button.className = 'bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors';
    
    // Create icon and add it to button
    const calculateIcon = createMaterialIcon(ICONS.CALCULATE, {
        size: 'sm',
        className: 'mr-2'
    });
    
    button.appendChild(calculateIcon);
    button.appendChild(document.createTextNode('Calculate Price'));
    
    return button;
}

// Example 2: Creating icon with text combination
function createStatusMessage(type, message) {
    let iconName, colorClass;
    
    switch (type) {
        case 'success':
            iconName = ICONS.CHECK;
            colorClass = 'text-green-600';
            break;
        case 'warning':
            iconName = ICONS.WARNING;
            colorClass = 'text-yellow-600';
            break;
        case 'error':
            iconName = ICONS.ERROR;
            colorClass = 'text-red-600';
            break;
        default:
            iconName = ICONS.INFO;
            colorClass = 'text-blue-600';
    }
    
    return createIconWithText(iconName, message, {
        color: colorClass,
        size: 'sm'
    });
}

// Example 3: Adding icons to existing elements
function enhanceFormLabels() {
    // Add hair icon to hair type field
    const hairKindLabel = document.querySelector('label[for="hairKind"]');
    if (hairKindLabel) {
        addIconToElement(hairKindLabel, ICONS.HAIR, {
            size: 'sm',
            color: 'text-gray-500'
        });
    }
    
    // Add timer icon to time estimates
    const timeElements = document.querySelectorAll('[data-translate="estimatedTimeLabel"]');
    timeElements.forEach(element => {
        addIconToElement(element, ICONS.TIME, {
            size: 'sm',
            color: 'text-indigo-600'
        });
    });
}

// Example 4: Dynamic icon creation based on braid style
function getBraidStyleIcon(braidStyle) {
    const iconMap = {
        'cornrows': 'grid_view',
        'box_braids': 'apps',
        'mix_braids': 'dashboard',
        'french_braids': 'linear_scale'
    };
    
    return createMaterialIcon(iconMap[braidStyle] || ICONS.PATTERN, {
        size: 'md',
        color: 'text-indigo-600'
    });
}

// Example 5: Creating a complete UI component with icons
function createPriceCard(price, time, breakdown) {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md';
    
    // Header with icon
    const header = document.createElement('div');
    header.className = 'flex items-center gap-2 mb-4';
    
    const priceIcon = createMaterialIcon(ICONS.PRICE_TAG, {
        size: 'lg',
        color: 'text-indigo-600'
    });
    
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold';
    title.textContent = 'Price Estimate';
    
    header.appendChild(priceIcon);
    header.appendChild(title);
    
    // Price display
    const priceDisplay = document.createElement('div');
    priceDisplay.className = 'text-3xl font-bold text-indigo-700 mb-2';
    priceDisplay.textContent = price;
    
    // Time display with icon
    const timeDisplay = createIconWithText(ICONS.TIMER, `${time} hours`, {
        color: 'text-gray-600',
        size: 'sm'
    });
    timeDisplay.className += ' mb-4';
    
    card.appendChild(header);
    card.appendChild(priceDisplay);
    card.appendChild(timeDisplay);
    
    return card;
}

// Export examples for use in other files
export {
    addCalculateButton,
    createStatusMessage,
    enhanceFormLabels,
    getBraidStyleIcon,
    createPriceCard
};
