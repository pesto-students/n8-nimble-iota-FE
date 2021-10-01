import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import commonReducer from "./common/commonReducer";

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
});

export default rootReducer;
