import React, { useEffect } from "react";
import styles from "src/components/Page/Projects/Projects.module.less";
import { useDispatch } from "react-redux";
import { loadProjects } from "src/redux/projectList/projectListActions";
import ProjectItem from "src/components/Common/ProjectItem/ProjectItem";
import Searchbox from "src/components/Common/Searchbox/Searchbox";
import AppButton from "src/components/Common/AppButton/AppButton";

const Projects = (props) => {
    const dispatch = useDispatch();

    const projects = [
        {
            _id: "61546b7864bccbe191f15977",
            projectName: "Default Project",
            startDate: "2021-09-29T13:34:48.106Z",
            members: [
                {
                    userId: "61571ac0134526f96a58d0fd",
                    standups: [],
                },
                {
                    userId: "61544736f2a64ea741be4537",
                    standups: [],
                },
                {
                    userId: "61544736f2a64ea741be4537",
                    standups: [],
                },
                {
                    userId: "61571ac0134526f96a58d0fd",
                    standups: [],
                },
                {
                    userId: "6158a91522e0576a80953245",
                    standups: [],
                },
            ],
            tickets: [
                {
                    ticketId: "LG4913",
                    title: "Test updated",
                    description: "This is a test Ticket",
                    assignee: "6158a91522e0576a80953245",
                    priority: "HIGH",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_3",
                    status: "COMPLETE",
                    _id: "615945fbc034691576e42d0f",
                },
            ],
            __v: 145,
            sprints: ["61549f283b2f9feb4e8e6b41", "61549f283b2f9feb4e8e6b43"],
        },
    ];

    useEffect(() => {
        dispatch(loadProjects());
    }, []);

    const prepareJsx = () => {
        return projects.map((project, index) => (
            <div key={index}>
                <ProjectItem onClick={() => {}} project={project} />
            </div>
        ));
    };
    return (
        <>
            <div>
                <Searchbox className={styles.searchBar} placeholder="Search all projects .." loading={false} />
            </div>
            <div className={styles.createButton}>
                <AppButton size="large">Create Project</AppButton>
            </div>
            <div className={styles.project}>{prepareJsx()}</div>
        </>
    );
};

Projects.propTypes = {};

export default Projects;
