import { loadProjects } from "src/redux";
import {
    SEARCH_MEMBER_FAIL,
    SEARCH_MEMBER_REQUEST,
    SEARCH_MEMBER_SUCCESS,
} from "src/redux/memberSearch/memberSearchActionTypes";
import axios from "src/service/Axios";

export const searchMemberRequest = () => ({
    type: SEARCH_MEMBER_REQUEST,
});
export const searchMemberSuccess = (list) => ({
    type: SEARCH_MEMBER_SUCCESS,
    data: list,
});
export const searchMemberFail = (error) => ({
    type: SEARCH_MEMBER_FAIL,
    data: error,
});

export const searchMembers = (searchString) => (dispatch) => {
    axios.get(`/search?q=${searchString}`).then((response) => {
        const { data } = response;
        dispatch(searchMemberSuccess(data));
    });
};

export const addMember =
    ({ memberId, projectId }) =>
        (dispatch) => {
            axios.post("/member", { memberId, projectId }).then((res) => {
                if (res.status === 201) dispatch(loadProjects());
            });
        };
