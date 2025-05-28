// UI management and DOM manipulation
import { braidStylesData, headCoverageOptions, extensionOptions, braidTailLengthOptions, hairKindOptions, hairDensityOptions, hairLengthOptions } from './data.js';
import { translate, setLanguage, updateAllText } from './translations.js';
import { populateThemeDropdown } from './theme.js';
import { calculatePrice } from './calculator.js';
import { populateSelectWithOptions } from './utils.js';

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

export function setupSettingsModal() {
    const settingsButton = document.getElementById('setSettings');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalButton = document.getElementById('closeSettingsModal');
    const closeModalBtn = document.getElementById('closeSettingsModalBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const resetSettingsBtn = document.getElementById('resetAllSettings');

    function openModal() {
        settingsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Set up collapsible sections based on current style
        setupCollapsibleSections();
        
        // Load current settings to UI
        loadSettingsToUI();
    }

    function closeModal() {
        settingsModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function loadSettingsToUI() {
        // Import settings manager dynamically to avoid circular imports
        import('./settings.js').then(({ settingsManager }) => {
            const settings = settingsManager.getCornrowsSettings();
            
            document.getElementById('cornrowsBasePrice').value = settings.basePrice;
            document.getElementById('cornrowsExtraRowCost').value = settings.extraRowCost;
            document.getElementById('cornrowsExtraRowRatio').value = settings.extraRowRatioCurve;
            document.getElementById('cornrowsEnableExtraRowRatio').checked = settings.enableExtraRowRatio;
            document.getElementById('cornrowsExtensionCost').value = settings.extensionCost;
            document.getElementById('cornrowsExtensionRatio').value = settings.extensionRatioCurve;
            document.getElementById('cornrowsEnableExtensionRatio').checked = settings.enableExtensionRatio;
            document.getElementById('cornrowsTailCostPerInch').value = settings.tailCostPerInch;
            document.getElementById('cornrowsTailRatio').value = settings.tailRatioCurve;
            document.getElementById('cornrowsEnableTailRatio').checked = settings.enableTailRatio;
            
            // Update ratio curve visibility
            setupRatioCurveToggle('cornrowsEnableExtraRowRatio', 'extraRowRatioContainer');
            setupRatioCurveToggle('cornrowsEnableExtensionRatio', 'extensionRatioContainer');
            setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
        });
    }
    
    function saveSettings() {
        import('./settings.js').then(({ settingsManager }) => {
            // Save all cornrows settings
            settingsManager.updateCornrowsSetting('basePrice', parseFloat(document.getElementById('cornrowsBasePrice').value));
            settingsManager.updateCornrowsSetting('extraRowCost', parseFloat(document.getElementById('cornrowsExtraRowCost').value));
            settingsManager.updateCornrowsSetting('extraRowRatioCurve', parseFloat(document.getElementById('cornrowsExtraRowRatio').value));
            settingsManager.updateCornrowsSetting('enableExtraRowRatio', document.getElementById('cornrowsEnableExtraRowRatio').checked);
            settingsManager.updateCornrowsSetting('extensionCost', parseFloat(document.getElementById('cornrowsExtensionCost').value));
            settingsManager.updateCornrowsSetting('extensionRatioCurve', parseFloat(document.getElementById('cornrowsExtensionRatio').value));
            settingsManager.updateCornrowsSetting('enableExtensionRatio', document.getElementById('cornrowsEnableExtensionRatio').checked);
            settingsManager.updateCornrowsSetting('tailCostPerInch', parseFloat(document.getElementById('cornrowsTailCostPerInch').value));
            settingsManager.updateCornrowsSetting('tailRatioCurve', parseFloat(document.getElementById('cornrowsTailRatio').value));
            settingsManager.updateCornrowsSetting('enableTailRatio', document.getElementById('cornrowsEnableTailRatio').checked);
            
            // Show a brief success message
            const saveBtn = document.getElementById('saveSettingsBtn');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'Saved!';
            saveBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            saveBtn.classList.add('bg-green-800');
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.classList.remove('bg-green-800');
                saveBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            }, 1500);
        });
    }
    
    function resetSettings() {
        import('./settings.js').then(({ settingsManager }) => {
            settingsManager.resetToDefaults();
            loadSettingsToUI();
            
            // Show a brief success message
            const resetBtn = document.getElementById('resetSettingsBtn');
            const originalText = resetBtn.textContent;
            resetBtn.textContent = 'Reset!';
            resetBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
            resetBtn.classList.add('bg-red-800');
            
            setTimeout(() => {
                resetBtn.textContent = originalText;
                resetBtn.classList.remove('bg-red-800');
                resetBtn.classList.add('bg-red-600', 'hover:bg-red-700');
            }, 1500);
        });
    }

    // Open modal when settings button is clicked
    settingsButton.addEventListener('click', openModal);

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !settingsModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Save settings button
    saveSettingsBtn.addEventListener('click', saveSettings);
    
    // Reset settings button
    resetSettingsBtn.addEventListener('click', resetSettings);
}

function setupCollapsibleSections() {
    const cornrowsHeader = document.getElementById('cornrowsSettingsHeader');
    const cornrowsContent = document.getElementById('cornrowsSettingsContent');
    const cornrowsIcon = document.getElementById('cornrowsExpandIcon');
    
    // Check if cornrows should be expanded based on current style
    const braidStyleSelect = document.getElementById('braidStyle');
    const currentStyle = braidStyleSelect ? braidStyleSelect.value : '';
    const shouldExpand = currentStyle === 'cornrows' || currentStyle === 'updoCornrows';
    
    if (shouldExpand) {
        cornrowsContent.classList.remove('hidden');
        cornrowsIcon.style.transform = 'rotate(180deg)';
    } else {
        cornrowsContent.classList.add('hidden');
        cornrowsIcon.style.transform = 'rotate(0deg)';
    }
    
    // Add click handler for collapsible functionality
    cornrowsHeader.addEventListener('click', () => {
        const isHidden = cornrowsContent.classList.contains('hidden');
        
        if (isHidden) {
            cornrowsContent.classList.remove('hidden');
            cornrowsIcon.style.transform = 'rotate(180deg)';
        } else {
            cornrowsContent.classList.add('hidden');
            cornrowsIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Set up ratio curve visibility toggles
    setupRatioCurveToggle('cornrowsEnableExtraRowRatio', 'extraRowRatioContainer');
    setupRatioCurveToggle('cornrowsEnableExtensionRatio', 'extensionRatioContainer');
    setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
}

function setupRatioCurveToggle(checkboxId, containerId) {
    const checkbox = document.getElementById(checkboxId);
    const container = document.getElementById(containerId);
    
    if (checkbox && container) {
        const toggleVisibility = () => {
            if (checkbox.checked) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        };
        
        // Set initial state
        toggleVisibility();
        
        // Add event listener
        checkbox.addEventListener('change', toggleVisibility);
    }
}

function resetCornrowsSettingsOnly() {
    import('./settings.js').then(({ settingsManager }) => {
        // Reset only cornrows settings to defaults
        const defaults = settingsManager.defaultSettings.cornrows;
        
        Object.keys(defaults).forEach(key => {
            settingsManager.updateCornrowsSetting(key, defaults[key]);
        });
        
        loadSettingsToUI();
        
        // Show a brief success message
        const resetBtn = document.getElementById('resetCornrowsSettings');
        const originalText = resetBtn.textContent;
        resetBtn.textContent = 'Reset!';
        resetBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
        resetBtn.classList.add('bg-gray-800');
        
        setTimeout(() => {
            resetBtn.textContent = originalText;
            resetBtn.classList.remove('bg-gray-800');
            resetBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
        }, 1500);
    });
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

setupCollapsibleSections();
setupSettingsModal();
