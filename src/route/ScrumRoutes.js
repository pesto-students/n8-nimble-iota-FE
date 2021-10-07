import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";
import roles from "src/config/roles";

const ScrumRoutes = [
    {
        path: "/poker",
        component: null,
        exact: false,
        requiredRoles: roles.all,
    },
    {
        path: "/scrum_board",
        component: null,
        exact: false,
        requiredRoles: roles.all,
    },

    {
        path: "/standups",
        component: null,
        exact: false,
        requiredRoles: roles.all,
    },
    {
        path: "/retrospectives",
        component: Retrospectives,
        exact: false,
        requiredRoles: roles.all,
    },
    {
        path: "/reports",
        component: null,
        exact: false,
        requiredRoles: roles.all,
    },
];

export default ScrumRoutes;
