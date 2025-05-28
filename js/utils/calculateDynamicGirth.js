/**
 * Calculates dynamic girth for cornrows based on number of rows, extensions, and hair density
 * @param {number} numberOfRows - Number of cornrow rows
 * @param {string} extensionAmount - 'little', 'normal', 'aLot', or null/undefined
 * @param {string} hairDensity - 'veryLow', 'low', 'medium', 'high', 'veryHigh'
 * @returns {number} Dynamic girth in inches
 */
export function calculateDynamicGirth(numberOfRows, extensionAmount = null, hairDensity = 'medium') {
  // Base assumptions for cornrow width calculation
  const scalp_width_inches = 6.0; // Approximate scalp width available for cornrows
  const base_row_width = scalp_width_inches / numberOfRows; // Width per row
  
  // Base girth is 75% of the row width (as requested)
  let baseGirth = base_row_width * 0.75;
  
  // Apply extension amount adjustments
  let extensionMultiplier = 1.0;
  if (extensionAmount === 'aLot') {
    extensionMultiplier = 1.20; // +20%
  } else if (extensionAmount === 'normal') {
    extensionMultiplier = 1.10; // +10%
  } else if (extensionAmount === 'little') {
    extensionMultiplier = 1.05; // +5%
  }
  // No extensions = no multiplier change (1.0)
  
  // Apply hair density adjustments (currently set to 1.0 as requested)
  let densityMultiplier = 1.0; // All hair densities now use 1.0 ratio as requested
  
  // COMMENTED OUT: Previous hair density logic (easily changeable)
  // switch (hairDensity) {
  //   case 'veryLow':
  //     densityMultiplier = 0.80; // -20% from normal
  //     break;
  //   case 'low':
  //     densityMultiplier = 0.90; // -10% from normal
  //     break;
  //   case 'medium':
  //     densityMultiplier = 1.00; // Normal (no change)
  //     break;
  //   case 'high':
  //     densityMultiplier = 1.10; // +10% from normal
  //     break;
  //   case 'veryHigh':
  //     densityMultiplier = 1.20; // +20% from normal
  //     break;
  // }
  
  // Calculate final girth
  const finalGirth = baseGirth * extensionMultiplier * densityMultiplier;
  
  // Ensure minimum and maximum reasonable girth values
  const minGirth = 0.15; // Very thin cornrows
  const maxGirth = 1.5;  // Very thick cornrows
  
  return Math.max(minGirth, Math.min(maxGirth, finalGirth));
}
