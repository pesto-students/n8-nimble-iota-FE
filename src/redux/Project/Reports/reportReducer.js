import { produce } from "immer";
import {
    FETCH_REPORTS_DATA_FAILURE,
    FETCH_REPORTS_DATA_REQUEST,
    FETCH_REPORTS_DATA_SUCCESS,
    INCREMENT_STORY_POINTS_ACHIEVED_FAILURE,
    INCREMENT_STORY_POINTS_ACHIEVED_REQUEST,
    INCREMENT_STORY_POINTS_ACHIEVED_SUCCESS,
    FETCH_PREVIOUS_REPORTS_DATA_REQUEST,
    FETCH_PREVIOUS_REPORTS_DATA_SUCCESS,
    FETCH_PREVIOUS_REPORTS_DATA_FAILURE
} from "src/redux/Project/Reports/reportActionTypes";

const initialState = {
    reportData: [],
    reportsLoading: true,
    previousReportData : [],
    previousReportDataLoading : true,
    error: "",
    msg: "",
};

const reportReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case INCREMENT_STORY_POINTS_ACHIEVED_REQUEST:
                draft.reportsLoading = true;
                return;
            case INCREMENT_STORY_POINTS_ACHIEVED_SUCCESS:
                draft.reportsLoading = false;
                draft.msg = action.payload;
                return;
            case INCREMENT_STORY_POINTS_ACHIEVED_FAILURE:
                draft.reportsLoading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            case FETCH_REPORTS_DATA_REQUEST:
                draft.reportsLoading = true;
                return;
            case FETCH_REPORTS_DATA_SUCCESS:
                draft.reportsLoading = false;
                draft.reportData = action.payload;
                return;
            case FETCH_REPORTS_DATA_FAILURE:
                draft.reportsLoading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            case FETCH_PREVIOUS_REPORTS_DATA_REQUEST:
                draft.previousReportDataLoading = true;
                return;
            case FETCH_PREVIOUS_REPORTS_DATA_SUCCESS:
                draft.previousReportDataLoading = false;
                draft.previousReportData = action.payload;
                return;
            case FETCH_PREVIOUS_REPORTS_DATA_FAILURE:
                draft.previousReportDataLoading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            default:
                return;
        }
    });
};

export default reportReducer;
