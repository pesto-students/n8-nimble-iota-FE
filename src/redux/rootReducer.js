import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import ticketReducer from "./Tickets/ticketReducer";

const rootReducer = combineReducers({
    user: userReducer,
    ticket: ticketReducer
});

export default rootReducer;
