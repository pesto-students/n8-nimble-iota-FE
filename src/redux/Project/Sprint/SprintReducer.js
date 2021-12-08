import { produce } from "immer";
import {
    GET_SELECTED_SPRINT,
    SET_SELECTED_SPRINT,
    SET_SPRINT_LIST,
    START_SPRINT_FAILURE,
    START_SPRINT_REQUEST,
    START_SPRINT_SUCCESS,
} from "src/redux/Project/Sprint/SprintActionTypes";

const initialState = {
    selectedSprint: undefined,
    sprintList: [],
    loading: false,
};

const sprintReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_SELECTED_SPRINT:
                draft.loading = true;
                return;
            case SET_SELECTED_SPRINT:
                draft.selectedSprint = action.data;
                draft.loading = false;
                return;
            case SET_SPRINT_LIST:
                (draft.loading = true), (draft.sprintList = action.payload);
                return;
            case START_SPRINT_REQUEST:
                draft.loading = true;
                return;
            case START_SPRINT_SUCCESS:
                draft.loading = false;
                return;
            case START_SPRINT_FAILURE:
                draft.loading = false;
                return;
            default:
                return;
        }
    });
};

export default sprintReducer;
