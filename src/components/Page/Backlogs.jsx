import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, Divider, Affix } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightOutlined, DeleteFilled, PlusCircleFilled } from "@ant-design/icons/lib/icons";
import { deleteTicket, fetchAllDevlopersProject, fetchAllTickets } from "src/redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import TicketModal from "src/components/TicketModal/TicketModal";

const row = {
    backgroundColor: "red",
};

function Backlogs() {
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList } = useSelector((state) => state.project.developer);

    const dispatch = useDispatch();
    const columns = [
        {
            title: "Ticket No.",
            dataIndex: "ticketId",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Assignee",
            dataIndex: "assignee",
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
            render: (priority) => (
                <Tag color={priority === "HIGH" ? "green" : priority === "LOW" ? "red" : "yellow"}>{priority}</Tag>
            ),
        },
        {
            title: "Points",
            dataIndex: "storyPoints",
        },
        {
            title: "Sprint",
            dataIndex: "sprint",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Delete",
            dataIndex: "delete",
            render: (text, record, index) => (
                <div
                    style={{
                        backgroundColor: "#e5e5e5",
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "1px solid",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DeleteFilled
                        type="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteTicket("61546b7864bccbe191f15977", record.ticketId));
                        }}
                    />
                </div>
            ),
        },
        {
            title: "Move to Poker",
            dataIndex: "move",
            render: (priority) => <ArrowRightOutlined />,
        },
    ];

    const [selectedRowKeys, setSelectedRowsKeys] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [clickedRow, setClickedRow] = useState(-1);
    const [ticketOperation, setTickearOperation] = useState();

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowsKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        dispatch(fetchAllTickets("61546b7864bccbe191f15977"));
        dispatch(fetchAllDevlopersProject("61546b7864bccbe191f15977"));
    }, []);

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            {loading && <h4>Data is loading</h4>}
            <Affix style={{ position: "absolute", bottom: 50, right: 30 }}>
                <AppButton
                    style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                    size="large"
                    type="primary"
                    onClick={() => {
                        setTickearOperation("CREATE");
                        setOpenModal(true);
                    }}
                    disabled={loading}
                >
                    <PlusCircleFilled />
                </AppButton>
            </Affix>
            {!loading && (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={() => console.log("yes")} disabled={!hasSelected}>
                            Move to Poker Board
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                        </span>
                    </div>
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setTickearOperation("UPDATE");
                                    setOpenModal(true), setClickedRow(rowIndex);
                                },
                            };
                        }}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={ticketList}
                        rowClassName={row}
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
                    ticketData={ticketList[clickedRow]}
                    projectId={"61546b7864bccbe191f15977"}
                    developerList={developerList}
                />
            )}
        </>
    );
}

export default Backlogs;
