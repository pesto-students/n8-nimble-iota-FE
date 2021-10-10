import React, { useState, useEffect } from "react";
import styles from "./Standup.module.less";
import { Card, Col, Divider, Row } from "antd";
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
    const today = new Date().toLocaleDateString();
    const { url } = useRouting();
    const projectId = url.split("/")[2];
    const [member, setMember] = useState(null);
    const [date, setDate] = useState(null);
    const user = useSelector((state) => state.user.user);
    const { projects } = useSelector((state) => state.projectList);
    const { developerList } = useSelector((state) => state.project.developer);
    const currentProject = projects.find((project) => project._id === projectId);
    const [standups, setStandups] = useState(currentProject?.members);
    useEffect(() => {
        setDate(today);
        if (!projects?.length) dispatch(loadProjects(projectId));
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    const AddStandUp = () => {
        const standup = { ...form, date: today };
        Axios.post("/addStandup", { projectId, userId: user.id, standup })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
        const filtered = standups?.filter((dev) => dev.userId === memberDetail?._id);
        setStandups(filtered);
    }, [date, member]);
    return (
        <>
            <Row className={styles.header}>
                <Col flex={13} align="left">
                    Standup statements
                </Col>
                <Col flex={2} align="middle">
                    Filter:&nbsp;
                    <Space direction="vertical">
                        <DatePicker allowClear={false} onChange={filterDate} format={"MM/DD/YYYY"} />
                    </Space>
                </Col>
                <Col flex={2} align="middle">
                    <AppSelect value={member} options={developerList} placeholder="Member" onChange={onChangeMember} />
                </Col>
                <Col flex={2} align="middle">
                    <AppButton size={"middle"} onClick={reset}>
                        Reset
                    </AppButton>
                </Col>
            </Row>
            <Row className={styles.standupTable}>
                <Col flex={2} align="middle">
                    Member
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
                <>
                    <Row key={index}>
                        <Col flex={2} align="left">
                            {item.userId}
                        </Col>
                        <Col flex={4} align="middle">
                            {item.standups.find((obj) => obj.date === date)?.yesterday || "-"}
                        </Col>
                        <Col flex={4} align="middle">
                            {item.standups.find((obj) => obj.date === date)?.today || "-"}
                        </Col>
                        <Col flex={4} align="middle">
                            {item.standups.find((obj) => obj.date === date)?.blocker || "-"}
                        </Col>
                    </Row>
                    <Divider />
                </>
            ))}
        </>
    );
}

export default Standup;
