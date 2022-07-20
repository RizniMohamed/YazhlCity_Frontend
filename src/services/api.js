import axios from "axios";
import { authActions } from "../Store/authSlice";
import { store } from "../Store/store"

const auth = store.getState().auth.token
const API = axios.create();
API.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:5000/API/V1/";
    config.headers.Authorization = `Bearer ${auth.token}`;
    return config;
  },
  (error) => { return Promise.reject(error) }
);

API.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    if (error.response && error.response.status === 401) {
      return API.get("user/token")
        .then((response) => {
          store.dispatch(authActions.set({ ...auth, token: response.data.data.token }));
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.data.token;
          return axios(error.response.config);
        })
          .catch((error) => store.dispatch(authActions.reset()));
    }
    return Promise.reject(0);
  }
);

export default API;
