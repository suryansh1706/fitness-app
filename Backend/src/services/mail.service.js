const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
    },
});

const mailSender = async (email, verificationToken) => {
    const verificationLink = `http://localhost:5000/auth/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
        from: `"Meal Tracker" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html: `<a href="${verificationLink}">Verify Email</a>`
    });
};

module.exports = { mailSender };