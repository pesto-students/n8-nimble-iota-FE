import React from "react";
import PropTypes from "prop-types";
import UserData from "./UserData/UserData";
import styles from "./Sidebar.module.less";

const Sidebar = (props) => {
    return (
        <section className={styles.sidebar}>
            <div className="main">
                <UserData />
            </div>
            <div className={styles.footer}>Subscription: Basic</div>
        </section>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
