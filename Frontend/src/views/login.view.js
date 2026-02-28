// Login view handler
export const loginView = {
    elements: {
        form: document.querySelector('#loginForm'),
        emailInput: document.querySelector('#email'),
        passwordInput: document.querySelector('#password')
    },

    getFormData() {
        return {
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
