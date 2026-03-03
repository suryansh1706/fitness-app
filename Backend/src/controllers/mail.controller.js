const {mailSender} = require('../services/mail.service');

const mailController = async (req, res) => {
    try {
        const { email, verificationToken } = req.body;
        await mailSender(email, verificationToken);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports = { mailController };