import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { AccountActivation } from "../../redux";

function AccountActivate() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const loading = useSelector((state) => state.user.loading);
    let { token } = useParams();
    useEffect(() => {
        dispatch(AccountActivation({ token }));
    }, [dispatch, token]);
    return (
        <>
            {loading && <h2>Please wait till your account is activated</h2>}
            {isAuthenticated && <Redirect to="/" />}
        </>
    );
}

export default AccountActivate;
