const { saveMeal, fetchMeals, deleteMeal } = require('../services/meal.service');
const { calculateDailyMacros } = require('../services/macro.service');

const saveMealController = async (req, res) => {
    try {
        const { name, calories, protein, fat, carbohydrates } = req.body;
        const userId = req.userId;

        const meal = await saveMeal(userId, { name, calories, protein, fat, carbohydrates });
        res.status(201).json({ message: "Meal created successfully", meal });
    } catch (error) {
        console.error("Error creating meal:", error);
        res.status(500).json({ message: error.message || "An error occurred while creating the meal" });
    }
};

const fetchMealsController = async (req, res) => {
    try {
        const userId = req.userId;
        const meals = await fetchMeals(userId);
        res.status(200).json({ meals });
    } catch (error) {
        console.error("Error fetching meals:", error);
        res.status(500).json({ message: error.message || "An error occurred while fetching meals" });
    }
};

const getDailyMacrosController = async (req, res) => {
    try {
        const userId = req.userId;
        const dailyMacros = await calculateDailyMacros(userId);
        res.json(dailyMacros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMealController = async (req, res) => {
    try {
        const { mealId } = req.params;
        const userId = req.userId;
        const result = await deleteMeal(mealId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    saveMealController, 
    fetchMealsController, 
    getDailyMacrosController,
    deleteMealController 
};
