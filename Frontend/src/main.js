// Main entry point for dashboard
import { authController } from './controllers/auth.controller.js';
import { appController } from './controllers/app.controller.js';
import { loginView } from './views/login.view.js';
import { signupView } from './views/signup.view.js';
import { mailController } from './controllers/mail.controller.js';

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
        signupView.attachSubmitListener(async (credentials) => {
            try {
                await authController.handleSignup(credentials);
                await mailController(credentials);
            } catch (err) {
                console.error(err);
            }
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
