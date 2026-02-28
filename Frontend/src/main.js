// Main entry point for dashboard
import { authController } from './controllers/auth.controller.js';
import { appController } from './controllers/app.controller.js';
import { loginView } from './views/login.view.js';
import { signupView } from './views/signup.view.js';

// Initialize app based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    // Check if on login page
    if (currentPage.includes('login.html') && loginView.elements.form) {
        loginView.attachSubmitListener((credentials) => {
            authController.handleLogin(credentials);
        });
    }

    // Check if on signup page
    if (currentPage.includes('signup.html') && signupView.elements.form) {
        signupView.attachSubmitListener((credentials) => {
            authController.handleSignup(credentials);
        });
    }

    // Check if on dashboard
    if (currentPage.includes('dashboard.html')) {
        if (!authController.isAuthenticated()) {
            window.location.href = '/Frontend/public/index.html';
        } else {
            appController.initialize();
        }
    }
});
