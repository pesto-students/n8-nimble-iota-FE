import {
    ADD_RETROSPECTIVE_REQUEST,
    ADD_RETROSPECTIVE_SUCCESS,
    ADD_RETROSPECTIVE_FAILURE,
    FETCH_RETROSPECTIVES_REQUEST,
    FETCH_RETROSPECTIVES_SUCCESS,
    FETCH_RETROSPECTIVES_FAILURE,
} from "src/redux/Project/Retrospectives/retroActionTypes";
import { produce } from "immer";

const initialState = {
    retros: {},
    retroLoading: true,
    error: "",
    msg: "",
};

const retroReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_RETROSPECTIVE_REQUEST:
                draft.retroLoading = true;
                return;
            case ADD_RETROSPECTIVE_SUCCESS:
                draft.retroLoading = false;
                draft.retros = action.payload;
                return;
            case ADD_RETROSPECTIVE_FAILURE:
                draft.retroLoading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            case FETCH_RETROSPECTIVES_REQUEST:
                draft.retroLoading = true;
                return;
            case FETCH_RETROSPECTIVES_SUCCESS:
                draft.retroLoading = false;
                draft.retros = action.payload;
                return;
            case FETCH_RETROSPECTIVES_FAILURE:
                draft.retroLoading = false;
                draft.msg = action.payload;
                return;

            default:
                return;
        }
    });
};

export default retroReducer;
