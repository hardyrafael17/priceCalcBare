// UI management and DOM manipulation
import { braidStylesData, headCoverageOptions, extensionOptions, braidTailLengthOptions, hairKindOptions, hairDensityOptions, hairLengthOptions } from './data.js';
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
    const curlAddonContainer = document.getElementById('curlAddonContainer');
    const braidTailLengthContainer = document.getElementById('braidTailLengthContainer');
    const extensionAmountContainer = document.getElementById('extensionAmountContainer');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    
    const selectedStyleKey = braidStyleSelect.value;
    if (!selectedStyleKey) return;
    
    const style = braidStylesData[selectedStyleKey];

    // Show cornrows options only for styles that have rows
    cornrowsOptionsContainer.classList.toggle('hidden', 
        !style || !style.hasRows);
    
    // Show division options only for styles that have divisions
    divisionOptionsContainer.classList.toggle('hidden', 
        !style || !style.hasDivisions);
    
    // Show curl add-on only for styles that support it
    curlAddonContainer.classList.toggle('hidden', 
        !style || !style.hasCurlAddon);
    
    // Show braid tail length only for styles that support it
    braidTailLengthContainer.classList.toggle('hidden', 
        !style || !style.hasTailLength);
    
    // Hide mix braids options (no longer used)
    mixBraidsOptionsContainer.classList.add('hidden');
    
    extensionAmountContainer.classList.toggle('hidden', 
        !needsExtensionsCheckbox.checked);
}

export function updateCornrowOptions() {
    const headCoverageSelect = document.getElementById('headCoverage');
    const cornrowRowsSelect = document.getElementById('cornrowRows');
    
    if (!headCoverageSelect.value) return;
    
    const headCoverage = headCoverageOptions[headCoverageSelect.value];
    const baseWidthCm = 31.75; // 12.5 inches in cm
    const adjustedWidthCm = baseWidthCm * headCoverage.multiplier;
    
    const currentValue = cornrowRowsSelect.value;
    cornrowRowsSelect.innerHTML = '';
    
    // Create options for 2 to 6 rows
    for (let rows = 2; rows <= 16; rows++) {
        const widthPerRow = adjustedWidthCm / rows;
        const option = document.createElement('option');
        option.value = rows;
        option.textContent = `${rows} (${translate('approximately')} ${widthPerRow.toFixed(1)} ${translate('cmWide')})`;
        cornrowRowsSelect.appendChild(option);
    }
    
    // Restore previous value if it exists, otherwise default to 6
    if (cornrowRowsSelect.querySelector(`option[value="${currentValue}"]`)) {
        cornrowRowsSelect.value = currentValue;
    } else {
        cornrowRowsSelect.value = '6';
    }
}

export function setupFormListeners() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const hairKindSelect = document.getElementById('hairKind');
    const hairDensitySelect = document.getElementById('hairDensity');
    const hairLengthSelect = document.getElementById('hairLength');
    const headCoverageSelect = document.getElementById('headCoverage');
    const cornrowRowsInput = document.getElementById('cornrowRows');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const braidTailLengthSelect = document.getElementById('braidTailLength');
    const mixPercentageInput = document.getElementById('mixPercentage');
    const mixPercentageValueSpan = document.getElementById('mixPercentageValue');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    const extensionAmountSelect = document.getElementById('extensionAmount');
    const needsCurlsCheckbox = document.getElementById('needsCurls');
    const languageSelect = document.getElementById('languageSelect');

    // Form element listeners
    braidStyleSelect.addEventListener('change', () => {
        updateOptionsVisibility();
        updateCornrowOptions();
        calculatePrice();
    });

    hairKindSelect.addEventListener('change', calculatePrice);
    hairDensitySelect.addEventListener('change', calculatePrice);
    hairLengthSelect.addEventListener('change', calculatePrice);

    headCoverageSelect.addEventListener('change', () => {
        updateCornrowOptions();
        calculatePrice();
    });
    cornrowRowsInput.addEventListener('change', calculatePrice);
    divisionSizeSelect.addEventListener('change', calculatePrice);
    braidTailLengthSelect.addEventListener('change', calculatePrice);

    mixPercentageInput.addEventListener('input', () => {
        mixPercentageValueSpan.textContent = `${mixPercentageInput.value}%`;
        calculatePrice();
    });

    needsExtensionsCheckbox.addEventListener('change', () => {
        updateOptionsVisibility();
        calculatePrice();
    });

    needsCurlsCheckbox.addEventListener('change', calculatePrice);

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
    const hairKindSelect = document.getElementById('hairKind');
    const hairDensitySelect = document.getElementById('hairDensity');
    const hairLengthSelect = document.getElementById('hairLength');
    const headCoverageSelect = document.getElementById('headCoverage');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const extensionAmountSelect = document.getElementById('extensionAmount');
    const braidTailLengthSelect = document.getElementById('braidTailLength');
    const cornrowRowsSelect = document.getElementById('cornrowRows');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');

    // Populate all dropdowns
    populateSelectWithOptions(braidStyleSelect, braidStylesData);
    populateSelectWithOptions(hairKindSelect, hairKindOptions);
    populateSelectWithOptions(hairDensitySelect, hairDensityOptions);
    populateSelectWithOptions(hairLengthSelect, hairLengthOptions);
    populateSelectWithOptions(headCoverageSelect, headCoverageOptions);
    populateSelectWithOptions(divisionSizeSelect, braidStylesData.boxBraids.divisionOptions);
    populateSelectWithOptions(extensionAmountSelect, extensionOptions);
    populateSelectWithOptions(braidTailLengthSelect, braidTailLengthOptions);
    
    // Set default values: cornrows, wavy hair, medium density, normal length, full head, no extensions, 2 inch tail
    braidStyleSelect.value = 'cornrows';
    hairKindSelect.value = 'wavy';
    hairDensitySelect.value = 'medium';
    hairLengthSelect.value = 'normalForBraids';
    headCoverageSelect.value = 'full';
    needsExtensionsCheckbox.checked = false;
    extensionAmountSelect.value = 'normal';
    braidTailLengthSelect.value = '2'; // Default to 2 inches
    
    // Initialize cornrow options after head coverage is set
    updateCornrowOptions();
    
    // Set cornrows to 6 rows after options are populated
    cornrowRowsSelect.value = '6';
    
    // Update visibility based on default selections
    updateOptionsVisibility();
    
    // Populate theme and language dropdowns
    populateThemeDropdown();
    populateLanguageDropdown();
}

function updateAllFormOptions() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const hairKindSelect = document.getElementById('hairKind');
    const hairDensitySelect = document.getElementById('hairDensity');
    const hairLengthSelect = document.getElementById('hairLength');
    const headCoverageSelect = document.getElementById('headCoverage');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const extensionAmountSelect = document.getElementById('extensionAmount');
    const braidTailLengthSelect = document.getElementById('braidTailLength');

    populateSelectWithOptions(braidStyleSelect, braidStylesData);
    populateSelectWithOptions(hairKindSelect, hairKindOptions);
    populateSelectWithOptions(hairDensitySelect, hairDensityOptions);
    populateSelectWithOptions(hairLengthSelect, hairLengthOptions);
    populateSelectWithOptions(headCoverageSelect, headCoverageOptions);
    populateSelectWithOptions(divisionSizeSelect, braidStylesData.boxBraids.divisionOptions);
    populateSelectWithOptions(extensionAmountSelect, extensionOptions);
    populateSelectWithOptions(braidTailLengthSelect, braidTailLengthOptions);
    updateCornrowOptions();
    populateThemeDropdown();
    populateLanguageDropdown();
}
