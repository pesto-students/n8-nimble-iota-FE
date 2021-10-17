import axios from "../../../service/Axios";

import {
    SET_SELECTED_SPRINT,
    SET_SPRINT_LIST,
    MARK_SPRINT_COMPLETE,
    START_SPRINT_REQUEST,
    START_SPRINT_SUCCESS,
    START_SPRINT_FAILURE,
} from "src/redux/Project/Sprint/SprintActionTypes";
import { fetchAllTickets, loadProjects } from "src/redux";



export const setSelectedSprint = (sprint) => ({
    type: SET_SELECTED_SPRINT,
    data: sprint,
});

export const setSprintList = (sprintList) => ({
    type: SET_SPRINT_LIST,
    payload: sprintList,
});

export const startSprintRequest = (sprintList) => ({
    type: SET_SPRINT_LIST,
    payload: sprintList,
});

export const startSprintSuccess = (obj) => ({
    type: START_SPRINT_SUCCESS,
    payload: obj,
});

export const startSprintFailure = (obj) => ({
    type: START_SPRINT_FAILURE,
    payload: obj,
});

export const markSprintComplete = (obj) => ({
    type: MARK_SPRINT_COMPLETE,
    payload : obj
});


export const startSprint = (projectId,sprintId) => {
    return (dispatch) => {
        dispatch(startSprintRequest());
        axios
            .post("/startsprint", { projectId, sprintId })
            .then((response) => {
                dispatch(startSprintSuccess(response.data.message));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(startSprintFailure(error.response.data.message));
                    
                } else {
                    dispatch(startSprintFailure(error.message));
                }
            });
    };
};

export const completeSprint = (sprintId) => {
    console.log(sprintId);
    return (dispatch) => {
        axios
            .put("/completesprint", {sprintId })
            .then((response) => {
                dispatch(markSprintComplete(response.data.message));
                dispatch(loadProjects())
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(startSprintFailure(error.response.data.message));
                } else {
                    dispatch(startSprintFailure(error.message));
                }
            });
    };
};

