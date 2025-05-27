/**
 * Utility functions for advanced braid pricing calculations
 */

/**
 * Calculates the estimated price for braiding hair based on number, length,
 * starting girth, and a complexity adjustment factor.
 *
 * @param {number} numberOfBraids - The total number of braids.
 * @param {number} length - The average length of each braid in inches.
 * @param {number} startingGirth - The starting thickness (diameter) of a braid in inches.
 * @param {number} basePricePerInch - Your base rate for a 'standard' braid per inch.
 * @param {number} complexityFactor - A number to adjust how sharply price increases
 *                                   with thinness (e.g., start with 1, increase > 1
 *                                   for a steeper curve, or < 1 for a flatter curve).
 * @returns {number|string} The estimated price, or an error message.
 */
export function calculateBraidPrice(numberOfBraids, length, startingGirth, basePricePerInch, complexityFactor) {
  const endingGirth = 0.2; // Fixed ending girth as specified (0.2 inches)

  // --- Input Validation ---
  if (isNaN(numberOfBraids) || numberOfBraids <= 0 ||
      isNaN(length) || length <= 0 ||
      isNaN(startingGirth) ||
      isNaN(basePricePerInch) || basePricePerInch <= 0 ||
      isNaN(complexityFactor) || complexityFactor <= 0) {
    return "Error: Please provide positive numbers for all inputs.";
  }

  if (startingGirth < endingGirth) {
    return `Error: Starting girth (${startingGirth}) cannot be less than ending girth (${endingGirth}).`;
  }

  // --- Base Price Calculation ---
  // This is the price if complexity wasn't a factor.
  const basePrice = numberOfBraids * length * basePricePerInch;

  // --- Complexity Multiplier Calculation ---
  // We use the inverse of the *average* girth.
  // Thinner braids have a smaller average girth, so a larger inverse.
  // Average Girth = (startingGirth + endingGirth) / 2
  // Inverse Average Girth = 2 / (startingGirth + endingGirth)
  // We use 1 as a 'reference' girth. If the braid is thinner than 1 inch on average,
  // the multiplier will be > 1. If thicker, < 1.
  // We calculate a 'thinness ratio'. For a 1-inch start (avg 0.6), ratio is 1.667.
  // For a 0.5-inch start (avg 0.35), ratio is 2.857.
  const thinnessRatio = 2 / (startingGirth + endingGirth);

  // We raise this ratio to the power of the complexityFactor.
  // If complexityFactor = 1, it's a direct relationship.
  // If complexityFactor > 1, the price difference between thick and thin braids increases sharply.
  // If complexityFactor < 1, the price difference is reduced.
  const complexityMultiplier = Math.pow(thinnessRatio, complexityFactor);

  // --- Final Price Calculation ---
  const finalPrice = basePrice * complexityMultiplier;

  // Return the price rounded to 2 decimal places
  return parseFloat(finalPrice.toFixed(2));
}

/**
 * Calculates time estimate for braiding based on complexity factors
 * @param {number} numberOfBraids - The total number of braids
 * @param {number} length - The length of each braid in inches
 * @param {number} startingGirth - The starting thickness of braids
 * @param {number} baseTimePerInch - Base time per inch for standard braids
 * @param {number} complexityFactor - Complexity adjustment factor
 * @returns {number} Estimated time in hours
 */
export function calculateBraidTime(numberOfBraids, length, startingGirth, baseTimePerInch, complexityFactor) {
  const endingGirth = 0.2;
  
  // Base time calculation
  const baseTime = numberOfBraids * length * baseTimePerInch;
  
  // Apply complexity multiplier (similar to price calculation)
  const thinnessRatio = 2 / (startingGirth + endingGirth);
  const complexityMultiplier = Math.pow(thinnessRatio, complexityFactor * 0.8); // Time increases less dramatically than price
  
  const finalTime = baseTime * complexityMultiplier;
  
  return parseFloat(finalTime.toFixed(2));
}

/**
 * Cornrows-specific pricing configuration
 */
export const cornrowsBraidingConfig = {
  // Default girth for different cornrow styles
  girthOptions: {
    thin: 0.3,      // Very thin cornrows
    normal: 0.5,    // Standard cornrows
    thick: 0.8      // Thick cornrows
  },
  
  // Base pricing per inch (adjustable)
  basePricePerInch: 0.15,  // €0.15 per inch per braid
  
  // Base time per inch (adjustable)
  baseTimePerInch: 0.004,  // 0.004 hours per inch per braid
  
  // Complexity factors for different scenarios
  complexityFactors: {
    simple: 0.8,     // Simple, thick braids
    normal: 1.0,     // Standard complexity
    detailed: 1.3,   // Detailed, intricate work
    expert: 1.6      // Expert-level thin braids
  }
};

/**
 * Calculates cornrows tail pricing using the sophisticated algorithm
 * @param {number} numberOfRows - Number of cornrow rows
 * @param {number} tailLength - Length of tail braids in inches
 * @param {string} girthType - 'thin', 'normal', or 'thick'
 * @param {string} complexityType - 'simple', 'normal', 'detailed', or 'expert'
 * @returns {object} Object containing price and time
 */
export function calculateCornrowsTailCost(numberOfRows, tailLength, girthType = 'normal', complexityType = 'normal') {
  if (tailLength <= 0) {
    return { price: 0, time: 0 };
  }
  
  const config = cornrowsBraidingConfig;
  const startingGirth = config.girthOptions[girthType] || config.girthOptions.normal;
  const complexityFactor = config.complexityFactors[complexityType] || config.complexityFactors.normal;
  
  // Calculate price using the sophisticated algorithm
  const price = calculateBraidPrice(
    numberOfRows,
    tailLength,
    startingGirth,
    config.basePricePerInch,
    complexityFactor
  );
  
  // Calculate time using the time algorithm
  const time = calculateBraidTime(
    numberOfRows,
    tailLength,
    startingGirth,
    config.baseTimePerInch,
    complexityFactor
  );
  
  return {
    price: typeof price === 'number' ? price : 0,
    time: time
  };
}
