import { SET_LOADER_FALSE, SET_LOADER_TRUE } from "./commonActionTypes";

export const setLoaderTrue = () => {
    return (dispatch) => {
        dispatch(setLoadingTrue());
    };
};

export const setLoadingTrue = () => {
    console.log("sddddddddddddddddddddddddddddddddd");
    return {
        type: SET_LOADER_TRUE,
    };
};

export const setLoadingFalse = () => {
    return {
        type: SET_LOADER_FALSE,
    };
};
