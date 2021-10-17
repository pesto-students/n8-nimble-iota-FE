import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import PropTypes from "prop-types";
import TextArea from "rc-textarea";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import AppModal from "src/components/Common/AppModal/AppModal";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import { PriorityEnum, OperationEnum, TicketTypeEnum } from "src/config/Enums";
import { addTicket, updateTicket } from "src/redux";
import { generateTicketNumber, getSprints, transformEnum } from "src/util/helperFunctions";

function TicketModal(props) {
    const { projectId, ticketData, ticketOperation, developerList } = props;
    const { selectedSprint } = useSelector((state) => state.project.sprint);
    const { projects } = useSelector((state) => state.projectList);

    const listOfSprints = getSprints(projects, projectId);

    const ticketTypeArray = transformEnum(TicketTypeEnum);
    const priorityTypeArray = transformEnum(PriorityEnum);

    const dispatch = useDispatch();

    const [title, setTitle] = useState();
    const [ticketId, setTicketId] = useState();
    const [description, setTcketDescription] = useState();
    const [assignee, setAssignee] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();
    const [sprint, setSprint] = useState();
    const [status, setStatus] = useState();
    const [points, setStoryPoints] = useState();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setTcketDescription(event.target.value);
    };
    const handleTypeChange = (value) => {
        setType(JSON.parse(value));
    };
    const handlePriorityChange = (value) => {
        setPriority(JSON.parse(value));
    };
    const handleAssigneeChange = (value) => {
        setAssignee(JSON.parse(value));
    };
    const handleSprintChange = (value) => {
        setSprint(JSON.parse(value));
    };
    const handleTicketAction = () => {
        const ticketObject = {
            ticketId: ticketId,
            title: title,
            description: description,
            assignee: assignee._id,
            priority: priority.name,
            type: type.name,
            storyPoints: points,
            sprint: sprint._id,
            status: status,
        };
        if (ticketOperation == OperationEnum.CREATE) {
            dispatch(addTicket(projectId, ticketObject));
        } else {
            dispatch(updateTicket(projectId, ticketObject));
        }
    };

    useEffect(() => {
        if (ticketOperation == OperationEnum.UPDATE) {
            setTitle(ticketData.title);
            setTicketId(ticketData.ticketId);
            setTcketDescription(ticketData.description);
            setAssignee(
                developerList.length > 0
                    ? developerList.find((developer) => {
                          return developer["_id"] == ticketData.assignee;
                      })
                    : ""
            );
            setPriority(
                priorityTypeArray.find((priority) => {
                    return ticketData.priority == priority.name;
                })
            );
            setType(
                ticketTypeArray.find((type) => {
                    return ticketData.type == type.name;
                })
            );
            setSprint(
                listOfSprints.find((sprint) => {
                    return ticketData.sprint == sprint._id;
                })
            );
            setStatus(ticketData.status ?? "");
            setStoryPoints(ticketData.storyPoints ?? "");
        } else {
            setTitle("");
            setTicketId(generateTicketNumber());
            setTcketDescription("");
            setAssignee("");
            setPriority("");
            setType("");
            setSprint("");
            setStatus("");
            setStoryPoints("");
        }
    }, [developerList]);

    return (
        <>
            <AppModal {...props}>
                <div className="ticketTitle" style={{ textAlign: "center", width: "100%", color: "primary" }}>
                    <b>Ticket No.</b> {ticketId}
                </div>
                <Divider />
                <TicketListItem
                    label="Title"
                    Component={
                        <AppInput
                            placeholder={"Ticket title"}
                            style={{ width: "60%" }}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Description"
                    fullWidth={true}
                    Component={
                        <TextArea
                            placeholder="This is ticket description"
                            isPassword={false}
                            size="large"
                            style={{ width: "100%", height: "80px" }}
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Assignee"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            onChange={handleAssigneeChange}
                            value={assignee?.name ?? ""}
                            options={developerList}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Type"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            onChange={handleTypeChange}
                            value={type?.name ?? ""}
                            options={ticketTypeArray}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Priority"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            value={priority?.name ?? ""}
                            options={priorityTypeArray}
                            onChange={handlePriorityChange}
                        />
                    }
                />

                <Divider />
                <TicketListItem
                    label="Sprints"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            value={sprint?.name ?? ""}
                            options={listOfSprints}
                            onChange={handleSprintChange}
                        />
                    }
                />

                <Divider />
                {ticketOperation == OperationEnum.UPDATE && (
                    <>
                        <TicketListItem
                            label="Story Points"
                            Component={
                                <AppInput
                                    placeholder={"No. of story points"}
                                    style={{ width: "60%" }}
                                    value={ticketData.storyPoints}
                                    disabled={true}
                                />
                            }
                        />
                        <Divider />
                    </>
                )}

                <AppButton onClick={handleTicketAction} style={{ width: "100%" }}>
                    {ticketOperation == OperationEnum.CREATE ? "Create" : "Update"}
                </AppButton>
            </AppModal>
        </>
    );
}

TicketModal.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.elementType,
    ticketData: PropTypes.object,
    ticketOperation: PropTypes.string,
    projectId: PropTypes.string,
    developerList: PropTypes.array,
    labelWidth: PropTypes.string,
    label: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default TicketModal;
