import { apiService } from "../services/api.service.js";

export const mailController = async (credentials) => {
    try {
        await apiService.sendEmail(credentials);
        return { message: "Email sent successfully" };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to send email");
    }
};
