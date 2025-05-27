// Price calculation logic
import { braidStylesData, headCoverageOptions, extensionOptions, HOURLY_RATE_FOR_EXTENSIONS_LABOR, fixedCosts } from './data.js';
import { translate } from './translations.js';

export function calculatePrice() {
    const braidStyleSelect = document.getElementById('braidStyle');
    const headCoverageSelect = document.getElementById('headCoverage');
    const cornrowRowsInput = document.getElementById('cornrowRows');
    const divisionSizeSelect = document.getElementById('divisionSize');
    const mixPercentageInput = document.getElementById('mixPercentage');
    const needsExtensionsCheckbox = document.getElementById('needsExtensions');
    const extensionAmountSelect = document.getElementById('extensionAmount');
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

    let baseLabor = 0;
    let baseTime = 0;
    let materialCosts = 0;
    let breakdownHtml = "";

    // Calculate base costs based on style
    if (selectedStyleKey === 'cornrows') {
        const result = calculateCornrowsCost(styleData, cornrowRowsInput);
        baseLabor = result.labor;
        baseTime = result.time;
        breakdownHtml += result.breakdown;
    } else if (selectedStyleKey === 'boxBraids' || selectedStyleKey === 'bohemianBraids') {
        const result = calculateStandardBraidsCost(selectedStyleKey, styleData, divisionSizeSelect);
        baseLabor = result.labor;
        baseTime = result.time;
        materialCosts += result.materialCosts;
        breakdownHtml += result.breakdown;
    } else if (selectedStyleKey === 'mixBraids') {
        const result = calculateMixBraidsCost(mixPercentageInput, cornrowRowsInput, divisionSizeSelect);
        baseLabor = result.labor;
        baseTime = result.time;
        breakdownHtml += result.breakdown;
    }

    // Apply head coverage adjustment
    let adjustedLabor = baseLabor * headCoverage.multiplier;
    let adjustedTime = baseTime * headCoverage.multiplier;

    if (headCoverage.multiplier !== 1.0) {
        breakdownHtml += `<p>${translate('bd_headCoverage')} (${translate(headCoverage.nameKey)} - ${headCoverage.multiplier*100}%): ${translate('bd_labor')} €${adjustedLabor.toFixed(2)}, ${adjustedTime.toFixed(1)}h</p>`;
    } else {
        breakdownHtml += `<p>${translate('bd_styleLaborFull')}: €${adjustedLabor.toFixed(2)}, ${adjustedTime.toFixed(1)}h</p>`;
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

function calculateStandardBraidsCost(selectedStyleKey, styleData, divisionSizeSelect) {
    const division = styleData.divisionOptions[divisionSizeSelect.value];
    const labor = styleData.baseLaborPriceMediumFull * division.priceFactor;
    const time = styleData.baseTimeMediumFull * division.timeFactor;
    let materialCosts = 0;
    let breakdown = `<p>${translate(styleData.nameKey)} (${translate('bd_division')}: ${translate(division.nameKey)}): €${labor.toFixed(2)} (${time.toFixed(1)}h)</p>`;
    
    if (selectedStyleKey === 'bohemianBraids') {
        materialCosts += styleData.curlyHairMaterialCost;
        const curlLabor = styleData.curlyHairTimeAdded * HOURLY_RATE_FOR_EXTENSIONS_LABOR;
        breakdown += `<p>${translate('bd_bohemianCurls')}: €${styleData.curlyHairMaterialCost.toFixed(2)} (${translate('bd_material')}) + €${curlLabor.toFixed(2)} (${translate('bd_labor')}), ${styleData.curlyHairTimeAdded.toFixed(1)}h</p>`;
        
        return { 
            labor: labor + curlLabor, 
            time: time + styleData.curlyHairTimeAdded, 
            materialCosts, 
            breakdown 
        };
    }
    
    return { labor, time, materialCosts, breakdown };
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
