// Theme management functionality
import { translate } from './translations.js';

export function applyThemeSetting() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        return 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        return 'light';
    }
}

export function applyTheme(theme) {
    const html = document.documentElement;
    const themeSelect = document.getElementById('themeSelect');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else if (theme === 'light') {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    } else { // System
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
    if (themeSelect) themeSelect.value = theme;
}

export function populateThemeDropdown() {
    const themeSelect = document.getElementById('themeSelect');
    const currentVal = themeSelect.value;
    themeSelect.innerHTML = '';
    
    const themeOptions = [
        { value: 'light', textKey: 'themeLight' },
        { value: 'dark', textKey: 'themeDark' },
        { value: 'system', textKey: 'themeSystem' }
    ];
    
    themeOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = translate(opt.textKey);
        themeSelect.appendChild(option);
    });
    
    themeSelect.value = currentVal || getInitialTheme();
}

export function getInitialTheme() {
    return localStorage.getItem('theme') || 'system';
}

export function setupThemeListeners() {
    const themeSelect = document.getElementById('themeSelect');
    
    // Theme select change
    themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
    
    // System theme change detection
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
            applyTheme('system');
        }
    });
}
