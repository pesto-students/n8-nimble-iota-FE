import { PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import { Card, Col, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AppButton from "src/components/Common/AppButton/AppButton";
import Notification from "src/components/Common/Notification/Notification";
import styles from "src/components/Page/Standup/Standup.module.less";
import { fetchAllDevlopersProject, loadProjects } from "src/redux";
import Axios from "src/service/Axios";
import { useMeeting } from "src/util/hooks";

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

    const meetUrl = useMeeting();
    const today = new Date().toLocaleDateString();
    const { projectId } = useParams();
    const user = useSelector((state) => state.user.user);
    const { projects } = useSelector((state) => state.projectList);
    const { developerList } = useSelector((state) => state.project.developer);
    const currentProject = projects.find((project) => project._id === projectId);
    const [standups, setStandups] = useState(
        currentProject.members.find((member) => member.userId === user.id)?.standups || []
    );
    useEffect(() => {
        if (!projects?.length) dispatch(loadProjects(projectId));
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    const AddStandUp = () => {
        const standup = { ...form, date: today };
        if (!form.yesterday || !form.today || !form.blocker) return Notification("info", "All fields are required!");
        Axios.post("/addStandup", { projectId, userId: user.id, standup })
            .then((res) => {
                if (res.data?.success) setStandups([...standups, standup]);
                if (res.data) Notification(res.data?.success ? "success" : "warning", res.data?.message);
                return;
            })
            .catch((err) => {
                return Notification("warning", err);
            });
    };
    const checkadded = () => {
        return standups.find((rec) => rec.date === today);
    };
    return (
        <>
            <Row className={styles.header}>
                <Col flex={15} align="left">
                    Date: {today}
                </Col>
                <Col flex={1} align="middle">
                    <Link to={meetUrl} target="_blank">
                        <AppButton loading={false} size={"middle"}>
                            <PhoneFilled /> Join Call
                        </AppButton>
                    </Link>
                </Col>
                <Col flex={1} align="middle">
                    {!checkadded()?.date && (
                        <AppButton loading={false} size={"middle"} onClick={AddStandUp}>
                            <PlusCircleFilled /> Add
                        </AppButton>
                    )}
                </Col>
            </Row>
            {!checkadded()?.date && (
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
                            <TextArea
                                spellCheck="true"
                                name="blocker"
                                value={form.blocker}
                                onChange={onChange}
                                rows={4}
                            />
                        </Card>
                    </Col>
                </Row>
            )}
            <Row className={styles.header}>
                <Col flex={13} align="left">
                    Standup statements
                </Col>
            </Row>
            <Row className={styles.standupTable}>
                <Col flex={2} align="middle" span={3}>
                    Date
                </Col>
                <Col flex={4} align="middle" span={7}>
                    A day before
                </Col>
                <Col flex={4} align="middle" span={7}>
                    For this day
                </Col>
                <Col flex={4} align="middle" span={7}>
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
