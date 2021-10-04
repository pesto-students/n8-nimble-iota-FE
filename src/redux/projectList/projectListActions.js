import axios from "axios";
import {
    LOAD_PROJECT_LIST,
    SET_PROJECT_LIST,
    SET_PROJECT_LIST_ERROR,
} from "./projectListActionTypes";

export const loadProjects = () => (dispatch) => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if(!user) throw "Unauthorized";
    // const token = user.token;
    axios
        .get("/projects")
        .then((res) => {
            const projects = res.data;
            dispatch(setProjectsListAction(projects));
        })
        .catch((error) => {
            dispatch(setProjectsListErrorAction(error));
        });
};

export const loadProjectsListAction = () => ({
    type: LOAD_PROJECT_LIST,
});

export const setProjectsListAction = (projectsList) => ({
    type: SET_PROJECT_LIST,
    data: projectsList,
});

export const setProjectsListErrorAction = (error) => ({
    type: SET_PROJECT_LIST_ERROR,
    data: error,
});
