// Auth controller - handles authentication logic
import { apiService } from '../services/api.service.js';
import { authModel } from '../models/auth.model.js';
import { helpers } from '../utils/helpers.js';

export const authController = {
    async handleLogin(credentials) {
        try {
            const response = await apiService.login(credentials.email, credentials.password);
            
            if (response.jwtToken) {
                authModel.setToken(response.jwtToken);
                helpers.showAlert('Login successful!');
                helpers.redirectTo('http://127.0.0.1:5500/Frontend/public/dashboard.html');
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
                helpers.showAlert('Signup successful! Redirecting to login...');
                helpers.redirectTo('http://127.0.0.1:5500/Frontend/public/login.html');
            } else {
                helpers.showError(`Signup failed: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred during signup');
        }
    },

    isAuthenticated() {
        return authModel.isAuthenticated();
    },

    getToken() {
        return authModel.getToken();
    },

    logout() {
        authModel.clearToken();
        helpers.redirectTo('http://127.0.0.1:5500/Frontend/public/index.html');
    }
};
