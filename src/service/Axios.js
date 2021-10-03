import axios from "axios";
// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_DBURL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const loggedInUser = localStorage.getItem("user");
            const foundUser = loggedInUser && JSON.parse(loggedInUser);
            return axios
                .post("/token", {
                    token: foundUser.token,
                })
                .then((res) => {
                    if (res.status === 200) return axios(originalRequest);
                });
        }
        return Promise.reject(error);
    }
);
export default axios;
