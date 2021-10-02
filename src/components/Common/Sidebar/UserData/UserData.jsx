import React from "react";
import PropTypes from "prop-types";
import styles from "./UserData.module.less";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { extractInitials } from "../../../../util/functions";
import AppButton from "../../AppButton/AppButton";
import {
    EditFilled,
    SafetyOutlined,
    EnvironmentFilled,
    PhoneFilled,
    MailFilled,
} from "@ant-design/icons/lib/icons";

const UserData = (props) => {
    const { user } = useSelector((state) => state.user);

    const name = user ? user.name : "";
    const role = user ? user.role.name : "";
    const email = user ? user.email : "";

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
                            <div className={styles.text}>Location</div>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <PhoneFilled />
                            </div>
                            <div className={styles.text}>+9999999999</div>
                        </li>
                        <li>
                            <div className={styles.icon}>
                                <MailFilled />
                            </div>
                            <div className={styles.text}>{email}</div>
                        </li>
                    </ul>
                </div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A,
                    exercitationem.
                </div>
            </div>
        </div>
    );
};

UserData.propTypes = {};

export default UserData;
