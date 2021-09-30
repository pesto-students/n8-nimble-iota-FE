import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ProtectedRoute from "./protected.route";
import PrivateRoutes from "./PrivateRoutes";
import { loginUserSuccess } from "../redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import AccountActivate from "../components/Auth/AccountActivate";
import PropTypes from "prop-types";

function IndexRouting({ children }) {
    let dispatch = useDispatch();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            dispatch(loginUserSuccess(foundUser));
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + foundUser.token;
        }
    }, [dispatch]);
    return (
        <>
            <BrowserRouter>
                {children}
                <Switch>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route
                        exact
                        path="/forgotpassword"
                        component={ForgotPassword}
                    />
                    <Route
                        exact
                        path="/auth/activate/:token"
                        component={AccountActivate}
                    />
                    {PrivateRoutes.map((route, index) => (
                        <ProtectedRoute
                            key={index}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                            requiredRoles={route.requiredRoles}
                        />
                    ))}
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

IndexRouting.propTypes = {
    children: PropTypes.elementType,
};

export default IndexRouting;
