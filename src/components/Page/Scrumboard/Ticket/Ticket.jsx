import { Input } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AppInput from "src/components/Common/AppInput/AppInput";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import CardCustom from "src/components/Common/Card/Card";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import styles from "src/components/Page/Scrumboard/Ticket/Ticket.module.less";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import { colors } from "src/config/constants";
import { PriorityEnum, TicketTypeEnum } from "src/config/Enums";
import { TicketStatusEnum } from "src/config/Enums.ts";
import { getSprints, transformEnum } from "src/util/helperFunctions";

function Ticket({ onClick, index, ticketData }) {
    const { TextArea } = Input;

    const { developerList } = useSelector((state) => state.project.developer);
    const { selectedSprint } = useSelector((state) => state.project.sprint);
    const { projects } = useSelector((state) => state.projectList);
    const { projectId } = useParams();

    const listOfSprints = getSprints(projects, projectId);

    const ticketTypeArray = transformEnum(TicketTypeEnum);
    const priorityTypeArray = transformEnum(PriorityEnum);

    const [title, setTitle] = useState();
    const [ticketId, setTicketId] = useState();
    const [description, setTcketDescription] = useState();
    const [assignee, setAssignee] = useState();
    const [priority, setPriority] = useState();
    const [type, setType] = useState();
    const [sprint, setSprint] = useState();
    const [status, setStatus] = useState();
    const [points, setStoryPoints] = useState();

    const handleClick = () => {
        onClick(ticketData);
    };

    useEffect(() => {
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
    }, []);
    return (
        <Draggable draggableId={ticketData._id} index={index} key={ticketData._id}>
            {(provided) => (
                <div
                    className={styles.container}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardCustom
                        disabled={true}
                        onClick={handleClick}
                        style={{
                            border: `1px solid ${classNames({
                                [colors.ticketBorderRed]: ticketData.status === TicketStatusEnum.TODO,
                                [colors.ticketBorderOrange]: ticketData.status === TicketStatusEnum.INPROGRESS,
                                [colors.ticketBorderGreen]: ticketData.status === TicketStatusEnum.COMPLETE,
                            })}`,
                            borderRadius: "0.5em",
                        }}
                        bodyStyle={{ height: "100%", padding: "8px", pointerEvents: "none" }}
                    >
                        <div className={styles.ticketHeader}>
                            <div className="ticketTitle" style={{ width: "50%" }}>
                                <b style={{ color: `${colors.tagBlue}` }}>T.No - </b> {ticketId}
                            </div>

                            <div
                                className="tagContainer"
                                style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
                            >
                                <CustomTag variant="outlined" color={colors.tagRed} text={type?.name} />
                                <CustomTag variant="outlined" color={colors.tagBlue} text={status} />
                            </div>
                        </div>
                        <TextArea
                            placeholder="The ticket Description goes here."
                            size="large"
                            style={{
                                width: "100%",
                                height: "90%",
                                fontSize: "0.8rem",
                                marginTop: "15px",
                            }}
                            value={description}
                        />
                        <div className={styles.metaContainer} style={{ width: "100%" }}>
                            <div className={styles.listItem}>
                                <TicketListItem
                                    label="Assignee"
                                    Component={
                                        <AppSelect style={{ width: "60%" }} value={assignee?.name} options={[]} />
                                    }
                                />
                            </div>
                            <div className={styles.listItem}>
                                <TicketListItem
                                    label="Sprint"
                                    Component={
                                        <AppSelect
                                            style={{ width: "60%" }}
                                            // onChange={handleAssigneeChange}
                                            value={sprint?.name}
                                            options={[]}
                                        />
                                    }
                                />
                            </div>
                            <div className={styles.listItem}>
                                <TicketListItem
                                    label="Priority"
                                    Component={
                                        <AppSelect
                                            style={{ width: "60%" }}
                                            // onChange={handleAssigneeChange}
                                            value={priority?.name}
                                            options={[]}
                                        />
                                    }
                                />
                            </div>
                            <div className={styles.listItem}>
                                <TicketListItem
                                    label="Story Points"
                                    Component={
                                        <AppInput
                                            placeholder={"No. of story points"}
                                            style={{ width: "60%" }}
                                            value={ticketData.storyPoints}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </CardCustom>
                </div>
            )}
        </Draggable>
    );
}

Ticket.propTypes = {
    text: PropTypes.string,
    index: PropTypes.number,
    onClick: PropTypes.func,
    ticketData: PropTypes.object,
};

export default Ticket;
