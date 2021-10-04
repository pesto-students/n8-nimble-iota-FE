import { notification } from "antd";
const openAuthNotification = (title, message) => {
    notification.open({
        message: title,
        description: message,
        placement: "bottomLeft",
    });
};
export default openAuthNotification;
