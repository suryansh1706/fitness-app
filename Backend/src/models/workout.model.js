const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true,
        trim: true
    },

    weight: {
        type: Number,
        required: true
    },

    reps: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);
