import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "src/components/Page/Retrospectives/Retrospectives.module.less";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AppButton from "src/components/Common/AppButton/AppButton";
import Ticket from "src/components/Page/Scrumboard/Ticket/Ticket";

function Scrumboard() {
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let tempA = [...todo];
        var item = tempA.splice(source.index, 1);
        tempA.splice(destination.index, 0, item[0]);
        setTodo(tempA);
    };

    const [todo, setTodo] = useState([
        {
            text: "This is first Todo ticket ",
        },
        {
            text: "This is second Todo ticket ",
        },
    ]);

    const [inProgress, setInProgress] = useState([
        {
            text: "This is first Inprogress ticket ",
        },
        {
            text: "This is second Inprogress ticket ",
        },
    ]);

    const [done, setDone] = useState([
        {
            text: "This is first Done ticket ",
        },
        {
            text: "This is second Done ticket ",
        },
    ]);

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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="1">
                            {(provided) => (
                                <div
                                    className={styles.retroCardContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {todo.map((ticket, index) => {
                                        return <Ticket key={ticket.text} index={index} text={ticket.text} />;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="2">
                            {(provided) => (
                                <div
                                    className={styles.retroCardContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {inProgress.map((ticket, index) => {
                                        return <Ticket key={ticket.text} index={index} text={ticket.text} />;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="3">
                            {(provided) => (
                                <div
                                    className={styles.retroCardContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {done.map((ticket, index) => {
                                        return <Ticket key={ticket.text} index={index} text={ticket.text} />;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </>
    );
}

export default Scrumboard;
