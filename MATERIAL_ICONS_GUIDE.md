# Material Icons Integration Guide

This guide explains how to use Material Icons in your Braid Cost Estimator application.

## What's Been Added

1. **Google Fonts CDN Links** - Added to `index.html` for Material Icons and Material Symbols
2. **CSS Classes** - Added utility classes in `styles.css` for icon styling
3. **JavaScript Utilities** - Created helper functions in `js/utils/materialIcons.js`
4. **Visual Examples** - Added icons to main UI elements in the HTML

## Using Material Icons

### Method 1: Direct HTML (Simplest)

```html
<!-- Basic Material Icon -->
<span class="material-icons">home</span>

<!-- With size and color -->
<span class="material-icons icon-lg text-indigo-600">calculate</span>

<!-- Material Symbols (newer, more options) -->
<span class="material-symbols-outlined">settings</span>
```

### Method 2: JavaScript Utilities (Recommended)

```javascript
import { createMaterialIcon, ICONS } from './utils/materialIcons.js';

// Create a basic icon
const icon = createMaterialIcon('home');

// Create with options
const largeIcon = createMaterialIcon(ICONS.CALCULATE, {
    size: 'lg',
    color: 'text-indigo-600',
    className: 'hover:text-indigo-800'
});

// Add to an element
document.body.appendChild(icon);
```

### Method 3: Adding to Existing Elements

```javascript
import { addIconToElement } from './utils/materialIcons.js';

// Add icon to a button
const button = document.querySelector('#myButton');
addIconToElement(button, 'save', { size: 'sm' }, 'before');
```

## Available Icon Sizes

- `icon-sm` - 18px
- `icon-md` - 24px (default)
- `icon-lg` - 32px
- `icon-xl` - 48px

## Common Icons for Your App

The `ICONS` constant in `materialIcons.js` includes commonly used icons:

- `ICONS.CALCULATE` - 'calculate'
- `ICONS.HAIR` - 'content_cut'
- `ICONS.TIME` - 'schedule'
- `ICONS.MONEY` - 'attach_money'
- `ICONS.THEME` - 'brightness_6'
- `ICONS.LANGUAGE` - 'translate'
- And many more...

## Styling Icons

### With Tailwind CSS Classes
```html
<span class="material-icons text-blue-500 hover:text-blue-700 cursor-pointer">
    favorite
</span>
```

### With Custom CSS
```css
.my-icon {
    color: #4f46e5;
    font-size: 28px;
    transition: color 0.2s;
}

.my-icon:hover {
    color: #3730a3;
}
```

## Dark Mode Support

Icons automatically work with your dark mode implementation:

```html
<span class="material-icons text-gray-600 dark:text-gray-300">
    settings
</span>
```

## Finding More Icons

- **Material Icons**: https://fonts.google.com/icons
- **Material Symbols**: https://fonts.google.com/icons?icon.style=Outlined

## Examples in Your App

Check `js/materialIconsExamples.js` for practical examples of:
- Creating buttons with icons
- Status messages with icons
- Dynamic icon selection
- Complete UI components

## Performance Tips

1. **Preload fonts** (already done in your HTML)
2. **Use icon constants** from `ICONS` object to avoid typos
3. **Batch DOM updates** when adding multiple icons
4. **Consider icon sprite sheets** for very large applications (not needed for your current scale)

## Troubleshooting

- **Icons not showing**: Check browser dev tools for font loading errors
- **Wrong size**: Use the size classes (`icon-sm`, `icon-md`, etc.)
- **Alignment issues**: Use `icon-align` class or Tailwind's alignment utilities
- **Dark mode**: Ensure you're using appropriate color classes for both light and dark themes
