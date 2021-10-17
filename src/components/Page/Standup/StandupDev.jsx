import React, { useState, useEffect } from "react";
import styles from "src/components/Page/Standup/Standup.module.less";
import { Card, Col, Row } from "antd";
import { PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import { Input, Typography } from "antd";
import AppButton from "src/components/Common/AppButton/AppButton";
import Axios from "src/service/Axios";
import { useRouting } from "src/util/hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, fetchAllDevlopersProject } from "src/redux";
import Notification from "src/components/Common/Notification/Notification";

const { TextArea } = Input;
const { Paragraph } = Typography;

function Standup() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        yesterday: "",
        today: "",
        blocker: "",
    });
    const onChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const { url } = useRouting();
    const projectId = url.split("/")[2];
    const user = useSelector((state) => state.user.user);
    const { projects } = useSelector((state) => state.projectList);
    const { developerList } = useSelector((state) => state.project.developer);
    const currentProject = projects.find((project) => project._id === projectId);
    const standups = currentProject.members.find((member) => member.userId === user.id)?.standups;
    useEffect(() => {
        if (!projects?.length) dispatch(loadProjects(projectId));
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    const AddStandUp = () => {
        const standup = { ...form, date: new Date().toLocaleDateString() };
        Axios.post("/addStandup", { projectId, userId: user.id, standup })
            .then(() => {
                return Notification("success", "Stand Up added today");
            })
            .catch(() => {
                return Notification("warning", "Stand Up was not added for today");
            });
    };

    return (
        <>
            <Row className={styles.header}>
                <Col flex={15} align="left">
                    Date: {new Date().toLocaleDateString()}
                </Col>
                <Col flex={1} align="middle">
                    <AppButton loading={false} size={"middle"}>
                        <PhoneFilled /> Join Call
                    </AppButton>
                </Col>
                <Col flex={1} align="middle">
                    <AppButton loading={false} size={"middle"} onClick={AddStandUp}>
                        <PlusCircleFilled /> Add
                    </AppButton>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Yesterday">
                        <TextArea
                            spellCheck="true"
                            name="yesterday"
                            value={form.yesterday}
                            onChange={onChange}
                            rows={4}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Today">
                        <TextArea spellCheck="true" name="today" value={form.today} onChange={onChange} rows={4} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Blockers">
                        <TextArea spellCheck="true" name="blocker" value={form.blocker} onChange={onChange} rows={4} />
                    </Card>
                </Col>
            </Row>
            <Row className={styles.header}>
                <Col flex={13} align="left">
                    Standup statements
                </Col>
            </Row>
            <Row className={styles.standupTable}>
                <Col flex={2} align="middle">
                    Date
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
            {standups?.map((item, index) => (
                <Row key={index}>
                    <Col flex={2} align="middle" span={3}>
                        <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>{item.date}</Paragraph>
                    </Col>
                    <Col flex={4} align="middle" span={7}>
                        <Card>
                            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                {item.yesterday}
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col flex={4} align="middle" span={7}>
                        <Card>
                            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>{item.today}</Paragraph>
                        </Card>
                    </Col>
                    <Col flex={4} align="middle" span={7}>
                        <Card>
                            <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }}>
                                {item.blocker}
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            ))}
        </>
    );
}

export default Standup;
