import React, { useEffect } from "react";
import styles from "src/components/Page/Projects/Projects.module.less";
import { useDispatch } from "react-redux";
import { loadProjects } from "src/redux/projectList/projectListActions";
import ProjectItem from "src/components/Common/ProjectItem/ProjectItem";
import Searchbox from "src/components/Common/Searchbox/Searchbox";
import AppButton from "src/components/Common/AppButton/AppButton";
import { useRouting } from "src/util/hooks";
import { useSelector } from "react-redux";

const Projects = (props) => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projectList.projects);

    // const history = useHistory();
    // const { path, url } = useRouteMatch();
    const router = useRouting();

    const prepareJsx = () => {
        return projects.map((project, index) => (
            <div key={index}>
                <ProjectItem
                    onClick={() => {
                        router.navigate(project._id);
                    }}
                    project={project}
                />
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
