// Macro calculation utilities for the backend
// These can be used for validation, enrichment, or analysis of meal data

export const macroCalculator = {
    // Validate macro values
    validateMacros(macros) {
        const { calories, protein, fat, carbohydrates } = macros;
        
        if (typeof calories !== 'number' || calories < 0) {
            throw new Error('Calories must be a positive number');
        }
        if (typeof protein !== 'number' || protein < 0) {
            throw new Error('Protein must be a positive number');
        }
        if (typeof fat !== 'number' || fat < 0) {
            throw new Error('Fat must be a positive number');
        }
        if (typeof carbohydrates !== 'number' || carbohydrates < 0) {
            throw new Error('Carbohydrates must be a positive number');
        }
        
        return true;
    },

    // Calculate estimated calories from macros (4 cal per gram protein/carbs, 9 cal per gram fat)
    calculateCaloriesFromMacros(protein, fat, carbohydrates) {
        return (protein * 4) + (fat * 9) + (carbohydrates * 4);
    },

    // Get macro breakdown percentages
    getMacroPercentages(calories, protein, fat, carbohydrates) {
        if (calories === 0) return { protein: 0, fat: 0, carbohydrates: 0 };
        
        return {
            protein: parseFloat(((protein * 4 / calories) * 100).toFixed(2)),
            fat: parseFloat(((fat * 9 / calories) * 100).toFixed(2)),
            carbohydrates: parseFloat(((carbohydrates * 4 / calories) * 100).toFixed(2))
        };
    },

    // Format macro data for display
    formatMacros(macros) {
        return {
            calories: parseFloat(macros.calories.toFixed(2)),
            protein: parseFloat(macros.protein.toFixed(2)),
            fat: parseFloat(macros.fat.toFixed(2)),
            carbohydrates: parseFloat(macros.carbohydrates.toFixed(2))
        };
    }
};

module.exports = { macroCalculator };
