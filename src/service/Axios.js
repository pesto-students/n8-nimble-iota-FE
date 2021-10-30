import axios from "axios";
import { setLoadingFalse, setLoadingTrue } from "src/redux";

// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_DBURL;
axios.defaults.withCredentials = true;

export const setupAxios = (history, dispatch) => {
    axios.interceptors.request.use(
        (config) => {
            const loggedInUser = localStorage.getItem("user");
            const foundUser = loggedInUser && JSON.parse(loggedInUser);
            if (!config.headers?.Authorization) config.headers.Authorization = "Bearer " + foundUser?.accessToken;
            dispatch(setLoadingTrue());
            return config;
        },
        (error) => {
            dispatch(setLoadingTrue());
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (response) => {
            dispatch(setLoadingFalse());
            return response;
        },
        (error) => {
            const originalRequest = error.config;
            dispatch(setLoadingFalse());
            if (!error.response || error.response.status in [500, 503]) {
                return history.push("/500");
            }
            if (error.response.status === 404) {
                return history.push("/404");
            }
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const loggedInUser = localStorage.getItem("user");
                const foundUser = loggedInUser && JSON.parse(loggedInUser);
                return axios
                    .post("/token", {
                        token: foundUser.token,
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            foundUser.accessToken = res.data?.accessToken;
                            localStorage.setItem("user", JSON.stringify(foundUser));
                            originalRequest.headers.Authorization = "Bearer " + foundUser.accessToken;
                            return axios(originalRequest);
                        }
                    })
                    .catch(() => {
                        return history.push("/");
                    });
            }
            return Promise.reject(error);
        }
    );
};

export default axios;
