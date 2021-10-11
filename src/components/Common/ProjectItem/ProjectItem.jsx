import React from "react";
import PropTypes from "prop-types";
import styles from "src/components/Common/ProjectItem/ProjectItem.module.less";
import { PlusSquareFilled } from "@ant-design/icons";
import { getDateFromString } from "src/util/helperFunctions";
import AppModal from "src/components/Common/AppModal/AppModal";
import AddMembers from "src/components/Common/AddMembers/AddMembers";
import { useState } from "react";

const ProjectItem = ({ project, onClick }) => {
    const prepareMembersListJsx = () =>
        project.members.map((e, i) => (
            <div key={i}>
                <a href="#">{e.user?.name}</a>
            </div>
        ));
    const [addVisible, setAddVisible] = useState(false);
    return (
        <>
            {project && (
                <div onClick={onClick} className={styles.projectItem}>
                    <div className={`${styles.projectDetail} ${styles.graphs}`}>Graphs</div>
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
                            <span className={styles.value}>{"-"}</span>
                        </>
                    </div>
                    <div className={`${styles.projectDetail} ${styles.ticketInfo}`}>
                        <>
                            <span className={styles.title}>No of Tickets in Active Sprint</span>
                            <span className={styles.value}>{"-"}</span>
                        </>
                        <>
                            <span className={styles.title}>No of Tickets in upcoming Sprint</span>
                            <span className={styles.value}>{"-"}</span>
                        </>
                        <>
                            <span className={styles.title}>No of Backlogs</span>
                            <span className={styles.value}>{"-"}</span>
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
            <AppModal visible={addVisible}>
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
