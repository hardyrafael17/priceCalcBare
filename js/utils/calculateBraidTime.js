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
