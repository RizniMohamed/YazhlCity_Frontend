import API from "./api";

export const makePayment = async (data) => {
    try {
        const response = await API.post(`payment`,data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const LKR_USD = async (amount) => {
    try {
        const response = await API.get(`https://api.fastforex.io/convert?api_key=93a4277c4f-7a363b87e8-rfhipg&from=LKR&to=USD&amount=${amount}`);
        return response.data.result.USD;
    } catch (e) {
        throw e;
    }
};