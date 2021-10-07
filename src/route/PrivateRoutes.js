import { lazy } from "react";
import roles from "../config/roles";

const Subscription = lazy(() => import("../components/Page/Subscription"));
const Home = lazy(() => import("../components/Page/Home/Home"));
const Backlogs = lazy(() => import("../components/Page/Backlogs"));
const UserProfile = lazy(() => import("../components/Page/UserProfile/UserProfile"));
const Retrospectives = lazy(() => import("../components/Page/Retrospectives/Retrospectives"));

const PrivateRoutes = [
    {
        path: "/subscription",
        component: Subscription,
        exact: true,
        requiredRoles: roles.scrummasters,
    },
    {
        path: "/home",
        component: Home,
        exact: true,
        requiredRoles: roles.all,
    },

    {
        path: "/backlogs",
        component: Backlogs,
        exact: true,
        requiredRoles: roles.all,
    },
    {
        path: "/user",
        component: UserProfile,
        exact: true,
        requiredRoles: roles.all,
    },
    {
        path: "/retrospectives",
        component: Retrospectives,
        exact: true,
        requiredRoles: roles.all,
    },
];

export default PrivateRoutes;
