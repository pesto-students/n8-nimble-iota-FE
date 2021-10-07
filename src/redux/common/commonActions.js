import { SET_LOADER_FALSE, SET_LOADER_TRUE, SHOW_NOTIFICATION, REMOVE_NOTIFICATION } from "./commonActionTypes";

export const setLoadingTrue = () => {
    return {
        type: SET_LOADER_TRUE,
    };
};

export const setLoadingFalse = () => {
    return {
        type: SET_LOADER_FALSE,
    };
};

export const showNotification = (obj) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: obj,
    };
};

export const removeNotification = () => {
    return {
        type: REMOVE_NOTIFICATION,
    };
};

export const showNotificationRequest = (type, message) => {
    return (dispatch) => {
        dispatch(showNotification({ type, message }));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 2000);
    };
};
