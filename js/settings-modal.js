// Settings Modal Management
// Handles the settings modal UI, including opening/closing, loading/saving settings, and form interactions

export class SettingsModal {
    constructor() {
        this.modal = null;
        this.settingsManager = null;
        this.isInitialized = false;
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
        
        // Update ratio curve visibility
        this.setupRatioCurveToggle('cornrowsEnableExtraRowRatio', 'extraRowRatioContainer');
        this.setupRatioCurveToggle('cornrowsEnableExtensionRatio', 'extensionRatioContainer');
        this.setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
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
        
        // Set up ratio curve visibility toggles
        this.setupRatioCurveToggle('cornrowsEnableExtraRowRatio', 'extraRowRatioContainer');
        this.setupRatioCurveToggle('cornrowsEnableExtensionRatio', 'extensionRatioContainer');
        this.setupRatioCurveToggle('cornrowsEnableTailRatio', 'tailRatioContainer');
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
            };
            
            // Set initial state
            toggleVisibility();
            
            // Remove existing listeners and add new one
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);
            newCheckbox.addEventListener('change', toggleVisibility);
        }
    }
}

// Create and export a singleton instance
export const settingsModal = new SettingsModal();
