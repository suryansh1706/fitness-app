// App controller - main app orchestration
import { authController } from './auth.controller.js';
import { mealController } from './meal.controller.js';
import { dashboardView } from '../views/dashboard.view.js';
import { mealView } from '../views/meal.view.js';

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
    },

    setupDailyMacrosLoader() {
        dashboardView.loadDailyMacros(async () => {
            await mealController.handleDailyMacros();
        });
    }
};
