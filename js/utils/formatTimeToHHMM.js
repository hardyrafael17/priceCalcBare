/**
 * Converts decimal hours to HH:MM format
 * @param {number} decimalHours - The decimal hours to convert
 * @returns {string} Time formatted as HH:MM
 */
export function formatTimeToHHMM(decimalHours) {
    if (decimalHours === 0) return "0:00";
    
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    
    // Handle cases where rounding might give 60 minutes
    if (minutes === 60) {
        return `${hours + 1}:00`;
    }
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes}`;
}
