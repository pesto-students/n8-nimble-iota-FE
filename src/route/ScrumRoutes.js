import Poker from "src/components/Page/Poker/Poker";
import Reports from "src/components/Page/Reports/Reports";
import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";
import Scrumboard from "src/components/Page/Scrumboard/Scrumboard";
import Standup from "src/components/Page/Standup/Standup";
import { SprintStatusEnum } from "src/config/Enums";
import roles from "src/config/roles";

const ScrumRoutes = [
    {
        path: "/poker",
        component: Poker,
        exact: false,
        requiredRoles: roles.all,
        name: "Poker",
        allowedStatus: [SprintStatusEnum.ACTIVE, SprintStatusEnum.UPCOMING],
    },
    {
        path: "/scrum_board",
        component: Scrumboard,
        exact: false,
        requiredRoles: roles.all,
        name: "Scrum Board",
        allowedStatus: [SprintStatusEnum.ACTIVE, SprintStatusEnum.UPCOMING, SprintStatusEnum.COMPLETED],
    },

    {
        path: "/standups",
        component: Standup,
        exact: false,
        requiredRoles: roles.all,
        name: "Standups",
        allowedStatus: [SprintStatusEnum.ACTIVE, SprintStatusEnum.COMPLETED],
    },
    {
        path: "/retrospectives",
        component: Retrospectives,
        exact: false,
        requiredRoles: roles.all,
        name: "Retrospectives",
        allowedStatus: [SprintStatusEnum.ACTIVE, SprintStatusEnum.COMPLETED],
    },
    {
        path: "/reports",
        component: Reports,
        exact: false,
        requiredRoles: roles.all,
        name: "Reports",
        allowedStatus: [SprintStatusEnum.COMPLETED],
    },
];

export default ScrumRoutes;
