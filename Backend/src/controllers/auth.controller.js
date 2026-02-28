const { signup, login } = require('../services/auth.service');

const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await signup(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { signupController, loginController };
