const Workout = require('../models/workout.model');

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
    return newWorkout;
};

const fetchWorkouts = async (userId) => {
    const workouts = await Workout.find({ createdBy: userId }).sort({ createdAt: -1 });
    return workouts;
};

const deleteWorkout = async (userId, workoutId) => {
    const deleted = await Workout.findOneAndDelete({ _id: workoutId, createdBy: userId });
    return deleted;
};

const clearWorkouts = async (userId) => {
    const result = await Workout.deleteMany({ createdBy: userId });
    return result;
};

module.exports = {
    saveWorkout,
    fetchWorkouts,
    deleteWorkout,
    clearWorkouts
};
