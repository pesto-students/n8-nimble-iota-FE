import { SET_SELECTED_SPRINT, SET_SPRINT_LIST } from "src/redux/Project/Sprint/SprintActionTypes";

export const setSelectedSprint = (sprint) => ({
    type: SET_SELECTED_SPRINT,
    data: sprint,
});


export const setSprintList = (sprintList) => ({
    type: SET_SPRINT_LIST,
    payload: sprintList,
});
