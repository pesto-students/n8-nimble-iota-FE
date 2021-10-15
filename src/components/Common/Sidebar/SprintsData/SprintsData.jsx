import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { matchPath, useLocation, useParams, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "src/components/Common/Sidebar/SprintsData/SprintsData.module.less";
import { Link } from "react-router-dom";
import Searchbox from "src/components/Common/Searchbox/Searchbox";
import AppInput from "src/components/Common/AppInput/AppInput";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { sprintStatus } from "src/config/constants";
import { setSelectedSprint } from "src/redux/Project/Sprint/SprintActions";
import { useRouting } from "src/util/hooks";
import ActiveMark from "src/components/Common/ActiveMark/ActiveMark";
import { SprintStatusEnum } from "src/config/Enums";

const SprintsData = ({ project }) => {
    const { sprints } = project;
    const [filteredSprints, setFilteredSprints] = useState(sprints);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        if (searchText !== "") {
            const filtered = sprints.filter((e) => e.name.includes(searchText));
            setFilteredSprints(filtered);
        } else {
            setFilteredSprints(sprints);
        }
    }, [searchText]);
    const currentSprint = sprints?.find((e) => e.status === SprintStatusEnum.ACTIVE);
    const dispatch = useDispatch();
    dispatch(setSelectedSprint(currentSprint));
    const prepareSprintsListJsx = () => filteredSprints?.map((e, index) => <SprintListItem key={index} sprint={e} />);
    return (
        <>
            <div className={styles.projectDetails}>
                <div className={styles.searchSprints}>
                    <AppInput
                        allowClear
                        suffix={<SearchOutlined />}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder="Search all sprints..."
                    />
                </div>
            </div>
            <div className={styles.sprintsList}>
                <ul>{prepareSprintsListJsx()}</ul>
            </div>
        </>
    );
};

SprintsData.propTypes = {
    project: PropTypes.object,
};

export default SprintsData;

const SprintListItem = ({ sprint }) => {
    const selectedSprint = useSelector((state) => state.sprint.selectedSprint);
    const { name, startdate, enddate } = sprint;
    const isCurrent = sprint.status === sprintStatus?.active;
    const isActive = sprint._id === selectedSprint?._id;
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setSelectedSprint(sprint));
    };

    return (
        <li onClick={handleClick} className={styles.sprintListItem}>
            <div className={styles.content}>
                <div>{name}</div>
                <div className={styles.sprintRange}>{`${startdate ?? ""} - ${enddate ?? ""}`}</div>
            </div>
            {isCurrent && (
                <div className={styles.checkIcon}>
                    <CheckOutlined />
                </div>
            )}
            {isActive && <ActiveMark />}
        </li>
    );
};

SprintListItem.propTypes = {
    sprint: PropTypes.object,
};
