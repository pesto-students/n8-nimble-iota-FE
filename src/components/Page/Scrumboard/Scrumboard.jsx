import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "src/components/Page/Scrumboard/Scrumboard.module.less";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AppButton from "src/components/Common/AppButton/AppButton";
import Ticket from "src/components/Page/Scrumboard/Ticket/Ticket";
import TicketModal from "src/components/TicketModal/TicketModal";

function Scrumboard() {
    const [openModal, setOpenModal] = useState(false);
    const [clickedTicket, setClickedTicekt] = useState(-1);
    const [columns, setColumns] = useState([
        {
            id: "droppableColumnTodo",
            items: [
                {
                    ticketId: "TD1234",
                    title: "New Ticket",
                    description: "This is first Todo ticket ",
                    assignee: "61544736f2a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "6159dfb052f7dc340596ecdb",
                },
                {
                    ticketId: "TD1234",
                    title: "New Ticket",
                    description: "This is second Todo ticket ",
                    assignee: "61544736f2a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "6159dfb0342543fwwerdb",
                },
            ],
        },
        {
            id: "droppableColumnInProgress",
            items: [
                {
                    ticketId: "IP1234",
                    title: "New Ticket",
                    description: "This is first Inprogreess ticket ",
                    assignee: "61544736f2332342323423a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "6159dfb0hldfiykjqf96ecdb",
                },
                {
                    ticketId: "IP1432",
                    title: "New Ticket",
                    description: "This is second Inprogress ticket ",
                    assignee: "61544736f2a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "6159d90uqwfbjqwp340596ecdb",
                },
            ],
        },
        {
            id: "droppableColumnDone",
            items: [
                {
                    ticketId: "D1234",
                    title: "New Ticket",
                    description: "This is first Done ticket ",
                    assignee: "61544736f2332342323423a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "615941140596ecdb",
                },
                {
                    ticketId: "D1432",
                    title: "New Ticket",
                    description: "This is second Done ticket ",
                    assignee: "61544736f2a64ea741be4537",
                    priority: "MEDIUM",
                    type: "USER_STORY",
                    storyPoints: "0",
                    sprint: "SPRINT_1",
                    status: "COMPLETE",
                    _id: "62f723423423dc340596ecdb",
                },
            ],
        },
    ]);

    const onTicketClicked = () => {
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {

            const sourceColumn = columns.find((column)=>column.id === source.droppableId);
            const destColumn = columns.find ((column)=>column.id === destination.droppableId);
            let sourceItems = [...sourceColumn.items];
            let destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            
            let columnCopy = [...columns]
            columnCopy[source.index].items = sourceItems
            columnCopy[destination.index].items = destItems
            setColumns(columnCopy)
            // setColumns([
            //   ...columns,
            //   [source.droppableId]: {
            //     ...sourceColumn,
            //     items: sourceItems
            //   },
            //   [destination.droppableId]: {
            //     ...destColumn,
            //     items: destItems
            //   }
            // ]);

            // let columnCopy = Array.from(columns)
            // let sourceColumn = columns.find ((column)=>column.id === source.droppableId);
            // let destColumn = columns.find ((column)=>column.id === destination.droppableId);
            // console.log("destCOlumns",destColumn)
            // console.log("sourceColumns",sourceColumn)
            // let sourceItems = Array.from(sourceColumn.items);
           
            // let destItems =Array.from(destColumn.items)
            // console.log("destItem",destItems)
            // console.log("sourceItem",sourceItems)
            // let [removed] = sourceItems.splice(source.index, 1);
            // destItems.splice(destination.index, 0, removed);
            // console.log("destItem",destItems)
            // console.log("sourceItem",sourceItems)
            // columnCopy[source.index].items = sourceItems
            // columnCopy[destination.index].items = destItems
            // setColumns(columnCopy);
            
        } 
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <AppButton loading={false} size={"middle"} style={{ marginRight: "8px" }}>
                        <PhoneFilled /> Join Call
                    </AppButton>
                    <AppButton loading={false} size={"middle"}>
                        <CheckCircleFilled /> Mark as Complete
                    </AppButton>
                </div>
                <div className={styles.retroHeadingContainer}>
                    <div className={styles.heading}>
                        <h3>
                            <b>ToDO</b>
                        </h3>
                    </div>
                    <div className={styles.heading}>
                        <h3>
                            <b>In Progress</b>
                        </h3>
                    </div>
                    <div className={styles.heading}>
                        <h3>
                            <b>Done</b>
                        </h3>
                    </div>
                </div>
                <div className={styles.retroContainer}>
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                        {columns.map((column) => {
                            return (
                                <Droppable droppableId={column.id} key={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={styles.retroCardContainer}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                background: snapshot.isDraggingOver ? "lightblue" : "#F4F4F4",
                                            }}
                                        >
                                            {column.items.map((ticket, index) => {
                                                return (
                                                    <Ticket
                                                        onClick={onTicketClicked}
                                                        index={index}
                                                        ticketData = {ticket}
                                                        key = {ticket._id}
                                                    />
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
            {openModal && (
                <TicketModal
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={openModal}
                    width="400px"
                    ticketOperation={"UPDATE"}
                    ticketData={{
                        ticketId: "WS7868",
                        title: "New Ticket",
                        description: "This is a demo ticket.",
                        assignee: "61544736f2a64ea741be4537",
                        priority: "MEDIUM",
                        type: "USER_STORY",
                        storyPoints: "0",
                        sprint: "SPRINT_1",
                        status: "COMPLETE",
                        _id: "6159dfb052f7dc340596ecdb",
                    }}
                    projectId={"61546b7864bccbe191f15977"}
                    developerList={[{ name: "vipan", _id: "12231232" }]}
                />
            )}
        </>
    );
}

export default Scrumboard;
