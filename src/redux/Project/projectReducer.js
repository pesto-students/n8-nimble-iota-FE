import { combineReducers } from "redux";
import ticketReducer from "./Tickets/ticketReducer"
import developerReducer from "./Developers/developerReducer"

const projectReducer = combineReducers({
    ticket: ticketReducer,
    developer : developerReducer
});

export default projectReducer;
