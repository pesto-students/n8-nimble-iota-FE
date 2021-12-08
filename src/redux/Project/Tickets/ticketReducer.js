import { produce } from "immer";
import {
    ADD_TICKET_FAILURE,
    ADD_TICKET_REQUEST,
    ADD_TICKET_SUCCESS,
    DELETE_TICKET_FAILURE,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    FETCH_UPDATED_TICKET_LIST_FAILURE,
    FETCH_UPDATED_TICKET_LIST_REQUEST,
    FETCH_UPDATED_TICKET_LIST_SUCCESS,
    FILTER_UPDATED_TICKET_LIST,
    SORT_UPDATED_TICKET_LIST,
    UPDATE_TICKET_FAILURE,
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_STATUS_FAILURE,
    UPDATE_TICKET_STATUS_REQUEST,
    UPDATE_TICKET_STATUS_SUCCESS,
    UPDATE_TICKET_SUCCESS,
} from "src/redux/Project/Tickets/ticketActionTypes";

const initialState = {
    ticketList: [],
    filteredTicketList: [],
    filters: {
        bug: false,
        userStory: false,
    },
    loading: true,
    error: "",
    msg: "",
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
                draft.filteredTicketList = draft.ticketList;
                return;
            case FETCH_UPDATED_TICKET_LIST_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                draft.msg = action.payload?.msg;
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
            case UPDATE_TICKET_SUCCESS:
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
            case UPDATE_TICKET_STATUS_REQUEST:
                draft.loading = true;
                return;
            case UPDATE_TICKET_STATUS_SUCCESS:
                draft.loading = false;
                draft.msg = action.payload;
                return;
            case UPDATE_TICKET_STATUS_FAILURE:
                draft.loading = false;
                draft.error = action.payload;
                draft.msg = action.payload;
                return;
            case FILTER_UPDATED_TICKET_LIST:
                draft.filters[action.data.filter] = action.data.isAdded;
                if (!(draft.filters.bug || draft.filters.userStory)) {
                    draft.filteredTicketList = draft.ticketList.slice();
                    return;
                }
                draft.filteredTicketList = draft.ticketList.filter(
                    (e) =>
                        e.type === (draft.filters.bug ? "BUG" : "USER_STORY") ||
                        e.type === (draft.filters.userStory ? "USER_STORY" : "BUG")
                );
                return;
            case SORT_UPDATED_TICKET_LIST:
                if (action.data.sortBy === "") {
                    draft.filteredTicketList = draft.ticketList.slice();
                    return;
                }
                draft.filteredTicketList = draft.filteredTicketList.sort((a, b) => {
                    if (a[action.data.sortBy] < b[action.data.sortBy]) return -1;
                    if (a[action.data.sortBy] > b[action.data.sortBy]) return 1;
                    return 0;
                });
                return;
            default:
                return;
        }
    });
};

export default ticketReducer;
