const { saveProfile } = require("../services/user.service");

const saveProfileController = async (req, res) => {
    try {
        const { age, weight, height, activityLevel, goal } = req.body;
        const userId = req.userId;

        const profile = await saveProfile(userId, { age, weight, height, activityLevel, goal });
        res.status(201).json({ message: "Profile created successfully", profile });
    }
    catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveProfileController };