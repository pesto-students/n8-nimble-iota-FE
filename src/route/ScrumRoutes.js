import Backlogs from "src/components/Page/Backlog/Backlogs";
import Reports from "src/components/Page/Reports/Reports";
import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";
import Poker from "src/components/Page/Poker/Poker";
import Scrumboard from "src/components/Page/Scrumboard/Scrumboard";
import Standup from "src/components/Page/Standup/Standup";
import roles from "src/config/roles";

const ScrumRoutes = [
    {
        path: "/poker",
        component: Poker,
        exact: false,
        requiredRoles: roles.all,
        name: "Poker",
    },
    {
        path: "/scrum_board",
        component: Scrumboard,
        exact: false,
        requiredRoles: roles.all,
        name: "Scrum Board",
    },

    {
        path: "/standups",
        component: Standup,
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
        component: Reports,
        exact: false,
        requiredRoles: roles.all,
        name: "Reports",
    },
   
];


export default ScrumRoutes;
