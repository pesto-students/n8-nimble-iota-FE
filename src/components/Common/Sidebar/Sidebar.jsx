import classnames from "classnames";
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import ActiveMark from "src/components/Common/ActiveMark/ActiveMark";
import BacklogsControls from "src/components/Common/Sidebar/BacklogsControls/BacklogsControls";
import styles from "src/components/Common/Sidebar/Sidebar.module.less";
import SprintsData from "src/components/Common/Sidebar/SprintsData/SprintsData";
import UserData from "src/components/Common/Sidebar/UserData/UserData";
import { getUserData } from "src/redux";
import { checkIfPremiumUser } from "src/util/helperFunctions";

const Sidebar = () => {
    const { pathname } = useLocation();
    const { path, url } = useRouteMatch();
    const { user, userProfile } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const match = matchPath(pathname, { path: `${path}/:projectId/*` });
    const projectId = match?.params?.projectId;
    const projectUrl = `${url}/${projectId}`;
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const isBacklogs = pathname.endsWith("backlogs");
    const isProjectList = pathname.endsWith("projects");
    const backlogsUrl = `${url}/${projectId}/backlogs`;
    const isProject = !!projectId;
    const isMeet = pathname.endsWith("meet");
    const sideBarClassNames = classnames([
        styles.sidebar,
        {
            [styles.hidden]: isMeet,
        },
    ]);

    useEffect(() => {
        dispatch(getUserData(user.id))
    }, [])
    return (
        <section className={sideBarClassNames}>
            <div className={styles.main}>
                {isProject && (
                    <div className={styles.common}>
                        <Link to={projectUrl} className={styles.name}>
                            <div>{currentProject?.projectName}</div>
                            {!isBacklogs && <ActiveMark />}
                        </Link>
                        <Link to={backlogsUrl} className={styles.btnBacklogs}>
                            <div>Backlogs</div>
                            {isBacklogs && <ActiveMark />}
                        </Link>
                    </div>
                )}
                {isProject ? (
                    isBacklogs ? (
                        <BacklogsControls />
                    ) : (
                        <>{currentProject && <SprintsData project={currentProject} />}</>
                    )
                ) : (
                    <>{isProjectList && <UserData />}</>
                )}
            </div>
            <div className={styles.footer}>Subscription : {checkIfPremiumUser(userProfile.subscription) ? "Premium" : "Free Version"}</div>
        </section>
    );
};

Sidebar.propTypes = {};

export default Sidebar;
