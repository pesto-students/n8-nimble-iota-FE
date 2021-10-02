import {
    FETCH_DEVELOPERS_PROJECT_REQUEST,
    FETCH_DEVELOPERS_PROJECT_SUCCESS,
    FETCH_DEVELOPERS_PROJECT_FAILURE
} from "./developerActionTypes";

import { produce } from "immer";

const initialState = {
    developerList: [],
    loading: true,
    error: "",
    msg: ""
 
};

const developerReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
        case FETCH_DEVELOPERS_PROJECT_REQUEST:
            draft.loading = true;
            return;
        case FETCH_DEVELOPERS_PROJECT_SUCCESS:
            draft.loading = false;
            draft.developerList = action.payload;
            return;
        case FETCH_DEVELOPERS_PROJECT_FAILURE:
            draft.loading = false;
            draft.error = action.payload;
            draft.msg = action.payload.msg;
            return;
        default:
            return;
        }
    });
};

export default developerReducer;
