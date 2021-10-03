import React, { useState } from "react";
import Landing from "../Common/Landing";
import NavBar from "../Common/NavBar/NavBar";
import AppModal from "../Common/AppModal/AppModal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LandingPage() {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const openLogin = () => setLoginModal(true);
    const openRegister = () => setRegisterModal(true);
    const closeLogin = () => setLoginModal(false);
    const closeRegister = () => setRegisterModal(false);
    return (
        <>
            {user && isAuthenticated && <Redirect to="/home" />}
            <NavBar onLogin={openLogin} onRegister={openRegister} />
            <AppModal visible={loginModal} handleCancel={closeLogin}>
                <SignIn />
            </AppModal>
            <AppModal visible={registerModal} handleCancel={closeRegister}>
                <SignUp />
            </AppModal>
            <Landing />
        </>
    );
}

export default LandingPage;
