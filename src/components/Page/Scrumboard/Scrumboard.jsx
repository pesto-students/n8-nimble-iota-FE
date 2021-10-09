import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket, fetchAllDevlopersProject, fetchAllTickets, updateTicketStatus } from "src/redux";
import styles from "src/components/Page/Scrumboard/Scrumboard.module.less";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import AppButton from "src/components/Common/AppButton/AppButton";
import Ticket from "src/components/Page/Scrumboard/Ticket/Ticket";
import TicketModal from "src/components/TicketModal/TicketModal";
import { filterTicketList } from "src/util/helperFunctions";
import { colors } from "src/config/constants";

function Scrumboard() {
    const [openModal, setOpenModal] = useState(false);
    const [clickedTicket, setClickedTicekt] = useState();

    const [columns, setColumns] = useState([
        {
            id: "TODO",
        },
        {
            id: "INPROGRESS",
        },
        {
            id: "COMPLETE",
        }
        // ,
        // {
        //     id: "DEPLOY",
        // },
    ]);
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList } = useSelector((state) => state.project.developer);

    const dispatch = useDispatch();

    const onTicketClicked = (ticketData) => {
        setOpenModal(true);
        setClickedTicekt(ticketData)
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        dispatch(fetchAllTickets("61546b7864bccbe191f15977"));
        dispatch(fetchAllDevlopersProject("61546b7864bccbe191f15977"));
    }, []);

    const onDragEnd = (result) => {
        console.log(result)

        if (!result.destination) return;
        const { source, destination,draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const draggedTicket = ticketList.find((ticket)=>ticket["_id"] === draggableId)
            dispatch(updateTicketStatus("61546b7864bccbe191f15977",draggedTicket.ticketId,result.destination.droppableId))
        }
    };

    return (
        <>
            {loading && <h3>Loading ...</h3>}
            {!loading && (
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
                        {/* <div className={styles.heading}>
                            <h3>
                                <b>Deployment Ready</b>
                            </h3>
                        </div> */}
                    </div>
                    <div className={styles.retroContainer}>
                        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                            {columns.map((column) => {
                                return (
                                    <Droppable droppableId={column.id} key={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={styles.retroCardContainer}
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{
                                                    background: snapshot.isDraggingOver ? colors.dragEventBackground : colors.droppableColumnBackground,
                                                    border: snapshot.isDraggingOver ? '2px dashed' : 'none'
                                                    
                                                }}
                                            >
                                                {filterTicketList(ticketList, column.id).map((ticket, index) => {
                                                    return (
                                                        <Ticket
                                                            onClick={onTicketClicked}
                                                            index={index}
                                                            ticketData={ticket}
                                                            key={ticket._id}
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
            )}
            {openModal && (
                <TicketModal
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={openModal}
                    width="400px"
                    ticketOperation={"UPDATE"}
                    ticketData={clickedTicket}
                    projectId={"61546b7864bccbe191f15977"}
                    developerList={developerList}
                />
            )}
        </>
    );
}

export default Scrumboard;
