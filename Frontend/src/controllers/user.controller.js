export const userController = {
    async handleSaveProfile(profileData) {
        const token = authController.getToken();

        if (!token) {
            helpers.showError('Not authenticated');
            return;
        }

        try {
            const response = await apiService.saveUserProfile(profileData, token);
            if (response.success) {
                helpers.showAlert('Profile saved successfully!');
            } else {
                helpers.showError(`Failed to save profile: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred while saving the profile');
        }
    }
};
