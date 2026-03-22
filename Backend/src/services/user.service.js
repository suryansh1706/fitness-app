const Profile = require('../models/profile.model');

const saveProfile = async (userId, profileData) => {
    const { age, weight, height, activityLevel, goal } = profileData;

    const profile = new Profile({
        age,
        weight,
        height, 
        activityLevel,
        goal,
        createdBy: userId
    });
    await profile.save();
    return profile;
};

module.exports = { saveProfile };