import { translate } from '../translations.js';

/**
 * Populates a select element with options from an options object
 * @param {HTMLSelectElement} selectElement - The select element to populate
 * @param {Object} optionsObject - Object containing options with nameKey properties
 */
export function populateSelectWithOptions(selectElement, optionsObject) {
    const currentVal = selectElement.value;
    selectElement.innerHTML = '';
    
    for (const key in optionsObject) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = translate(optionsObject[key].nameKey);
        selectElement.appendChild(option);
    }
    
    if (selectElement.querySelector(`option[value="${currentVal}"]`)) {
        selectElement.value = currentVal;
    }
}
