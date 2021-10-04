import {
    ADD_TICKET_REQUEST,
    ADD_TICKET_SUCCESS,
    ADD_TICKET_FAILURE,
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAILURE,
    UPDATE_TICKET_STATUS_REQUEST,
    UPDATE_TICKET_STATUS_SUCCESS,
    UPDATE_TICKET_STATUS_FAILURE,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    DELETE_TICKET_FAILURE,
    FETCH_UPDATED_TICKET_LIST_REQUEST,
    FETCH_UPDATED_TICKET_LIST_SUCCESS,
    FETCH_UPDATED_TICKET_LIST_FAILURE,
} from "./ticketActionTypes";
import { produce } from "immer";

const initialState = {
    ticketList: [],
    loading: true,
    error: "",
    msg: ""
 
};

const ticketReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
        case FETCH_UPDATED_TICKET_LIST_REQUEST:
            draft.loading = true;
            return;
        case FETCH_UPDATED_TICKET_LIST_SUCCESS:
            draft.loading = false;
            draft.ticketList = action.payload;
            return;
        case FETCH_UPDATED_TICKET_LIST_FAILURE:
            draft.loading = false;
            draft.error = action.payload;
            draft.msg = action.payload.msg;
            return;
        case DELETE_TICKET_REQUEST:
            draft.loading = true;
            return;
        case DELETE_TICKET_SUCCESS:
            draft.loading = false;
            draft.msg = action.payload;
            return;
        case DELETE_TICKET_FAILURE:
            draft.loading = false;
            draft.error = action.payload;
            draft.msg = action.payload;
            return;
        case UPDATE_TICKET_REQUEST:
            draft.loading = true;
            return;
        case UPDATE_TICKET_STATUS_SUCCESS:
            draft.loading = false;
            draft.msg = action.payload;
            return;
        case UPDATE_TICKET_FAILURE:
            draft.loading = false;
            draft.error = action.payload;
            draft.msg = action.payload;
            return;
        case ADD_TICKET_REQUEST:
            draft.loading = true;
            return;
        case ADD_TICKET_SUCCESS:
            draft.loading = false;
            draft.msg = action.payload;
            return;
        case ADD_TICKET_FAILURE:
            draft.loading = false;
            draft.error = action.payload;
            draft.msg = action.payload;
            return;
        default:
            return;
        }
    });
};

export default ticketReducer;
