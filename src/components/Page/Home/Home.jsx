/* eslint-disable react/prop-types */
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NavBar from "src/components/Common/NavBar/NavBar";
import Sidebar from "src/components/Common/Sidebar/Sidebar";
import styles from "src/components/Page/Home/Home.module.less";
import Project from "src/components/Page/Project/Project";
import Projects from "src/components/Page/Projects/Projects";
import UserProfile from "src/components/Page/UserProfile/UserProfile";
import { loadProjects, LogoutUser } from "src/redux";

function Home() {
    const { Text } = Typography;
    const { email, img } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [resetModal, setResetModal] = useState(false);
    const openReset = () => setResetModal(true);
    const closeReset = () => setResetModal(false);

    useEffect(() => {
        dispatch(loadProjects());
    }, []);

    const handleLogout = () => dispatch(LogoutUser());

    const { path, url } = useRouteMatch();
    return (
        <div>
            <NavBar onLogout={handleLogout} />
            <section className={styles.body}>
                <Sidebar />
                <main className={styles.mainContent}>
                    <Switch>
                        <Route exact path={path}>
                            <Projects />
                        </Route>
                        <Route exact path={`${path}/account`}>
                            <UserProfile />
                        </Route>
                        <Route path={`${path}/:projectId`}>
                            <Project />
                        </Route>
                    </Switch>
                </main>
            </section>
        </div>
    );
}

export default Home;
