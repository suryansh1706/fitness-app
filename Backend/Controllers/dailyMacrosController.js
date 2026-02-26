const mealModel = require('../Models/meals.js');

const getDailyMacros = async (req, res) => {
    try {
        const username = req.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of the day

        const meals = await mealModel.find({ 
            createdBy: username, 
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

        res.json(dailyMacros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getDailyMacros;