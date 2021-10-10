import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function checkPermission(userRole, allowedRoles) {
    return allowedRoles.includes(userRole);
}

const Mounter = (WrappedComponent, props) => {
    const user = useSelector((state) => state.user.user);
    return function Loader(allowedRoles) {
        const [permission, setPermission] = useState(false);
        useEffect(() => {
            setPermission(checkPermission(user.role.name, allowedRoles));
        }, [allowedRoles]);
        return !permission ? <div></div> : <WrappedComponent {...props} />;
    };
};

export default Mounter;
