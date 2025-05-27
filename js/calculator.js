// Price calculation logic
import { braidStylesData, headCoverageOptions, extensionOptions, braidTailLengthOptions, hairKindOptions, hairDensityOptions, hairLengthOptions, HOURLY_RATE_FOR_EXTENSIONS_LABOR, fixedCosts } from './data.js';
import { translate } from './translations.js';

export function calculatePrice() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const hairKindSelect = document.getElementById('hairKind');
    const hairDensitySelect = document.getElementById('hairDensity');
    const hairLengthSelect = document.getElementById('hairLength');
    const headCoverageSelect = document.getElementById('headCoverage');
    const cornrowRowsInput = document.getElementById('cornrowRows');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const braidTailLengthSelect = document.getElementById('braidTailLength');
    const mixPercentageInput = document.getElementById('mixPercentage');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    const extensionAmountSelect = document.getElementById('extensionAmount');
    const needsCurlsCheckbox = document.getElementById('needsCurls');
    const estimatedPriceSpan = document.getElementById('estimatedPrice');
    const estimatedTimeSpan = document.getElementById('estimatedTime');
    const priceBreakdownDiv = document.getElementById('priceBreakdown');

    if (!braidStyleSelect.value) {
        estimatedPriceSpan.textContent = "€0.00";
        estimatedTimeSpan.textContent = "0";
        priceBreakdownDiv.innerHTML = `<p>${translate('bd_selectStyle')}</p>`;
        return;
    }

    const selectedStyleKey = braidStyleSelect.value;
    const styleData = braidStylesData[selectedStyleKey];
    const headCoverage = headCoverageOptions[headCoverageSelect.value];
    const hairKind = hairKindOptions[hairKindSelect.value];
    const hairDensity = hairDensityOptions[hairDensitySelect.value];
    const hairLength = hairLengthOptions[hairLengthSelect.value];

    let baseLabor = 0;
    let baseTime = 0;
    let materialCosts = 0;
    let breakdownHtml = "";

    // Calculate base costs based on style
    if (selectedStyleKey === 'cornrows' || selectedStyleKey === 'updoCornrows') {
        const result = calculateCornrowsCost(styleData, cornrowRowsInput);
        baseLabor = result.labor;
        baseTime = result.time;
        breakdownHtml += result.breakdown;
    } else if (selectedStyleKey === 'boxBraids' || selectedStyleKey === 'bohemianBraids') {
        const result = calculateStandardBraidsCost(selectedStyleKey, styleData, divisionSizeSelect, needsCurlsCheckbox);
        baseLabor = result.labor;
        baseTime = result.time;
        materialCosts += result.materialCosts;
        breakdownHtml += result.breakdown;
    } else {
        // Simple styles without rows or divisions (ropeBraid, fulaniBraids, crochetBraids)
        baseLabor = styleData.baseLaborPrice;
        baseTime = styleData.baseTime;
        breakdownHtml += `<p>${translate(styleData.nameKey)}: €${baseLabor.toFixed(2)} (${baseTime.toFixed(1)}h)</p>`;
    }

    // Apply head coverage adjustment
    let adjustedLabor = baseLabor * headCoverage.multiplier;
    let adjustedTime = baseTime * headCoverage.multiplier;

    // Apply hair characteristics adjustments (currently set to 1.0 ratio as requested)
    adjustedLabor = adjustedLabor * hairKind.priceFactor * hairDensity.priceFactor * hairLength.priceFactor;
    adjustedTime = adjustedTime * hairKind.timeFactor * hairDensity.timeFactor * hairLength.timeFactor;

    if (headCoverage.multiplier !== 1.0) {
        breakdownHtml += `<p>${translate('bd_headCoverage')} (${translate(headCoverage.nameKey)} - ${headCoverage.multiplier*100}%): ${translate('bd_labor')} €${adjustedLabor.toFixed(2)}, ${adjustedTime.toFixed(1)}h</p>`;
    } else {
        breakdownHtml += `<p>${translate('bd_styleLaborFull')}: €${adjustedLabor.toFixed(2)}, ${adjustedTime.toFixed(1)}h</p>`;
    }

    // Apply braid tail length adjustment for styles that support it
    if (styleData.hasTailLength && braidTailLengthSelect.value) {
        const tailLengthResult = calculateTailLengthCost(adjustedLabor, adjustedTime, braidTailLengthSelect);
        adjustedLabor = tailLengthResult.labor;
        adjustedTime = tailLengthResult.time;
        if (tailLengthResult.breakdown) {
            breakdownHtml += tailLengthResult.breakdown;
        }
    }

    // Calculate extensions
    if (needsExtensionsCheckbox.checked) {
        const extensionResult = calculateExtensionsCost(extensionAmountSelect);
        materialCosts += extensionResult.materialCosts;
        adjustedTime += extensionResult.timeAdded;
        adjustedLabor += extensionResult.laborCosts;
        breakdownHtml += extensionResult.breakdown;
    }

    // Add fixed costs
    const totalFixedCosts = fixedCosts.product + fixedCosts.polishing;
    materialCosts += totalFixedCosts;
    breakdownHtml += `<p>${translate('bd_fixedCosts')}: €${totalFixedCosts.toFixed(2)}</p>`;

    const finalPrice = adjustedLabor + materialCosts;

    estimatedPriceSpan.textContent = `€${finalPrice.toFixed(2)}`;
    estimatedTimeSpan.textContent = `${adjustedTime.toFixed(1)}`;
    priceBreakdownDiv.innerHTML = breakdownHtml;
}

function calculateCornrowsCost(styleData, cornrowRowsInput) {
    const rows = parseInt(cornrowRowsInput.value) || 0;
    const labor = styleData.baseLaborPrice + (rows * styleData.laborPricePerRow);
    const time = styleData.baseTime + (rows * styleData.timePerRow);
    const breakdown = `<p>${translate('bd_cornrowsLabor')} (${rows} ${translate('bd_rows')}): €${labor.toFixed(2)} (${time.toFixed(1)}h)</p>`;
    
    return { labor, time, breakdown };
}

function calculateStandardBraidsCost(selectedStyleKey, styleData, divisionSizeSelect, needsCurlsCheckbox) {
    const division = styleData.divisionOptions[divisionSizeSelect.value];
    const labor = styleData.baseLaborPriceMediumFull * division.priceFactor;
    const time = styleData.baseTimeMediumFull * division.timeFactor;
    let materialCosts = 0;
    let breakdown = `<p>${translate(styleData.nameKey)} (${translate('bd_division')}: ${translate(division.nameKey)}): €${labor.toFixed(2)} (${time.toFixed(1)}h)</p>`;
    
    let totalLabor = labor;
    let totalTime = time;

    // Add curl add-on if selected for Bohemian Braids
    if (selectedStyleKey === 'bohemianBraids' && needsCurlsCheckbox && needsCurlsCheckbox.checked) {
        const curlPrice = styleData.curlAddonPrice;
        const curlTime = styleData.curlAddonTime;
        totalLabor += curlPrice;
        totalTime += curlTime;
        breakdown += `<p>${translate('bd_bohemianCurls')}: €${curlPrice.toFixed(2)} (${curlTime.toFixed(1)}h)</p>`;
    }

    return { 
        labor: totalLabor, 
        time: totalTime, 
        materialCosts, 
        breakdown 
    };
}

function calculateMixBraidsCost(mixPercentageInput, cornrowRowsInput, divisionSizeSelect) {
    const cornrowPercent = parseInt(mixPercentageInput.value) / 100;
    const boxBraidPercent = 1 - cornrowPercent;
    const cornrowsStyleData = braidStylesData.cornrows;
    const numCornrows = parseInt(cornrowRowsInput.value) || 0;
    const boxBraidsStyleData = braidStylesData.boxBraids;
    const division = boxBraidsStyleData.divisionOptions[divisionSizeSelect.value];

    const cornrowPartLabor = (cornrowsStyleData.baseLaborPrice + (numCornrows * cornrowsStyleData.laborPricePerRow)) * cornrowPercent;
    const cornrowPartTime = (cornrowsStyleData.baseTime + (numCornrows * cornrowsStyleData.timePerRow)) * cornrowPercent;
    const boxBraidPartLabor = (boxBraidsStyleData.baseLaborPriceMediumFull * division.priceFactor) * boxBraidPercent;
    const boxBraidPartTime = (boxBraidsStyleData.baseTimeMediumFull * division.timeFactor) * boxBraidPercent;

    let breakdown = '';
    if (cornrowPercent > 0) {
        breakdown += `<p>${translate('bd_mixCornrows')} (${(cornrowPercent*100).toFixed(0)}%, ${numCornrows} ${translate('bd_rows')}): €${cornrowPartLabor.toFixed(2)} (${cornrowPartTime.toFixed(1)}h)</p>`;
    }
    if (boxBraidPercent > 0) {
        breakdown += `<p>${translate('bd_mixBoxBraids')} (${(boxBraidPercent*100).toFixed(0)}%, ${translate('bd_division')}: ${translate(division.nameKey)}): €${boxBraidPartLabor.toFixed(2)} (${boxBraidPartTime.toFixed(1)}h)</p>`;
    }

    return {
        labor: cornrowPartLabor + boxBraidPartLabor,
        time: cornrowPartTime + boxBraidPartTime,
        breakdown
    };
}

function calculateExtensionsCost(extensionAmountSelect) {
    const selectedExtension = extensionOptions[extensionAmountSelect.value];
    if (!selectedExtension) {
        return { materialCosts: 0, timeAdded: 0, laborCosts: 0, breakdown: '' };
    }

    const materialCosts = selectedExtension.cost;
    const timeAdded = selectedExtension.timeAdded;
    const laborCosts = timeAdded * HOURLY_RATE_FOR_EXTENSIONS_LABOR;
    const breakdown = `<p>${translate('bd_extensions')} (${translate(selectedExtension.nameKey)}): €${materialCosts.toFixed(2)} (${translate('bd_material')}) + €${laborCosts.toFixed(2)} (${translate('bd_labor')}), ${timeAdded.toFixed(1)}h ${translate('bd_added')}</p>`;

    return { materialCosts, timeAdded, laborCosts, breakdown };
}

function calculateTailLengthCost(currentLabor, currentTime, braidTailLengthSelect) {
    const tailLengthKey = braidTailLengthSelect.value;
    const tailLength = braidTailLengthOptions[tailLengthKey];
    
    if (!tailLength || tailLength.inches === 0) {
        return { labor: currentLabor, time: currentTime, breakdown: '' };
    }

    const adjustedLabor = currentLabor * tailLength.priceFactor;
    const adjustedTime = currentTime * tailLength.timeFactor;
    
    const priceDiff = adjustedLabor - currentLabor;
    const timeDiff = adjustedTime - currentTime;
    
    let breakdown = '';
    if (priceDiff > 0.01 || timeDiff > 0.01) {
        breakdown = `<p>${translate('bd_braidTailLength')} (${translate(tailLength.nameKey)}): +€${priceDiff.toFixed(2)}, +${timeDiff.toFixed(1)}h</p>`;
    }

    return { labor: adjustedLabor, time: adjustedTime, breakdown };
}
