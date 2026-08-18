// Main entry point for application
import { authController } from './controllers/auth.controller.js';
import { appController } from './controllers/app.controller.js';
import { workoutController } from './controllers/workout.controller.js';
import { loginView } from './views/login.view.js';
import { signupView } from './views/signup.view.js';
import { apiService, API_BASE_URL } from './services/api.service.js';
import { helpers } from './utils/helpers.js';

// Initialize app based on current page
document.addEventListener('DOMContentLoaded', async () => {
    // Set dynamic backend URL for Google OAuth buttons
    document.querySelectorAll('.google-auth-btn').forEach(btn => {
        btn.href = `${API_BASE_URL}/auth/google`;
    });

    // Check for token in URL query params (e.g. from Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
        localStorage.setItem('jwtToken', tokenParam);
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }


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
            helpers.redirectToPage('index.html');
        } else {
            appController.initialize();
        }
    }

    // Check if on profile page
    if (currentPage.includes('profile.html')) {
        const isAuthenticated = await apiService.verifyAuthentication();
        if (!isAuthenticated) {
            helpers.redirectToPage('index.html');
        } else {
            appController.saveUserProfile();
        }
    }

    // Check if on workouts page
    if (currentPage.includes('workouts.html')) {
        workoutController.init();
    }
});

