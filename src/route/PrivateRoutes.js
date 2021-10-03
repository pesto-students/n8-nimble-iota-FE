import Home from "../components/Page/Home";
import Subscription from "../components/Page/Subscription";
import roles from "../config/roles";
import Backlogs from "../components/Page/Backlogs";
import CardCustom from "../components/Common/Card/Card";
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
        component: CardCustom,
        exact: true,
        requiredRoles: roles.all,
    },
];

export default PrivateRoutes;
