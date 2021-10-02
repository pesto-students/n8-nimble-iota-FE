import React, { useState, useEffect } from "react";
import { Table, Button, Tag, Modal, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets,deleteTicket } from "../../redux";
import TicketModal from "../TicketModal/TicketModal";
import AppButton from "../Common/AppButton/AppButton";
import TextArea from "rc-textarea";
import { ArrowRightOutlined, DeleteFilled } from "@ant-design/icons/lib/icons";

const row = {
    backgroundColor: "red",
};



function Backlogs() {
    const { loading, ticketList } = useSelector((state) => state.ticket);
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
            render: (text,record,index) => (
                <DeleteFilled onClick={(e)=>{
                    e.stopPropagation();
                    Promise.resolve(dispatch(deleteTicket("61546b7864bccbe191f15977",record.ticketId))).then(()=>{
                        dispatch(fetchAllTickets("61546b7864bccbe191f15977"))
                    })
                  
                }} />
            ),
        },
        {
            title: "Move to Poker",
            dataIndex: "move",
            render: (priority) => (
                <ArrowRightOutlined />
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowsKeys] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [clickedRow, setClickedRow] = useState(-1);

    const onSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowsKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        dispatch(fetchAllTickets("61546b7864bccbe191f15977"));
    }, [dispatch]);

    const handleOk = () => {
        setOpenModal(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            {loading && <h4>Data is loading</h4>}
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
            <TicketModal
                okText={"Save"}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: "none" } }}
                onCancel={handleCancel}
                visible={openModal}
            >
                <div className="ticketTitle" style={{ textAlign: "center", width: "100%" }}>
                    <b>Ticket No.</b> {ticketList[clickedRow]?.ticketId ?? ""}
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <b>Title</b> {ticketList[clickedRow]?.title ?? ""}
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <TextArea
                        placeholder="Name"
                        isPassword={false}
                        size="large"
                        style={{ width: "100%", height: "50px" }}
                        value={ticketList[clickedRow]?.description ?? ""}
                    />
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <b>Assignee</b> {ticketList[clickedRow]?.assignee ?? ""}
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <b>Type</b> {ticketList[clickedRow]?.type ?? ""}
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <b>Priority</b> {ticketList[clickedRow]?.priority ?? ""}
                </div>
                <Divider />
                <div className="ticketTitle" style={{ width: "100%" }}>
                    <b>Points</b> {ticketList[clickedRow]?.storyPoints ?? ""}
                </div>
                <Divider />
                <AppButton size="large" >Save</AppButton>

                

                {/* <AppButton size="medium" >Save</AppButton>   */}
            </TicketModal>
            {/* {openModal && <TicketModal/>} */}
        </>
    );
}

export default Backlogs;
