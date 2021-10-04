import Subscription from "../components/Page/Subscription";
import Home from "../components/Page/Home/Home";
import roles from "../config/roles";
import Backlogs from "../components/Page/Backlogs";
import UserProfile from "../components/Page/UserProfile/UserProfile";
import Retrospectives from "../components/Page/Retrospectives/Retrospectives";

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
