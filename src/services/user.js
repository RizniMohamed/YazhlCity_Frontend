import API from "./api";

export const loginUser = async (data) => {
    try {
      console.log('login data: ', data);
      const response = await API.post("/user/login", data);
      return response
    } catch (e) {
      throw e;
    }
};