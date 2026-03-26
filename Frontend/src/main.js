// Main entry point for dashboard
import { authController } from './controllers/auth.controller.js';
import { appController } from './controllers/app.controller.js';
import { loginView } from './views/login.view.js';
import { signupView } from './views/signup.view.js';
import { apiService } from './services/api.service.js';

// Initialize app based on current page
document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = window.location.pathname;

    // Check if on login page
    if (currentPage.includes('login.html') && loginView.elements.form) {
        loginView.attachSubmitListener((credentials) => {
            authController.handleLogin(credentials);
        });
    }

    // Check if on signup page
    if (currentPage.includes('signup.html') && signupView.elements.form) {
        signupView.attachSubmitListener(async (credentials) => {
            authController.handleSignup(credentials);
        });
    }

    // Check if on dashboard
    if (currentPage.includes('dashboard.html')) {
        const isAuthenticated = await apiService.verifyAuthentication();
        if (!isAuthenticated) {
            window.location.href = '/Frontend/public/index.html';
        } else {
            appController.initialize();
        }
    }

    // Check if on profile page
    if (currentPage.includes('profile.html')) {
        const isAuthenticated = await apiService.verifyAuthentication();
        if (!isAuthenticated) {
            window.location.href = '/Frontend/public/index.html';
        } else {
            appController.saveUserProfile();
        }
    }
});
