import API from "./api";

export const makePayment = async (data) => {
    try {
        const response = await API.post(`payment`,data);
        return response.data;
    } catch (e) {
        throw e;
    }
};