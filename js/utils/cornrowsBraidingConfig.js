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
  // let's make it so that 4 rows of normal cornrows with 30-inch tails cost around €20
    basePricePerInch: 0.055, // 0.02 euros per inch per braid
  
  // Base time per inch (adjustable)
  baseTimePerInch: 0.004,  // 0.004 hours per inch per braid
  
  // Complexity factors for different scenarios
  complexityFactors: {
    simple: 1,     // Simple, thick braids
    normal: 1,     // Standard complexity
    detailed: 1,   // Detailed, intricate work
    expert: 1      // Expert-level thin braids
  }
};
