import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_DBURL;
export default axios;
