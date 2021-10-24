import { DeleteFilled } from "@ant-design/icons";
import { deleteDoc, doc } from "firebase/firestore";
import PropTypes from "prop-types";
import React from "react";
import Mounter from "src/components/Common/Mounter/Mounter";
import Notification from "src/components/Common/Notification/Notification";
import roles from "src/config/roles";
import { fbfirestore } from "src/service/firebase";

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
