import { PlusSquareFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddMembers from "src/components/Common/AddMembers/AddMembers";
import AppModal from "src/components/Common/AppModal/AppModal";
import styles from "src/components/Common/ProjectItem/ProjectItem.module.less";
import Donut from "src/components/Page/Reports/Donut/Donut";
import { SprintStatusEnum } from "src/config/Enums";
import { fetchAllDevlopersProject, fetchAllTickets } from "src/redux";
import { filterBacklogTickets, generatePieChartData, getDateFromString } from "src/util/helperFunctions";

const ProjectItem = ({ project, onClick }) => {
    const prepareMembersListJsx = () =>
        project.members.map((e, i) => (
            <div key={i}>
                <a href="#">{e.user?.name ?? "User"}</a>
            </div>
        ));
    const [addVisible, setAddVisible] = useState(false);
    const handleCancel = () => setAddVisible(false);
    const backlogsCount = filterBacklogTickets(project?.tickets).length ?? 0;
    const upcomingSprint = project?.sprints.find((e) => e.status === SprintStatusEnum.UPCOMING);
    const activeSprint = project?.sprints.find((e) => e.status === SprintStatusEnum.ACTIVE);
    const ticketsInUpcomingSprintCount =
        project?.tickets.filter((ticket) => ticket.sprint === upcomingSprint?._id).length ?? 0;

    const ticketsInActiveSprintCount =
        project?.tickets.filter((ticket) => ticket.sprint === activeSprint?._id).length ?? 0;

    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList, loadingDevelopers } = useSelector((state) => state.project.developer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllDevlopersProject(project._id));
        dispatch(fetchAllTickets(project._id));
    }, []);
    return (
        <>
            {project && (
                <div onClick={onClick} className={styles.projectItem}>
                    <div className={`${styles.projectDetail} ${styles.graphs}`}>
                        {!loading && !loadingDevelopers && (
                            <Donut map={generatePieChartData(ticketList, developerList)} />
                        )}
                    </div>
                    <div className={`${styles.projectDetail} ${styles.projectInfo}`}>
                        <>
                            <span className={styles.title}>Project Name</span>
                            <span className={styles.value}>{project.projectName}</span>
                        </>
                        <>
                            <span className={styles.title}>Start Date</span>
                            <span className={styles.value}>{getDateFromString(project.startDate)}</span>
                        </>
                        <>
                            <span className={styles.title}>Target End date</span>
                            <span className={styles.value}>
                                {project.targetEndDate ? getDateFromString(project.targetEndDate) : "-"}
                            </span>
                        </>
                        <>
                            <span className={styles.title}>No of Members</span>
                            <span className={styles.value}>{project.members.length}</span>
                        </>
                        <>
                            <span className={styles.title}>Active Sprint</span>
                            <span className={styles.value}>{activeSprint?.name ?? "-"}</span>
                        </>
                    </div>
                    <div className={`${styles.projectDetail} ${styles.ticketInfo}`}>
                        <>
                            <span className={styles.title}>No of Tickets in Active Sprint</span>
                            <span className={styles.value}>{ticketsInActiveSprintCount ?? "-"}</span>
                        </>
                        <>
                            <span className={styles.title}>No of Tickets in upcoming Sprint</span>
                            <span className={styles.value}>{ticketsInUpcomingSprintCount ?? "-"}</span>
                        </>
                        <>
                            <span className={styles.title}>No of Backlogs</span>
                            <span className={styles.value}>{backlogsCount ?? "-"}</span>
                        </>
                    </div>
                    <div className={`${styles.projectDetail} ${styles.teamInfo}`}>
                        <div>
                            <h3 className={styles.title}>Team Members</h3>
                            <div
                                className={styles.add}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAddVisible(true);
                                }}
                            >
                                <PlusSquareFilled />
                            </div>
                        </div>
                        <div className={styles.scroller}>{prepareMembersListJsx()}</div>
                    </div>
                </div>
            )}
            <AppModal visible={addVisible} handleCancel={handleCancel}>
                <AddMembers projectId={project._id} />
            </AppModal>
        </>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object,
    onClick: PropTypes.func,
};

export default ProjectItem;
