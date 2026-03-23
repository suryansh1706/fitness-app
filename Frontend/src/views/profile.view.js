export const profileView = {
    elements: {
        form: document.querySelector('form'),
        age: document.querySelector('#age'),
        gender: document.querySelector('#gender'),
        weight: document.querySelector('#weight'),
        height: document.querySelector('#height'),
        activityLevel: document.querySelector('#activityLevel'),
        goal: document.querySelector('#goal'),
        saveButton: document.querySelector('#save-profile'),
        maintenanceCalories: document.querySelector('#maintenance-calories')
    },

    getProfileData() {
        return {
            age: this.elements.age.value,
            gender: this.elements.gender.value,
            weight: this.elements.weight.value,
            height: this.elements.height.value,
            activityLevel: this.elements.activityLevel.value,
            goal: this.elements.goal.value
        };
    },

    displayMaintenanceCalories(calories) {
        if (this.elements.maintenanceCalories) {
            this.elements.maintenanceCalories.textContent = `Your maintenance calories: ${calories} kcal/day`;
        }
    },

    resetForm() {
        this.elements.age.value = '';
        this.elements.gender.value = '';
        this.elements.weight.value = '';
        this.elements.height.value = '';
        this.elements.activityLevel.value = '';
        this.elements.goal.value = '';
    },

    attachSaveListener(callback) {
        this.elements.form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(this.getProfileData());
        });
    }

}
