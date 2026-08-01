const Meal = require('../models/meal.model');
const { redisClient } = require('../config/redis');

const MEALS_CACHE_TTL = 3600; // 1 hour

const saveMeal = async (userId, mealData) => {
    const { name, calories, protein, fat, carbohydrates } = mealData;

    const newMeal = new Meal({
        name,
        calories,
        protein,
        fat,
        carbohydrates,
        createdBy: userId
    });

    await newMeal.save();

    // Invalidate Redis caches for this user
    try {
        if (redisClient.isOpen) {
            const todayStr = new Date().toLocaleDateString('en-CA');
            await redisClient.del(`meals:${userId}`);
            await redisClient.del(`macros:${userId}:${todayStr}`);
        }
    } catch (err) {
        console.error("Redis cache invalidation error:", err.message);
    }

    return newMeal;
};

const fetchMeals = async (userId) => {
    const cacheKey = `meals:${userId}`;

    // Try reading from Redis cache first
    try {
        if (redisClient.isOpen) {
            const cachedMeals = await redisClient.get(cacheKey);
            if (cachedMeals) {
                return JSON.parse(cachedMeals);
            }
        }
    } catch (err) {
        console.error("Redis read error in fetchMeals:", err.message);
    }

    // Cache miss or Redis unavailable: fetch from MongoDB
    const meals = await Meal.find({ createdBy: userId }).sort({ createdAt: -1 });

    // Store in Redis cache
    try {
        if (redisClient.isOpen && meals) {
            await redisClient.setEx(cacheKey, MEALS_CACHE_TTL, JSON.stringify(meals));
        }
    } catch (err) {
        console.error("Redis write error in fetchMeals:", err.message);
    }

    return meals;
};

const searchMeal = async (query, userId) => {
    const meals = await Meal.find({
        name: { $regex: query, $options: 'i' },
        createdBy: userId
    });
    return meals;
};

module.exports = { saveMeal, fetchMeals, searchMeal };

