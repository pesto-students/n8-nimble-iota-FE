import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
    ACCOUNT_ACTIVATION_FAILURE,
    ACCOUNT_ACTIVATION_REQUEST,
    ACCOUNT_ACTIVATION_SUCCESS,
    CHANGE_IMAGE_FAILURE,
    CHANGE_IMAGE_REQUEST,
    CHANGE_IMAGE_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_DATA_FAILURE,
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    RESET_ERR_MSG,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_STATE,
    UPDATE_USER_DATA_FAILURE,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
} from "src/redux/user/userActionTypes";
import axios from "src/service/Axios";
import { fbstorage } from "src/service/firebase";
export const LogoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        const loggedInUser = localStorage.getItem("user");
        const foundUser = loggedInUser && JSON.parse(loggedInUser);
        axios
            .delete("/logout", { data: { token: foundUser.token } })
            .then(() => {
                dispatch(logoutSuccess());
            })
            .catch(() => {
                dispatch(logoutFailure());
            });
    };
};

export const ChangeImage = (image, email, id) => {
    return (dispatch) => {
        dispatch(changeImageRequest());
        const profileImgRef = ref(fbstorage, `profile-images/${email}`);
        uploadBytes(profileImgRef, image)
            .then(() => {
                getDownloadURL(ref(fbstorage, `profile-images/${email}`))
                    .then((url) => {
                        axios
                            .put("/user", { imgurl: url })
                            .then(() => {
                                dispatch(changeImageSuccess(url));
                                dispatch(getUserData(id));
                            })
                            .catch((error) => {
                                dispatch(changeImageFailure(error));
                            });
                    })
                    .catch((error) => {
                        dispatch(changeImageFailure(error));
                    });
            })
            .catch((error) => {
                dispatch(changeImageFailure(error));
            });
    };
};

export const LoginUser = (email, password) => {
    return (dispatch) => {
        dispatch(loginUserRequest());
        axios
            .post("/login", { email, password })
            .then((response) => {
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(loginUserSuccess(user));
                dispatch(getUserData(user.id));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(loginUserFailure(error.response.data.message));
                } else {
                    dispatch(loginUserFailure(error.message));
                }
            });
    };
};

export const RegisterUser = (name, email, password, role) => {
    return (dispatch) => {
        dispatch(registerUserRequest());
        axios
            .post("/register", { name, email, password, role })
            .then((response) => {
                dispatch(registerUserSuccess(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(registerUserFailure(error.response.data.message));
                } else {
                    dispatch(registerUserFailure(error.message));
                }
            });
    };
};

export const AccountActivation = (obj) => {
    return (dispatch) => {
        dispatch(accountActivationRequest());
        axios
            .put("/activate", obj)
            .then((response) => {
                const user = response.data;
                dispatch(accountActivationSuccess(user));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(accountActivationFailure(error.response.data.message));
                } else {
                    dispatch(accountActivationFailure(error.message));
                }
            });
    };
};

export const ForgotPassword = (email) => {
    return (dispatch) => {
        dispatch(forgotPasswordRequest());
        axios
            .put("/forgotpassword", { email })
            .then((response) => {
                dispatch(forgotPasswordSuccess(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(forgotPasswordFailure(error.response.data.message));
                } else {
                    dispatch(forgotPasswordFailure(error.message));
                }
            });
    };
};

export const ResetPassword = (oldpassword, newpassword) => {
    return (dispatch) => {
        dispatch(resetPasswordRequest());
        axios
            .put("/resetpassword", { oldpassword, newpassword })
            .then((response) => {
                dispatch(resetPasswordSuccess(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(resetPasswordFailure(error.response.data.message));
                } else {
                    dispatch(resetPasswordFailure(error.message));
                }
            });
    };
};

export const getUserData = (id) => {
    return (dispatch) => {
        dispatch(getUserDataRequest());
        axios
            .post("/getUserData", { id })
            .then((response) => {
                dispatch(getUserDataSuccess(response.data.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(getUserDataFailure(error.response.data.message));
                } else {
                    dispatch(getUserDataFailure(error.message));
                }
            });
    };
};

export const updateUserData = (name, phone, location, selfintro, id) => {
    return (dispatch) => {
        dispatch(updateUserDataRequest());
        axios
            .put("/user", { name, phone, location, selfintro })
            .then((response) => {
                dispatch(updateUserDataSuccess(response.data.message));
                dispatch(getUserData(id));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(updateUserDataFailure(error.response));
                } else {
                    dispatch(updateUserDataFailure(error.response));
                }
            });
    };
};

export const getUserDataRequest = () => {
    return {
        type: GET_USER_DATA_REQUEST,
    };
};

export const getUserDataSuccess = (obj) => {
    return {
        type: GET_USER_DATA_SUCCESS,
        payload: obj,
    };
};

export const getUserDataFailure = (error) => {
    return {
        type: GET_USER_DATA_FAILURE,
        payload: error,
    };
};

export const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST,
    };
};

export const forgotPasswordSuccess = (obj) => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: obj,
    };
};

export const forgotPasswordFailure = (error) => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: error,
    };
};

export const accountActivationRequest = () => {
    return {
        type: ACCOUNT_ACTIVATION_REQUEST,
    };
};

export const accountActivationSuccess = (user) => {
    return {
        type: ACCOUNT_ACTIVATION_SUCCESS,
        payload: user,
    };
};

export const accountActivationFailure = (error) => {
    return {
        type: ACCOUNT_ACTIVATION_FAILURE,
        payload: error,
    };
};

export const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST,
    };
};

export const resetPasswordSuccess = (obj) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: obj,
    };
};

export const resetPasswordFailure = (error) => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: error,
    };
};

export const loginUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST,
    };
};

export const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user,
    };
};

export const loginUserFailure = (error) => {
    return {
        type: LOGIN_USER_FAILURE,
        payload: error,
    };
};

export const registerUserRequest = () => {
    return {
        type: REGISTER_USER_REQUEST,
    };
};

export const registerUserSuccess = (data) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data,
    };
};

export const registerUserFailure = (error) => {
    return {
        type: REGISTER_USER_FAILURE,
        payload: error,
    };
};

export const resetState = () => {
    return {
        type: RESET_STATE,
    };
};

export const resetErrorAndMessage = () => {
    return {
        type: RESET_ERR_MSG,
    };
};

export const logoutRequest = () => {
    return {
        type: LOGOUT_USER_REQUEST,
    };
};

export const logoutSuccess = () => {
    localStorage.clear();
    return {
        type: LOGOUT_USER_SUCCESS,
    };
};

export const logoutFailure = () => {
    return {
        type: LOGOUT_USER_FAILURE,
    };
};

export const changeImageRequest = () => {
    return {
        type: CHANGE_IMAGE_REQUEST,
    };
};

export const changeImageSuccess = (obj) => {
    return {
        type: CHANGE_IMAGE_SUCCESS,
        payload: obj,
    };
};

export const changeImageFailure = (error) => {
    return {
        type: CHANGE_IMAGE_FAILURE,
        payload: error,
    };
};

export const updateUserDataRequest = () => {
    return {
        type: UPDATE_USER_DATA_REQUEST,
    };
};

export const updateUserDataSuccess = (obj) => {
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        payload: obj,
    };
};

export const updateUserDataFailure = (error) => {
    return {
        type: UPDATE_USER_DATA_FAILURE,
        payload: error,
    };
};
