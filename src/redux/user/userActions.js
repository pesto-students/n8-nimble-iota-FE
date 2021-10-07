import axios from "../../service/Axios";
import { fbstorage } from "../../service/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    ACCOUNT_ACTIVATION_FAILURE,
    ACCOUNT_ACTIVATION_SUCCESS,
    ACCOUNT_ACTIVATION_REQUEST,
    CHANGE_IMAGE_REQUEST,
    CHANGE_IMAGE_SUCCESS,
    CHANGE_IMAGE_FAILURE,
    RESET_STATE,
    RESET_ERR_MSG,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
} from "./userActionTypes";
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
                        const img = document.getElementById(id);
                        img.setAttribute("src", url);
                        axios
                            .put("/user", { imgurl: url })
                            .then(() => {
                                dispatch(changeImageSuccess(url));
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
                localStorage.setItem("user", JSON.stringify(user));
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
