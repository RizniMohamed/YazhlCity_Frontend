import axios from "axios";

const API = axios.create();
API.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth;

    // eslint-disable-next-line no-param-reassign
    config.baseURL = "/api/v1";
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(0);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return API.get("/auth/token")
        .then((response) => {
          store.dispatch(setToken(response.data.data.token));
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.data.token;
          return axios(error.response.config);
        })
        .catch((error) => {
          store.dispatch(removeToken());
          store.dispatch(removeUser());
          store.dispatch(setAlert(userMsgs[3], 4));
        });
    }

    return Promise.reject(0);
  }
);
export default API;
