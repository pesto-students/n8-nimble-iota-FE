export const UserRoles = {
    superadmin: "superadmin",
    admin: "admin",
    scrummaster: "scrummaster",
    developer: "developer",
};

const roles = {
    superadmins: [UserRoles.superadmin],
    scrummastersandadmins: [UserRoles.admin, UserRoles.scrummaster],
    developersandscrummasters: [UserRoles.developer, UserRoles.scrummaster],
    admins: [UserRoles.admin],
    scrummasters: [UserRoles.scrummaster],
    developers: [UserRoles.developer],
    all: [
        UserRoles.superadmin,
        UserRoles.admin,
        UserRoles.scrummaster,
        UserRoles.developer,
    ],
};
export default roles;
