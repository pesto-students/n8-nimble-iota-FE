import React, { useEffect } from "react";
import { Col, Row, Divider } from "antd";
import styles from "src/components/Page/Poker/Poker.module.less";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { fetchAllDevlopersProject } from "src/redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function UserVotes({ flipMove, flipped, selectedItem, avg }) {
    const dispatch = useDispatch();
    const { developerList } = useSelector((state) => state.project.developer);
    const user = useSelector((state) => state.user.user);
    const memeberList = user.role.name !== "developer" ? [...developerList, user] : [...developerList];
    const { email } = user;
    const { projectId } = useParams();
    useEffect(() => {
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    return (
        <>
            <div>
                <Row className={styles.devrows}>
                    <Col flex={4}>
                        <h3>User Votes</h3>
                    </Col>
                    <Col flex={5} align="middle" />
                    <Col flex={3} align="middle">
                        {selectedItem ? flipMove : null}
                    </Col>
                </Row>
            </div>

            {memeberList.map((dev, index) => (
                <Row key={index} className={styles.devrows}>
                    <Col flex={4}>
                        <h3>{dev.email === email ? "You" : dev.name}</h3>
                    </Col>
                    <Col flex={1} align="middle">
                        {flipped &&
                            (selectedItem?.votes?.find((vote) => vote.user === dev.email)
                                ? selectedItem?.votes?.find((vote) => vote.user === dev.email)?.value
                                : "-")}
                        {!flipped &&
                            (selectedItem?.votes?.find((vote) => vote.user === dev.email) ? (
                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                            ) : (
                                <CloseCircleTwoTone twoToneColor="#eb2f96" />
                            ))}
                    </Col>
                </Row>
            ))}
            <Divider />
            <Row className={styles.devrows}>
                <Col flex={4}>
                    <h3>Average</h3>
                </Col>
                <Col flex={1} align="middle">
                    {flipped && selectedItem ? avg : "-"}
                </Col>
            </Row>
        </>
    );
}
UserVotes.propTypes = {
    flipped: PropTypes.bool,
    avg: PropTypes.string,
    flipMove: PropTypes.func,
    selectedItem: PropTypes.object,
};
export default UserVotes;
