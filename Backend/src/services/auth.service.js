const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const crypto = require('crypto');

const signup = async (username, email, password) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        provider: 'local',
        isVerified: false,
        verificationToken,
        verificationExpires: Date.now() + 900000 // Token expires in 15 minutes
    });

    await newUser.save();
    return { message: "User registered successfully" };
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        message: "Logged in successfully",
        jwtToken,
        email,
        name: user.username
    };
};

module.exports = { signup, login };
