import React from "react";
import StandupDev from "./StandupDev";
import StandupSM from "./StandupSM";
import Mounter from "../../Common/Mounter/Mounter";
import roles from "../../../config/roles";

function Standup() {
    const DevPage = Mounter(StandupDev, {})(roles.developers);
    const SMPage = Mounter(StandupSM, {})(roles.scrummastersandadmins);
    return (
        <>
            {DevPage}
            {SMPage}
        </>
    );
}

export default Standup;
