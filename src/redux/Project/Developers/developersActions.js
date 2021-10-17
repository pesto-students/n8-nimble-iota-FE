import axios from "src/service/Axios";
import {
    FETCH_DEVELOPERS_PROJECT_REQUEST,
    FETCH_DEVELOPERS_PROJECT_SUCCESS,
    FETCH_DEVELOPERS_PROJECT_FAILURE,
} from "src/redux/Project/Developers/developerActionTypes";

export const fetchDeveloperProjectRequest = (obj) => {
    return {
        type: FETCH_DEVELOPERS_PROJECT_REQUEST,
        payload: obj,
    };
};

export const fetchDeveloperProjectSuccess = (obj) => {
    return {
        type: FETCH_DEVELOPERS_PROJECT_SUCCESS,
        payload: obj,
    };
};

export const fetchDeveloperProjectFailure = (obj) => {
    return {
        type: FETCH_DEVELOPERS_PROJECT_FAILURE,
        payload: obj,
    };
};

export const fetchAllDevlopersProject = (projectId) => {
    return (dispatch) => {
        dispatch(fetchDeveloperProjectRequest());
        axios
            .post("/alldevelopersOfAProject", { projectId })
            .then((response) => {
                dispatch(fetchDeveloperProjectSuccess(response.data.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(fetchDeveloperProjectFailure(error.response.data.message));
                } else {
                    dispatch(fetchDeveloperProjectFailure(error.message));
                }
            });
    };
};
