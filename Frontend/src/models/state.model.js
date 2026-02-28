// Global state for macros during meal creation
export const macroState = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,

    reset() {
        this.calories = 0;
        this.protein = 0;
        this.fat = 0;
        this.carbohydrates = 0;
    },

    update(calories, protein, fat, carbohydrates) {
        this.calories += calories;
        this.protein += protein;
        this.fat += fat;
        this.carbohydrates += carbohydrates;
    }
};
