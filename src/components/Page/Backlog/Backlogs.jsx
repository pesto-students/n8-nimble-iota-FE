import { DeleteFilled, PlusCircleFilled, RightCircleOutlined } from "@ant-design/icons/lib/icons";
import { Affix, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import Notification from "src/components/Common/Notification/Notification";
import styles from "src/components/Page/Backlog/Backlog.module.less";
import TicketModal from "src/components/TicketModal/TicketModal";
import roles from "src/config/roles";
import { colors, fireStoreKeys } from "src/config/constants";
import { OperationEnum } from "src/config/Enums";
import { PriorityEnum, TicketTypeEnum } from "src/config/Enums.ts";
import { deleteTicket, fetchAllDevlopersProject, fetchAllTickets, getUserData } from "src/redux";
import {
    addTicketToPoker,
    filterBacklogTickets,
    filterDeveloeprColums,
    filterTicketById,
    getAllDocs,
} from "src/util/helperFunctions";
import Mounter, { checkPermission } from "src/components/Common/Mounter/Mounter";

function Backlogs() {
    const { user, userProfile } = useSelector((state) => state.user);
    const { loading, filteredTicketList } = useSelector((state) => state.project.ticket);
    const [backlogTickets, setbacklogTickets] = useState([]);
    const { developerList } = useSelector((state) => state.project.developer);
    const { projectId } = useParams();
    const { selectedSprint } = useSelector((state) => state.project.sprint);
    const [pokerList, setPokerList] = useState([]);
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Ticket No.",
            dataIndex: "ticketId",
            align: "center",
        },
        {
            title: "Title",
            dataIndex: "title",
            align: "center",
        },
        {
            title: "Description",
            dataIndex: "description",
            align: "center",
        },
        {
            title: "Type",
            dataIndex: "type",
            align: "center",
            render: (type) => (
                <CustomTag color={type === TicketTypeEnum.BUG ? colors.tagRed : colors.tagBlue} text={type} />
            ),
        },
        {
            title: "Assignee",
            dataIndex: "assignee",
            align: "center",
            render: (assigneeId) => (
                <div>
                    {developerList.length > 0
                        ? developerList.find((developer) => {
                              return developer["_id"] == assigneeId;
                          })?.name ?? ""
                        : ""}
                </div>
            ),
        },
        {
            title: "Priority",
            dataIndex: "priority",
            align: "center",
            render: (priority) => (
                <CustomTag
                    color={
                        priority == PriorityEnum.HIGH
                            ? colors.priorityHigh
                            : priority == PriorityEnum.MEDIUM
                            ? colors.priorityMedium
                            : colors.priorityLow
                    }
                    text={priority}
                    variant="outlined"
                />
            ),
        },
        {
            title: "Points",
            dataIndex: "storyPoints",
            align: "center",
        },
        {
            title: "Delete",
            dataIndex: "delete",
            align: "center",
            render: (text, record, index) =>
                !checkPermission(user.role.name, roles.scrummastersandadmins) ||
                pokerList.find((ticketDetails) => record.ticketId === ticketDetails.ticketId) ? (
                    <h3>-</h3>
                ) : (
                    <DeleteFilled
                        style={{ fontSize: "20px" }}
                        type="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteBacklogTicket(projectId, record.ticketId);
                        }}
                    />
                ),
        },
        {
            title: "Move to Poker",
            dataIndex: "move",
            align: "center",
            render: (text, record) =>
                !checkPermission(user.role.name, roles.scrummastersandadmins) ? (
                    <h3>-</h3>
                ) : (
                    <>
                        {pokerList.find((ticketDetails) => record.ticketId === ticketDetails.ticketId) ? (
                            <h3>-</h3>
                        ) : (
                            <RightCircleOutlined
                                style={{ fontSize: "20px" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    //TODO use dispatch made by vishnu
                                    addTicketToPoker(projectId, record).then(
                                        (res) => {
                                            ticketInPoker();
                                            return Notification("success", "Ticket Movedd to  Poker");
                                        },
                                        (err) => {
                                            return Notification("error", "Error in moving ticket to poker");
                                        }
                                    );
                                }}
                            />
                        )}
                    </>
                ),
        },
    ];

    const deleteBacklogTicket = (projectId, ticketid) => {
        dispatch(deleteTicket(projectId, ticketid));
        return Notification("success", "Ticket successfully deleted.");
    };

    const [openModal, setOpenModal] = useState(false);
    const [clickedRow, setClickedRow] = useState(-1);
    const [ticketOperation, setTickearOperation] = useState();
    const ticketInPoker = () => {
        getAllDocs(fireStoreKeys.collections.poker).then((res) => {
            setPokerList(Object.values(res));
        });
    };

    useEffect(() => {
        // if(!checkPermission(user.role.name,roles.scrummastersandadmins)){
        //     setColumns(filterDeveloeprColums(allColumns))
        // }else{
        //     setColumns(allColumns)
        // }
        dispatch(fetchAllTickets(projectId));
        dispatch(fetchAllDevlopersProject(projectId));
        dispatch(getUserData(user.id));
        ticketInPoker();
    }, []);

    useEffect(() => {
        setbacklogTickets(filterBacklogTickets(filteredTicketList));
    }, [filteredTicketList]);

    const handleCancel = () => {
        setOpenModal(false);
    };

    const addTicketComponent = () => {
        return (
            <Affix style={{ position: "absolute", bottom: 50, right: 30, zIndex: 200 }}>
                <PlusCircleFilled
                    disabled={loading}
                    onClick={() => {
                        setTickearOperation(OperationEnum.CREATE);
                        setOpenModal(true);
                    }}
                    className={styles.addButton}
                />
            </Affix>
        );
    };
    const addTicketButton = Mounter(addTicketComponent, {})(roles.scrummastersandadmins);

    return (
        <>
            {loading && <h4>Data is loading</h4>}
            {addTicketButton}
            {!loading && (
                <div>
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setTickearOperation(OperationEnum.UPDATE);
                                    setOpenModal(true), setClickedRow(record._id);
                                },
                                onMouseEnter: (event) => {},
                            };
                        }}
                        columns={columns}
                        dataSource={backlogTickets}
                    />
                </div>
            )}
            {openModal && (
                <TicketModal
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={openModal}
                    width="400px"
                    ticketOperation={ticketOperation}
                    ticketData={filterTicketById(backlogTickets, clickedRow)}
                    projectId={projectId}
                    developerList={developerList}
                />
            )}
        </>
    );
}

export default Backlogs;
