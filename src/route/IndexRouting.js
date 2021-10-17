import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
const AccountActivate = lazy(() => import("src/components/Auth/AccountActivate"));
const LandingPage = lazy(() => import("src/components/Page/LandingPage"));
const PlayArea = lazy(() => import("src/components/PlayArea/PlayArea"));
const Notfound = lazy(() => import("src/components/Page/Error/Notfound"));
const Servererror = lazy(() => import("src/components/Page/Error/Servererror"));
const InjectAxiosInterceptors = lazy(() => import("src/service/InjectAxiosInterceptors"));
import { loginUserSuccess } from "src/redux";
import PrivateRoutes from "src/route/PrivateRoutes";
import ProtectedRoute from "src/route/protected.route";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function IndexRouting() {
    const dispatch = useDispatch();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            dispatch(loginUserSuccess(foundUser));
        }
    }, []);
    return (
        <BrowserRouter>
            <InjectAxiosInterceptors />
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
                <Route exact path="/500" component={Servererror} />
                <Route exact path="/404" component={Notfound} />
                <Route path="*" component={Notfound} />
            </Switch>
        </BrowserRouter>
    );
}

export default IndexRouting;
