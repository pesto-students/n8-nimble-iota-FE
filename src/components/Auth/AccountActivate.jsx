import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { AccountActivation } from "src/redux";

function AccountActivate() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.user.loading);
    let { token } = useParams();
    useEffect(() => {
        dispatch(AccountActivation({ token }));
    }, [dispatch, token]);
    return (
        <>
            {loading && <h2>Please wait till your account is activated</h2>}
            {!loading && <Redirect to="/" />}
        </>
    );
}

export default AccountActivate;
