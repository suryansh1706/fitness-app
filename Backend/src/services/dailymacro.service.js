const Meal = require('../models/meal.model');
const { redisClient } = require('../config/redis');

const MACROS_CACHE_TTL = 3600; // 1 hour

const calculateDailyMacros = async (userId) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // 12:00 AM midnight local time

    const todayStr = new Date().toLocaleDateString('en-CA'); // Local date YYYY-MM-DD
    const cacheKey = `macros:${userId}:${todayStr}`;

    // 1. Try reading from Redis cache first
    try {
        if (redisClient.isOpen) {
            const cachedMacros = await redisClient.get(cacheKey);
            if (cachedMacros) {
                return JSON.parse(cachedMacros);
            }
        }
    } catch (err) {
        console.error("Redis read error in calculateDailyMacros:", err.message);
    }

    // 2. Fetch meals created today (since 12 AM midnight) from MongoDB
    const meals = await Meal.find({
        createdBy: userId,
        createdAt: { $gte: startOfDay }
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

    // 3. Store calculated macros in Redis
    try {
        if (redisClient.isOpen) {
            await redisClient.setEx(cacheKey, MACROS_CACHE_TTL, JSON.stringify(dailyMacros));
        }
    } catch (err) {
        console.error("Redis write error in calculateDailyMacros:", err.message);
    }

    return dailyMacros;
};

module.exports = { calculateDailyMacros };

