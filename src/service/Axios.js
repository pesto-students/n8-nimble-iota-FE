import axios from "axios";
// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_DBURL;
export default axios;
