import { produce } from "immer";
import {
    REMOVE_NOTIFICATION,
    SET_LOADER_FALSE,
    SET_LOADER_TRUE,
    SHOW_NOTIFICATION,
    TOGGLE_HIDE_SIDEBAR,
} from "src/redux/common/commonActionTypes";

const initialState = {
    loading: false,
    showNotification: false,
    notificationMessage: "",
    notificationType: "INFO",
    sidebarHidden: true,
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
            case TOGGLE_HIDE_SIDEBAR:
                draft.sidebarHidden = !state.sidebarHidden;
                return;
            default:
                return;
        }
    });
};

export default commonReducer;
