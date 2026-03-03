const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    },

    provider: {
        type: String,
        enum: ["local", "google"],
        required: true
    },

    googleId: {
        type: String,
        sparse: true,
        unique: true
    },

    displayName: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
