import { produce } from "immer";
import { GET_SELECTED_SPRINT, SET_SELECTED_SPRINT,SET_SPRINT_LIST } from "src/redux/Project/Sprint/SprintActionTypes";

const initialState = {
    selectedSprint: undefined,
    sprintList : [],
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
                draft.loading = true,
                draft.sprintList = action.payload
                return;
            default:
                return;
        }
    });
};

export default sprintReducer;
