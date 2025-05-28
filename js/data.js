// Data definitions for braid styles, options, and pricing
export const braidStylesData = {
    ropeBraid: { 
        nameKey: "style_ropeBraid", 
        hasRows: false, 
        hasDivisions: false, 
        baseLaborPrice: 25, 
        baseTime: 2 
    },
    boxBraids: {
        nameKey: "style_boxBraids", 
        hasRows: false, 
        hasDivisions: true, 
        hasTailLength: true,
        baseLaborPriceMediumFull: 70, 
        baseTimeMediumFull: 5,
        divisionOptions: {
            small: { nameKey: "div_small", priceFactor: 1.6, timeFactor: 1.6 },
            medium: { nameKey: "div_medium", priceFactor: 1.0, timeFactor: 1.0 },
            large: { nameKey: "div_large", priceFactor: 0.75, timeFactor: 0.75 },
        },
    },
    cornrows: { 
        nameKey: "style_cornrows", 
        hasRows: true, 
        hasDivisions: false, 
        hasTailLength: true,
        baseLaborPrice: 12.75, 
        laborPricePerRow: 5, 
        baseTime: 1.5, 
        timePerRow: 0.25 
    },
    fulaniBraids: {
        nameKey: "style_fulaniBraids", 
        hasRows: false, 
        hasDivisions: false, 
        baseLaborPrice: 85, 
        baseTime: 6
    },
    updoCornrows: { 
        nameKey: "style_updoCornrows", 
        hasRows: true, 
        hasDivisions: false, 
        baseLaborPrice: 35, 
        laborPricePerRow: 3, 
        baseTime: 3, 
        timePerRow: 0.2 
    },
    crochetBraids: {
        nameKey: "style_crochetBraids", 
        hasRows: false, 
        hasDivisions: false, 
        baseLaborPrice: 45, 
        baseTime: 3.5
    },
    bohemianBraids: {
        nameKey: "style_bohemianBraids", 
        hasRows: false, 
        hasDivisions: true, 
        hasCurlAddon: true,
        hasTailLength: true,
        baseLaborPriceMediumFull: 80, 
        baseTimeMediumFull: 6,
        curlAddonPrice: 15,
        curlAddonTime: 1,
        divisionOptions: {
            small: { nameKey: "div_small", priceFactor: 1.6, timeFactor: 1.6 },
            medium: { nameKey: "div_medium", priceFactor: 1.0, timeFactor: 1.0 },
            large: { nameKey: "div_large", priceFactor: 0.75, timeFactor: 0.75 },
        },
    }
};

export const headCoverageOptions = {
    full: { nameKey: "hc_full", multiplier: 1.0 },
    topOnly: { nameKey: "hc_topOnly", multiplier: 0.4 },
    topAndBack: { nameKey: "hc_topAndBack", multiplier: 0.7 },
    mohawk: { nameKey: "hc_mohawk", multiplier: 0.5 },
    topBackOneSide: { nameKey: "hc_topBackOneSide", multiplier: 0.80 },
};

// Hair characteristics - affecting pricing with 1.0 ratio for now
export const hairKindOptions = {
    afro: { nameKey: "hairKind_afro", priceFactor: 1.0, timeFactor: 1.0 },
    semiAfro: { nameKey: "hairKind_semiAfro", priceFactor: 1.0, timeFactor: 1.0 },
    curly: { nameKey: "hairKind_curly", priceFactor: 1.0, timeFactor: 1.0 },
    semiCurly: { nameKey: "hairKind_semiCurly", priceFactor: 1.0, timeFactor: 1.0 },
    wavy: { nameKey: "hairKind_wavy", priceFactor: 1.0, timeFactor: 1.0 },
    straight: { nameKey: "hairKind_straight", priceFactor: 1.0, timeFactor: 1.0 }
};

export const hairDensityOptions = {
    veryLow: { nameKey: "hairDensity_veryLow", priceFactor: 1.0, timeFactor: 1.0 },
    low: { nameKey: "hairDensity_low", priceFactor: 1.0, timeFactor: 1.0 },
    medium: { nameKey: "hairDensity_medium", priceFactor: 1.0, timeFactor: 1.0 },
    high: { nameKey: "hairDensity_high", priceFactor: 1.0, timeFactor: 1.0 },
    veryHigh: { nameKey: "hairDensity_veryHigh", priceFactor: 1.0, timeFactor: 1.0 }
};

export const hairLengthOptions = {
    extremelyShort: { nameKey: "hairLength_extremelyShort", inches: "<2", priceFactor: 1.0, timeFactor: 1.0 },
    short: { nameKey: "hairLength_short", inches: "2-4", priceFactor: 1.0, timeFactor: 1.0 },
    normalForBraids: { nameKey: "hairLength_normalForBraids", inches: ">4", priceFactor: 1.0, timeFactor: 1.0 },
    extraLarge: { nameKey: "hairLength_extraLarge", inches: ">10", priceFactor: 1.0, timeFactor: 1.0 }
};

export const extensionOptions = {
    little: { nameKey: "ext_little", cost: 5, timeAdded: 0.25 },
    normal: { nameKey: "ext_normal", cost: 10, timeAdded: 0.5 },
    aLot: { nameKey: "ext_aLot", cost: 15, timeAdded: 0.75 },
};

// Braid tail length options - reusable across styles that support loose hanging braids
export const braidTailLengthOptions = {
    0: { nameKey: "tailLength_0", inches: 0, priceFactor: 1.0, timeFactor: 1.0 },
    1: { nameKey: "tailLength_1", inches: 1, priceFactor: 1.05, timeFactor: 1.02 },
    2: { nameKey: "tailLength_2", inches: 2, priceFactor: 1.1, timeFactor: 1.05 },
    3: { nameKey: "tailLength_3", inches: 3, priceFactor: 1.15, timeFactor: 1.08 },
    4: { nameKey: "tailLength_4", inches: 4, priceFactor: 1.2, timeFactor: 1.1 },
    5: { nameKey: "tailLength_5", inches: 5, priceFactor: 1.25, timeFactor: 1.15 },
    8: { nameKey: "tailLength_8", inches: 8, priceFactor: 1.4, timeFactor: 1.25 },
    12: { nameKey: "tailLength_12", inches: 12, priceFactor: 1.6, timeFactor: 1.4 },
    16: { nameKey: "tailLength_16", inches: 16, priceFactor: 1.8, timeFactor: 1.6 },
    20: { nameKey: "tailLength_20", inches: 20, priceFactor: 2.0, timeFactor: 1.8 },
    24: { nameKey: "tailLength_24", inches: 24, priceFactor: 2.3, timeFactor: 2.0 },
    28: { nameKey: "tailLength_28", inches: 28, priceFactor: 2.6, timeFactor: 2.3 },
    30: { nameKey: "tailLength_30", inches: 30, priceFactor: 2.8, timeFactor: 2.5 },
};

export const cornrowsTailLengthOptions = {
    0: { nameKey: "tailLength_0", inches: 0, priceFactor: 1.0, timeFactor: 1.0 },
    1: { nameKey: "tailLength_1", inches: 1, priceFactor: 1.02, timeFactor: 1.01 },
    2: { nameKey: "tailLength_2", inches: 2, priceFactor: 1.04, timeFactor: 1.02 },
    3: { nameKey: "tailLength_3", inches: 3, priceFactor: 1.06, timeFactor: 1.03 },
    4: { nameKey: "tailLength_4", inches: 4, priceFactor: 1.08, timeFactor: 1.04 },
    5: { nameKey: "tailLength_5", inches: 5, priceFactor: 1.10, timeFactor: 1.05 },
    8: { nameKey: "tailLength_8", inches: 8, priceFactor: 1.15, timeFactor: 1.08 },
    12: { nameKey: "tailLength_12", inches: 12, priceFactor: 1.25, timeFactor: 1.12 },
    16: { nameKey: "tailLength_16", inches: 16, priceFactor: 1.35, timeFactor: 1.18 },
    20: { nameKey: "tailLength_20", inches: 20, priceFactor: 1.45, timeFactor: 1.25 },
    24: { nameKey: "tailLength_24", inches: 24, priceFactor: 1.55, timeFactor: 1.32 },
    28: { nameKey: "tailLength_28", inches: 28, priceFactor: 1.65, timeFactor: 1.40 },
    30: { nameKey: "tailLength_30", inches: 30, priceFactor: 1.70, timeFactor: 1.45 },
};

export const HOURLY_RATE_FOR_EXTENSIONS_LABOR = 15;

export const fixedCosts = { 
    product: 5.25, 
    polishing: 2 
};

// Cornrows-specific configuration for easy adjustment
export const cornrowsConfig = {
    // Short hair surcharge (flat fee)
    shortHairSurcharge: 10,
    
    // Minimal extension cost (when hair is normal, tail ≤3 inches, little extensions) - reduced per request
    minimalExtensionCost: 2,
    
    // Number of rows impact on time (easily configurable)
    rowTimeFactors: {
        baseRows: 5,           // Base number of rows (no time penalty)
        timeIncreasePerRow: 0.08  // 8% time increase per additional row above base
    },
    
    // Extension costs for cornrows (easily configurable) - kept very low per request
    extensionCosts: {
        little: { baseCost: 2, baseTime: 0.3 },   // Very minimal cost
        normal: { baseCost: 3, baseTime: 0.4 },   // Slightly more
        aLot: { baseCost: 5, baseTime: 0.5 }      // Maximum 5 euros as requested
    },
    
    // Row complexity factors (easily configurable)
    rowComplexityFactors: {
        baseRows: 4,              // Base number of rows
        priceIncreasePerRow: 0.10, // 10% price increase per additional row
        timeIncreasePerRow: 0.08   // 8% time increase per additional row
    },
    
    // Tail length impact on extensions (easily configurable)
    tailLengthFactors: {
        baseTailLength: 3,        // Base tail length (no penalty)
        priceIncreasePerInch: 0.15, // 15% price increase per inch above base
        timeIncreasePerInch: 0.10   // 10% time increase per inch above base
    }
};
