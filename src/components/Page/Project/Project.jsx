import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect, useLocation, useParams } from "react-router-dom";
import Backlogs from "src/components/Page/Backlog/Backlogs";
import Meeting from "src/components/Page/Meeting/Meeting";
import "src/components/Page/Project/Project.less";
import ScrumRoutes from "src/route/ScrumRoutes";
import { useRouting } from "src/util/hooks";

const Project = () => {
    const { projectId } = useParams();
    const { TabPane } = Tabs;
    const { navigate, path, url } = useRouting();
    let initialRoute = url + "/scrum_board";
    const location = useLocation();
    const loc = location.pathname.split("/").pop();
    if (loc !== projectId) initialRoute = url + "/" + loc;
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const currentSprint = useSelector((state) => state.project.sprint.selectedSprint);
    const { status } = currentSprint || {};
    const openTab = (key) => {
        navigate(key, true, true);
    };
    return (
        <>
            <Switch>
                <Route exact path={path} render={() => <Redirect to={initialRoute} />} />
                <Route path={`${path}/meet`}>
                    <Meeting />
                </Route>
                <Route path={`${path}/backlogs`} component={Backlogs} />
            </Switch>
            {loc !== "backlogs" && (
                <Tabs activeKey={initialRoute} onChange={openTab}>
                    {ScrumRoutes.map((route, index) => (
                        <React.Fragment key={index}>
                            {route.allowedStatus.includes(status) && (
                                <TabPane key={`${url}${route.path}`} tab={route.name}>
                                    <route.component />
                                </TabPane>
                            )}
                        </React.Fragment>
                    ))}
                </Tabs>
            )}
        </>
    );
};

export default Project;
