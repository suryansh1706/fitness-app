// Meal view - handles meal display UI
export const mealView = {
    elements: {
        dropdown: document.querySelector('#ingredient'),
        quantity: document.querySelector('#quantity'),
        unit: document.querySelector('#unit'),
        caloriesDisplay: document.querySelector('#calories'),
        proteinDisplay: document.querySelector('#protein'),
        fatDisplay: document.querySelector('#fat'),
        carbohydratesDisplay: document.querySelector('#carbohydrates'),
        addBtn: document.querySelector('#addbtn'),
        saveBtn: document.querySelector('#savebtn'),
        fetchMealBtn: document.querySelector('#fetchmeal'),
        mealsContainer: document.querySelector('#mealsContainer')
    },

    getMealInputs() {
        return {
            ingredient: this.elements.dropdown.value,
            quantity: this.elements.quantity.value,
            unit: this.elements.unit.value
        };
    },

    updateMacroDisplay(macros) {
        this.elements.caloriesDisplay.textContent = macros.calories.toFixed(2);
        this.elements.proteinDisplay.textContent = macros.protein.toFixed(2);
        this.elements.fatDisplay.textContent = macros.fat.toFixed(2);
        this.elements.carbohydratesDisplay.textContent = macros.carbohydrates.toFixed(2);
    },

    resetMealInputs() {
        this.elements.dropdown.value = '';
        this.elements.unit.value = '';
        this.elements.quantity.value = '';
    },

    displayMeals(meals) {
        this.elements.mealsContainer.innerHTML = '';
        
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('meal-card');
            div.innerHTML = `
                <h3>${meal.name}</h3>
                <p>Calories: ${meal.calories}</p>
                <p>Protein: ${meal.protein}g</p>
                <p>Fat: ${meal.fat}g</p>
                <p>Carbs: ${meal.carbohydrates}g</p>
            `;
            this.elements.mealsContainer.appendChild(div);
        });
    },

    attachAddListener(callback) {
        this.elements.addBtn.addEventListener('click', () => {
            callback(this.getMealInputs());
        });
    },

    attachSaveListener(callback) {
        this.elements.saveBtn.addEventListener('click', callback);
    },

    attachFetchListener(callback) {
        this.elements.fetchMealBtn.addEventListener('click', callback);
    }
};
