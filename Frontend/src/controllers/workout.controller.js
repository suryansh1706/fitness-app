// Workout controller - handles workout logic and data management
import { workoutView } from '../views/workout.view.js';
import { apiService } from '../services/api.service.js';
import { helpers } from '../utils/helpers.js';

export const workoutController = {
    init() {
        this.loadAndRender();
        this.attachListeners();
    },

    async loadAndRender() {
        try {
            const data = await apiService.fetchWorkouts();
            const workouts = data.workouts || [];
            workoutView.renderWorkouts(workouts, (id) => this.handleDeleteWorkout(id));
        } catch (error) {
            console.error('Error fetching workouts:', error);
            workoutView.renderWorkouts([], (id) => this.handleDeleteWorkout(id));
        }
    },

    async handleAddWorkout(data) {
        const { exerciseName, weight, reps } = data;
        if (!exerciseName || isNaN(weight) || isNaN(reps)) {
            helpers.showAlert('Please fill in all fields with valid numbers');
            return;
        }

        try {
            const response = await apiService.saveWorkout({ exerciseName, weight, reps });
            if (response.workout) {
                workoutView.resetForm();
                await this.loadAndRender();
            } else {
                helpers.showError(response.message || 'Failed to save workout');
            }
        } catch (error) {
            helpers.showError('An error occurred while saving the workout');
        }
    },

    async handleDeleteWorkout(id) {
        try {
            const response = await apiService.deleteWorkout(id);
            if (response.id || response.message) {
                await this.loadAndRender();
            } else {
                helpers.showError(response.message || 'Failed to delete workout');
            }
        } catch (error) {
            helpers.showError('An error occurred while deleting the workout');
        }
    },

    async handleClearAll() {
        try {
            const response = await apiService.clearWorkouts();
            if (response.message) {
                await this.loadAndRender();
            }
        } catch (error) {
            helpers.showError('An error occurred while clearing workouts');
        }
    },

    attachListeners() {
        workoutView.attachSubmitListener((formData) => this.handleAddWorkout(formData));
        workoutView.attachClearAllListener(() => this.handleClearAll());
    }
};
