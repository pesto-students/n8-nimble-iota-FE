import React from "react";
import { notification } from "antd";

function Notification({type,title,description}) {
    return notification[type]({
        key,
        message: title,
        description: description,
    });
}

export default Notification;
