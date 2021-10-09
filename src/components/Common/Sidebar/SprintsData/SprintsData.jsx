import React from "react";
import PropTypes from "prop-types";
import { matchPath, useLocation, useParams, useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import styles from "src/components/Common/Sidebar/SprintsData/SprintsData.module.less";
import { Link } from "react-router-dom";
import Searchbox from "src/components/Common/Searchbox/Searchbox";
import AppInput from "src/components/Common/AppInput/AppInput";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";

const SprintsData = ({ projectId }) => {
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const sprints = currentProject?.sprints;

    const prepareSprintsListJsx = () =>
        sprints.map((e, index) => <SprintListItem key={index} isActive={true} name={e.name} />);
    return (
        <>
            <div className={styles.projectDetails}>
                <div className={styles.name}>{currentProject?.projectName}</div>
                <div className={styles.btnBacklogs}>
                    <Link to="#">Backlogs</Link>
                </div>
                <div className={styles.searchSprints}>
                    <AppInput allowClear suffix={<SearchOutlined />} placeholder="Search all sprints..." />
                </div>
            </div>
            <div className={styles.sprintsList}>
                <ul>{prepareSprintsListJsx()}</ul>
            </div>
        </>
    );
};

SprintsData.propTypes = {
    projectId: PropTypes.string,
};

export default SprintsData;

const SprintListItem = ({ name, isCurrent, isActive }) => {
    console.log(isActive);
    return (
        <li className={styles.sprintListItem}>
            <div className={styles.content}>
                <div>{name}</div>
                <div className={styles.sprintRange}>19 Jun - 230 Jun</div>
            </div>
            {isCurrent && (
                <div className={styles.checkIcon}>
                    <CheckOutlined />
                </div>
            )}
            {isActive && <div className={styles.activeMark}></div>}
        </li>
    );
};

SprintListItem.propTypes = {
    name: PropTypes.string,
    isCurrent: PropTypes.bool,
    isActive: PropTypes.bool,
};
