const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    calories: {
        type: Number,
        required: true
    },

    protein: {
        type: Number,
        required: true
    },

    fat: {
        type: Number,
        required: true
    },

    carbohydrates: {
        type: Number,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);