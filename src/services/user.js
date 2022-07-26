import API from "./api";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const singupUser = async (data) => {
  try {
    const response = await API.post("/user/register", data);
    return response.data
  } catch (e) {
    throw e;
  }
};

export const verifyEmail = async (data) => {
  try {
    const response = await API.post(`/user/email`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await API.patch(`/user/password`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const subscribe = async (data) => {
  try {
    const response = await API.post(`/user/subscribe`, data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getAuths = async (query = "") => {
  try {
    const response = await API.get(`user/auth?${query}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getUsers = async (query = "") => {
  try {
    const response = await API.get(`user?${query}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await API.patch(`user`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deleteAccount = async (data) => {
  try {
    const response = await API.delete(`user`, { data });
    return response.data;
  } catch (e) {
    throw e;
  }
};