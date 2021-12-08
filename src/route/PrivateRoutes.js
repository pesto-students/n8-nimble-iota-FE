import { lazy } from "react";
import componentLoader from "src/components/Common/Mounter/componentLoader";
import roles from "src/config/roles";

const Backlogs = lazy(() => componentLoader(() => import("src/components/Page/Backlog/Backlogs")));
const Home = lazy(() => componentLoader(() => import("src/components/Page/Home/Home")));
const Retrospectives = lazy(() => componentLoader(() => import("src/components/Page/Retrospectives/Retrospectives")));
const Scrumboard = lazy(() => componentLoader(() => import("src/components/Page/Scrumboard/Scrumboard")));
const Subscription = lazy(() => componentLoader(() => import("src/components/Page/Subscription")));
const UserProfile = lazy(() => componentLoader(() => import("src/components/Page/UserProfile/UserProfile")));

const PrivateRoutes = [
    {
        path: "/subscription",
        component: Subscription,
        exact: true,
        requiredRoles: roles.scrummasters,
    },
    {
        path: "/projects",
        component: Home,
        exact: false,
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
