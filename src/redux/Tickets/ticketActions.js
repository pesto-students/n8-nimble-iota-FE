import axios from "../../service/Axios";
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

export const addTicketRequest = () => {
    return {
        type: ADD_TICKET_REQUEST
    };
};

export const addTicketSucess = (obj) => {
    return {
        type: ADD_TICKET_SUCCESS,
        payload: obj
    };
};

export const addTicketFailure = (obj) => {
    return {
        type: ADD_TICKET_FAILURE,
        payload: obj
    };
};


export const fetchAllTicketsRequest = () => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_REQUEST
    };
};

export const fetchAllTicketsSuccess = (obj) => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_SUCCESS,
        payload: obj
    };
};

export const fetchAllTicketsFailure = (obj) => {
    return {
        type: FETCH_UPDATED_TICKET_LIST_FAILURE,
        payload: obj
    };
};

export const deleteTicketRequest = () => {
    return {
        type: DELETE_TICKET_REQUEST
    };
};

export const deleteTicketRequestSuccess = (obj) => {
    return {
        type: DELETE_TICKET_SUCCESS,
        payload: obj
    };
};

export const deleteTicketRequestFailure = (obj) => {
    return {
        type: DELETE_TICKET_FAILURE,
        payload: obj
    };
};









export const addTicket = (ticketObject) => {
    return (dispatch) => {
        dispatch(addTicketRequest());
        axios
            .post("/addTicket", ticketObject)
            .then((response) => {
                const ticketData = response.data;
                dispatch(addTicketSucess(ticketData));
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

export const fetchAllTickets = (projectId) => {
    return (dispatch) => {
        dispatch(fetchAllTicketsRequest());
        axios
            .post("/getAllTickets",{projectId : projectId } )
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

export const deleteTicket = (projectId,ticketId) => {
    return (dispatch) => {
        dispatch(deleteTicketRequest());
        axios
            .post("/deleteTicket", {projectId,ticketId})
            .then((response) => {
                const resMessage = response.message;
                dispatch(deleteTicketRequestSuccess(resMessage));
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

