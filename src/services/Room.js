import API from "./api";

export const getRooms = async (query = "") => {
    try {
        const response = await API.get(`room?${query}`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const getFacilities = async () => {
    try {
        const response = await API.get(`room/facility`);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const deleteRoom = async (data) => {
    try {
        const response = await API.delete(`room`,{data});
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const createRoom = async (data) => {
    try {
        const response = await API.post(`room`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (e) {
        throw e;
    }
};

