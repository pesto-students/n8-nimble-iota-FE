import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignIn from "src/components/Auth/SignIn";
import SignUp from "src/components/Auth/SignUp";
import AppModal from "src/components/Common/AppModal/AppModal";
import Landing from "src/components/Common/Landing";
import NavBar from "src/components/Common/NavBar/NavBar";

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
