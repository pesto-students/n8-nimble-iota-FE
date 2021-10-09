import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";
import roles from "src/config/roles";

const ScrumRoutes = [
    {
        path: "/poker",
        component: null,
        exact: false,
        requiredRoles: roles.all,
        name: "Poker",
    },
    {
        path: "/scrum_board",
        component: null,
        exact: false,
        requiredRoles: roles.all,
        name: "Scrum Board",
    },

    {
        path: "/standups",
        component: null,
        exact: false,
        requiredRoles: roles.all,
        name: "Standups",
    },
    {
        path: "/retrospectives",
        component: Retrospectives,
        exact: false,
        requiredRoles: roles.all,
        name: "Retrospectives",
    },
    {
        path: "/reports",
        component: null,
        exact: false,
        requiredRoles: roles.all,
        name: "Reports",
    },
];

export default ScrumRoutes;
