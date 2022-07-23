import axios from "axios";
import { authActions } from "../Store/authSlice";
import { dialogActions } from "../Store/dialogSlice";
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
  (response) => {
    if (response && response.data.status === 401) {
      return API.post("/user/token")
        .then((response) => {
          if (response.data.status !== 200) return response
          console.log(response.data);
          console.log(store.getState().auth);
          store.dispatch(authActions.set({ ...store.getState().auth, token: response.data.data.token }));
          console.log(store.getState().auth);
          response.config.headers["authorization"] =
            "Bearer " + response.data.data.token;
          return axios(response.config);
        })
    }
    return response;
  },
  (error) => {
    store.dispatch(authActions.reset())
    store.dispatch(dialogActions.show(['login']))
    return error
  }
);

export default API;
