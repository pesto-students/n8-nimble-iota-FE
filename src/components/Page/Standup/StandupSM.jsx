import React, { useState, useEffect } from "react";
import styles from "src/components/Page/Standup/Standup.module.less";
import { Card, Col, Divider, Row, Typography } from "antd";
import { DatePicker, Space } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, fetchAllDevlopersProject } from "src/redux";
import moment from "moment";
import { useMeeting } from "src/util/hooks";
import { Link, useParams } from "react-router-dom";

const { Paragraph } = Typography;

function Standup() {
    const dispatch = useDispatch();
    const meetUrl = useMeeting();
    const today = new Date().toLocaleDateString();
    const { projectId } = useParams();
    const [member, setMember] = useState(null);
    const [date, setDate] = useState(null);
    const { projects } = useSelector((state) => state.projectList);
    const { developerList } = useSelector((state) => state.project.developer);
    const currentProject = projects.find((project) => project._id === projectId);
    const [standups, setStandups] = useState(currentProject?.members);
    const nameMap = {};
    developerList.forEach((item) => (nameMap[item._id] = item.name));
    useEffect(() => {
        setDate(today);
        if (!projects?.length) dispatch(loadProjects(projectId));
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    const reset = () => {
        setMember(null);
    };
    const onChangeMember = (value) => setMember(value);
    const filterDate = (date, dateString) => setDate(dateString);
    useEffect(() => {
        const memberDetail = JSON.parse(member);
        if (!member) {
            setStandups(currentProject?.members);
            return;
        }
        const filtered = currentProject?.members.filter((dev) => dev.userId === memberDetail?._id);
        setStandups(filtered);
    }, [date, member]);
    return (
        <>
            <Row className={styles.header}>
                <Col flex={10} align="left">
                    Standup statements
                </Col>
                <Col flex={1} align="middle">
                    <Link to={meetUrl} target="_blank">
                        <AppButton loading={false} size={"middle"}>
                            <PhoneFilled /> Join Call
                        </AppButton>
                    </Link>
                </Col>
                <Col flex={2} align="middle">
                    Filter:&nbsp;
                    <Space direction="vertical">
                        <DatePicker
                            defaultValue={moment(today, "MM/DD/YYYY")}
                            onChange={filterDate}
                            format={"MM/DD/YYYY"}
                        />
                    </Space>
                </Col>
                <Col flex={2} align="middle">
                    <AppSelect value={member} options={developerList} placeholder="Asignee" onChange={onChangeMember} />
                </Col>
                <Col flex={2} align="middle">
                    <AppButton size={"middle"} onClick={reset}>
                        Reset
                    </AppButton>
                </Col>
            </Row>
            <Row className={styles.standupTable}>
                <Col flex={2} align="middle">
                    {!date && member ? "Date" : "Asignee"}
                </Col>
                <Col flex={4} align="middle">
                    A day before
                </Col>
                <Col flex={4} align="middle">
                    For this day
                </Col>
                <Col flex={4} align="middle">
                    Blockers for the day
                </Col>
            </Row>
            {date &&
                standups?.map((item, index) => (
                    <>
                        <Row key={index}>
                            <Col flex={2} align="left" span={3}>
                                {nameMap[item.userId]}
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item.standups.find((obj) => obj.date === date)?.yesterday || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item.standups.find((obj) => obj.date === date)?.today || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item.standups.find((obj) => obj.date === date)?.blocker || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                    </>
                ))}
            {!date &&
                member &&
                standups[0]?.standups?.map((item, index) => (
                    <>
                        <Row key={index}>
                            <Col flex={2} align="left" span={3}>
                                {item.date}
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item?.yesterday || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item?.today || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                            <Col flex={4} align="middle" span={7}>
                                <Card>
                                    <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                        {item?.blocker || "-"}
                                    </Paragraph>
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                    </>
                ))}
        </>
    );
}

export default Standup;
