const { saveMeal, fetchMeals } = require('../services/meal.service');
const { calculateDailyMacros } = require('../services/dailymacro.service');

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

module.exports = { 
    saveMealController, 
    fetchMealsController, 
    getDailyMacrosController
};
