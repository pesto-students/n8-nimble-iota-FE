import { CheckCircleFilled, PhoneFilled } from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AppButton from "src/components/Common/AppButton/AppButton";
import Mounter from "src/components/Common/Mounter/Mounter";
import ConfirmCompleteSprint from "src/components/Page/Retrospectives/ConfirmCompleteSprint";
import styles from "src/components/Page/Scrumboard/Scrumboard.module.less";
import Ticket from "src/components/Page/Scrumboard/Ticket/Ticket";
import TicketModal from "src/components/TicketModal/TicketModal";
import { colors } from "src/config/constants";
import { OperationEnum, SprintStatusEnum, TicketStatusEnum } from "src/config/Enums";
import roles from "src/config/roles";
import {
    completeSprint,
    fetchAllDevlopersProject,
    fetchAllTickets,
    fetchRetrospectives,
    incrementStroyPoints,
    startSprint,
    updateTicketStatus,
} from "src/redux";
import {
    checkEndSprint,
    checkStartSprint,
    filterScrumboardTickets,
    isRetrospectiveDone,
} from "src/util/helperFunctions";
import { useMeeting } from "src/util/hooks";

const Heading = ({ text }) => {
    return (
        <div className={styles.heading}>
            <h3>
                <b>{text}</b>
            </h3>
        </div>
    );
};

function Scrumboard() {
    const [openModal, setOpenModal] = useState(false);
    const [retroConfirmBoxOpen, setRetroConfirmBoxOpen] = useState(false);
    const [clickedTicket, setClickedTicekt] = useState();
    const { selectedSprint } = useSelector((state) => state.project.sprint);
    const { projectId } = useParams();
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const { retroLoading, retros } = useSelector((state) => state.project.retrospectives);
    const [columns, setColumns] = useState([
        {
            id: TicketStatusEnum.TODO,
        },
        {
            id: TicketStatusEnum.INPROGRESS,
        },
        {
            id: TicketStatusEnum.COMPLETE,
        },
    ]);
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList } = useSelector((state) => state.project.developer);

    const handleSprint = () => {
        selectedSprint?.status === SprintStatusEnum.ACTIVE ? handleCompleSprint() : handleStartSprint();
    };

    const handleCompleSprint = () => {
        if (!isRetrospectiveDone(retros)) {
            setRetroConfirmBoxOpen(true);
        } else {
            dispatch(completeSprint(selectedSprint));
        }
    };
    const handleStartSprint = () => {
        dispatch(startSprint(projectId, selectedSprint));
    };

    const SprintButtonComponent = () => {
        return (
            <AppButton
                disabled={
                    selectedSprint?.status === SprintStatusEnum.COMPLETED
                        ? true
                        : selectedSprint?.status === SprintStatusEnum.UPCOMING
                        ? !checkStartSprint(ticketList, currentProject.sprints, selectedSprint)
                        : !checkEndSprint(ticketList, selectedSprint)
                }
                loading={false}
                size={"middle"}
                onClick={handleSprint}
            >
                <CheckCircleFilled />
                {selectedSprint?.status == SprintStatusEnum.COMPLETED
                    ? "Completed"
                    : selectedSprint?.status === SprintStatusEnum.ACTIVE
                    ? "Finish Sprint"
                    : "Start Sprint"}
            </AppButton>
        );
    };

    const sprintButton = Mounter(SprintButtonComponent, {})(roles.scrummastersandadmins);

    const dispatch = useDispatch();

    const onTicketClicked = (ticketData) => {
        setOpenModal(true);
        setClickedTicekt(ticketData);
    };

    const handleCancel = () => {
        setOpenModal(false);
        setRetroConfirmBoxOpen(false);
    };

    useEffect(() => {
        dispatch(fetchAllTickets(projectId));
        dispatch(fetchAllDevlopersProject(projectId));
        dispatch(fetchRetrospectives(selectedSprint._id));
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        if (source.droppableId == TicketStatusEnum.COMPLETE) return;

        if (source.droppableId !== destination.droppableId) {
            const draggedTicket = ticketList.find((ticket) => ticket["_id"] === draggableId);
            dispatch(updateTicketStatus(projectId, draggedTicket.ticketId, result.destination.droppableId));
            if (destination.droppableId == TicketStatusEnum.COMPLETE) {
                dispatch(
                    incrementStroyPoints(selectedSprint?._id ?? "", draggedTicket["_id"], draggedTicket["storyPoints"])
                );
            }
        }
    };

    const meetUrl = useMeeting();
    // console.log(meetUrl);

    return (
        <>
            {loading && <h3>Loading ...</h3>}
            {!loading && (
                <div
                    className={classNames({
                        [styles.container]: true,
                    })}
                >
                    <div className={styles.actions}>
                        <Link to={meetUrl} target="_blank">
                            <AppButton
                                disabled={selectedSprint.status !== SprintStatusEnum.ACTIVE}
                                loading={false}
                                size={"middle"}
                                style={{ marginRight: "8px" }}
                            >
                                <PhoneFilled /> Join Call
                            </AppButton>
                        </Link>
                        {sprintButton}
                    </div>
                    <div className={styles.retroHeadingContainer}>
                        <Heading text={"Todo"} />
                        <Heading text={"In Progress"} />
                        <Heading text={"Complete"} />
                    </div>
                    <div
                        className={classNames({
                            [styles.retroContainer]: true,
                            [styles.containerBlocked]: selectedSprint?.status !== SprintStatusEnum.ACTIVE,
                        })}
                    >
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
                                                    background: snapshot.isDraggingOver
                                                        ? colors.dragEventBackground
                                                        : colors.droppableColumnBackground,
                                                    border: snapshot.isDraggingOver ? "1px dashed" : "none",
                                                    borderRadius: "0.5em",
                                                }}
                                            >
                                                {filterScrumboardTickets(
                                                    ticketList,
                                                    selectedSprint?._id ?? "",
                                                    column.id
                                                ).map((ticket, index) => {
                                                    return (
                                                        <Ticket
                                                            onClick={onTicketClicked}
                                                            index={index}
                                                            ticketData={ticket}
                                                            key={ticket._id}
                                                        />
                                                    );
                                                })}
                                                {filterScrumboardTickets(
                                                    ticketList,
                                                    selectedSprint?._id ?? "",
                                                    column.id
                                                ).length === 0 && <h3>No tickets to display</h3>}
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
                    ticketOperation={OperationEnum.UPDATE}
                    ticketData={clickedTicket}
                    projectId={projectId}
                    developerList={developerList}
                />
            )}

            {retroConfirmBoxOpen && (
                <ConfirmCompleteSprint
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={retroConfirmBoxOpen}
                    width="700px"
                    onYes={() => {
                        dispatch(completeSprint(selectedSprint));
                        handleCancel();
                    }}
                    onNo={handleCancel}
                />
            )}
        </>
    );
}

Heading.propTypes = {
    text: PropTypes.string,
};

export default Scrumboard;
