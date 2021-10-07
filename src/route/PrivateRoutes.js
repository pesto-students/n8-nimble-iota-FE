import Backlogs from "src/components/Page/Backlogs";
import Home from "src/components/Page/Home/Home";
import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";
import Subscription from "src/components/Page/Subscription";
import UserProfile from "src/components/Page/UserProfile/UserProfile";
import roles from "src/config/roles";

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