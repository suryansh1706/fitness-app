import { apiService } from '../services/api.service.js';
import { helpers } from '../utils/helpers.js';
import { calculateMaintenanceCalories } from '../utils/helpers.js';
import { profileView } from '../views/profile.view.js';

export const userController = {
    async handleSaveProfile(profileData) {
        try {
            const response = await apiService.saveUserProfile(profileData);
            if (response.profile) {
                const maintenanceCalories = calculateMaintenanceCalories(profileData);
                profileView.displayMaintenanceCalories(maintenanceCalories);
                profileView.resetForm();
                helpers.showAlert('Profile saved successfully!');
            } else {
                helpers.showError(`Failed to save profile: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred while saving the profile');
        }
    }
};
