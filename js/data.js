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

export const extensionOptions = {
    little: { nameKey: "ext_little", cost: 10, timeAdded: 0.75 },
    normal: { nameKey: "ext_normal", cost: 20, timeAdded: 1.25 },
    aLot: { nameKey: "ext_aLot", cost: 30, timeAdded: 1.75 },
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

export const HOURLY_RATE_FOR_EXTENSIONS_LABOR = 15;

export const fixedCosts = { 
    product: 5.25, 
    polishing: 2 
};
