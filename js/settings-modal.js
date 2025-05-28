// Settings Modal Management
// Handles the settings modal UI, including opening/closing, loading/saving settings, and form interactions

export class SettingsModal {
    constructor() {
        this.modal = null;
        this.settingsManager = null;
        this.isInitialized = false;
        this.previewPriceElement = null;
    }

    async initialize() {
        if (this.isInitialized) return;

        // Get DOM elements
        this.modal = document.getElementById('settingsModal');
        this.settingsButton = document.getElementById('setSettings');
        this.closeModalButton = document.getElementById('closeSettingsModal');
        this.closeModalBtn = document.getElementById('closeSettingsModalBtn');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.resetAllSettingsBtn = document.getElementById('resetAllSettings');
        this.resetCornrowsBtn = document.getElementById('resetCornrowsSettings');
        this.previewPriceElement = document.getElementById('settingsPreviewPrice');

        // Import settings manager
        const { settingsManager } = await import('./settings.js');
        this.settingsManager = settingsManager;

        this.setupEventListeners();
        this.isInitialized = true;
    }

    setupEventListeners() {
        // Open modal when settings button is clicked
        this.settingsButton.addEventListener('click', () => this.openModal());

        // Close modal buttons
        this.closeModalButton.addEventListener('click', () => this.closeModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside the modal content
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });

        // Save settings button
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        
        // Reset buttons
        this.resetAllSettingsBtn.addEventListener('click', () => this.resetAllSettings());
        this.resetCornrowsBtn.addEventListener('click', () => this.resetCornrowsSettingsOnly());
    }

    openModal() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Set up collapsible sections based on current style
        this.setupCollapsibleSections();
        
        // Load current settings to UI
        this.loadSettingsToUI();
        
        // Set up input listeners for real-time preview updates
        this.setupSettingsInputListeners();
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }

    loadSettingsToUI() {
        const settings = this.settingsManager.getCornrowsSettings();
        
        // Load cornrows settings
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
        document.getElementById('cornrowsEnableAdvancedBasePrice').checked = settings.enableAdvancedBasePrice;
        document.getElementById('cornrowsAdvancedBaseRatio').value = settings.advancedBaseRatio;
        
        // Set up ratio curve visibility toggles after a small delay to ensure DOM is ready
        setTimeout(() => {
            this.setupRatioCurveToggle('cornrowsEnableExtraRowRatio', 'extraRowRatioContainer');
            this.setupRatioCurveToggle('cornrowsEnableExtensionRatio', 'extensionRatioContainer');
            this.setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
            this.setupRatioCurveToggle('cornrowsEnableAdvancedBasePrice', 'advancedBasePriceContainer');
            this.setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
        }, 100);
        
        // Update price preview
        this.updatePricePreview();
    }

    saveSettings() {
        // Save all cornrows settings
        this.settingsManager.updateCornrowsSetting('basePrice', parseFloat(document.getElementById('cornrowsBasePrice').value));
        this.settingsManager.updateCornrowsSetting('extraRowCost', parseFloat(document.getElementById('cornrowsExtraRowCost').value));
        this.settingsManager.updateCornrowsSetting('extraRowRatioCurve', parseFloat(document.getElementById('cornrowsExtraRowRatio').value));
        this.settingsManager.updateCornrowsSetting('enableExtraRowRatio', document.getElementById('cornrowsEnableExtraRowRatio').checked);
        this.settingsManager.updateCornrowsSetting('extensionCost', parseFloat(document.getElementById('cornrowsExtensionCost').value));
        this.settingsManager.updateCornrowsSetting('extensionRatioCurve', parseFloat(document.getElementById('cornrowsExtensionRatio').value));
        this.settingsManager.updateCornrowsSetting('enableExtensionRatio', document.getElementById('cornrowsEnableExtensionRatio').checked);
        this.settingsManager.updateCornrowsSetting('tailCostPerInch', parseFloat(document.getElementById('cornrowsTailCostPerInch').value));
        this.settingsManager.updateCornrowsSetting('tailRatioCurve', parseFloat(document.getElementById('cornrowsTailRatio').value));
        this.settingsManager.updateCornrowsSetting('enableTailRatio', document.getElementById('cornrowsEnableTailRatio').checked);
        this.settingsManager.updateCornrowsSetting('enableAdvancedBasePrice', document.getElementById('cornrowsEnableAdvancedBasePrice').checked);
        this.settingsManager.updateCornrowsSetting('advancedBaseRatio', parseFloat(document.getElementById('cornrowsAdvancedBaseRatio').value));
        
        // Update price preview
        this.updatePricePreview();
        
        // Show success feedback
        this.showButtonFeedback(this.saveSettingsBtn, 'Saved!', 'bg-green-600', 'hover:bg-green-700', 'bg-green-800');
    }

    resetAllSettings() {
        this.settingsManager.resetToDefaults();
        this.loadSettingsToUI();
        
        // Show success feedback
        this.showButtonFeedback(this.resetAllSettingsBtn, 'Reset!', 'bg-red-600', 'hover:bg-red-700', 'bg-red-800');
    }

    resetCornrowsSettingsOnly() {
        // Reset only cornrows settings to defaults
        const defaults = this.settingsManager.defaultSettings.cornrows;
        
        Object.keys(defaults).forEach(key => {
            this.settingsManager.updateCornrowsSetting(key, defaults[key]);
        });
        
        this.loadSettingsToUI();
        
        // Show success feedback
        this.showButtonFeedback(this.resetCornrowsBtn, 'Reset!', 'bg-gray-600', 'hover:bg-gray-700', 'bg-gray-800');
    }

    showButtonFeedback(button, feedbackText, originalBg, originalHover, feedbackBg) {
        const originalText = button.textContent;
        button.textContent = feedbackText;
        button.classList.remove(originalBg, originalHover);
        button.classList.add(feedbackBg);
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove(feedbackBg);
            button.classList.add(originalBg, originalHover);
        }, 1500);
    }

    setupCollapsibleSections() {
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
        
        // Remove any existing event listeners to prevent duplicates
        const newHeader = cornrowsHeader.cloneNode(true);
        cornrowsHeader.parentNode.replaceChild(newHeader, cornrowsHeader);
        
        // Add click handler for collapsible functionality
        newHeader.addEventListener('click', () => {
            const isHidden = cornrowsContent.classList.contains('hidden');
            
            if (isHidden) {
                cornrowsContent.classList.remove('hidden');
                cornrowsIcon.style.transform = 'rotate(180deg)';
            } else {
                cornrowsContent.classList.add('hidden');
                cornrowsIcon.style.transform = 'rotate(0deg)';
            }
        });
    }

    setupRatioCurveToggle(checkboxId, containerId) {
        const checkbox = document.getElementById(checkboxId);
        const container = document.getElementById(containerId);
        
        if (checkbox && container) {
            const toggleVisibility = () => {
                if (checkbox.checked) {
                    container.classList.remove('hidden');
                } else {
                    container.classList.add('hidden');
                }
                // Update price preview when visibility changes
                this.updatePricePreview();
            };
            
            // Set initial state
            toggleVisibility();
            
            // Remove any existing event listeners first
            if (checkbox._toggleVisibility) {
                checkbox.removeEventListener('change', checkbox._toggleVisibility);
            }
            
            // Store the function reference for later removal
            checkbox._toggleVisibility = toggleVisibility;
            
            // Add the event listener
            checkbox.addEventListener('change', toggleVisibility);
        }
    }

    setupSettingsInputListeners() {
        // Add event listeners to all cornrows settings inputs for real-time preview updates
        const settingsInputs = [
            'cornrowsBasePrice',
            'cornrowsExtraRowCost',
            'cornrowsExtraRowRatio',
            'cornrowsEnableExtraRowRatio',
            'cornrowsExtensionCost',
            'cornrowsExtensionRatio',
            'cornrowsEnableExtensionRatio',
            'cornrowsTailCostPerInch',
            'cornrowsTailRatio',
            'cornrowsEnableTailRatio'
        ];

        settingsInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                const eventType = input.type === 'checkbox' ? 'change' : 'input';
                input.addEventListener(eventType, () => this.updatePricePreview());
            }
        });
    }

    async updatePricePreview() {
        if (!this.previewPriceElement) return;

        try {
            // Import the calculatePrice function
            const { calculatePrice } = await import('./calculator.js');
            
            // Get current form values (main calculator form, not settings)
            const braidStyleSelect = document.getElementById('braidStyle');
            const cornrowRowsSelect = document.getElementById('cornrowRows');
            
            // Only show preview for cornrows styles
            if (!braidStyleSelect || !braidStyleSelect.value || 
                (braidStyleSelect.value !== 'cornrows' && braidStyleSelect.value !== 'updoCornrows')) {
                this.previewPriceElement.textContent = 'N/A (select cornrows)';
                return;
            }

            // Temporarily apply the current settings inputs to get preview calculation
            const originalSettings = this.settingsManager.getCornrowsSettings();
            
            // Get current input values from the settings form
            const previewSettings = {
                basePrice: parseFloat(document.getElementById('cornrowsBasePrice').value) || 0,
                extraRowCost: parseFloat(document.getElementById('cornrowsExtraRowCost').value) || 0,
                extraRowRatioCurve: parseFloat(document.getElementById('cornrowsExtraRowRatio').value) || 1,
                enableExtraRowRatio: document.getElementById('cornrowsEnableExtraRowRatio').checked,
                extensionCost: parseFloat(document.getElementById('cornrowsExtensionCost').value) || 0,
                extensionRatioCurve: parseFloat(document.getElementById('cornrowsExtensionRatio').value) || 1,
                enableExtensionRatio: document.getElementById('cornrowsEnableExtensionRatio').checked,
                tailCostPerInch: parseFloat(document.getElementById('cornrowsTailCostPerInch').value) || 0,
                tailRatioCurve: parseFloat(document.getElementById('cornrowsTailRatio').value) || 1,
                enableTailRatio: document.getElementById('cornrowsEnableTailRatio').checked
            };

            // Temporarily update settings for calculation
            Object.keys(previewSettings).forEach(key => {
                this.settingsManager.updateCornrowsSetting(key, previewSettings[key]);
            });

            // Trigger calculation with temporary settings
            calculatePrice();
            
            // Get the calculated price from the main display
            const estimatedPriceElement = document.getElementById('estimatedPrice');
            const currentPrice = estimatedPriceElement ? estimatedPriceElement.textContent : '€0.00';
            
            // Update preview display
            this.previewPriceElement.textContent = currentPrice;

            // Restore original settings
            Object.keys(originalSettings).forEach(key => {
                this.settingsManager.updateCornrowsSetting(key, originalSettings[key]);
            });

        } catch (error) {
            console.error('Error updating price preview:', error);
            this.previewPriceElement.textContent = 'Error';
        }
    }
}

// Create and export a singleton instance
export const settingsModal = new SettingsModal();
