import { SET_SELECTED_SPRINT } from "src/redux/Project/Sprint/SprintActionTypes";

export const setSelectedSprint = (sprint) => ({
    type: SET_SELECTED_SPRINT,
    data: sprint,
});
