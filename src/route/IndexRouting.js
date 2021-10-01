import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPassword from "../components/Auth/ForgotPassword";
import ProtectedRoute from "./protected.route";
import PrivateRoutes from "./PrivateRoutes";
import { loginUserSuccess } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AccountActivate from "../components/Auth/AccountActivate";
import LandingPage from "../components/Page/LandingPage";
import PlayArea from "../components/PlayArea/PlayArea";
import Loader from "../components/Common/Loader/Loader";

function IndexRouting() {
    let dispatch = useDispatch();
    const loading = useSelector((state) => state.common.loading);
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
        <Loader load={loading}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/playarea" component={PlayArea} />
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
        </Loader>
    );
}

export default IndexRouting;
