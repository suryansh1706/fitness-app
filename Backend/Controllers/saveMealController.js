const MealModel = require("../Models/meals.js");

const saveMeal = async (req, res) => {
    try {
        const { name, calories, protein, fat, carbohydrates } = req.body;
        const username = req.userId; // Assuming the user ID is stored in req.userId by the auth middleware

        const newMeal = new MealModel({
            name: name,
            calories: calories,
            protein: protein,
            fat: fat,
            carbohydrates: carbohydrates,
            createdBy: username
        });

        await newMeal.save();
        res.status(201).json({ message: "Meal created successfully", meal: newMeal });
    } catch (error) {
        console.error("Error creating meal:", error);
        res.status(500).json({ message: "An error occurred while creating the meal" });
    }
};

module.exports = saveMeal;