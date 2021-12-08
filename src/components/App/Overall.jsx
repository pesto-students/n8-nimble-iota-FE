import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetErrorAndMessage } from "src/redux";
import IndexRouting from "src/route/IndexRouting";
import useNavigatorOnLine from "src/components/Common/NavigatorOnline/NavigatorOnline";
import Notification from "src/components/Common/Notification/Notification";
import AppModal from "src/components/Common/AppModal/AppModal";
import Loader from "src/components/Common/Loader/Loader";

function Overall() {
    let dispatch = useDispatch();
    const isOnline = useNavigatorOnLine();
    const { error, message } = useSelector((state) => state.user);
    const loading = useSelector((state) => state.common.loading);
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
            <Loader load={loading}>
                <IndexRouting />
            </Loader>
            <AppModal visible={offLine} handleCancel={handleCancel}>
                Please check your internet connection!
            </AppModal>
        </>
    );
}

export default Overall;
