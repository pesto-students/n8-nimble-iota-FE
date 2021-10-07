import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetErrorAndMessage } from "../../redux";
import IndexRouting from "../../route/IndexRouting";
import useNavigatorOnLine from "../Common/NavigatorOnline/NavigatorOnline";
import Notification from "../Common/Notification/Notification";
import AppModal from "../Common/AppModal/AppModal";

function Overall() {
    let dispatch = useDispatch();
    const isOnline = useNavigatorOnLine();
    const { error, message } = useSelector((state) => state.user);
    const [offLine, setoffLine] = useState(false);
    useEffect(() => {
        setoffLine(!isOnline);
    }, [isOnline]);
    useEffect(() => {
        if (error) Notification("error", "Something wrong", error);
        if (message) Notification("success", "Success", message);
        dispatch(resetErrorAndMessage());
    }, [error, message]);
    const handleCancel = () => setoffLine(false);
    return (
        <>
            <IndexRouting />
            <AppModal visible={offLine} handleCancel={handleCancel}>
                Please check your internet connection!
            </AppModal>
        </>
    );
}

export default Overall;
