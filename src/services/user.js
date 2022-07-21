import API from "./api";

export const loginUser = async (data) => {
    try {
      const response = await API.post("/user/login", data);
      return  response.data
    } catch (e) {
      throw e;
    }
};