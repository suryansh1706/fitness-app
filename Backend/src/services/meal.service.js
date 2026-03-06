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

const searchMeal = async (query) => {
    const meals = await Meal.find({ name: { $regex: query, $options: 'i' } });
    return meals;
}

module.exports = { saveMeal, fetchMeals, searchMeal };
