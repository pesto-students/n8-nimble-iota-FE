import React from "react";
import PropTypes from "prop-types";
import styles from "src/components/Common/Sidebar/Sidebar.module.less";
import UserData from "src/components/Common/Sidebar/UserData/UserData";
import { matchPath, useLocation, useRouteMatch } from "react-router";
import SprintsData from "src/components/Common/Sidebar/SprintsData/SprintsData";

const Sidebar = (props) => {
    const { pathname } = useLocation();
    const { path, url } = useRouteMatch();

    const match = matchPath(pathname, { path: `${path}/:projectId` });
    const projectId = match?.params?.projectId;

    const isProject = !!projectId;
    return (
        <section className={styles.sidebar}>
            <div className="main">
                {isProject ? <SprintsData projectId={projectId} /> : <UserData />}
                {/* {path} */}
            </div>
            <div className={styles.footer}>Subscription: Basic</div>
        </section>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
