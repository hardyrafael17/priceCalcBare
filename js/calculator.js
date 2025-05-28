// Price calculation logic
import {
  braidStylesData,
  headCoverageOptions,
  extensionOptions,
  braidTailLengthOptions,
  cornrowsTailLengthOptions,
  hairKindOptions,
  hairDensityOptions,
  hairLengthOptions,
  HOURLY_RATE_FOR_EXTENSIONS_LABOR,
  fixedCosts,
  cornrowsConfig,
} from "./data.js";
import { translate } from "./translations.js";
import {
  calculateCornrowsTailCost,
  cornrowsBraidingConfig,
  calculateDynamicGirth,
  calculateCornrowsTailCostWithDynamicGirth,
  formatTimeToHHMM,
} from "./utils.js";
import { settingsManager } from "./settings.js";

export function calculatePrice() {
  const braidStyleSelect = document.getElementById("braidStyle");
  const hairKindSelect = document.getElementById("hairKind");
  const hairDensitySelect = document.getElementById("hairDensity");
  const hairLengthSelect = document.getElementById("hairLength");
  const headCoverageSelect = document.getElementById("headCoverage");
  const cornrowRowsInput = document.getElementById("cornrowRows");
  const divisionSizeSelect = document.getElementById("divisionSize");
  const braidTailLengthSelect = document.getElementById("braidTailLength");
  const mixPercentageInput = document.getElementById("mixPercentage");
  const needsExtensionsCheckbox = document.getElementById("needsExtensions");
  const extensionAmountSelect = document.getElementById("extensionAmount");
  const needsCurlsCheckbox = document.getElementById("needsCurls");
  const estimatedPriceSpan = document.getElementById("estimatedPrice");
  const estimatedTimeSpan = document.getElementById("estimatedTime");
  const priceBreakdownDiv = document.getElementById("priceBreakdown");

  if (!braidStyleSelect.value) {
    estimatedPriceSpan.textContent = "€0.00";
    estimatedTimeSpan.textContent = "0:00";
    priceBreakdownDiv.innerHTML = `<p>${translate("bd_selectStyle")}</p>`;
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
  if (selectedStyleKey === "cornrows" || selectedStyleKey === "updoCornrows") {
    const result = calculateCornrowsCost(styleData, cornrowRowsInput);
    baseLabor = result.labor;
    baseTime = result.time;
    breakdownHtml += result.breakdown;
  } else if (
    selectedStyleKey === "boxBraids" ||
    selectedStyleKey === "bohemianBraids"
  ) {
    const result = calculateStandardBraidsCost(
      selectedStyleKey,
      styleData,
      divisionSizeSelect,
      needsCurlsCheckbox
    );
    baseLabor = result.labor;
    baseTime = result.time;
    materialCosts += result.materialCosts;
    breakdownHtml += result.breakdown;
  } else {
    // Simple styles without rows or divisions (ropeBraid, fulaniBraids, crochetBraids)
    baseLabor = styleData.baseLaborPrice;
    baseTime = styleData.baseTime;
    breakdownHtml += `<p>${translate(styleData.nameKey)}: €${baseLabor.toFixed(
      2
    )} (${formatTimeToHHMM(baseTime)})</p>`;
  }

  // Apply head coverage adjustment
  let adjustedLabor = baseLabor * headCoverage.multiplier;
  let adjustedTime = baseTime * headCoverage.multiplier;

  // Apply hair characteristics adjustments (currently set to 1.0 ratio as requested)
  adjustedLabor =
    adjustedLabor *
    hairKind.priceFactor *
    hairDensity.priceFactor *
    hairLength.priceFactor;
  adjustedTime =
    adjustedTime *
    hairKind.timeFactor *
    hairDensity.timeFactor *
    hairLength.timeFactor;

  if (headCoverage.multiplier !== 1.0) {
    breakdownHtml += `<p>${translate("bd_headCoverage")} (${translate(
      headCoverage.nameKey
    )} - ${headCoverage.multiplier * 100}%): ${translate(
      "bd_labor"
    )} €${adjustedLabor.toFixed(2)}, ${formatTimeToHHMM(adjustedTime)}</p>`;
  } else {
    breakdownHtml += `<p>${translate(
      "bd_styleLaborFull"
    )}: €${adjustedLabor.toFixed(2)}, ${formatTimeToHHMM(adjustedTime)}</p>`;
  }

  // Apply braid tail length adjustment for styles that support it (skip cornrows as they handle it internally)
  if (
    styleData.hasTailLength &&
    braidTailLengthSelect.value &&
    selectedStyleKey !== "cornrows" &&
    selectedStyleKey !== "updoCornrows"
  ) {
    const tailLengthResult = calculateTailLengthCost(
      adjustedLabor,
      adjustedTime,
      braidTailLengthSelect
    );
    adjustedLabor = tailLengthResult.labor;
    adjustedTime = tailLengthResult.time;
    if (tailLengthResult.breakdown) {
      breakdownHtml += tailLengthResult.breakdown;
    }
  }

  // Calculate extensions (skip for cornrows as they have special extension handling)
  if (
    needsExtensionsCheckbox.checked &&
    selectedStyleKey !== "cornrows" &&
    selectedStyleKey !== "updoCornrows"
  ) {
    const extensionResult = calculateExtensionsCost(extensionAmountSelect);
    materialCosts += extensionResult.materialCosts;
    adjustedTime += extensionResult.timeAdded;
    adjustedLabor += extensionResult.laborCosts;
    breakdownHtml += extensionResult.breakdown;
  }

  // Add fixed costs
  const totalFixedCosts = fixedCosts.product + fixedCosts.polishing;
  materialCosts += totalFixedCosts;
  breakdownHtml += `<p>${translate(
    "bd_fixedCosts"
  )}: €${totalFixedCosts.toFixed(2)}</p>`;

  const finalPrice = adjustedLabor + materialCosts;

  estimatedPriceSpan.textContent = `€${finalPrice.toFixed(2)}`;
  estimatedTimeSpan.textContent = `${formatTimeToHHMM(adjustedTime)}`;
  priceBreakdownDiv.innerHTML = breakdownHtml;
}

function calculateCornrowsCost(styleData, cornrowRowsInput) {
  const rows = parseInt(cornrowRowsInput.value) || 0;
  const hairLengthSelect = document.getElementById("hairLength");
  const hairDensitySelect = document.getElementById("hairDensity");
  const braidTailLengthSelect = document.getElementById("braidTailLength");
  const needsExtensionsCheckbox = document.getElementById("needsExtensions");
  const extensionAmountSelect = document.getElementById("extensionAmount");

  // Get cornrows settings
  const cornrowsSettings = settingsManager.getCornrowsSettings();

  // Base labor and time calculation using settings
  let labor = cornrowsSettings.basePrice;

  // Apply advanced base price calculation if enabled
  if (cornrowsSettings.enableAdvancedBasePrice) {
    const tailLengthKey = braidTailLengthSelect.value;
    const tailLengthInches = tailLengthKey ? parseInt(tailLengthKey) : 0;

    // Advanced calculation: base price adjusted by rows and tail length
    const rowFactor = Math.pow(
      cornrowsSettings.advancedBaseRatio,
      (rows - 1) * 0.1
    );
    const tailFactor = Math.pow(
      cornrowsSettings.advancedBaseRatio,
      tailLengthInches * 0.02
    );
    labor = cornrowsSettings.basePrice * rowFactor * tailFactor;
  }

  let time = styleData.baseTime; // Keep using the base time from style data for now

  // Calculate extra row costs with optional ratio curve
  // Extra row cost only applies starting from the 3rd row (rows > 2)
  if (rows > 2) {
    const extraRows = rows - 2; // Start counting extra rows from the 3rd row
    let extraRowCost = extraRows * cornrowsSettings.extraRowCost;

    // Apply ratio curve if enabled
    if (cornrowsSettings.enableExtraRowRatio && extraRows > 0) {
      const ratioPower = Math.pow(
        cornrowsSettings.extraRowRatioCurve,
        extraRows - 1
      );
      extraRowCost =
        cornrowsSettings.extraRowCost +
        (extraRows - 1) * cornrowsSettings.extraRowCost * ratioPower;
    }

    labor += extraRowCost;
    time += rows * styleData.timePerRow; // Keep existing time calculation
  } else if (rows > 0) {
    // For 1-2 rows, only add base time calculation and just add 5 euros
    labor += 5; // Base cost for 1-2 rows
    time += rows * styleData.timePerRow;
  }

  let breakdown = `<p>${translate("bd_cornrowsLabor")} (${rows} ${translate(
    "bd_rows"
  )}): €${labor.toFixed(2)} (${formatTimeToHHMM(time)})</p>`;

  // Check if client hair is short (base surcharge - can be moved to settings later)
  const hairLength = hairLengthSelect.value;
  if (hairLength === "extremelyShort" || hairLength === "short") {
    labor += 10; // Base short hair surcharge
    breakdown += `<p>${translate("bd_shortHairSurcharge")}: €10.00</p>`;
  }

  // Apply tail length pricing using settings
  const tailLengthKey = braidTailLengthSelect.value;
  if (tailLengthKey && tailLengthKey !== "none") {
    const tailLengthInches = parseInt(tailLengthKey) || 0;

    if (tailLengthInches > 0) {
      // Calculate tail cost using settings
      let tailCost = tailLengthInches * cornrowsSettings.tailCostPerInch;

      // Apply ratio curve based on number of rows if enabled
      if (cornrowsSettings.enableTailRatio && rows > 1) {
        const ratioPower = Math.pow(cornrowsSettings.tailRatioCurve, rows - 1);
        tailCost =
          tailLengthInches * cornrowsSettings.tailCostPerInch * ratioPower;
      }

      labor += tailCost;
      breakdown += `<p>${translate(
        "bd_braidTailLength"
      )} (${tailLengthInches}"): +€${tailCost.toFixed(2)}</p>`;
    }
  }

  // Handle cornrows-specific extension pricing using settings
  if (needsExtensionsCheckbox.checked) {
    const extensionAmount = extensionAmountSelect.value;
    const tailLengthInches = tailLengthKey ? parseInt(tailLengthKey) : 0;

    // Calculate extension cost using settings
    let extensionCost = cornrowsSettings.extensionCost;

    // Apply ratio curve based on number of rows if enabled
    if (cornrowsSettings.enableExtensionRatio && rows > 1) {
      const ratioPower = Math.pow(
        cornrowsSettings.extensionRatioCurve,
        rows - 1
      );
      extensionCost = cornrowsSettings.extensionCost * ratioPower;
    }

    // Apply extension amount multiplier
    const extensionMultipliers = { little: 0.5, normal: 1.0, aLot: 1.5 };
    extensionCost *= extensionMultipliers[extensionAmount] || 1.0;

    labor += extensionCost;
    breakdown += `<p>${translate("bd_cornrowsExtensions")} (${translate(
      "ext_" + extensionAmount
    )}): €${extensionCost.toFixed(2)}</p>`;
  }

  return { labor, time, breakdown };
}

function calculateCornrowsExtensionFactors(
  extensionAmount,
  numRows,
  tailLengthInches
) {
  // Get base extension data from config (easily configurable)
  const extensionData =
    cornrowsConfig.extensionCosts[extensionAmount] ||
    cornrowsConfig.extensionCosts.normal;

  let baseCost = extensionData.baseCost;
  let baseTime = extensionData.baseTime;
  let breakdown = `<p>${translate("bd_cornrowsExtensions")} (${translate(
    "ext_" + extensionAmount
  )} - ${translate("bd_base")}): €${baseCost.toFixed(2)} (+${formatTimeToHHMM(
    baseTime
  )})</p>`;

  // Apply row complexity factor (configurable)
  if (numRows > cornrowsConfig.rowComplexityFactors.baseRows) {
    const extraRows = numRows - cornrowsConfig.rowComplexityFactors.baseRows;
    const rowPriceFactor =
      1 + extraRows * cornrowsConfig.rowComplexityFactors.priceIncreasePerRow;
    const rowTimeFactor =
      1 + extraRows * cornrowsConfig.rowComplexityFactors.timeIncreasePerRow;

    const priceIncrease = baseCost * (rowPriceFactor - 1);
    const timeIncrease = baseTime * (rowTimeFactor - 1);

    baseCost *= rowPriceFactor;
    baseTime *= rowTimeFactor;

    breakdown += `<p>${translate(
      "bd_cornrowsRowComplexity"
    )} (${extraRows} ${translate("bd_extraRows")}): +€${priceIncrease.toFixed(
      2
    )}, +${formatTimeToHHMM(timeIncrease)}</p>`;
  }

  // Apply tail length factor for extensions (configurable)
  if (tailLengthInches > cornrowsConfig.tailLengthFactors.baseTailLength) {
    const extraInches =
      tailLengthInches - cornrowsConfig.tailLengthFactors.baseTailLength;
    const tailPriceFactor =
      1 + extraInches * cornrowsConfig.tailLengthFactors.priceIncreasePerInch;
    const tailTimeFactor =
      1 + extraInches * cornrowsConfig.tailLengthFactors.timeIncreasePerInch;

    const priceIncrease = baseCost * (tailPriceFactor - 1);
    const timeIncrease = baseTime * (tailTimeFactor - 1);

    baseCost *= tailPriceFactor;
    baseTime *= tailTimeFactor;

    breakdown += `<p>${translate(
      "bd_cornrowsTailComplexity"
    )} (${extraInches}" ${translate(
      "bd_extraLength"
    )}): +€${priceIncrease.toFixed(2)}, +${formatTimeToHHMM(timeIncrease)}</p>`;
  }

  return {
    cost: baseCost,
    time: baseTime,
    breakdown: breakdown,
  };
}

function calculateStandardBraidsCost(
  selectedStyleKey,
  styleData,
  divisionSizeSelect,
  needsCurlsCheckbox
) {
  const division = styleData.divisionOptions[divisionSizeSelect.value];
  const labor = styleData.baseLaborPriceMediumFull * division.priceFactor;
  const time = styleData.baseTimeMediumFull * division.timeFactor;
  let materialCosts = 0;
  let breakdown = `<p>${translate(styleData.nameKey)} (${translate(
    "bd_division"
  )}: ${translate(division.nameKey)}): €${labor.toFixed(2)} (${formatTimeToHHMM(
    time
  )})</p>`;

  let totalLabor = labor;
  let totalTime = time;

  // Add curl add-on if selected for Bohemian Braids
  if (
    selectedStyleKey === "bohemianBraids" &&
    needsCurlsCheckbox &&
    needsCurlsCheckbox.checked
  ) {
    const curlPrice = styleData.curlAddonPrice;
    const curlTime = styleData.curlAddonTime;
    totalLabor += curlPrice;
    totalTime += curlTime;
    breakdown += `<p>${translate("bd_bohemianCurls")}: €${curlPrice.toFixed(
      2
    )} (${formatTimeToHHMM(curlTime)})</p>`;
  }

  return {
    labor: totalLabor,
    time: totalTime,
    materialCosts,
    breakdown,
  };
}

function calculateMixBraidsCost(
  mixPercentageInput,
  cornrowRowsInput,
  divisionSizeSelect
) {
  const cornrowPercent = parseInt(mixPercentageInput.value) / 100;
  const boxBraidPercent = 1 - cornrowPercent;
  const cornrowsStyleData = braidStylesData.cornrows;
  const numCornrows = parseInt(cornrowRowsInput.value) || 0;
  const boxBraidsStyleData = braidStylesData.boxBraids;
  const division = boxBraidsStyleData.divisionOptions[divisionSizeSelect.value];

  const cornrowPartLabor =
    (cornrowsStyleData.baseLaborPrice +
      numCornrows * cornrowsStyleData.laborPricePerRow) *
    cornrowPercent;
  const cornrowPartTime =
    (cornrowsStyleData.baseTime + numCornrows * cornrowsStyleData.timePerRow) *
    cornrowPercent;
  const boxBraidPartLabor =
    boxBraidsStyleData.baseLaborPriceMediumFull *
    division.priceFactor *
    boxBraidPercent;
  const boxBraidPartTime =
    boxBraidsStyleData.baseTimeMediumFull *
    division.timeFactor *
    boxBraidPercent;

  let breakdown = "";
  if (cornrowPercent > 0) {
    breakdown += `<p>${translate("bd_mixCornrows")} (${(
      cornrowPercent * 100
    ).toFixed(0)}%, ${numCornrows} ${translate(
      "bd_rows"
    )}): €${cornrowPartLabor.toFixed(2)} (${formatTimeToHHMM(
      cornrowPartTime
    )})</p>`;
  }
  if (boxBraidPercent > 0) {
    breakdown += `<p>${translate("bd_mixBoxBraids")} (${(
      boxBraidPercent * 100
    ).toFixed(0)}%, ${translate("bd_division")}: ${translate(
      division.nameKey
    )}): €${boxBraidPartLabor.toFixed(2)} (${formatTimeToHHMM(
      boxBraidPartTime
    )})</p>`;
  }

  return {
    labor: cornrowPartLabor + boxBraidPartLabor,
    time: cornrowPartTime + boxBraidPartTime,
    breakdown,
  };
}

function calculateExtensionsCost(extensionAmountSelect) {
  const selectedExtension = extensionOptions[extensionAmountSelect.value];
  if (!selectedExtension) {
    return { materialCosts: 0, timeAdded: 0, laborCosts: 0, breakdown: "" };
  }

  const materialCosts = selectedExtension.cost;
  const timeAdded = selectedExtension.timeAdded;
  const laborCosts = timeAdded * HOURLY_RATE_FOR_EXTENSIONS_LABOR;
  const breakdown = `<p>${translate("bd_extensions")} (${translate(
    selectedExtension.nameKey
  )}): €${materialCosts.toFixed(2)} (${translate(
    "bd_material"
  )}) + €${laborCosts.toFixed(2)} (${translate(
    "bd_labor"
  )}), ${formatTimeToHHMM(timeAdded)} ${translate("bd_added")}</p>`;

  return { materialCosts, timeAdded, laborCosts, breakdown };
}

function calculateTailLengthCost(
  currentLabor,
  currentTime,
  braidTailLengthSelect
) {
  const tailLengthKey = braidTailLengthSelect.value;
  const tailLength = braidTailLengthOptions[tailLengthKey];

  if (!tailLength || tailLength.inches === 0) {
    return { labor: currentLabor, time: currentTime, breakdown: "" };
  }

  const adjustedLabor = currentLabor * tailLength.priceFactor;
  const adjustedTime = currentTime * tailLength.timeFactor;

  const priceDiff = adjustedLabor - currentLabor;
  const timeDiff = adjustedTime - currentTime;

  let breakdown = "";
  if (priceDiff > 0.01 || timeDiff > 0.01) {
    breakdown = `<p>${translate("bd_braidTailLength")} (${translate(
      tailLength.nameKey
    )}): +€${priceDiff.toFixed(2)}, +${formatTimeToHHMM(timeDiff)}</p>`;
  }

  return { labor: adjustedLabor, time: adjustedTime, breakdown };
}
