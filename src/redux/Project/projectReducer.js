import { combineReducers } from "redux";
import ticketReducer from "src/redux/Project/Tickets/ticketReducer";
import developerReducer from "src/redux/Project/Developers/developerReducer";
import retroReducer from "src/redux/Project/Retrospectives/retroReducer";

const projectReducer = combineReducers({
    ticket: ticketReducer,
    developer: developerReducer,
    retrospectives : retroReducer
});

export default projectReducer;
