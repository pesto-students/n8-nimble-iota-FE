import React from "react";
import PropTypes from "prop-types";
import styles from "src/components/Common/Sidebar/Sidebar.module.less";
import UserData from "src/components/Common/Sidebar/UserData/UserData";

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
