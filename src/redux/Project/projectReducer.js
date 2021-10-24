import { combineReducers } from "redux";
import developerReducer from "src/redux/Project/Developers/developerReducer";
import reportReducer from "src/redux/Project/Reports/reportReducer";
import retroReducer from "src/redux/Project/Retrospectives/retroReducer";
import sprintReducer from "src/redux/Project/Sprint/SprintReducer";
import ticketReducer from "src/redux/Project/Tickets/ticketReducer";

const projectReducer = combineReducers({
    ticket: ticketReducer,
    developer: developerReducer,
    retrospectives: retroReducer,
    reports: reportReducer,
    sprint: sprintReducer,
});

export default projectReducer;
