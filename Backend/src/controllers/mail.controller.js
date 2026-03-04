const {mailSender} = require('../services/mail.service');

const mailController = async (email, verificationToken) => {
    try {
        await mailSender(email, verificationToken);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to send verification email");
    }
};

module.exports = { mailController };