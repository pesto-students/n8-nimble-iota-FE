import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { doc, deleteDoc } from "firebase/firestore";
import { fbfirestore } from "src/service/firebase";
import Mounter from "src/components/Common/Mounter/Mounter";
import roles from "src/config/roles";
import Notification from "src/components/Common/Notification/Notification";

function Delticket({ itemid, setSelectedVote }) {
    const removeTicket = async () => {
        await deleteDoc(doc(fbfirestore, "poker", itemid));
        setSelectedVote(null);
        return Notification("success", "Ticket deleted Successfully");
    };
    const Del = () => <DeleteFilled onClick={removeTicket} />;
    return Mounter(Del, {})(roles.scrummastersandadmins);
}
Delticket.propTypes = {
    itemid: PropTypes.string,
    setSelectedVote: PropTypes.func,
};
export default Delticket;
