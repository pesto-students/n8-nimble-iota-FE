import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    ACCOUNT_ACTIVATION_REQUEST,
    ACCOUNT_ACTIVATION_SUCCESS,
    ACCOUNT_ACTIVATION_FAILURE,
    RESET_STATE,
    RESET_ERR_MSG,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    CHANGE_IMAGE_FAILURE,
    CHANGE_IMAGE_REQUEST,
    CHANGE_IMAGE_SUCCESS,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_FAILURE,
    GET_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILURE
} from "src/redux/user/userActionTypes";
import { produce } from "immer";

const initialState = {
    loading: false,
    error: "",
    user: null,
    userProfile : {},
    isAuthenticated: false,
    message: "",
    img: "",
};

const userReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOGIN_USER_REQUEST:
                draft.loading = true;
                return;
            case LOGIN_USER_SUCCESS:
                draft.loading = false;
                draft.isAuthenticated = true;
                draft.user = action.payload;
                return;
            case LOGIN_USER_FAILURE:
                draft.loading = false;
                draft.isAuthenticated = false;
                draft.user = null;
                draft.error = action.payload;
                return;
            case REGISTER_USER_REQUEST:
                draft.loading = true;
                return;
            case REGISTER_USER_SUCCESS:
                draft.loading = false;
                draft.message = action.payload.message;
                return;
            case REGISTER_USER_FAILURE:
                draft.loading = false;
                draft.user = null;
                draft.isAuthenticated = false;
                draft.error = action.payload;
                return;
            case LOGOUT_USER_REQUEST:
                draft.loading = true;
                return;
            case LOGOUT_USER_SUCCESS:
                draft.loading = false;
                draft.isAuthenticated = false;
                draft.user = null;
                draft.error = "";
                return;
            case LOGOUT_USER_FAILURE:
                draft.loading = false;
                draft.error = "Couldn't logout you!";
                return;
            case RESET_PASSWORD_REQUEST:
                draft.loading = true;
                return;
            case RESET_PASSWORD_SUCCESS:
                draft.loading = false;
                draft.message = action.payload.message;
                return;
            case RESET_PASSWORD_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            case FORGOT_PASSWORD_REQUEST:
                draft.loading = true;
                return;
            case FORGOT_PASSWORD_SUCCESS:
                draft.loading = false;
                draft.message = action.payload.message;
                return;
            case FORGOT_PASSWORD_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            case ACCOUNT_ACTIVATION_REQUEST:
                draft.loading = true;
                return;
            case ACCOUNT_ACTIVATION_SUCCESS:
                draft.loading = false;
                draft.isAuthenticated = true;
                draft.user = action.payload;
                return;
            case ACCOUNT_ACTIVATION_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            case RESET_STATE:
                draft.user = null;
                return;
            case RESET_ERR_MSG:
                draft.error = "";
                draft.message = "";
                return;
            case CHANGE_IMAGE_REQUEST:
                draft.loading = true;
                return;
            case CHANGE_IMAGE_SUCCESS:
                draft.loading = false;
                draft.img = action.payload;
                return;
            case CHANGE_IMAGE_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            case GET_USER_DATA_REQUEST:
                draft.loading = true;
                return;
            case GET_USER_DATA_SUCCESS:
                draft.loading = false;
                draft.userProfile = action.payload;
                return;
            case GET_USER_DATA_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            case UPDATE_USER_DATA_REQUEST:
                draft.loading = true;
                return;
            case UPDATE_USER_DATA_SUCCESS:
                draft.loading = false;
                draft.message = action.payload;
                return;
            case UPDATE_USER_DATA_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                return;
            default:
                return;
        }
    });
};

export default userReducer;
