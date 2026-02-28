// Helper functions and data
export const ingredients = {
    whole_egg: {
        name: "Whole Egg",
        calories: 78,
        calories_by_weight: 155,
        protein: 6,
        protein_by_weight: 13,
        fat: 5,
        fat_by_weight: 11,
        carbohydrates: 0.6,
        carbohydrates_by_weight: 0.6
    },
    bread: {
        name: "Bread",
        calories: 79,
        calories_by_weight: 265,
        protein: 4,
        protein_by_weight: 9,
        fat: 1,
        fat_by_weight: 3,
        carbohydrates: 15,
        carbohydrates_by_weight: 49
    },
    peanut_butter: {
        name: "Peanut Butter",
        calories: 95,
        calories_by_weight: 588,
        protein: 1,
        protein_by_weight: 25,
        fat: 16,
        fat_by_weight: 50,
        carbohydrates: 6,
        carbohydrates_by_weight: 20
    },
    onion: {
        name: "Onion",
        calories: 40,
        calories_by_weight: 40,
        protein: 1,
        protein_by_weight: 1,
        fat: 0,
        fat_by_weight: 0,
        carbohydrates: 9,
        carbohydrates_by_weight: 9
    },
    chicken_leg: {
        name: "Chicken Leg",
        calories: 180,
        calories_by_weight: 180,
        protein: 27,
        protein_by_weight: 27,
        fat: 8,
        fat_by_weight: 8,
        carbohydrates: 0,
        carbohydrates_by_weight: 0
    },
    milk: {
        name: "Milk",
        calories: 103,
        calories_by_weight: 42,
        protein: 8,
        protein_by_weight: 3.4,
        fat: 2,
        fat_by_weight: 1,
        carbohydrates: 12,
        carbohydrates_by_weight: 5
    }
};

// Utility helper functions
export const helpers = {
    isValidQuantity(quantity) {
        const num = parseFloat(quantity);
        return !isNaN(num) && num > 0;
    },

    showAlert(message) {
        alert(message);
    },

    showError(message) {
        console.error(message);
        alert(message);
    },

    redirectTo(url) {
        window.location.href = url;
    }
};
