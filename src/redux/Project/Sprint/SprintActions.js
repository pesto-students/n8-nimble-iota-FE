import { loadProjects } from "src/redux";
import {
    MARK_SPRINT_COMPLETE,
    SET_SELECTED_SPRINT,
    SET_SPRINT_LIST,
    START_SPRINT_FAILURE,
    START_SPRINT_SUCCESS,
} from "src/redux/Project/Sprint/SprintActionTypes";
import axios from "../../../service/Axios";

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
    payload: obj,
});

export const startSprint = (projectId, selectedSprint) => {
    return (dispatch) => {
        dispatch(startSprintRequest());
        axios
            .post("/startsprint", { projectId, sprintId: selectedSprint?._id })
            .then((response) => {
                dispatch(loadProjects());
                dispatch(startSprintSuccess(response.data.message));
                dispatch(setSelectedSprint(selectedSprint));
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

export const completeSprint = (selectedSprint) => {
    return (dispatch) => {
        axios
            .put("/completesprint", { sprintId: selectedSprint._id })
            .then((response) => {
                dispatch(loadProjects());
                dispatch(markSprintComplete(response.data.message));
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
