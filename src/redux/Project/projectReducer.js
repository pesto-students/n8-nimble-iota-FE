import { combineReducers } from "redux";
import ticketReducer from "src/redux/Project/Tickets/ticketReducer";
import developerReducer from "src/redux/Project/Developers/developerReducer";

const projectReducer = combineReducers({
    ticket: ticketReducer,
    developer: developerReducer,
});

export default projectReducer;
