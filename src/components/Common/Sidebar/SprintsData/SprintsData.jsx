import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActiveMark from "src/components/Common/ActiveMark/ActiveMark";
import AppInput from "src/components/Common/AppInput/AppInput";
import styles from "src/components/Common/Sidebar/SprintsData/SprintsData.module.less";
import { SprintStatusEnum } from "src/config/Enums";
import { setSelectedSprint, setSprintList } from "src/redux/Project/Sprint/SprintActions";
import { getDateFromString } from "src/util/helperFunctions";

const SprintsData = ({ project }) => {
    const { sprints } = project;
    const [filteredSprints, setFilteredSprints] = useState(sprints);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        setFilteredSprints(sprints);
    }, [sprints]);
    useEffect(() => {
        if (searchText !== "") {
            const filtered = sprints.filter((e) => e.name.includes(searchText));
            setFilteredSprints(filtered);
        } else {
            setFilteredSprints(sprints);
        }
    }, [searchText]);

    useEffect(() => {
        dispatch(setSprintList(sprints));
        const currentSprint =
            sprints?.find((e) => e.status === SprintStatusEnum.ACTIVE) ??
            sprints?.find((e) => e.status === SprintStatusEnum.UPCOMING);

        dispatch(setSelectedSprint(currentSprint));
    }, [sprints]);

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
    const isCurrent = sprint.status === SprintStatusEnum.ACTIVE;
    const isActive = sprint._id === selectedSprint?._id;
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setSelectedSprint(sprint));
    };

    return (
        <li onClick={handleClick} className={styles.sprintListItem}>
            <div className={styles.content}>
                <div>{name}</div>
                <div className={styles.sprintRange}>{`${getDateFromString(startdate) ?? "No Date"} - ${
                    getDateFromString(enddate) ?? "No Date"
                }`}</div>
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
