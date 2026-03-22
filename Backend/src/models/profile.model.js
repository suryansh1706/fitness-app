const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    activityLevel: {
        type: String,
        enum: ["sedentary", "lightly active", "moderately active", "very active", "extra active"],
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);