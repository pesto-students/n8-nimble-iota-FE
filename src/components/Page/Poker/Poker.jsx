import React, { useState, useRef, useEffect } from "react";
import { PhoneFilled, CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Col, Row, Layout, Form, Divider } from "antd";
import { fetchAllTickets, fetchAllDevlopersProject, updateTicket } from "../../../redux";
import AppButton from "../../Common/AppButton/AppButton";
import { useDispatch, useSelector } from "react-redux";
import EstimationCard from "./EstimationCard";
import AppModal from "../../Common/AppModal/AppModal";
import FloatingAdd from "../../Common/FloatingAdd/FloatingAdd";
import "intersection-observer";
import { useIsVisible } from "react-is-visible";
import AppSelect from "../../Common/AppSelect/AppSelect";
import { useMeeting, useRouting } from "src/util/hooks";
import { onSnapshot, collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { fbfirestore } from "../../../service/firebase";
import styles from "./Poker.module.less";
import Axios from "../../../service/Axios";
import AppInput from "../../Common/AppInput/AppInput";
import Mounter from "../../Common/Mounter/Mounter";
import roles from "../../../config/roles";
import { Link } from "react-router-dom";


function Poker() {
    const [form] = Form.useForm();
    const { ticketList } = useSelector((state) => state.project.ticket);
    const { developerList } = useSelector((state) => state.project.developer);
    const user = useSelector((state) => state.user.user);
    const memeberList = user.role.name === "scrummaster" ? [...developerList, user] : [...developerList];
    const { email } = user;
    const [avg, setAvg] = useState(null);
    const [list, setList] = useState([]);
    const [sprintList, setSprintList] = useState([]);
    const [moving, setMoving] = useState(false);
    const move = () => setMoving(true);
    const cancelMove = () => setMoving(false);
    const [flipped, setFlip] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedVote, setSelectedVote] = useState(null);
    const calculateAvg = () => {
        if (!selectedItem) return;
        const average = (
            selectedItem.votes?.reduce((previousValue, item) => previousValue + parseFloat(item.value), 0) /
            selectedItem.votes.length
        ).toFixed(1);
        setAvg(average);
        return average;
    };
    const select = (id, item) => {
        setSelectedVote(item?.votes?.find((vote) => vote.user === email)?.value);
        setSelectedItem(item);
        setFlip(item?.flipped);
        setSelected(id);
    };
    const { url } = useRouting();
    const projectId = url.split("/")[2];
    const dispatch = useDispatch();
    useEffect(() => {
        const selectedTicket = list.find((item) => item.id === selected);
        setSelectedItem(selectedTicket);
        setFlip(selectedTicket?.flipped);
        form.setFieldsValue({
            storypoints: avg,
        });
    }, [list, avg]);
    useEffect(() => {
        calculateAvg();
    }, [selectedItem]);
    useEffect(() => {
        if (!sprintList.length)
            Axios.get("/sprints/" + projectId).then((res) => {
                setSprintList(res.data);
            });
        if (!ticketList.length) dispatch(fetchAllTickets(projectId));
        if (!developerList.length) dispatch(fetchAllDevlopersProject(projectId));
    }, []);
    const nodeRef = useRef();
    const isVisible = useIsVisible(nodeRef);
    const { Header, Sider, Content } = Layout;
    const estimateValues = ["0.5", "1", "2", "3", "5", "8", "13", "21"];
    const [addTicket, setAddTicket] = useState(false);
    const [ticketid, setTicketID] = useState("");
    const [sprintid, setSprintID] = useState("");
    const onChangeSprint = (value) => setSprintID(value);
    const onChangeTicketid = (value) => setTicketID(value);
    const AddTicketToPoker = async () => {
        const collectionRef = collection(fbfirestore, "poker");
        const { ticketId, title } = JSON.parse(ticketid);
        if (list.find((item) => item.ticketId === ticketId)) return;
        await addDoc(collectionRef, { projectId, ticketId, title, flipped: false, votes: [] });
    };
    const setTicketFlipped = async () => {
        if (!selected) return;
        await updateDoc(doc(fbfirestore, "poker", selected), {
            flipped: true,
        });
        calculateAvg();
        setFlip(true);
    };
    const getlist = () => {
        onSnapshot(collection(fbfirestore, "poker"), (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                const ticket = doc.data();
                ticket.id = doc.id;
                if (ticket.projectId === projectId) items.push(ticket);
            });
            setList([...items]);
        });
    };
    const vote = async (value) => {
        if (!selected || flipped) return;
        const previousVote = selectedItem?.votes?.find((item) => item.user === email);
        if (previousVote) {
            await updateDoc(doc(fbfirestore, "poker", selected), {
                votes: arrayRemove(previousVote),
            });
        }
        await updateDoc(doc(fbfirestore, "poker", selected), {
            votes: arrayUnion({ user: email, value }),
        });
        setSelectedVote(value);
    };
    useEffect(() => {
        getlist();
    }, []);
    const openAddTicket = () => setAddTicket(true);
    const closeAddTicket = () => setAddTicket(false);
    const moveToScrum = async () => {
        const sprint = JSON.parse(sprintid);
        const ticketObj = { ...ticketList.find((ticket) => ticket.ticketId === selectedItem.ticketId) };
        ticketObj.status = "TODO";
        ticketObj.sprint = sprint.name;
        ticketObj.storyPoints = String(avg);
        dispatch(updateTicket(projectId, ticketObj));
        await deleteDoc(doc(fbfirestore, "poker", selected));
        setSelectedVote(null);
    };
    const editStorypoints = (e) => setAvg(e.target.value);
    const floatAdd = Mounter(FloatingAdd, { onClick: openAddTicket })(roles.scrummastersandadmins);
    const flipOrMove = ({ flipped }) => (
        <AppButton loading={false} size={"middle"} onClick={flipped ? move : setTicketFlipped}>
            {flipped ? "Move to Scrumboard" : "Flip"}
        </AppButton>
    );
    const flipMove = Mounter(flipOrMove, { flipped })(roles.scrummastersandadmins);
    const meetUrl = useMeeting();
    return (
        <Layout>
            <Content>
                <Header className={styles.plain}>
                    <Row>
                        <Col flex={15} align="middle">
                            {selectedItem && <>Ticket Number: {selectedItem.ticketId}</>}
                        </Col>
                        <Col flex={1} align="middle">
                            <Link to={meetUrl}>
                                <AppButton loading={false} size={"middle"}>
                                    <>
                                        <PhoneFilled /> Join Call
                                    </>
                                </AppButton>
                            </Link>
                        </Col>
                    </Row>
                </Header>
                <Row gutter={[8, 16]} className={styles.cardgroup}>
                    {estimateValues.map((value, index) => (
                        <Col key={index} span={5}>
                            <EstimationCard
                                selected={value === selectedVote}
                                value={value}
                                onClick={() => vote(value)}
                            />
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col flex={1}>
                        <h3>Ticket No</h3>
                    </Col>
                    <Col flex={5} align="middle">
                        <h3>Title</h3>
                    </Col>
                    <Col flex={3} align="middle">
                        <h3>Your Estimations</h3>
                    </Col>
                </Row>
                {list.map((item, index) => (
                    <Row
                        key={index}
                        onClick={() => select(item.id, item)}
                        className={selected === item.id && styles.select}
                    >
                        <Col flex={1}>
                            <h4>{item.ticketId}</h4>
                        </Col>
                        <Col flex={5} align="middle">
                            <h4>{item.title}</h4>
                        </Col>
                        <Col flex={3} align="middle">
                            <h4>{item?.votes?.find((obj) => obj.user === email)?.value || "-"}</h4>
                        </Col>
                    </Row>
                ))}
                {isVisible ? floatAdd : null}
                <AppModal visible={addTicket} handleCancel={closeAddTicket}>
                    <Form
                        name="basic"
                        layout="vertical"
                        align="middle"
                        labelCol={{
                            span: 8,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Ticket No"
                            name="ticketno"
                            type="text"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the ticket id",
                                },
                            ]}
                        >
                            <AppSelect
                                options={ticketList}
                                placeholder="Ticket No"
                                display="ticketId"
                                onChange={onChangeTicketid}
                            />
                        </Form.Item>
                        <Form.Item>
                            <AppButton type="primary" size="large" htmlType="submit" onClick={AddTicketToPoker}>
                                Add
                            </AppButton>
                        </Form.Item>
                    </Form>
                </AppModal>
                <AppModal visible={moving} handleCancel={cancelMove}>
                    <Form
                        name="basic"
                        layout="vertical"
                        align="middle"
                        labelCol={{
                            span: 8,
                        }}
                        initialValues={{
                            ["storypoints"]: avg,
                        }}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item label="Sprint No" name="sprintno" type="text">
                            <AppSelect
                                options={sprintList.slice(-2)}
                                placeholder="Sprint"
                                display="name"
                                onChange={onChangeSprint}
                            />
                        </Form.Item>
                        <Form.Item label="Story points" name="storypoints" type="text">
                            <AppInput name="avg" placeholder="story points" value={avg} onChange={editStorypoints} />
                        </Form.Item>
                        <Form.Item>
                            <AppButton type="primary" size="large" htmlType="submit" onClick={moveToScrum}>
                                Move
                            </AppButton>
                        </Form.Item>
                    </Form>
                </AppModal>
                <row ref={nodeRef} />
            </Content>
            <Sider width="30%" className={styles.plain}>
                <div>
                    <Row className={styles.devrows}>
                        <Col flex={4}>
                            <h3>User Votes</h3>
                        </Col>
                        <Col flex={5} align="middle" />
                        <Col flex={3} align="middle">
                            {flipMove}
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
            </Sider>
        </Layout>
    );
}

export default Poker;
