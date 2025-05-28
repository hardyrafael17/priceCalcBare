import { calculateBraidPrice } from './calculateBraidPrice.js';
import { calculateBraidTime } from './calculateBraidTime.js';
import { cornrowsBraidingConfig } from './cornrowsBraidingConfig.js';
import { calculateDynamicGirth } from './calculateDynamicGirth.js';

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

/**
 * Calculates cornrows tail pricing using dynamic girth (numeric value)
 * @param {number} numberOfRows - Number of cornrow rows
 * @param {number} tailLength - Length of tail braids in inches
 * @param {number} dynamicGirth - Calculated girth in inches (numeric)
 * @param {string} complexityType - 'simple', 'normal', 'detailed', or 'expert'
 * @returns {object} Object containing price and time
 */
export function calculateCornrowsTailCostWithDynamicGirth(numberOfRows, tailLength, dynamicGirth, complexityType = 'normal') {
  if (tailLength <= 0) {
    return { price: 0, time: 0 };
  }
  
  const config = cornrowsBraidingConfig;
  const complexityFactor = config.complexityFactors[complexityType] || config.complexityFactors.normal;
  
  // Calculate price using the sophisticated algorithm with dynamic girth
  const price = calculateBraidPrice(
    numberOfRows,
    tailLength,
    dynamicGirth,
    config.basePricePerInch,
    complexityFactor
  );
  
  // Calculate time using the time algorithm with dynamic girth
  const time = calculateBraidTime(
    numberOfRows,
    tailLength,
    dynamicGirth,
    config.baseTimePerInch,
    complexityFactor
  );
  
  return {
    price: typeof price === 'number' ? price : 0,
    time: time
  };
}
