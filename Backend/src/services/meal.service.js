const Meal = require('../models/meal.model');

const saveMeal = async (userId, mealData) => {
    const { name, calories, protein, fat, carbohydrates } = mealData;

    const newMeal = new Meal({
        name,
        calories,
        protein,
        fat,
        carbohydrates,
        createdBy: userId
    });

    await newMeal.save();
    return newMeal;
};

const fetchMeals = async (userId) => {
    const meals = await Meal.find({ createdBy: userId }).sort({ createdAt: -1 });
    return meals;
};

const deleteMeal = async (mealId, userId) => {
    const meal = await Meal.findById(mealId);
    
    if (!meal) {
        throw new Error("Meal not found");
    }

    if (meal.createdBy.toString() !== userId) {
        throw new Error("Not authorized to delete this meal");
    }

    await Meal.findByIdAndDelete(mealId);
    return { message: "Meal deleted successfully" };
};

module.exports = { saveMeal, fetchMeals, deleteMeal };
