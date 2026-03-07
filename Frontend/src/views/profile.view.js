export const profileView = {
    elements: {
        age: document.querySelector('#age'),
        gender: document.querySelector('#gender'),
        weight: document.querySelector('#weight'),
        height: document.querySelector('#height'),
        activityLevel: document.querySelector('#activityLevel'),
        goal: document.querySelector('#goal'),
        saveButton: document.querySelector('#save-profile'),
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

    attachSaveListener(callback) {
        this.elements.saveButton.addEventListener('click', () => {
            callback(this.getProfileData());
        });
    }

}
