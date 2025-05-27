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
        braidStyleLabel: "Braid Style:",
        headCoverageLabel: "Head Coverage:",
        cornrowRowsLabel: "Number of Cornrows:",
        divisionSizeLabel: "Division Size:",
        mixPercentageLabel: "Percentage of Cornrows:",
        mixPercentageHint: "The rest is Box Braids.",
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
        hc_mohawk: "Mohawk Area (approx 30%)",
        hc_topBackOneSide: "Top, Back, and One Side (approx 85%)",
        // Division Sizes
        div_small: "Small (<1.5cm side)",
        div_medium: "Medium (1.5-2.5cm side)",
        div_large: "Large (>2.5cm side)",
        // Extensions
        ext_little: "Little",
        ext_normal: "Normal",
        ext_aLot: "A Lot",
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
        bd_added: "added",
        bd_fixedCosts: "Fixed Costs (Product & Polishing)",
        bd_selectStyle: "Please select a braid style.",
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
        braidStyleLabel: "Estilo de Trenza:",
        headCoverageLabel: "Cobertura de Cabeza:",
        cornrowRowsLabel: "Número de Trenzas Pegadas:",
        divisionSizeLabel: "Tamaño de División:",
        mixPercentageLabel: "Porcentaje de Trenzas Pegadas:",
        mixPercentageHint: "El resto son Trenzas Sueltas.",
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
        hc_mohawk: "Zona Mohawk (aprox 30%)",
        hc_topBackOneSide: "Arriba, Detrás y Un Lado (aprox 85%)",
        // Division Sizes
        div_small: "Pequeño (<1.5cm lado)",
        div_medium: "Mediano (1.5-2.5cm lado)",
        div_large: "Grande (>2.5cm lado)",
        // Extensions
        ext_little: "Pocas",
        ext_normal: "Normal",
        ext_aLot: "Muchas",
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
        bd_added: "añadido",
        bd_fixedCosts: "Costos Fijos (Producto y Acabado)",
        bd_selectStyle: "Por favor, seleccione un estilo de trenza.",
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
}
