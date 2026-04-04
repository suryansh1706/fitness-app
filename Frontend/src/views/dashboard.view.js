// Dashboard view - displays daily macros and main dashboard
export const dashboardView = {
    elements: {
        caloriesToday: document.querySelector('#caloriestoday'),
        proteinToday: document.querySelector('#proteintoday'),
        fatToday: document.querySelector('#fattoday'),
        carbohydratesToday: document.querySelector('#carbohydratestoday')
    },

    updateDailyMacros(macros) {
        this.elements.caloriesToday.textContent = macros.calories;
        this.elements.proteinToday.textContent = macros.protein;
        this.elements.fatToday.textContent = macros.fat;
        this.elements.carbohydratesToday.textContent = macros.carbohydrates;
    },

    loadDailyMacros(callback) {
        // Execute immediately if DOM is ready, otherwise wait for load event
        if (document.readyState === 'interactive' ||
            document.readyState === 'complete') {
            callback();
        }
    }
};
