import axios from "../../../service/Axios";
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
} from "src/redux/Project/Tickets/ticketActionTypes";

export const addTicketRequest = () => {
    return {
        type: ADD_TICKET_REQUEST,
    };
};

export const addTicketSucess = (obj) => {
    return {
        type: ADD_TICKET_SUCCESS,
        payload: obj,
    };
};

export const addTicketFailure = (obj) => {
    return {
        type: ADD_TICKET_FAILURE,
        payload: obj,
    };
};

export const updateTicketRequest = () => {
    return {
        type: UPDATE_TICKET_REQUEST,
    };
};

export const updateTicketSucess = (obj) => {
    return {
        type: UPDATE_TICKET_SUCCESS,
        payload: obj,
    };
};

export const updateTicketFailure = (obj) => {
    return {
        type: UPDATE_TICKET_FAILURE,
        payload: obj,
    };
};

export const fetchAllTicketsRequest = () => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_REQUEST,
    };
};

export const fetchAllTicketsSuccess = (obj) => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_SUCCESS,
        payload: obj,
    };
};

export const fetchAllTicketsFailure = (obj) => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_FAILURE,
        payload: obj,
    };
};

export const deleteTicketRequest = () => {
    return {
        type: DELETE_TICKET_REQUEST,
    };
};

export const deleteTicketRequestSuccess = (obj) => {
    return {
        type: DELETE_TICKET_SUCCESS,
        payload: obj,
    };
};

export const deleteTicketRequestFailure = (obj) => {
    return {
        type: DELETE_TICKET_FAILURE,
        payload: obj,
    };
};

export const updateTicketStatusRequest = () => {
    return {
        type: UPDATE_TICKET_STATUS_REQUEST,
    };
};

export const updateTicketStatusSuccess = (obj) => {
    return {
        type: UPDATE_TICKET_STATUS_SUCCESS,
        payload: obj,
    };
};

export const updateTicketStatusFailure = (obj) => {
    return {
        type: UPDATE_TICKET_STATUS_FAILURE,
        payload: obj,
    };
};

export const addTicket = (projectId, ticketDetails) => {
    return (dispatch) => {
        dispatch(addTicketRequest());
        axios
            .post("/addTicket", { projectId, ticketDetails })
            .then((response) => {
                const ticketData = response.data;
                dispatch(addTicketSucess(ticketData));
                dispatch(fetchAllTickets(projectId));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(addTicketFailure(error.response.data.message));
                } else {
                    dispatch(addTicketFailure(error.message));
                }
            });
    };
};

export const updateTicket = (projectId, ticketDetails) => {
    return (dispatch) => {
        dispatch(updateTicketRequest());
        axios
            .post("/updateTicket", { projectId, ticketDetails })
            .then((response) => {
                const ticketData = response.data;
                dispatch(updateTicketSucess(ticketData));
                dispatch(fetchAllTickets(projectId));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(updateTicketFailure(error.response.data.message));
                } else {
                    dispatch(updateTicketFailure(error.message));
                }
            });
    };
};

export const fetchAllTickets = (projectId) => {
    return (dispatch) => {
        dispatch(fetchAllTicketsRequest());
        axios
            .post("/getAllTickets", { projectId: projectId })
            .then((response) => {
                const ticketList = response.data.data;
                dispatch(fetchAllTicketsSuccess(ticketList));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(fetchAllTicketsFailure(error.response.data.message));
                } else {
                    dispatch(fetchAllTicketsFailure(error.message));
                }
            });
    };
};

export const deleteTicket = (projectId, ticketId) => {
    return (dispatch) => {
        dispatch(deleteTicketRequest());
        axios
            .post("/deleteTicket", { projectId, ticketId })
            .then((response) => {
                const resMessage = response.data.message;
                console.log(resMessage);
                dispatch(deleteTicketRequestSuccess(resMessage));
                dispatch(fetchAllTickets(projectId));
                // dispatch(showNotificationRequest("success", "Test"));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(deleteTicketRequestFailure(error.response.data.message));
                } else {
                    dispatch(deleteTicketRequestFailure(error.message));
                }
            });
    };
};


export const updateTicketStatus = (projectId, ticketId,status) => {
    return (dispatch) => {
        dispatch(updateTicketStatusRequest());
        axios
            .post("/changeTicketStatus", { projectId, ticketId, status })
            .then((response) => {
                const resMessage = response.data.message;
                dispatch(updateTicketStatusSuccess(resMessage));
                dispatch(fetchAllTickets(projectId));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(updateTicketStatusFailure(error.response.data.message));
                } else {
                    dispatch(updateTicketStatusFailure(error.message));
                }
            });
    };
};
