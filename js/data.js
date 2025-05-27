// Data definitions for braid styles, options, and pricing
export const braidStylesData = {
    cornrows: { 
        nameKey: "style_cornrows", 
        hasRows: true, 
        hasDivisions: false, 
        baseLaborPrice: 12.75, 
        laborPricePerRow: 5, 
        baseTime: 1.5, 
        timePerRow: 0.25 
    },
    boxBraids: {
        nameKey: "style_boxBraids", 
        hasRows: false, 
        hasDivisions: true, 
        baseLaborPriceMediumFull: 70, 
        baseTimeMediumFull: 5,
        divisionOptions: {
            small: { nameKey: "div_small", priceFactor: 1.6, timeFactor: 1.6 },
            medium: { nameKey: "div_medium", priceFactor: 1.0, timeFactor: 1.0 },
            large: { nameKey: "div_large", priceFactor: 0.75, timeFactor: 0.75 },
        },
    },
    bohemianBraids: {
        nameKey: "style_bohemianBraids", 
        hasRows: false, 
        hasDivisions: true, 
        baseLaborPriceMediumFull: 80, 
        baseTimeMediumFull: 5.5,
        divisionOptions: {
            small: { nameKey: "div_small", priceFactor: 1.6, timeFactor: 1.6 },
            medium: { nameKey: "div_medium", priceFactor: 1.0, timeFactor: 1.0 },
            large: { nameKey: "div_large", priceFactor: 0.75, timeFactor: 0.75 },
        },
        curlyHairMaterialCost: 15, 
        curlyHairTimeAdded: 0.75,
    },
    mixBraids: { 
        nameKey: "style_mixBraids", 
        hasRows: true, 
        hasDivisions: true 
    }
};

export const headCoverageOptions = {
    full: { nameKey: "hc_full", multiplier: 1.0 },
    topOnly: { nameKey: "hc_topOnly", multiplier: 0.4 },
    topAndBack: { nameKey: "hc_topAndBack", multiplier: 0.7 },
    mohawk: { nameKey: "hc_mohawk", multiplier: 0.3 },
    topBackOneSide: { nameKey: "hc_topBackOneSide", multiplier: 0.85 },
};

export const extensionOptions = {
    little: { nameKey: "ext_little", cost: 10, timeAdded: 0.75 },
    normal: { nameKey: "ext_normal", cost: 20, timeAdded: 1.25 },
    aLot: { nameKey: "ext_aLot", cost: 30, timeAdded: 1.75 },
};

export const HOURLY_RATE_FOR_EXTENSIONS_LABOR = 15;

export const fixedCosts = { 
    product: 5.25, 
    polishing: 2 
};
