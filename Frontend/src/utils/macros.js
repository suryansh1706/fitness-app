// Macro calculation utility
export const calculateMacros = {
    calculateByWeight(ingredient, quantity) {
        return {
            calories: (quantity / 100) * ingredient.calories_by_weight,
            protein: (quantity / 100) * ingredient.protein_by_weight,
            fat: (quantity / 100) * ingredient.fat_by_weight,
            carbohydrates: (quantity / 100) * ingredient.carbohydrates_by_weight
        };
    },

    calculateByPiece(ingredient, quantity) {
        return {
            calories: quantity * ingredient.calories,
            protein: quantity * ingredient.protein,
            fat: quantity * ingredient.fat,
            carbohydrates: quantity * ingredient.carbohydrates
        };
    },

    formatMacros(value) {
        return parseFloat(value.toFixed(2));
    }
};
