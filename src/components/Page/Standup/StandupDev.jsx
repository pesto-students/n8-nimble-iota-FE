import React, { useState, useEffect } from "react";
import styles from "./Standup.module.less";
import { Card, Col, Row } from "antd";
import { PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import { Input, DatePicker, Space } from "antd";
import AppButton from "../../Common/AppButton/AppButton";
import AppSelect from "../../Common/AppSelect/AppSelect";
import Axios from "../../../service/Axios";
import { useRouting } from "src/util/hooks";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects, fetchAllDevlopersProject } from "src/redux";

const { TextArea } = Input;

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
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
                    <Col flex={2} align="middle">
                        {item.date}
                    </Col>
                    <Col flex={4} align="middle">
                        {item.yesterday}
                    </Col>
                    <Col flex={4} align="middle">
                        {item.today}
                    </Col>
                    <Col flex={4} align="middle">
                        {item.blocker}
                    </Col>
                </Row>
            ))}
        </>
    );
}

export default Standup;
