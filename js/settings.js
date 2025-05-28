// Settings management system
export class SettingsManager {
    constructor() {
        this.storageKey = 'braidCalculatorSettings';
        this.defaultSettings = {
            cornrows: {
                basePrice: 12.75,
                extraRowCost: 5.0,
                extraRowRatioCurve: 0.9,
                enableExtraRowRatio: false,
                extensionCost: 10.0,
                extensionRatioCurve: 0.95,
                enableExtensionRatio: false,
                tailCostPerInch: 0.5,
                tailRatioCurve: 0.98,
                enableTailRatio: false
            }
        };
        
        this.settings = this.loadSettings();
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with defaults to ensure all settings exist
                return this.mergeWithDefaults(parsed);
            }
        } catch (error) {
            console.warn('Failed to load settings from localStorage:', error);
        }
        
        return { ...this.defaultSettings };
    }
    
    mergeWithDefaults(saved) {
        const merged = { ...this.defaultSettings };
        
        // Deep merge cornrows settings
        if (saved.cornrows) {
            merged.cornrows = { ...this.defaultSettings.cornrows, ...saved.cornrows };
        }
        
        return merged;
    }
    
    saveSettings() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Failed to save settings to localStorage:', error);
        }
    }
    
    getCornrowsSettings() {
        return this.settings.cornrows;
    }
    
    updateCornrowsSetting(key, value) {
        this.settings.cornrows[key] = value;
        this.saveSettings();
        
        // Trigger a custom event so other parts of the app can react
        window.dispatchEvent(new CustomEvent('settingsChanged', {
            detail: { section: 'cornrows', key, value }
        }));
    }
    
    resetToDefaults() {
        this.settings = { ...this.defaultSettings };
        this.saveSettings();
        
        window.dispatchEvent(new CustomEvent('settingsReset'));
    }
}

// Create a global instance
export const settingsManager = new SettingsManager();
