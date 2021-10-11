import React from "react";
import PropTypes from "prop-types";
import styles from "src/components/Common/Sidebar/UserData/UserData.module.less";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { EditFilled, SafetyOutlined, EnvironmentFilled, PhoneFilled, MailFilled } from "@ant-design/icons/lib/icons";
import { extractInitials } from "src/util/helperFunctions";

const UserData = (props) => {
    const { user } = useSelector((state) => state.user);

    const name = user?.name ?? "-";
    const role = user?.role.name ?? "-";
    const email = user?.email ?? "-";
    const location = user?.location ?? "-";
    const phone = user?.phone ?? "-";
    const selfintro = user?.selfintro ?? "-";

    return (
        <div className={styles.userData}>
            <div className={styles.avatar}>
                <Avatar size={64}>{extractInitials(name)}</Avatar>
            </div>
            <div className={styles.details}>
                <div className={styles.header}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.edit} onClick={() => {}}>
                        <EditFilled />
                    </div>
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
