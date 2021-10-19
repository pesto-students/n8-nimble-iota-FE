import {
    FETCH_REPORTS_DATA_FAILURE,
    FETCH_REPORTS_DATA_REQUEST,
    FETCH_REPORTS_DATA_SUCCESS,
    INCREMENT_STORY_POINTS_ACHIEVED_FAILURE,
    INCREMENT_STORY_POINTS_ACHIEVED_REQUEST,
    INCREMENT_STORY_POINTS_ACHIEVED_SUCCESS,
} from "src/redux/Project/Reports/reportActionTypes";
import axios from "src/service/Axios";

export const incrementStroyPointsAchievedRequest = () => {
    return {
        type: INCREMENT_STORY_POINTS_ACHIEVED_REQUEST,
    };
};
export const incrementStroyPointsAchievedSuccess = (obj) => {
    return {
        type: INCREMENT_STORY_POINTS_ACHIEVED_SUCCESS,
        payload: obj,
    };
};
export const incrementStroyPointsAchievedFailure = (obj) => {
    return {
        type: INCREMENT_STORY_POINTS_ACHIEVED_FAILURE,
        payload: obj,
    };
};

export const fetchReportDataRequest = () => {
    return {
        type: FETCH_REPORTS_DATA_REQUEST,
    };
};
export const fetchReportDataRequestSuccess = (obj) => {
    return {
        type: FETCH_REPORTS_DATA_SUCCESS,
        payload: obj,
    };
};
export const fetchReportDataRequestFailure = (obj) => {
    return {
        type: FETCH_REPORTS_DATA_FAILURE,
        payload: obj,
    };
};

export const incrementStroyPoints = (sprintId, ticketId, storyPoints) => {
    return async (dispatch) => {
        dispatch(incrementStroyPointsAchievedRequest());
        axios
            .post("/incrementStoryPoint", {
                sprintId,
                payload: {
                    ticketId,
                    storyPoints: parseInt(storyPoints),
                },
            })
            .then((response) => {
                const data = response.data.message;
                dispatch(incrementStroyPointsAchievedSuccess(data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(incrementStroyPointsAchievedFailure(error.response.data.message));
                } else {
                    dispatch(incrementStroyPointsAchievedFailure(error.message));
                }
            });
    };
};

export const fetchReportData = (sprintId) => {
    return async (dispatch) => {
        dispatch(fetchReportDataRequest());
        axios
            .post("/getReportsData", {
                sprintId,
            })
            .then((response) => {
                const data = response.data.data;
                dispatch(fetchReportDataRequestSuccess(data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(fetchReportDataRequestFailure(error.response.data.message));
                } else {
                    dispatch(fetchReportDataRequestFailure(error.message));
                }
            });
    };
};
