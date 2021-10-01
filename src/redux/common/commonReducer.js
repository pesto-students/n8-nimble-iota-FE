import { SET_LOADER_FALSE, SET_LOADER_TRUE } from "./commonActionTypes";
import { produce } from "immer";

const initialState = {
    loading: false,
};

const commonReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_LOADER_FALSE:
                draft.loading = false;
                return;
            case SET_LOADER_TRUE:
                draft.loading = true;
                return;
            default:
                return;
        }
    });
};

export default commonReducer;
