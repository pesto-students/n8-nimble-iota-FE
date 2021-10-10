import {
    ADD_RETROSPECTIVE_REQUEST,
    ADD_RETROSPECTIVE_SUCCESS,
    ADD_RETROSPECTIVE_FAILURE,
    UPDATE_RETROSPECTIVE,
    DELETE_RETROSPECTIVE,
    FETCH_RETROSPECTIVES_DEVELOPER,
    FETCH_ALL_RETROSPECTIVES,
    MARK_RETROSPECTIVES_COMPLETE
} from "src/redux/Project/Reports/reportActionTypes";
import { produce } from "immer";

const initialState = {
    retroList: [],
    loading: true,
    error: "",
    msg: "",
};

const retroReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_RETROSPECTIVE_REQUEST:
                draft.loading = true;
                return;
            case ADD_RETROSPECTIVE_SUCCESS:
                draft.loading = false;
                draft.retroList = action.payload;
                return;
            case ADD_RETROSPECTIVE_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            default:
                return;
        }
    });
};

export default retroReducer;
