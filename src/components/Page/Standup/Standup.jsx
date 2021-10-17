import React from "react";
import StandupDev from "src/components/Page/Standup/StandupDev";
import StandupSM from "src/components/Page/Standup/StandupSM";
import Mounter from "src/components/Common/Mounter/Mounter";
import roles from "src/config/roles";

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
