import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import commonReducer from "./common/commonReducer";
import projectReducer from "./Project/projectReducer"

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    project: projectReducer
});

export default rootReducer;
