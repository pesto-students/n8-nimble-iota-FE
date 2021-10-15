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
    FETCH_RETROSPECTIVES_REQUEST,
    FETCH_RETROSPECTIVES_SUCCESS,
    FETCH_RETROSPECTIVES_FAILURE,
    MARK_RETROSPECTIVES_COMPLETE,
} from "src/redux/Project/Retrospectives/retroActionTypes";

import { fbfirestore } from "../../../service/firebase";
import { doc, setDoc, collection, getDoc, getDocs,updateDoc } from "firebase/firestore";
import retroConstants from "src/config/Retrospective";
import { fireStoreKeys } from "src/config/constants";
import { updateTicketStatusRequest } from "src/redux";
import { RetroTypeEnum } from "src/config/Enums";

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

export const fetchRetrospectiveRequest = () => {
    return {
        type: FETCH_RETROSPECTIVES_REQUEST,
    };
};
export const fetchRetrospectiveSuccess = (obj) => {
    return {
        type: FETCH_RETROSPECTIVES_SUCCESS,
        payload: obj,
    };
};
export const fetchRetrospectiveFailure = (obj) => {
    return {
        type: FETCH_RETROSPECTIVES_FAILURE,
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

export const addRetrospective = (sprintId, type, id,text) => {
   
    return async (dispatch) => {
        dispatch(addRetrospectiveRequest());
        const retros = doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId);
        const ref = await getDoc(retros);
        const data = ref.exists()
            ? ref.data()
            : {
                  [RetroTypeEnum.POSITIVE]: [],
                  [RetroTypeEnum.NEUTRAL]: [],
                  [RetroTypeEnum.NEGATIVE]: [],
                  [RetroTypeEnum.ACTIONS]: [],
              };
        data[type].push({text,id});
        try {
            setDoc(doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId), data);
            dispatch(
                addRetrospectiveSuccess({
                    success: true,
                    message: "Added successfully",
                })
                
            );
            dispatch(fetchRetrospectives(sprintId));
        } catch (exception) {
            dispatch(
                addRetrospectiveFailure({
                    success: false,
                    message: "Coudn't add feedback. Please try again later",
                })
            );
        }
    };
};

export const updateRetroSpective = (sprintId,type,id,text,index) => {
    return async (dispatch) => {
        dispatch(updateRetrospectiveRequest());
        const retros = doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId);
        const ref = await getDoc(retros);
        let data = ref.data();
        data[type].splice(index,1,{text,id});
       
        try {
            updateDoc(doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId), data);
            dispatch(
                updateRetrospectiveSuccess({
                    success: true,
                    message: "Updated successfully",
                })
            );
            dispatch(fetchRetrospectives(sprintId));

        } catch (exception) {
            console.log(exception)
            dispatch(
                updateRetrospectiveFailure({
                    success: false,
                    message: "Coudn't update feedback. Please try again later",
                })
            );
        }
    };
};

export const deleteRetro = (sprintId, id, type) => {
    return async (dispatch) => {
        dispatch(deleteRetrospectiveRequest());
        const retos = doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId);
        const ref = await getDoc(retos);
        let data = ref.data();
        data[type].splice(
            data[type].findIndex((r) => r.id === id),
            1
        );
        try {
            setDoc(doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId), data);
            dispatch(
                deleteRetrospectiveSuccess({
                    success: true,
                    message: "Deleted successfully",
                })
            );
            dispatch(fetchRetrospectives(sprintId));
        } catch (exception) {
            dispatch(
                deleteRetrospectiveFailure({
                    success: false,
                    message: "Coudn't Delete feedback. Please try again later",
                })
            );
        }
    };
};

export const fetchRetrospectives = (sprintId) => {
    return async (dispatch) => {
        dispatch(fetchRetrospectiveRequest());
        try {
            const docRef = doc(fbfirestore, fireStoreKeys.collections.retrospectives, sprintId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(fetchRetrospectiveSuccess(docSnap.data()));
            } else {
                dispatch(
                    fetchRetrospectiveFailure({
                        success: false,
                        message: "No Retros for this id",
                    })
                );
            }
        } catch (exception) {
            dispatch(
                fetchRetrospectiveFailure({
                    success: false,
                    message: "Coudn't Fetch Retros. Please try again later",
                })
            );
        }
    };
};
