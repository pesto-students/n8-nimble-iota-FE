import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import commonReducer from "./common/commonReducer";
import projectListReducer from "./projectList/projectListReducer";

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    projectList: projectListReducer,
});

export default rootReducer;
