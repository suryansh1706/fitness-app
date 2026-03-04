const { signup, login, verifyEmailToken } = require('../services/auth.service');

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

const verifyTokenController = async (req, res) => {
    try {
      await verifyEmailToken(req.query.token);
      return res.redirect("http://127.0.0.1:5500/Frontend/public/login.html"); 
   } catch (error) {
      return res.redirect("http://127.0.0.1:5500/Frontend/public/error.html");
    }
};

module.exports = { signupController, loginController, verifyTokenController };
