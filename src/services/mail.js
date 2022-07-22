import API from "./api";

export const sendMail = async (data) => {
    try {
        const response = await API.post("https://api.emailjs.com/api/v1.0/email/send",data);
        return response.data;
    } catch (e) {
        throw e;
    }
};