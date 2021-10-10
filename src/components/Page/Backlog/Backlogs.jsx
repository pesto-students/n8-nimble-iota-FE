import { DeleteFilled, PlusCircleFilled, RightCircleOutlined } from "@ant-design/icons/lib/icons";
import { Affix, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import styles from "src/components/Page/Backlog/Backlog.module.less";
import TicketModal from "src/components/TicketModal/TicketModal";
import { colors } from "src/config/constants";
import { deleteTicket, fetchAllDevlopersProject, fetchAllTickets } from "src/redux";

function Backlogs() {
    const { loading, ticketList, filteredTicketList } = useSelector((state) => state.project.ticket);
    const { developerList } = useSelector((state) => state.project.developer);

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
            render: (type) => <CustomTag color={type == "BUG" ? colors.tagRed : colors.tagBlue} text={type} />,
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
                        priority == "HIGH"
                            ? colors.priorityHigh
                            : priority == "MEDIUM"
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
            title: "Sprint",
            dataIndex: "sprint",
            align: "center",
        },
        {
            title: "Delete",
            dataIndex: "delete",
            align: "center",
            render: (text, record, index) => (
                <DeleteFilled
                    style={{ fontSize: "20px" }}
                    type="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteTicket("61546b7864bccbe191f15977", record.ticketId));
                    }}
                />
            ),
        },
        {
            title: "Move to Poker",
            dataIndex: "move",
            align: "center",
            render: (priority) => (
                <RightCircleOutlined
                    style={{ fontSize: "20px" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        //Move to poker
                    }}
                />
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowsKeys] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [clickedRow, setClickedRow] = useState(-1);
    const [ticketOperation, setTickearOperation] = useState();

    const onSelectChange = (selectedRowKeys) => {
        console.log(selectedRowKeys);
        setSelectedRowsKeys(selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }
    };

    const rowSelection = {
        ...selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        dispatch(fetchAllTickets("61546b7864bccbe191f15977"));
        dispatch(fetchAllDevlopersProject("61546b7864bccbe191f15977"));
    }, []);

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
            {loading && <h4>Data is loading</h4>}
            <Affix style={{ position: "absolute", bottom: 50, right: 30 }}>
                {/* <AppButton
                    style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                    size="large"
                    type="primary"
                   
                    
                > */}
                <PlusCircleFilled
                    disabled={loading}
                    onClick={() => {
                        setTickearOperation("CREATE");
                        setOpenModal(true);
                    }}
                    className={styles.addButton}
                />
                {/* </AppButton> */}
            </Affix>
            {!loading && (
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={() => console.log("yes")} disabled={!isSelected}>
                            Move to Poker Board
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {isSelected ? `Selected ${selectedRowKeys.length} items` : ""}
                        </span>
                    </div>
                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    setTickearOperation("UPDATE");
                                    setOpenModal(true), setClickedRow(rowIndex);
                                },
                                onMouseEnter: (event) => {},
                            };
                        }}
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredTicketList}
                        rowClassName={(record, index) => styles.row}
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
                    ticketData={filteredTicketList[clickedRow]}
                    projectId={"61546b7864bccbe191f15977"}
                    developerList={developerList}
                />
            )}
        </>
    );
}

export default Backlogs;
