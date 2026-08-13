const Workout = require('../models/workout.model');
const { redisClient } = require('../config/redis');

const WORKOUTS_CACHE_TTL = 3600; // 1 hour

const invalidateWorkoutsCache = async (userId) => {
    try {
        if (redisClient.isOpen) {
            await redisClient.del(`workouts:${userId}`);
        }
    } catch (err) {
        console.error('Redis workout cache invalidation error:', err.message);
    }
};

const saveWorkout = async (userId, workoutData) => {
    const { exerciseName, weight, reps, date } = workoutData;

    const newWorkout = new Workout({
        exerciseName,
        weight,
        reps,
        date: date || new Date(),
        createdBy: userId
    });

    await newWorkout.save();
    await invalidateWorkoutsCache(userId);
    return newWorkout;
};

const fetchWorkouts = async (userId) => {
    const cacheKey = `workouts:${userId}`;

    try {
        if (redisClient.isOpen) {
            const cachedWorkouts = await redisClient.get(cacheKey);
            if (cachedWorkouts) {
                return JSON.parse(cachedWorkouts);
            }
        }
    } catch (err) {
        console.error('Redis read error in fetchWorkouts:', err.message);
    }

    const workouts = await Workout.find({ createdBy: userId }).sort({ createdAt: -1 });

    try {
        if (redisClient.isOpen) {
            await redisClient.setEx(cacheKey, WORKOUTS_CACHE_TTL, JSON.stringify(workouts));
        }
    } catch (err) {
        console.error('Redis write error in fetchWorkouts:', err.message);
    }

    return workouts;
};

const deleteWorkout = async (userId, workoutId) => {
    const deleted = await Workout.findOneAndDelete({ _id: workoutId, createdBy: userId });
    if (deleted) {
        await invalidateWorkoutsCache(userId);
    }
    return deleted;
};

const clearWorkouts = async (userId) => {
    await Workout.deleteMany({ createdBy: userId });
    await invalidateWorkoutsCache(userId);
};

module.exports = {
    saveWorkout,
    fetchWorkouts,
    deleteWorkout,
    clearWorkouts
};
