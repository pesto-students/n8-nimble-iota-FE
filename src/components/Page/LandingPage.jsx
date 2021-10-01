import React, { useState, useEffect } from "react";
import Landing from "../Common/Landing";
import NavBar from "../Common/NavBar/NavBar";
import AppModal from "../AppModal/AppModal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { resetErrorAndMessage } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { notification } from "antd";

function LandingPage() {
    const dispatch = useDispatch();
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const { user, isAuthenticated, error, message } = useSelector(
        (state) => state.user
    );
    const openNotification = (title, message) => {
        notification.open({
            message: title,
            description: message,
            placement: "bottomLeft",
        });
    };
    useEffect(() => {
        if (error) openNotification("Something wrong", error);
        if (message) openNotification("Success", message);
        dispatch(resetErrorAndMessage());
    }, [error, message]);
    return (
        <>
            {user && isAuthenticated && <Redirect to="/home" />}
            <NavBar
                onLogin={() => setLoginModal(true)}
                onRegister={() => setRegisterModal(true)}
            />
            <AppModal
                visible={loginModal}
                handleCancel={() => setLoginModal(false)}
            >
                <SignIn openNotification={openNotification} />
            </AppModal>
            <AppModal
                visible={registerModal}
                handleCancel={() => setRegisterModal(false)}
            >
                <SignUp openNotification={openNotification} />
            </AppModal>
            <Landing />
        </>
    );
}

export default LandingPage;
