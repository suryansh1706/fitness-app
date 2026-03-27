// Auth controller - handles authentication logic
import { apiService } from '../services/api.service.js';
import { helpers } from '../utils/helpers.js';
import { mealModel } from '../models/meal.model.js';
import { macroState } from '../models/state.model.js';

export const authController = {
    async handleLogin(credentials) {
        try {
            const response = await apiService.login(credentials.email, credentials.password);
            
            if (response.jwtToken) {
                // Clear all previous user data before switching accounts
                mealModel.clear();
                macroState.reset();
                
                helpers.showAlert('Login successful!');
                helpers.redirectTo('http://localhost:5500/Frontend/public/dashboard.html');
            } else {
                helpers.showError(`Login failed: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred during login');
        }
    },

    async handleSignup(credentials) {
        try {
            const response = await apiService.signup(
                credentials.username,
                credentials.email,
                credentials.password
            );
            
            if (response.message === "User registered successfully") {
                helpers.showAlert('Signup successful! Please check your email for verification.');
            } else {
                helpers.showError(`Signup failed: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred during signup');
        }
    },
};
