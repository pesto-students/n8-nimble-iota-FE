import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetErrorAndMessage } from "../../redux";
import IndexRouting from "../../route/IndexRouting";
import useNavigatorOnLine from "../Common/NavigatorOnline/NavigatorOnline";
import openAuthNotification from "../Common/AuthNotification/AuthNotification";

function Overall() {
    let dispatch = useDispatch();
    const isOnline = useNavigatorOnLine();
    const { error, message } = useSelector((state) => state.user);
    useEffect(() => {
        if (!isOnline) alert("Please check your internet connection!");
    }, [isOnline]);
    useEffect(() => {
        if (error) openAuthNotification("Something wrong", error);
        if (message) openAuthNotification("Success", message);
        dispatch(resetErrorAndMessage());
    }, [error, message]);
    return (
        <>
            <IndexRouting />
        </>
    );
}

export default Overall;
