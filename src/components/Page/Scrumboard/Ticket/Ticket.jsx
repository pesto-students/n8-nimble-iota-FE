import React from "react";
import CardCustom from "../../../Common/Card/Card";
import styles from "./Ticket.module.less";
import { Input } from "antd";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DeleteFilled } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

function Ticket({ text,index }) {
    const { TextArea } = Input;

    return (
        <Draggable draggableId={index}>
            {(provided) => (
                <div className={styles.container} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} index={index}>
                    <CardCustom bodyStyle={{ height: "100%", padding: "8px" }}>
                        <TextArea
                            placeholder="Text here ..."
                            isPassword={false}
                            size="large"
                            style={{
                                width: "100%",
                                // borderRadius: "8px",
                                height: "90%",
                                border: "none",
                                // backgroundColor: "transparent",
                                outline: "none",
                            }}
                            value={text}
                            // onChange={handleTextChange}
                        />
                        <div className={styles.actionCont}>
                            <DeleteFilled />
                        </div>
                    </CardCustom>
                </div>
            )}
        </Draggable>
    );
}

Ticket.propTypes = {
    text: PropTypes.string,
    index : PropTypes.number
};

export default Ticket;
