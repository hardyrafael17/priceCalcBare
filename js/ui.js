// UI management and DOM manipulation
import { braidStylesData, headCoverageOptions, extensionOptions } from './data.js';
import { translate, setLanguage, updateAllText } from './translations.js';
import { populateThemeDropdown } from './theme.js';
import { calculatePrice } from './calculator.js';

export function populateSelectWithOptions(selectElement, optionsObject) {
    const currentVal = selectElement.value;
    selectElement.innerHTML = '';
    
    for (const key in optionsObject) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = translate(optionsObject[key].nameKey);
        selectElement.appendChild(option);
    }
    
    if (selectElement.querySelector(`option[value="${currentVal}"]`)) {
        selectElement.value = currentVal;
    }
}

export function populateLanguageDropdown() {
    const languageSelect = document.getElementById('languageSelect');
    const currentVal = languageSelect.value;
    languageSelect.innerHTML = '';
    
    const langOptions = [
        { value: 'en', textKey: 'langEN' },
        { value: 'es', textKey: 'langES' }
    ];
    
    langOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = translate(opt.textKey);
        languageSelect.appendChild(option);
    });
    
    languageSelect.value = currentVal;
}

export function updateOptionsVisibility() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const cornrowsOptionsContainer = document.getElementById('cornrowsOptionsContainer');
    const divisionOptionsContainer = document.getElementById('divisionOptionsContainer');
    const mixBraidsOptionsContainer = document.getElementById('mixBraidsOptionsContainer');
    const extensionAmountContainer = document.getElementById('extensionAmountContainer');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    
    const selectedStyleKey = braidStyleSelect.value;
    if (!selectedStyleKey) return;
    
    const style = braidStylesData[selectedStyleKey];

    cornrowsOptionsContainer.classList.toggle('hidden', 
        !style || (!style.hasRows && selectedStyleKey !== 'mixBraids'));
    divisionOptionsContainer.classList.toggle('hidden', 
        !style || (!style.hasDivisions && selectedStyleKey !== 'mixBraids'));
    mixBraidsOptionsContainer.classList.toggle('hidden', 
        selectedStyleKey !== 'mixBraids');

    if (selectedStyleKey === 'mixBraids') {
        cornrowsOptionsContainer.classList.remove('hidden');
        divisionOptionsContainer.classList.remove('hidden');
    }
    
    extensionAmountContainer.classList.toggle('hidden', 
        !needsExtensionsCheckbox.checked);
}

export function setupFormListeners() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const headCoverageSelect = document.getElementById('headCoverage');
    const cornrowRowsInput = document.getElementById('cornrowRows');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const mixPercentageInput = document.getElementById('mixPercentage');
    const mixPercentageValueSpan = document.getElementById('mixPercentageValue');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    const extensionAmountSelect = document.getElementById('extensionAmount');
    const languageSelect = document.getElementById('languageSelect');

    // Form element listeners
    braidStyleSelect.addEventListener('change', () => {
        updateOptionsVisibility();
        calculatePrice();
    });

    headCoverageSelect.addEventListener('change', calculatePrice);
    cornrowRowsInput.addEventListener('input', calculatePrice);
    divisionSizeSelect.addEventListener('change', calculatePrice);

    mixPercentageInput.addEventListener('input', () => {
        mixPercentageValueSpan.textContent = `${mixPercentageInput.value}%`;
        calculatePrice();
    });

    needsExtensionsCheckbox.addEventListener('change', () => {
        updateOptionsVisibility();
        calculatePrice();
    });

    extensionAmountSelect.addEventListener('change', calculatePrice);

    // Language change listener
    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
        updateAllFormOptions();
        updateAllText();
        calculatePrice();
    });
}

export function initializeFormOptions() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const headCoverageSelect = document.getElementById('headCoverage');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const extensionAmountSelect = document.getElementById('extensionAmount');

    // Populate all dropdowns
    populateSelectWithOptions(braidStyleSelect, braidStylesData);
    populateSelectWithOptions(headCoverageSelect, headCoverageOptions);
    populateSelectWithOptions(divisionSizeSelect, braidStylesData.boxBraids.divisionOptions);
    populateSelectWithOptions(extensionAmountSelect, extensionOptions);
    
    // Set default extension amount
    extensionAmountSelect.value = 'normal';
    
    // Populate theme and language dropdowns
    populateThemeDropdown();
    populateLanguageDropdown();
}

function updateAllFormOptions() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const headCoverageSelect = document.getElementById('headCoverage');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const extensionAmountSelect = document.getElementById('extensionAmount');

    populateSelectWithOptions(braidStyleSelect, braidStylesData);
    populateSelectWithOptions(headCoverageSelect, headCoverageOptions);
    populateSelectWithOptions(divisionSizeSelect, braidStylesData.boxBraids.divisionOptions);
    populateSelectWithOptions(extensionAmountSelect, extensionOptions);
    populateThemeDropdown();
    populateLanguageDropdown();
}
