// Workout controller - handles workout logic and data management
import { workoutView } from '../views/workout.view.js';

const STORAGE_KEY = 'workout_tracker_logs';

export const workoutController = {
    init() {
        this.loadAndRender();
        this.attachListeners();
    },

    getSavedWorkouts() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        const workouts = JSON.parse(saved);
        let modified = false;
        workouts.forEach((w, idx) => {
            if (!w.id) {
                w.id = Date.now() + idx;
                modified = true;
            }
        });
        if (modified) {
            this.saveWorkouts(workouts);
        }
        return workouts;
    },

    saveWorkouts(workouts) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    },

    loadAndRender() {
        const workouts = this.getSavedWorkouts();
        workoutView.renderWorkouts(workouts, (id) => this.handleDeleteWorkout(id));
    },

    handleAddWorkout(data) {
        const { exerciseName, weight, reps } = data;
        if (!exerciseName || isNaN(weight) || isNaN(reps)) return;

        const newWorkout = {
            id: Date.now(),
            exerciseName,
            weight,
            reps,
            date: new Date().toISOString()
        };

        const workouts = this.getSavedWorkouts();
        workouts.unshift(newWorkout);
        this.saveWorkouts(workouts);

        workoutView.resetForm();
        this.loadAndRender();
    },

    handleDeleteWorkout(id) {
        let workouts = this.getSavedWorkouts();
        workouts = workouts.filter(w => w.id !== id);
        this.saveWorkouts(workouts);
        this.loadAndRender();
    },

    handleClearAll() {
        localStorage.removeItem(STORAGE_KEY);
        this.loadAndRender();
    },

    attachListeners() {
        workoutView.attachSubmitListener((formData) => this.handleAddWorkout(formData));
        workoutView.attachClearAllListener(() => this.handleClearAll());
    }
};
