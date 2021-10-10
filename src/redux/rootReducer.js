import { combineReducers } from "redux";
import userReducer from "src/redux/user/userReducer";
import commonReducer from "src/redux/common/commonReducer";
import projectListReducer from "src/redux/projectList/projectListReducer";
import projectReducer from "src/redux/Project/projectReducer";
import sprintReducer from "src/redux/Project/Sprint/SprintReducer";

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    projectList: projectListReducer,
    project: projectReducer,
    sprint: sprintReducer,
});

export default rootReducer;
