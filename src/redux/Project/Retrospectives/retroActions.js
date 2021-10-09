import axios from "../../../service/Axios";
import {
    ADD_RETROSPECTIVE_REQUEST,
    ADD_RETROSPECTIVE_SUCCESS,
    ADD_RETROSPECTIVE_FAILURE,
    UPDATE_RETROSPECTIVE_REQUEST,
    UPDATE_RETROSPECTIVE_SUCCESS,
    UPDATE_RETROSPECTIVE_FAILURE,
    DELETE_RETROSPECTIVE_REQUEST,
    DELETE_RETROSPECTIVE_SUCCESS,
    DELETE_RETROSPECTIVE_FAILURE,
    FETCH_RETROSPECTIVES_DEVELOPER,
    FETCH_ALL_RETROSPECTIVES,
    MARK_RETROSPECTIVES_COMPLETE,
} from "src/redux/Project/Retrospectives/retroActionTypes";

import { fbfirestore } from "../../../service/firebase";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import retroConstants from "src/config/Retrospective";
import { fireStoreKeys } from "src/config/constants";
import { updateTicketStatusRequest } from "src/redux";

export const addRetrospectiveRequest = () => {
    return {
        type: ADD_RETROSPECTIVE_REQUEST,
    };
};
export const addRetrospectiveSuccess = (obj) => {
    return {
        type: ADD_RETROSPECTIVE_SUCCESS,
        payload: obj,
    };
};
export const addRetrospectiveFailure = (obj) => {
    return {
        type: ADD_RETROSPECTIVE_FAILURE,
        payload: obj,
    };
};

export const updateRetrospectiveRequest = () => {
    return {
        type: UPDATE_RETROSPECTIVE_REQUEST,
    };
};
export const updateRetrospectiveSuccess = (obj) => {
    return {
        type: UPDATE_RETROSPECTIVE_SUCCESS,
        payload: obj,
    };
};
export const updateRetrospectiveFailure = (obj) => {
    return {
        type: UPDATE_RETROSPECTIVE_FAILURE,
        payload: obj,
    };
};

export const deleteRetrospectiveRequest = () => {
    return {
        type: DELETE_RETROSPECTIVE_REQUEST,
    };
};
export const deleteRetrospectiveSuccess = (obj) => {
    return {
        type: DELETE_RETROSPECTIVE_SUCCESS,
        payload: obj,
    };
};
export const deleteRetrospectiveFailure = (obj) => {
    return {
        type: DELETE_RETROSPECTIVE_FAILURE,
        payload: obj,
    };
};

const getType = (type) => {
    switch (type) {
        case retroConstants.retroTypeEnum.positive:
            return fireStoreKeys.positive;
        case retroConstants.retroTypeEnum.negative:
            return fireStoreKeys.negative;
        case retroConstants.retroTypeEnum.neutral:
            return fireStoreKeys.neutral;
        case retroConstants.retroTypeEnum.action:
            return fireStoreKeys.actions;
    }
};

export const addRetrospective = (sprintId, userId, type, text) => {
    return async (dispatch) => {
        dispatch(addRetrospectiveRequest());
        const userRetroRef = doc(fbfirestore, fireStoreKeys.collections.retrospectives, userId);
        const ref = await getDoc(userRetroRef);
        const data = ref.exists()
            ? ref.data()
            : {
                  [fireStoreKeys.positive]: [],
                  [fireStoreKeys.neutral]: [],
                  [fireStoreKeys.negative]: [],
                  [fireStoreKeys.actions]: [],
              };
        data[getType(type)].push(text)
        try {
            setDoc(doc(fbfirestore,fireStoreKeys.collections.retrospectives, userId), data);
            dispatch(addRetrospectiveSuccess({
                success : true,
                message : "Added successfully"
            }))
        } catch (exception) {
            dispatch(addRetrospectiveFailure({
                success : false,
                message : "Coudn't add feedback. Please try again later"
            }))
        }
    };
};


export const updateRetroSpective = (sprintId, userId, type,text,index) => {
    return async (dispatch) => {
        dispatch(updateTicketStatusRequest());
        const userRetroRef = doc(fbfirestore, fireStoreKeys.collections.retrospectives, userId);
        const ref = await getDoc(userRetroRef);
        const data = ref.data()
        data[getType(type)][index] = text
        try {
            setDoc(doc(fbfirestore,fireStoreKeys.collections.retrospectives, userId), data);
            dispatch(updateRetrospectiveSuccess({
                success : true,
                message : "Updated successfully"
            }))
        } catch (exception) {
            dispatch(updateRetrospectiveFailure({
                success : false,
                message : "Coudn't update feedback. Please try again later"
            }))
        }
    };
};

export const deleteRetro = (sprintId,userId,type,index) => {
    return async (dispatch) => {
        dispatch(dele());
        const userRetroRef = doc(fbfirestore, fireStoreKeys.collections.retrospectives, userId);
        const ref = await getDoc(userRetroRef);
        const data = ref.data()
        data[getType(type)].slice(index,1)
        try {
            setDoc(doc(fbfirestore,fireStoreKeys.collections.retrospectives, userId), data);
            dispatch(updateRetrospectiveSuccess({
                success : true,
                message : "Deleted successfully"
            }))
        } catch (exception) {
            dispatch(updateRetrospectiveFailure({
                success : false,
                message : "Coudn't Delete feedback. Please try again later"
            }))
        }
    };
};