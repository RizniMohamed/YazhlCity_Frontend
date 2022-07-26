import axios from "axios";
import { authActions } from "../Store/authSlice";
import { dialogActions } from "../Store/dialogSlice";
import { messageActions } from "../Store/messageSlice";
import { store } from "../Store/store"

const API = axios.create({ baseURL: 'http://localhost:5000/API/V1/', });

API.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${store.getState().auth.token}`;
    return config;
  },
  (error) => { console.log(error); }
);

API.interceptors.response.use(
  async (response) =>  response,
  async (error) => {
    if (error.response.status === 401) {
      if (store.getState().auth.token) {
        const access_token = await API.post("/user/token")
        store.dispatch(authActions.set({ ...store.getState().auth, token: access_token.data.data.token }));
        error.config.headers["authorization"] = "Bearer " + access_token.data.data.token;
        return axios(error.config);
      }
      store.dispatch(authActions.reset())
      store.dispatch(dialogActions.show(['login']))
      store.dispatch(messageActions.show(['Please Login', "error"]))
      Promise.reject(error)
    }
  }
);

export default API;
