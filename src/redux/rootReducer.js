import { combineReducers } from "redux";
import commonReducer from "src/redux/common/commonReducer";
import memberSearchReducer from "src/redux/memberSearch/memberSearchReducer";
import projectReducer from "src/redux/Project/projectReducer";
import sprintReducer from "src/redux/Project/Sprint/SprintReducer";
import projectListReducer from "src/redux/projectList/projectListReducer";
import { LOGOUT_USER_SUCCESS } from "src/redux/user/userActionTypes";
import userReducer from "src/redux/user/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    common: commonReducer,
    projectList: projectListReducer,
    project: projectReducer,
    sprint: sprintReducer,
    memberSearch: memberSearchReducer,
});

const appReducer = (state, action) => {
    if (action.type === LOGOUT_USER_SUCCESS) {
      return rootReducer(undefined, action)
    }
  
    return rootReducer(state, action)
}

export default appReducer;
