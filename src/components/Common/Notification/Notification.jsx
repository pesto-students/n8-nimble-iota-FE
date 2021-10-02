import React from "react";
import { notification } from "antd";

const Notification = (type,title,description) => {
    notification[type]({
        message: title,
        description: description,
    });
}

export default Notification;
