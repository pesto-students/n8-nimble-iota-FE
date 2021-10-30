import { lazy } from "react";
import componentLoader from "src/components/Common/Mounter/componentLoader";
import { SprintStatusEnum } from "src/config/Enums";
import roles from "src/config/roles";

const Poker = lazy(() => componentLoader(() => import("src/components/Page/Poker/Poker")));
const Reports = lazy(() => componentLoader(() => import("src/components/Page/Reports/Reports")));
const Retrospectives = lazy(() => componentLoader(() => import("src/components/Page/Retrospectives/Retrospectives")));
const Scrumboard = lazy(() => componentLoader(() => import("src/components/Page/Scrumboard/Scrumboard")));
const Standup = lazy(() => componentLoader(() => import("src/components/Page/Standup/Standup")));

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
