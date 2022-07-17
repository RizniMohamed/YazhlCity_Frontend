import API from "./api";

export const loginUser = async (data) => {
    try {
      console.log('login data: ', data);
      const response = await API.post("/auth/login", data);
      throw new Error(100);
    } catch (e) {
      throw e;
    }
};