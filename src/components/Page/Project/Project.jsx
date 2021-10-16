import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect, useParams } from "react-router-dom";
import { Tabs } from "antd";
import Backlogs from "src/components/Page/Backlog/Backlogs";
import Meeting from "src/components/Page/Meeting/Meeting";
import ScrumRoutes from "src/route/ScrumRoutes";
import { useRouting } from "src/util/hooks";

const Project = () => {
    const { projectId } = useParams();
    const { user } = useSelector((state) => state.user);
    const { TabPane } = Tabs;
    const initialRoute = "/scrum_board";
    const { navigate, path, url } = useRouting();
    const userForMeeting = {
        name: user.name,
        picture: user.img,
        email: user.email,
    };
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const currentSprint = useSelector((state) => state.project.sprint.selectedSprint);
    const { status } = currentSprint;
    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <Redirect to={`${url}${initialRoute}`} />
                </Route>
                <Route path={`${path}/meet`}>
                    <Meeting
                    // roomName={currentProject?.meetingRoom?.roomName}
                    // meetingId={currentProject?.meetingRoom?.roomId}
                    // user={userForMeeting}
                    />
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
                            <>
                                {route.allowedStatus.includes(status) && (
                                    <TabPane key={`${url}${route.path}`} tab={route.name}>
                                        <Route component={route.component} path={`${path}${route.path}`} />
                                    </TabPane>
                                )}
                            </>
                        ))}
                    </Tabs>
                </Route>
            </Switch>
        </>
    );
};

Project.propTypes = {};

export default Project;
