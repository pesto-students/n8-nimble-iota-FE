import React from "react";
import PropTypes from "prop-types";
import styles from "./ProjectItem.module.less";
import AppButton from "../AppButton/AppButton";
import { getDateFromString } from "../../../util/helperFunctions";
import { PlusSquareFilled } from "@ant-design/icons";

const ProjectItem = ({ project, onClick }) => {
    // const project = {
    //     _id: "61546b7864bccbe191f15977",
    //     projectName: "Default Project",
    //     startDate: "2021-09-29T13:34:48.106Z",
    //     members: [
    //         {
    //             userId: "61571ac0134526f96a58d0fd",
    //             standups: [],
    //         },
    //         {
    //             userId: "61544736f2a64ea741be4537",
    //             standups: [],
    //         },
    //         {
    //             userId: "61544736f2a64ea741be4537",
    //             standups: [],
    //         },
    //         {
    //             userId: "61571ac0134526f96a58d0fd",
    //             standups: [],
    //         },
    //         {
    //             userId: "6158a91522e0576a80953245",
    //             standups: [],
    //         },
    //     ],
    //     tickets: [
    //         {
    //             ticketId: "LG4913",
    //             title: "Test updated",
    //             description: "This is a test Ticket",
    //             assignee: "6158a91522e0576a80953245",
    //             priority: "HIGH",
    //             type: "USER_STORY",
    //             storyPoints: "0",
    //             sprint: "SPRINT_3",
    //             status: "COMPLETE",
    //             _id: "615945fbc034691576e42d0f",
    //         },
    //     ],
    //     __v: 145,
    //     sprints: ["61549f283b2f9feb4e8e6b41", "61549f283b2f9feb4e8e6b43"],
    // };
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
                            <div className={styles.add} onClick={() => {}}>
                                <PlusSquareFilled />
                            </div>
                        </div>
                        <div>
                            <a href="#">Raghu Datta</a>
                        </div>
                        <div>
                            <a href="#">Vipan</a>
                        </div>
                        <div>
                            <a href="#">Vishnu</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object,
    onClick: PropTypes.func,
};

export default ProjectItem;
