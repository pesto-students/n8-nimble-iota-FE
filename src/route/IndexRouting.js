import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserSuccess } from "src/redux";
import Loader from "src/components/Common/Loader/Loader";
import LandingPage from "src/components/Page/LandingPage";
import PlayArea from "src/components/PlayArea/PlayArea";
import AccountActivate from "src/components/Auth/AccountActivate";
import PrivateRoutes from "src/route/PrivateRoutes";
import ProtectedRoute from "src/route/protected.route";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function IndexRouting() {
    let dispatch = useDispatch();
    const loading = useSelector((state) => state.common.loading);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            dispatch(loginUserSuccess(foundUser));
        }
    }, [dispatch]);
    return (
        <Loader load={loading}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/playarea" component={PlayArea} />
                    <Route exact path="/auth/activate/:token" component={AccountActivate} />
                    <Route exact path="/home" render={() => <Redirect to="/projects" />} />
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
