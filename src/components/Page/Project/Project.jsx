import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, withRouter } from "react-router";
import { Redirect, useParams } from "react-router-dom";
import { Tabs } from "antd";
import Backlogs from "src/components/Page/Backlog/Backlogs";
import Meeting from "src/components/Page/Meeting/Meeting";
import ScrumRoutes from "src/route/ScrumRoutes";
import { useRouting } from "src/util/hooks";
import "src/components/Page/Project/Project.less";

const Project = () => {
    const { projectId } = useParams();
    const { TabPane } = Tabs;
    const initialRoute = "/scrum_board";
    const { navigate, path, url } = useRouting();
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const currentSprint = useSelector((state) => state.project.sprint.selectedSprint);
    const { status } = currentSprint || {};

    return (
        <>
            <Switch>
                <Route exact path={path} render={() => <Redirect to={`${url}${initialRoute}`} />} />
                <Route path={`${path}/meet`}>
                    <Meeting />
                </Route>
                <Route path={`${path}/backlogs`} component={Backlogs} />

                <Route path={path}>
                    <Tabs
                        defaultActiveKey={`${url}${initialRoute}`}
                        onChange={(key) => {
                            console.log(key, "key");
                            navigate(key, true, true);
                        }}
                    >
                        {ScrumRoutes.map((route, index) => (
                            <React.Fragment key={index}>
                                {route.allowedStatus.includes(status) && (
                                    <TabPane key={`${url}${route.path}`} tab={route.name}>
                                        <Route component={route.component} path={`${path}${route.path}`} />
                                    </TabPane>
                                )}
                            </React.Fragment>
                        ))}
                    </Tabs>
                </Route>
            </Switch>
        </>
    );
};

Project.propTypes = {};

export default withRouter(Project);
