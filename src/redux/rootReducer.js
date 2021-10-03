import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import commonReducer from "./common/commonReducer";
import projectListReducer from "./projectList/projectListReducer";
import projectReducer from "./Project/projectReducer";

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    projectList: projectListReducer,
    project: projectReducer,
});

export default rootReducer;
