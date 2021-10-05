import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import openAuthNotification from "src/components/Common/AuthNotification/AuthNotification";
import useNavigatorOnLine from "src/components/Common/NavigatorOnline/NavigatorOnline";
import { resetErrorAndMessage } from "src/redux";
import IndexRouting from "src/route/IndexRouting";

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
