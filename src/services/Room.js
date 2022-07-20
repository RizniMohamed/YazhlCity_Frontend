import API from "./api";



export const getRooms = async (query="") => {
    try {
        const response = await API.get(`room?${query}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};