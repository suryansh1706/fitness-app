const {
    saveWorkout,
    fetchWorkouts,
    deleteWorkout,
    clearWorkouts
} = require('../services/workout.service');

const saveWorkoutController = async (req, res) => {
    try {
        const { exerciseName, weight, reps } = req.body;
        const userId = req.userId;

        if (!exerciseName || weight == null || reps == null) {
            return res.status(400).json({ message: "Exercise name, weight, and reps are required" });
        }

        const workout = await saveWorkout(userId, { exerciseName, weight, reps });
        res.status(201).json({ message: "Workout saved successfully", workout });
    } catch (error) {
        console.error("Error saving workout:", error);
        res.status(500).json({ message: error.message });
    }
};

const fetchWorkoutsController = async (req, res) => {
    try {
        const userId = req.userId;
        const workouts = await fetchWorkouts(userId);
        res.status(200).json({ workouts });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkoutController = async (req, res) => {
    try {
        const userId = req.userId;
        const workoutId = req.params.id;

        const deleted = await deleteWorkout(userId, workoutId);
        if (!deleted) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted successfully", id: workoutId });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ message: error.message });
    }
};

const clearWorkoutsController = async (req, res) => {
    try {
        const userId = req.userId;
        await clearWorkouts(userId);
        res.status(200).json({ message: "All workouts cleared successfully" });
    } catch (error) {
        console.error("Error clearing workouts:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    saveWorkoutController,
    fetchWorkoutsController,
    deleteWorkoutController,
    clearWorkoutsController
};
