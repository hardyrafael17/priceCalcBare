// Translation system for the braid cost estimator
export const translations = {
    en: {
        pageTitle: "Braid Cost Estimator",
        mainTitle: "Braid Service Cost Estimator",
        themeLabel: "Theme", 
        themeLight: "Light", 
        themeDark: "Dark", 
        themeSystem: "System",
        languageLabel: "Language", 
        langEN: "English", 
        langES: "Español",
        settingsLabel: "Settings",
        settingsTitle: "Settings",
        settingsClose: "Close",
        braidStyleLabel: "Braid Style:",
        hairKindLabel: "Hair Type:",
        hairDensityLabel: "Hair Density:",
        hairLengthLabel: "Hair Length:",
        headCoverageLabel: "Head Coverage:",
        cornrowRowsLabel: "Number of Cornrows:",
        divisionSizeLabel: "Division Size:",
        mixPercentageLabel: "Percentage of Cornrows:",
        mixPercentageHint: "The rest is Box Braids.",
        braidTailLengthLabel: "Braid Tail Length:",
        extensionsLabel: "Add Extensions?",
        extensionAmountLabel: "Amount:",
        curlAddonLabel: "Add Curls?",
        estimatedPriceLabel: "Estimated Price:",
        estimatedTimeLabel: "Estimated Time:",
        hoursUnit: " hours",
        selectOption: "Select an option",
        // Styles
        style_ropeBraid: "Rope Braid / Twist Braid / Two-Strand Twist",
        style_boxBraids: "Box Braids",
        style_cornrows: "Cornrows",
        style_fulaniBraids: "Fulani Braids",
        style_updoCornrows: "Updo Cornrows / Cornrow Ponytail",
        style_crochetBraids: "Crochet Braids",
        style_bohemianBraids: "Bohemian Braids / Box Braids with Curls",
        // Head Coverage
        hc_full: "Full Head",
        hc_topOnly: "Top Only (approx 40%)",
        hc_topAndBack: "Top and Back (approx 70%)",
        hc_mohawk: "Mohawk Area (approx 50%)",
        hc_topBackOneSide: "Top, Back, and One Side (approx 80%)",
        // Division Sizes
        div_small: "Small (<1.5cm side)",
        div_medium: "Medium (1.5-2.5cm side)",
        div_large: "Large (>2.5cm side)",
        // Extensions
        ext_little: "Little",
        ext_normal: "Normal",
        ext_aLot: "A Lot",
        // Hair Kind
        hairKind_afro: "Afro",
        hairKind_semiAfro: "Semi-Afro",
        hairKind_curly: "Curly",
        hairKind_semiCurly: "Semi-Curly",
        hairKind_wavy: "Wavy",
        hairKind_straight: "Straight",
        // Hair Density
        hairDensity_veryLow: "Very Low",
        hairDensity_low: "Low",
        hairDensity_medium: "Medium",
        hairDensity_high: "High",
        hairDensity_veryHigh: "Very High",
        // Hair Length
        hairLength_extremelyShort: "Extremely Short (less than 2 inches)",
        hairLength_short: "Short (2-4 inches)",
        hairLength_normalForBraids: "Normal for Braids (4+ inches)",
        hairLength_extraLarge: "Extra Large (10+ inches)",
        // Braid Tail Lengths
        tailLength_0: "0 inches (no tail)",
        tailLength_1: "1 inch",
        tailLength_2: "2 inches", 
        tailLength_3: "3 inches",
        tailLength_4: "4 inches",
        tailLength_5: "5 inches",
        tailLength_8: "8 inches (approximately shoulders)",
        tailLength_12: "12 inches (approximately mid-chest)",
        tailLength_16: "16 inches (approximately lower chest)",
        tailLength_20: "20 inches (approximately waist)",
        tailLength_24: "24 inches (approximately mid-back)",
        tailLength_28: "28 inches (approximately lower back)",
        tailLength_30: "30 inches (approximately tailbone)",
        // Breakdown
        bd_cornrowsLabor: "Cornrows Labor",
        bd_rows: "rows",
        bd_boxBraidsLabor: "Box Braids Labor",
        bd_bohemianLabor: "Bohemian Braids Labor",
        bd_division: "Division",
        bd_bohemianCurls: "Bohemian Curls Add-on",
        bd_material: "Material",
        bd_labor: "Labor",
        bd_mixCornrows: "Mix - Cornrows Part",
        bd_mixBoxBraids: "Mix - Box Braids Part",
        bd_headCoverage: "Head Coverage Adjustment",
        bd_styleLaborFull: "Style Labor (Full Head)",
        bd_extensions: "Extensions",
        bd_braidTailLength: "Braid Tail Length",
        bd_added: "added",
        bd_fixedCosts: "Fixed Costs (Product & Polishing)",
        bd_selectStyle: "Please select a braid style.",
        bd_shortHairSurcharge: "Short Hair Surcharge",
        bd_cornrowsMinimalExtensions: "Cornrows Minimal Extensions",
        bd_volumeOnly: "volume only",
        bd_cornrowsExtensions: "Cornrows Extensions",
        bd_cornrowsComplexity: "Cornrows Complexity",
        bd_extraRows: "extra rows",
        bd_base: "base",
        bd_cornrowsRowComplexity: "Row Complexity",
        bd_cornrowsTailComplexity: "Tail Length Complexity",
        bd_extraLength: "extra length",
        approximately: "approximately",
        cmWide: "cm wide",
        // Settings translations
        settings_cornrowsTitle: "Cornrows Settings",
        settings_resetSectionDefaults: "Reset Section Defaults",
        settings_basePrice: "Base Price (€)",
        settings_extraRowCost: "Cost per Extra Row (€)",
        settings_enableExtraRowPriceRatio: "Enable Extra Row Price Ratio Calculation",
        settings_ratio: "Ratio:",
        settings_ratioHint: "Lower = higher discount",
        settings_extensionCost: "Extension Cost (€)",
        settings_enableExtensionPriceRatio: "Enable Extension Price Ratio Calculation (by # of rows)",
        settings_tailCostPerInch: "Tail Cost per Inch (€)",
        settings_enableTailPriceRatio: "Enable Tail Price Ratio Calculation (by # of rows)",
        settings_enableAdvancedBasePrice: "Enable Advanced Base Price Calculation (by rows & tail length)",
        settings_advancedBaseHint: "Higher = more complex pricing",
        settings_previewCurrentSelection: "Preview with current selection:",
        settings_resetAllSettings: "Reset All Settings",
        settings_saveSettings: "Save Settings",
    },
    es: {
        pageTitle: "Estimador de Costo de Trenzas",
        mainTitle: "Estimador de Costo de Servicio de Trenzas",
        themeLabel: "Tema", 
        themeLight: "Claro", 
        themeDark: "Oscuro", 
        themeSystem: "Sistema",
        languageLabel: "Idioma", 
        langEN: "Inglés", 
        langES: "Spanish",
        settingsLabel: "Configuración",
        settingsTitle: "Configuración",
        settingsClose: "Cerrar",
        braidStyleLabel: "Estilo de Trenza:",
        hairKindLabel: "Tipo de Cabello:",
        hairDensityLabel: "Densidad del Cabello:",
        hairLengthLabel: "Longitud del Cabello:",
        headCoverageLabel: "Cobertura de Cabeza:",
        cornrowRowsLabel: "Número de Trenzas Pegadas:",
        divisionSizeLabel: "Tamaño de División:",
        mixPercentageLabel: "Porcentaje de Trenzas Pegadas:",
        mixPercentageHint: "El resto son Trenzas Sueltas.",
        braidTailLengthLabel: "Longitud de Cola de Trenzas:",
        extensionsLabel: "¿Añadir Extensiones?",
        extensionAmountLabel: "Cantidad:",
        curlAddonLabel: "¿Añadir Rizos?",
        estimatedPriceLabel: "Precio Estimado:",
        estimatedTimeLabel: "Tiempo Estimado:",
        hoursUnit: " horas",
        selectOption: "Seleccione una opción",
        // Styles
        style_ropeBraid: "Trenza Twist / Trenza de Cordón / Trenza de Dos Cabos",
        style_boxBraids: "Trenzas Sueltas / Trenzas de Caja / Trenzas Cuadradas",
        style_cornrows: "Boxeadoras / Cornrows / Trenzas Pegadas / Trenzas Cosidas",
        style_fulaniBraids: "Trenzas Fulani",
        style_updoCornrows: "Coleta de trenzas pegadas hacia arriba",
        style_crochetBraids: "Trenzas Crochet / Trenzas de Ganchillo",
        style_bohemianBraids: "Trenzas Bohemias / Trenzas Sueltas con Rizos",
        // Head Coverage
        hc_full: "Cabeza Completa",
        hc_topOnly: "Solo Arriba (aprox 40%)",
        hc_topAndBack: "Arriba y Detrás (aprox 70%)",
        hc_mohawk: "Zona Mohawk (aprox 50%)",
        hc_topBackOneSide: "Arriba, Detrás y Un Lado (aprox 80%)",
        // Division Sizes
        div_small: "Pequeño (<1.5cm lado)",
        div_medium: "Mediano (1.5-2.5cm lado)",
        div_large: "Grande (>2.5cm lado)",
        // Extensions
        ext_little: "Pocas",
        ext_normal: "Normal",
        ext_aLot: "Muchas",
        // Hair Kind
        hairKind_afro: "Afro",
        hairKind_semiAfro: "Semi-Afro",
        hairKind_curly: "Rizado",
        hairKind_semiCurly: "Semi-Rizado",
        hairKind_wavy: "Ondulado",
        hairKind_straight: "Liso",
        // Hair Density
        hairDensity_veryLow: "Muy Baja",
        hairDensity_low: "Baja",
        hairDensity_medium: "Media",
        hairDensity_high: "Alta",
        hairDensity_veryHigh: "Muy Alta",
        // Hair Length
        hairLength_extremelyShort: "Extremadamente Corto (menos de 2 pulgadas)",
        hairLength_short: "Corto (2-4 pulgadas)",
        hairLength_normalForBraids: "Normal para Trenzas (4+ pulgadas)",
        hairLength_extraLarge: "Extra Grande (10+ pulgadas)",
        // Braid Tail Lengths
        tailLength_0: "0 pulgadas (sin cola)",
        tailLength_1: "1 pulgada",
        tailLength_2: "2 pulgadas",
        tailLength_3: "3 pulgadas", 
        tailLength_4: "4 pulgadas",
        tailLength_5: "5 pulgadas",
        tailLength_8: "8 pulgadas (aproximadamente hombros)",
        tailLength_12: "12 pulgadas (aproximadamente pecho medio)",
        tailLength_16: "16 pulgadas (aproximadamente pecho bajo)",
        tailLength_20: "20 pulgadas (aproximadamente cintura)",
        tailLength_24: "24 pulgadas (aproximadamente espalda media)",
        tailLength_28: "28 pulgadas (aproximadamente espalda baja)",
        tailLength_30: "30 pulgadas (aproximadamente coxis)",
        // Breakdown
        bd_cornrowsLabor: "Mano de Obra Trenzas Pegadas",
        bd_rows: "filas",
        bd_boxBraidsLabor: "Mano de Obra Trenzas Sueltas",
        bd_bohemianLabor: "Mano de Obra Trenzas Bohemias",
        bd_division: "División",
        bd_bohemianCurls: "Añadido Rizos Bohemios",
        bd_material: "Material",
        bd_labor: "Mano de Obra",
        bd_mixCornrows: "Mixtas - Parte Pegadas",
        bd_mixBoxBraids: "Mixtas - Parte Sueltas",
        bd_headCoverage: "Ajuste Cobertura Cabeza",
        bd_styleLaborFull: "Mano de Obra Estilo (Completa)",
        bd_extensions: "Extensiones",
        bd_braidTailLength: "Longitud de Cola de Trenzas", 
        bd_added: "añadido",
        bd_fixedCosts: "Costos Fijos (Producto y Acabado)",
        bd_selectStyle: "Por favor, seleccione un estilo de trenza.",
        bd_shortHairSurcharge: "Recargo por Cabello Corto",
        bd_cornrowsMinimalExtensions: "Extensiones Mínimas para Trenzas Pegadas",
        bd_volumeOnly: "solo volumen",
        bd_cornrowsExtensions: "Extensiones para Trenzas Pegadas",
        bd_cornrowsComplexity: "Complejidad de Trenzas Pegadas",
        bd_extraRows: "filas extra",
        bd_base: "base",
        bd_cornrowsRowComplexity: "Complejidad de Filas",
        bd_cornrowsTailComplexity: "Complejidad de Longitud de Cola",
        bd_extraLength: "longitud extra",
        approximately: "aproximadamente",
        cmWide: "cm de ancho",
        // Settings translations
        settings_cornrowsTitle: "Configuración de Trenzas Pegadas",
        settings_resetSectionDefaults: "Restablecer Valores por Defecto de la Sección",
        settings_basePrice: "Precio Base (€)",
        settings_extraRowCost: "Costo por Fila Extra (€)",
        settings_enableExtraRowPriceRatio: "Activar Cálculo de Ratio de Precio por Filas Extra",
        settings_ratio: "Ratio:",
        settings_ratioHint: "Menor = mayor descuento",
        settings_extensionCost: "Costo de Extensiones (€)",
        settings_enableExtensionPriceRatio: "Activar Cálculo de Ratio de Precio de Extensiones (por # de filas)",
        settings_tailCostPerInch: "Costo de Cola por Pulgada (€)",
        settings_enableTailPriceRatio: "Activar Cálculo de Ratio de Precio de Cola (por # de filas)",
        settings_enableAdvancedBasePrice: "Activar Cálculo Avanzado de Precio Base (por filas y longitud de cola)",
        settings_advancedBaseHint: "Mayor = precio más complejo",
        settings_previewCurrentSelection: "Vista previa con selección actual:",
        settings_resetAllSettings: "Restablecer Todas las Configuraciones",
        settings_saveSettings: "Guardar Configuración",
    }
};

let currentLang = 'en';

export function translate(key) {
    return translations[currentLang][key] || key;
}

export function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

export function getCurrentLanguage() {
    return currentLang;
}

export function detectLanguage() {
    const storedLang = localStorage.getItem('language');
    if (storedLang && translations[storedLang]) {
        return storedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
}

export function updateAllText() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translation = translate(key);
        if (el.tagName === 'TITLE') {
            el.innerText = translation;
        } else {
            el.textContent = translation;
        }
    });

    // Handle title attributes
    document.querySelectorAll('[data-translate-title]').forEach(el => {
        const key = el.getAttribute('data-translate-title');
        const translation = translate(key);
        el.setAttribute('title', translation);
    });

    // Handle aria-label attributes
    document.querySelectorAll('[data-translate-aria-label]').forEach(el => {
        const key = el.getAttribute('data-translate-aria-label');
        const translation = translate(key);
        el.setAttribute('aria-label', translation);
    });
}
