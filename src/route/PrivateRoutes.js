import Home from "../components/Page/Home";
import roles from "../config/roles";

const PrivateRoutes = [
    {
        path: "/home",
        component: Home,
        exact: true,
        requiredRoles: roles.all,
    },
];

export default PrivateRoutes;
