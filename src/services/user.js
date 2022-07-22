import API from "./api";

export const loginUser = async (data) => {
    try {
      const response = await API.post("/user/login", data);
      return  response.data
    } catch (e) {
      throw e;
    }
};

export const singupUser = async (data) => {
    try {
      const response = await API.post("/user/register", data);
      return  response.data
    } catch (e) {
      throw e;
    }
};

export const verifyEmail = async (data) => {
  try {
    const response = await API.post(`/user/email`,data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updatePassword = async (data) => {
  try {
    const response = await API.patch(`/user/password`,data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const subscribe = async (data) => {
  try {
    const response = await API.post(`/user/subscribe`,data);
    return response.data;
  } catch (e) {
    throw e;
  }
};