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
  console.log("Thinness Ratio:", thinnessRatio, "Complexity Factor:", complexityFactor);
  const complexityMultiplier = Math.pow(thinnessRatio, complexityFactor);

  // --- Final Price Calculation ---
  const finalPrice = basePrice * complexityMultiplier;

  // Return the price rounded to 2 decimal places
  return parseFloat(finalPrice.toFixed(2));
}
