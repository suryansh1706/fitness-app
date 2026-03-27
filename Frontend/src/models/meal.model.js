// Meal model - handles meal data
export const mealModel = {
    meals: [],

    setMeals(meals) {
        this.meals = meals;
    },

    getMeals() {
        return this.meals;
    },

    clear() {
        this.meals = [];
    }
};
