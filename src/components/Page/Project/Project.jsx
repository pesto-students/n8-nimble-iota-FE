import React from "react";
import PropTypes from "prop-types";
import styles from "src/components/Page/Project/Project.module.less";
import { Route, Switch, useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Tabs } from "antd";
import ScrumRoutes from "src/route/ScrumRoutes";
import { useRouting } from "src/util/hooks";
import { Redirect } from "react-router-dom";
import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";

const Project = () => {
    const { projectId } = useParams();
    const { TabPane } = Tabs;
    const initialRoute = "/scrum_board";
    const { navigate, path, url } = useRouting();
    return (
        <>
            <Switch>
                <Tabs
                    defaultActiveKey={`${url}${initialRoute}`}
                    onChange={(key) => {
                        console.log(key, "key");
                        navigate(key, true, true);
                    }}
                >
                    {ScrumRoutes.map((route, index) => (
                        <TabPane key={`${url}${route.path}`} tab={route.name}>
                            <Route component={route.component} path={`${path}${route.path}`} />
                        </TabPane>
                    ))}
                </Tabs>
            </Switch>
        </>
    );
};

Project.propTypes = {};

export default Project;