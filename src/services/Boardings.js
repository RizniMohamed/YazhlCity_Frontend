import API from "./api";

export const getLocations = async () => {
    try {
        const response = await API.get("Boarding/location?sort=-id");
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getBoardings = async (query = "") => {
    try {
        const response = await API.get(`Boarding?${query}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const createBoarding = async (data) => {
    try {
        const response = await API.post(`Boarding`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data;
    } catch (e) {
        throw e;
    }
};