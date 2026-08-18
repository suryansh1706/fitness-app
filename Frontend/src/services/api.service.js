// Centralized API service - all API calls in one place
export const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : window.location.origin;


function getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('jwtToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export const apiService = {
    // Auth endpoints
    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.jwtToken) {
            localStorage.setItem('jwtToken', data.jwtToken);
        }
        return data;
    },

    async signup(username, email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (data.jwtToken) {
            localStorage.setItem('jwtToken', data.jwtToken);
        }
        return data;
    },

    // Meal endpoints
    async saveMeal(mealData) {
        const response = await fetch(`${API_BASE_URL}/meals/save`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify(mealData)
        });
        return response.json();
    },

    // Helper function to verify authentication
    async verifyAuthentication() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/verify`, {
                method: 'GET',
                credentials: 'include',
                headers: getHeaders(),
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    },

    async fetchMeals() {
        const response = await fetch(`${API_BASE_URL}/meals/fetch`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    },

    async getDailyMacros() {
        const response = await fetch(`${API_BASE_URL}/meals/daily`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    },

    async searchMeal(query) {
        const response = await fetch(`${API_BASE_URL}/meals/search?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    },

    async saveUserProfile(profileData) {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify(profileData)
        });
        return response.json();
    },

    // Workout endpoints
    async saveWorkout(workoutData) {
        const response = await fetch(`${API_BASE_URL}/workouts/save`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify(workoutData)
        });
        return response.json();
    },

    async fetchWorkouts() {
        const response = await fetch(`${API_BASE_URL}/workouts/fetch`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    },

    async deleteWorkout(id) {
        const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    },

    async clearWorkouts() {
        const response = await fetch(`${API_BASE_URL}/workouts/clear`, {
            method: 'DELETE',
            headers: getHeaders(),
            credentials: 'include'
        });
        return response.json();
    }
};
