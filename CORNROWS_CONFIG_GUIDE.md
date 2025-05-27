# Cornrows Pricing Configuration Guide

## Overview
The cornrows pricing system is now fully configurable through the `cornrowsConfig` object in `data.js`. You can easily adjust how each feature affects price and time without touching the calculation logic.

## Configuration Location
All configurable values are in `/js/data.js` in the `cornrowsConfig` object.

## Configurable Features

### 1. Short Hair Surcharge
```javascript
shortHairSurcharge: 10  // Flat fee added for short hair (euros)
```
- **What it does**: Adds a flat fee when client has extremely short or short hair
- **Easy to adjust**: Change the number to modify the surcharge amount

### 2. Minimal Extension Cost
```javascript
minimalExtensionCost: 7  // Cost for volume-only extensions (euros)
```
- **What it does**: Special low cost when hair is normal, tail ≤3 inches, and little extensions
- **Easy to adjust**: Change the number to modify the minimal cost

### 3. Row Time Factors
```javascript
rowTimeFactors: {
    baseRows: 5,           // No time penalty up to this number
    timeIncreasePerRow: 0.08  // 8% time increase per extra row
}
```
- **What it does**: Increases time based on number of rows above the base
- **Easy to adjust**: 
  - Change `baseRows` to set the penalty-free baseline
  - Change `timeIncreasePerRow` to adjust time penalty (0.08 = 8% per row)

### 4. Extension Costs
```javascript
extensionCosts: {
    little: { baseCost: 8, baseTime: 0.5 },
    normal: { baseCost: 15, baseTime: 1.0 },
    aLot: { baseCost: 25, baseTime: 1.5 }
}
```
- **What it does**: Base costs and times for different extension amounts
- **Easy to adjust**: Modify `baseCost` (euros) and `baseTime` (hours) for each level

### 5. Row Complexity Factors
```javascript
rowComplexityFactors: {
    baseRows: 5,              // No penalty up to this number
    priceIncreasePerRow: 0.10, // 10% price increase per extra row
    timeIncreasePerRow: 0.08   // 8% time increase per extra row
}
```
- **What it does**: Increases extension costs based on number of rows
- **Easy to adjust**: 
  - Change percentages to adjust complexity penalties
  - 0.10 = 10% increase per row above base

### 6. Tail Length Factors
```javascript
tailLengthFactors: {
    baseTailLength: 3,        // No penalty up to 3 inches
    priceIncreasePerInch: 0.15, // 15% price increase per inch above base
    timeIncreasePerInch: 0.10   // 10% time increase per inch above base
}
```
- **What it does**: Increases extension costs based on tail length
- **Easy to adjust**: Modify percentages to change tail length impact

## How the System Works

### Price Calculation Flow:
1. **Base cornrows price** (rows × per-row cost)
2. **+ Short hair surcharge** (if applicable)
3. **× Tail length factor** (from braidTailLengthOptions)
4. **+ Extension costs** (if selected):
   - Base extension cost
   - × Row complexity factor
   - × Tail length complexity factor

### Time Calculation Flow:
1. **Base cornrows time** (base time + rows × per-row time)
2. **× Row time factor** (for complexity)
3. **× Tail length factor** (from braidTailLengthOptions)
4. **+ Extension time** (if selected):
   - Base extension time
   - × Row complexity factor

## Examples of Easy Adjustments

### Make Short Hair More Expensive:
```javascript
shortHairSurcharge: 15  // Changed from 10 to 15 euros
```

### Reduce Row Complexity Penalty:
```javascript
priceIncreasePerRow: 0.05  // Changed from 10% to 5% per row
```

### Make Tail Length Less Impactful:
```javascript
priceIncreasePerInch: 0.10  // Changed from 15% to 10% per inch
```

### Adjust Extension Base Costs:
```javascript
normal: { baseCost: 20, baseTime: 1.2 }  // Increased from 15 euros and 1.0 hours
```

## Price Breakdown Details

The system now provides detailed breakdown showing:
- Base cornrows labor and time
- Row complexity time increase (if applicable)
- Short hair surcharge (if applicable)
- Tail length adjustments (if applicable)
- Extension costs with detailed breakdown:
  - Base extension cost
  - Row complexity adjustment
  - Tail length complexity adjustment

This makes it transparent to clients exactly what they're paying for and allows you to easily justify pricing decisions.
