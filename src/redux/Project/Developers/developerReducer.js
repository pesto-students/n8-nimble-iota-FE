import { produce } from "immer";
import {
    FETCH_DEVELOPERS_PROJECT_FAILURE,
    FETCH_DEVELOPERS_PROJECT_REQUEST,
    FETCH_DEVELOPERS_PROJECT_SUCCESS,
} from "src/redux/Project/Developers/developerActionTypes";

const initialState = {
    developerList: [],
    loadingDevelopers: true,
    error: "",
    msg: "",
};

const developerReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case FETCH_DEVELOPERS_PROJECT_REQUEST:
                draft.loadingDevelopers = true;
                return;
            case FETCH_DEVELOPERS_PROJECT_SUCCESS:
                draft.loadingDevelopers = false;
                draft.developerList = action.payload;
                return;
            case FETCH_DEVELOPERS_PROJECT_FAILURE:
                draft.loadingDevelopers = false;
                draft.error = action.payload;
                draft.msg = action.payload?.msg;
                return;
            default:
                return;
        }
    });
};

export default developerReducer;
