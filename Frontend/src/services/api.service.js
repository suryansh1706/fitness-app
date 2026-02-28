// Centralized API service - all API calls in one place
const API_BASE_URL = 'http://localhost:5000';

export const apiService = {
    // Auth endpoints
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },

    async signup(username, email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        return response.json();
    },

    // Meal endpoints
    async saveMeal(mealData, token) {
        const response = await fetch(`${API_BASE_URL}/meals/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(mealData)
        });
        return response.json();
    },

    async fetchMeals(token) {
        const response = await fetch(`${API_BASE_URL}/meals/fetch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    async getDailyMacros(token) {
        const response = await fetch(`${API_BASE_URL}/meals/daily`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    async deleteMeal(mealId, token) {
        const response = await fetch(`${API_BASE_URL}/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }
};
