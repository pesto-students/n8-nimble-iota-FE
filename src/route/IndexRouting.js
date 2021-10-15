import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
const AccountActivate = lazy(() => import("../components/Auth/AccountActivate"));
const LandingPage = lazy(() => import("../components/Page/LandingPage"));
const PlayArea = lazy(() => import("../components/PlayArea/PlayArea"));
const Loader = lazy(() => import("../components/Common/Loader/Loader"));
import { loginUserSuccess } from "src/redux";
import PrivateRoutes from "src/route/PrivateRoutes";
import ProtectedRoute from "src/route/protected.route";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function IndexRouting() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.common.loading);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            dispatch(loginUserSuccess(foundUser));
        }
    }, []);
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
