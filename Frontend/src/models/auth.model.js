// Auth model - handles login/signup data
export const authModel = {
    token: null,
    user: null,

    setToken(jwtToken) {
        this.token = jwtToken;
        localStorage.setItem('jwtToken', jwtToken);
    },

    getToken() {
        return this.token || localStorage.getItem('jwtToken');
    },

    clearToken() {
        this.token = null;
        localStorage.removeItem('jwtToken');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};
