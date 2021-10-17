import { lazy } from "react";
import roles from "../config/roles";

const Backlogs = lazy(()=> import("src/components/Page/Backlog/Backlogs"));
const Home = lazy(()=> import("src/components/Page/Home/Home"));
const Retrospectives = lazy(()=> import("src/components/Page/Retrospectives/Retrospectives"));
const Scrumboard = lazy(()=> import("src/components/Page/Scrumboard/Scrumboard"));
const Subscription = lazy(()=> import("src/components/Page/Subscription"));
const UserProfile = lazy(()=> import("src/components/Page/UserProfile/UserProfile"));

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
