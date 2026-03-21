const Profile = require('../models/profile.model');

const saveProfile = async (profileData) => {
    const { age, weight, height, activityLevel } = profileData;

    const profile = new Profile({ age, weight, height, activityLevel });
    await profile.save();
    return profile;
};

module.exports = { saveProfile };