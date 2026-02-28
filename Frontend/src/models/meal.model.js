// Meal model - handles meal data
export const mealModel = {
    meals: [],

    addMeal(meal) {
        this.meals.push(meal);
    },

    setMeals(meals) {
        this.meals = meals;
    },

    getMeals() {
        return this.meals;
    },

    clearMeals() {
        this.meals = [];
    }
};
