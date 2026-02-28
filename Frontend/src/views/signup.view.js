// Signup view handler
export const signupView = {
    elements: {
        form: document.querySelector('#signupForm'),
        usernameInput: document.querySelector('#username'),
        emailInput: document.querySelector('#email'),
        passwordInput: document.querySelector('#password')
    },

    getFormData() {
        return {
            username: this.elements.usernameInput.value,
            email: this.elements.emailInput.value,
            password: this.elements.passwordInput.value
        };
    },

    resetForm() {
        this.elements.form.reset();
    },

    attachSubmitListener(callback) {
        this.elements.form.addEventListener('submit', (event) => {
            event.preventDefault();
            callback(this.getFormData());
        });
    }
};
