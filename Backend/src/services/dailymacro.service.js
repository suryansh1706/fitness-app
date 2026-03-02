const Meal = require('../models/meal.model');

const calculateDailyMacros = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    const meals = await Meal.find({
        createdBy: userId,
        createdAt: { $gte: today } // Fetch meals created today
    });

    const dailyMacros = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0
    };

    meals.forEach(meal => {
        dailyMacros.calories += meal.calories || 0;
        dailyMacros.protein += meal.protein || 0;
        dailyMacros.fat += meal.fat || 0;
        dailyMacros.carbohydrates += meal.carbohydrates || 0;
    });

    return dailyMacros;
};

module.exports = { calculateDailyMacros };
