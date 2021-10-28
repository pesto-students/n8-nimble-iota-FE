import Notification from "src/components/Common/Notification/Notification";

const { default: produce } = require("immer");
const {
    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
    SEARCH_MEMBER_FAIL,
} = require("src/redux/memberSearch/memberSearchActionTypes");

const initialState = {
    members: [],
    loading: false,
    error: "",
};

const memberSearchReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SEARCH_MEMBER_REQUEST:
                draft.loading = true;
                return;
            case SEARCH_MEMBER_SUCCESS:
                draft.members = action.data;
                draft.loading = false;
                Notification("success", "Member added successfully.");
                return;
            case SEARCH_MEMBER_FAIL:
                draft.error = action.data;
                return;
            default:
                return;
        }
    });
};

export default memberSearchReducer;
