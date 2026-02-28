// Meal controller - handles meal operations
import { apiService } from '../services/api.service.js';
import { mealModel } from '../models/meal.model.js';
import { macroState } from '../models/state.model.js';
import { mealView } from '../views/meal.view.js';
import { dashboardView } from '../views/dashboard.view.js';
import { ingredients, helpers } from '../utils/helpers.js';
import { calculateMacros } from '../utils/macros.js';
import { authController } from './auth.controller.js';

export const mealController = {
    async handleAddIngredient(inputs) {
        const { ingredient, quantity, unit } = inputs;
        
        if (!ingredient || !quantity || !unit) {
            helpers.showAlert('Please fill all fields');
            return;
        }

        if (!helpers.isValidQuantity(quantity)) {
            helpers.showAlert('Please enter a valid quantity');
            return;
        }

        const selectedIngredient = ingredients[ingredient];
        const qty = parseFloat(quantity);
        
        const macros = unit === 'gram' 
            ? calculateMacros.calculateByWeight(selectedIngredient, qty)
            : calculateMacros.calculateByPiece(selectedIngredient, qty);

        macroState.update(macros.calories, macros.protein, macros.fat, macros.carbohydrates);
        mealView.updateMacroDisplay(macroState);
    },

    async handleSaveMeal() {
        const mealName = prompt('Enter a name for your meal:');
        
        if (!mealName) {
            helpers.showAlert('Meal name cannot be empty');
            return;
        }

        const token = authController.getToken();
        if (!token) {
            helpers.showError('Not authenticated');
            return;
        }

        const mealData = {
            name: mealName,
            calories: macroState.calories,
            protein: macroState.protein,
            fat: macroState.fat,
            carbohydrates: macroState.carbohydrates
        };

        try {
            const response = await apiService.saveMeal(mealData, token);
            
            if (response.meal) {
                helpers.showAlert('Meal saved successfully!');
                macroState.reset();
                mealView.updateMacroDisplay(macroState);
                mealView.resetMealInputs();
            } else {
                helpers.showError(`Failed to save meal: ${response.message}`);
            }
        } catch (error) {
            helpers.showError('An error occurred while saving the meal');
        }
    },

    async handleFetchMeals() {
        const token = authController.getToken();
        if (!token) {
            helpers.showError('Not authenticated');
            return;
        }

        try {
            const data = await apiService.fetchMeals(token);
            mealModel.setMeals(data.meals || []);
            mealView.displayMeals(mealModel.getMeals());
        } catch (error) {
            helpers.showError('Error fetching meals');
        }
    },

    async handleDailyMacros() {
        const token = authController.getToken();
        if (!token) {
            helpers.showError('Not authenticated');
            return;
        }

        try {
            const data = await apiService.getDailyMacros(token);
            dashboardView.updateDailyMacros(data);
        } catch (error) {
            helpers.showError('Error fetching daily macros');
        }
    }
};
