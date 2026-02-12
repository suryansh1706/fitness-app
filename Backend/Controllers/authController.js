const bcrypt = require('bcrypt');
const UserModel = require('../Models/user');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    // Signup logic here
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new UserModel({ username, email, password, provider: 'local' });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const login = async (req, res) => {
    // Login logic here
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exists" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        res.status(200)
            .json({
                message: "Logged in successfully",
                jwtToken,
                email,
                name: user.username
            })
    }

    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { signup, login };