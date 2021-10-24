import { lazy } from "react";
import roles from "src/config/roles";
import { SprintStatusEnum } from "src/config/Enums";

const Poker = lazy(() => import("src/components/Page/Poker/Poker"));
const Reports = lazy(() => import("src/components/Page/Reports/Reports"));
const Retrospectives = lazy(() => import("src/components/Page/Retrospectives/Retrospectives"));
const Scrumboard = lazy(() => import("src/components/Page/Scrumboard/Scrumboard"));
const Standup = lazy(() => import("src/components/Page/Standup/Standup"));

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
