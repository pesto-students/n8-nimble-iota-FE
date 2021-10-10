import {
    SET_LOADER_FALSE,
    SET_LOADER_TRUE,
    SHOW_NOTIFICATION,
    REMOVE_NOTIFICATION,
} from "src/redux/common/commonActionTypes";
import { produce } from "immer";

const initialState = {
    loading: false,
    showNotification: false,
    notificationMessage: "",
    notificationType: "INFO",
};

const commonReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_LOADER_FALSE:
                draft.loading = false;
                return;
            case SET_LOADER_TRUE:
                draft.loading = true;
                return;
            case SHOW_NOTIFICATION:
                draft.showNotification = true;
                draft.notificationType = action.payload.type;
                draft.notificationMessage = action.payload.message;
                return;
            case REMOVE_NOTIFICATION:
                draft.showNotification = false;
                draft.notificationType = "";
                draft.notificationMessage = "";
                return;
            default:
                return;
        }
    });
};

export default commonReducer;
