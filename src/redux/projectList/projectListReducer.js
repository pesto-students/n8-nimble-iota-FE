import produce from "immer";
import { LOAD_PROJECT_LIST, SET_PROJECT_LIST } from "src/redux/projectList/projectListActionTypes";

const initialState = {
    loading: false,
    error: "",
    projects: [],
};

const projectListReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_PROJECT_LIST:
                draft.loading = true;
                return;
            case SET_PROJECT_LIST:
                draft.projects = action.data;
                return;

            default:
                return;
        }
    });
};

export default projectListReducer;
