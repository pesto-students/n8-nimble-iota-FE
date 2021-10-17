import React, { useState, useRef, useEffect } from "react";
import { PhoneFilled } from "@ant-design/icons";
import { Col, Row, Layout, Form, Empty } from "antd";
import { fetchAllTickets, updateTicket } from "src/redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import { useDispatch, useSelector } from "react-redux";
import EstimationCard from "src/components/Page/Poker/EstimationCard";
import AppModal from "src/components/Common/AppModal/AppModal";
import FloatingAdd from "src/components/Common/FloatingAdd/FloatingAdd";
import "intersection-observer";
import { useIsVisible } from "react-is-visible";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import { useMeeting } from "src/util/hooks";
import { onSnapshot, collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { fbfirestore } from "src/service/firebase";
import styles from "src/components/Page/Poker/Poker.module.less";
import Axios from "src/service/Axios";
import AppInput from "src/components/Common/AppInput/AppInput";
import Mounter from "src/components/Common/Mounter/Mounter";
import roles from "src/config/roles";
import { Link, useParams } from "react-router-dom";
import Flipbutton from "src/components/Page/Poker/Flipbutton";
import UserVotes from "src/components/Page/Poker/UserVotes";
import AddTicketModal from "src/components/Page/Poker/AddTicketModal";
import Delticket from "src/components/Page/Poker/Delticket";
import { estimations } from "src/config/constants";
import Notification from "src/components/Common/Notification/Notification";
import { SprintStatusEnum } from "src/config/Enums";
import { fireStoreKeys } from "src/config/constants";

function Poker() {
    const [avg, setAvg] = useState(0);
    const [list, setList] = useState([]);
    const [sprintList, setSprintList] = useState([]);
    const [moving, setMoving] = useState(false);
    const [flipped, setFlip] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedVote, setSelectedVote] = useState(null);
    const [addTicket, setAddTicket] = useState(false);
    const [ticketid, setTicketID] = useState("");
    const [sprintid, setSprintID] = useState("");

    const { ticketList } = useSelector((state) => state.project.ticket);
    const user = useSelector((state) => state.user.user);
    const { email } = user;
    const meetUrl = useMeeting();
    const [form] = Form.useForm();
    const move = () => setMoving(true);
    const cancelMove = () => setMoving(false);
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const nodeRef = useRef();
    const isVisible = useIsVisible(nodeRef);
    const { Header, Sider, Content } = Layout;
    const onChangeSprint = (value) => setSprintID(value);
    const onChangeTicketid = (value) => setTicketID(value);
    const openAddTicket = () => setAddTicket(true);
    const closeAddTicket = () => setAddTicket(false);
    const editStorypoints = (e) => !isNaN(e.target.value) && setAvg(e.target.value);
    const floatAdd = Mounter(FloatingAdd, { onClick: openAddTicket })(roles.scrummastersandadmins);

    const calculateAvg = (selectedItem) => {
        if (!selectedItem) return;
        const average = (
            selectedItem.votes?.reduce((previousValue, item) => previousValue + parseFloat(item.value), 0) /
            selectedItem.votes.length
        ).toFixed(1);
        const finalAvg = isNaN(average) ? 0 : average;
        setAvg(finalAvg);
        return finalAvg;
    };
    const select = (id, item) => {
        setSelectedVote(item?.votes?.find((vote) => vote.user === email)?.value);
        setSelectedItem(item);
        setFlip(item?.flipped);
        setSelected(id);
    };
    const AddTicketToPoker = async () => {
        const collectionRef = collection(fbfirestore, fireStoreKeys.collections.poker);
        const { ticketId, title } = JSON.parse(ticketid);
        if (list.find((item) => item.ticketId === ticketId))
            return Notification("info", "Ticket added already", "please select another one.");
        await addDoc(collectionRef, { projectId, ticketId, title, flipped: false, votes: [] });
        return Notification("success", "Ticket added successfully");
    };
    const setTicketFlipped = async () => {
        if (!selected) return Notification("info", "No tickets selected", "please select one.");
        await updateDoc(doc(fbfirestore, "poker", selected), {
            flipped: true,
        });
        calculateAvg(selectedItem);
        setFlip(true);
    };
    const flipMove = Mounter(Flipbutton, { selected, flipped, move, setTicketFlipped })(roles.scrummastersandadmins);
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
    const moveToScrum = async () => {
        const sprint = JSON.parse(sprintid);
        const ticketObj = { ...ticketList.find((ticket) => ticket.ticketId === selectedItem.ticketId) };
        ticketObj.status = "TODO";
        ticketObj.sprint = sprint._id;
        ticketObj.storyPoints = String(avg);
        dispatch(updateTicket(projectId, ticketObj));
        await deleteDoc(doc(fbfirestore, "poker", selected));
        setSelectedVote(null);
        setMoving(false);
        return Notification("success", "Ticket moved to scrum");
    };
    useEffect(() => {
        if (list.length && !selected) select(list[0].id, list[0]);
        const selectedTicket = list.find((item) => item.id === selected);
        setSelectedItem(selectedTicket);
        const value = calculateAvg(selectedTicket);
        setFlip(selectedTicket?.flipped);
        form.setFieldsValue({
            storypoints: value,
        });
    }, [selected, list]);
    useEffect(() => {
        getlist();
        if (!sprintList.length)
            Axios.get("/sprints/" + projectId).then((res) => {
                setSprintList(res.data);
            });
        if (!ticketList.length) dispatch(fetchAllTickets(projectId));
    }, []);

    return (
        <Layout className={styles.layout}>
            <Content>
                <Header className={styles.plain}>
                    <Row>
                        <Col flex={15} align="middle">
                            {selectedItem && <>Ticket Number: {selectedItem.ticketId}</>}
                        </Col>
                        <Col flex={1} align="middle">
                            <Link to={meetUrl} target="_blank">
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
                    {estimations.map((value, index) => (
                        <Col key={index} span={5}>
                            <EstimationCard
                                selected={value === selectedVote}
                                value={value}
                                onClick={() => vote(value)}
                            />
                        </Col>
                    ))}
                </Row>
                <Row className={styles.ticketheader}>
                    <Col flex={1} align="middle">
                        <h3>Ticket No</h3>
                    </Col>
                    <Col flex={5} align="middle">
                        <h3>Title</h3>
                    </Col>
                    <Col flex={3} align="middle">
                        <h3>Your Estimations</h3>
                    </Col>
                </Row>
                {!list.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                <div>
                    {list.map((item, index) => (
                        <Row
                            key={index}
                            onClick={() => select(item.id, item)}
                            className={selected === item.id ? styles.select : styles.ticket}
                        >
                            <Col flex={1} align="middle">
                                {item.ticketId}
                            </Col>
                            <Col flex={5} align="left">
                                {item.title}
                            </Col>
                            <Col flex={3} align="middle">
                                {item?.votes?.find((obj) => obj.user === email)?.value || "-"}
                            </Col>
                            <Col flex={1} align="middle">
                                <Delticket itemid={item.id} setSelectedVote={setSelectedVote} />
                            </Col>
                        </Row>
                    ))}
                </div>
                {isVisible ? floatAdd : null}
                <AddTicketModal
                    addTicket={addTicket}
                    closeAddTicket={closeAddTicket}
                    ticketList={ticketList}
                    onChangeTicketid={onChangeTicketid}
                    AddTicketToPoker={AddTicketToPoker}
                />
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
                                options={sprintList.filter(
                                    (e) =>
                                        e.status === SprintStatusEnum.ACTIVE || e.status === SprintStatusEnum.UPCOMING
                                )}
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
                <Row ref={nodeRef} />
            </Content>
            <Sider width="30%" className={styles.plain}>
                <UserVotes flipMove={flipMove} flipped={flipped} selectedItem={selectedItem} avg={avg} />
            </Sider>
        </Layout>
    );
}

export default Poker;
