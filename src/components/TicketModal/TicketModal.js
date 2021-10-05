import { Divider } from "antd";
import PropTypes from "prop-types";
import TextArea from "rc-textarea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import AppModal from "src/components/Common/AppModal/AppModal";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import ticketConstants from "src/config/Ticket";
import { addTicket, updateTicket } from "src/redux";
import { generateTicketNumber } from "src/util/helperFunctions";

function TicketModal(props) {
    const { projectId, ticketData, ticketOperation, developerList } = props;
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [ticketId, setTicketId] = useState("");
    const [description, setTcketDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");
    const [sprint, setSprint] = useState("");
    const [points, setPoints] = useState(0);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setTcketDescription(event.target.value);
    };
    const handleTypeChange = (value, obj) => {
        setType(
            ticketConstants.ticketType.find((type) => {
                return type["_id"] == value;
            })?.name ?? ""
        );
    };
    const handlePriorityChange = (value) => {
        setPriority(
            ticketConstants.priority.find((priority) => {
                return priority["_id"] == value;
            })?.name ?? ""
        );
    };
    const handleAssigneeChange = (value) => {
        setAssignee(
            developerList.length > 0
                ? developerList.find((developer) => {
                      return developer["_id"] == value;
                  })
                : ""
        );
    };
    const handleSprintChange = (value) => {
        setSprint(
            ticketConstants.sprints.find((sprint) => {
                return sprint["_id"] == value;
            })?.name ?? ""
        );
    };
    const handleTicketAction = () => {
        const ticketObject = {
            ticketId: ticketId,
            title: title,
            description: description,
            assignee: assignee,
            priority: priority,
            type: type,
            storyPoints: points,
            sprint: sprint,
            status: "COMPLETE",
        };

        if (ticketOperation == "CREATE") {
            dispatch(addTicket(projectId, ticketObject));
        } else {
            dispatch(updateTicket(projectId, ticketObject));
        }
    };

    useEffect(() => {
        if (ticketOperation == "UPDATE") {
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
                ticketConstants.priority.find((priority) => {
                    return ticketData.priority == priority.name;
                })?.name ?? ""
            );
            setType(
                ticketConstants.ticketType.find((type) => {
                    return ticketData.type == type.name;
                })?.name ?? ""
            );
            setSprint(
                ticketConstants.sprints.find((sprint) => {
                    return ticketData.sprint == sprint.name;
                })?.name ?? ""
            );
        } else {
            setTitle("");
            setTicketId(generateTicketNumber());
            setTcketDescription("");
            setAssignee(developerList[0]);
            setPriority(ticketConstants.priority[0].name);
            setType(ticketConstants.ticketType[0].name);
            setSprint(ticketConstants.sprints[0].name);
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
                            value={type}
                            options={ticketConstants.ticketType}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Priority"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            value={priority}
                            options={ticketConstants.priority}
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
                            value={sprint}
                            options={ticketConstants.sprints}
                            onChange={handleSprintChange}
                        />
                    }
                />

                <Divider />
                {ticketOperation == "UPDATE" && (
                    <>
                        <TicketListItem
                            label="Story Points"
                            Component={
                                <AppInput
                                    placeholder={"Ticket title"}
                                    style={{ width: "60%" }}
                                    value={points}
                                    disabled={true}
                                />
                            }
                        />
                        <Divider />
                    </>
                )}

                <AppButton onClick={handleTicketAction} style={{ width: "100%" }}>
                    {ticketOperation == "CREATE" ? "Create" : "Update"}
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
