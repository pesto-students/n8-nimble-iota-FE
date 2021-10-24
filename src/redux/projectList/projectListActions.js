import {
    LOAD_PROJECT_LIST,
    SET_PROJECT_LIST,
    SET_PROJECT_LIST_ERROR,
} from "src/redux/projectList/projectListActionTypes";
import Axios from "src/service/Axios";

export const loadProjects = () => (dispatch) => {
    Axios.get("/projects")
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
