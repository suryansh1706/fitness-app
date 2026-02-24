const mealModel = require("../Models/meals.js");

const fetchMeals = async (req, res) => {
    try {
        const username = req.userId;
        const meals = await mealModel.find({ createdBy: username }).sort({ createdAt: -1 });
        res.status(200).json({ meals: meals });
    } catch (error) {
        console.error("Error fetching meals:", error);
        res.status(500).json({ message: "An error occurred while fetching meals" });
    }
};

module.exports = { fetchMeals };