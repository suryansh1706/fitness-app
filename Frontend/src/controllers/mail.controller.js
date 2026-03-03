import { apiService } from "../services/api.service.js";

export const mailController = async (email) => {
    try {
        await apiService.sendEmail(email);
        return { message: "Email sent successfully" };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to send email");
    }
};
