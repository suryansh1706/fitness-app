// App controller - main app orchestration
import { userController } from './user.controller.js';
import { mealController } from './meal.controller.js';
import { dashboardView } from '../views/dashboard.view.js';
import { mealView } from '../views/meal.view.js';
import { profileView } from '../views/profile.view.js';

export const appController = {
    initialize() {
        this.setupMealListeners();
        this.setupDailyMacrosLoader();
    },

    setupMealListeners() {
        if (mealView.elements.addBtn) {
            mealView.attachAddListener((inputs) => {
                mealController.handleAddIngredient(inputs);
            });
        }

        if (mealView.elements.saveBtn) {
            mealView.attachSaveListener(() => {
                mealController.handleSaveMeal();
            });
        }

        if (mealView.elements.fetchMealBtn) {
            mealView.attachFetchListener(() => {
                mealController.handleFetchMeals();
            });
        }

        if (mealView.elements.searchMealBtn) {
            mealView.attachMealSearchListener((input) => {
                mealController.handleSearchMeals(input);
            });
        }
    },

    setupDailyMacrosLoader() {
        dashboardView.loadDailyMacros(async () => {
            await mealController.handleDailyMacros();
        });
    },

    saveUserProfile() {
        profileView.attachSaveListener((profileData) => {
            userController.handleSaveProfile(profileData);
        });
    }
};
