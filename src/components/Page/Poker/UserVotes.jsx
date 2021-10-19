import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "src/components/Page/Poker/Poker.module.less";
import { fetchAllDevlopersProject } from "src/redux";

function UserVotes({ flipMove, flipped, selectedItem, avg }) {
    const dispatch = useDispatch();
    const { developerList } = useSelector((state) => state.project.developer);
    const user = useSelector((state) => state.user.user);
    const memeberList = user.role.name !== "developer" ? [...developerList, user] : [...developerList];
    const { email } = user;
    const { projectId } = useParams();
    const getUserVote = (ticket, email) => {
        const vote = ticket?.votes?.find((vote) => vote.user === email);
        return vote ? vote : null;
    };
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
                        {flipped && (getUserVote(selectedItem, dev.email)?.value || "-")}
                        {!flipped &&
                            (getUserVote(selectedItem, dev.email) ? (
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
    flipMove: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectedItem: PropTypes.object,
};
export default UserVotes;
