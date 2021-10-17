import axios from "axios";

// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_DBURL;
axios.defaults.withCredentials = true;
import { setLoadingTrue, setLoadingFalse } from "src/redux";

export const setupAxios = (history, dispatch) => {
    axios.interceptors.request.use(
        (config) => {
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
