import { EditFilled, EnvironmentFilled, MailFilled, PhoneFilled, SafetyOutlined } from "@ant-design/icons/lib/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "src/components/Common/Sidebar/UserData/UserData.module.less";
import { extractInitials } from "src/util/helperFunctions";

const UserData = () => {
    const { user } = useSelector((state) => state.user);

    const name = user?.name ?? "-";
    const role = user?.role.name ?? "-";
    const email = user?.email ?? "-";
    const location = user?.location ?? "-";
    const phone = user?.phone ?? "-";
    const selfintro = user?.selfintro ?? "-";
    const imgUrl = user?.img;

    return (
        <div className={styles.userData}>
            <div className={styles.avatar}>
                {imgUrl ? <Avatar src={imgUrl} size={64}></Avatar> : <Avatar size={64}>{extractInitials(name)}</Avatar>}
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <div className={styles.name}>{name}</div>
                    <Link className={styles.edit} to="/projects/account">
                        <EditFilled />
                    </Link>
                </div>
                <div className={styles.content}>
                    <ul>
                        <li>
                            <div className={styles.icon}>
                                <SafetyOutlined />
                            </div>
                            <div className={styles.text}>{role}</div>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <EnvironmentFilled />
                            </div>
                            <div className={styles.text}>{location}</div>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <PhoneFilled />
                            </div>
                            <div className={styles.text}>{phone}</div>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <MailFilled />
                            </div>
                            <div className={styles.text}>{email}</div>
                        </li>
                    </ul>
                </div>
                <div className={styles.description}>{selfintro}</div>
            </div>
        </div>
    );
};

UserData.propTypes = {};

export default UserData;
