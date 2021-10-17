import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "src/components/Page/Backlog/BacklogListItem/BacklogListItem.module.less";
import PropTypes from "prop-types";
import { Tag } from "antd";
import { colors } from "src/config/constants";
import { ArrowRightOutlined, DeleteFilled } from "@ant-design/icons";

function BacklogListItem({ ticketData }) {
    const { developerList } = useSelector((state) => state.project.developer);

    return (
        <>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </table>
            <div className={styles.container}>
                {/* <div key={ticketData["_id"]} style={{ minWidth: "13%" }}> */}
                <div style={{ color: colors.blackText }}>
                    <b>{ticketData.ticketId}</b>
                </div>

                <div style={{ color: colors.tagBlue }}>
                    <b>{ticketData.description}</b>
                </div>

                <Tag
                    color={ticketData.priority === "HIGH" ? "green" : ticketData.priority === "LOW" ? "red" : "yellow"}
                >
                    {ticketData.priority}
                </Tag>

                <div style={{ color: colors.tagBlue }}>
                    <b>
                        {developerList.length > 0
                            ? developerList.find((developer) => {
                                  return developer["_id"] == ticketData.assignee;
                              })?.name ?? ""
                            : ""}
                    </b>
                </div>

                {ticketData.storyPoints == "storyPoints" && (
                    <div style={{ color: colors.tagBlue }}>
                        <b>{ticketData.storyPoints}</b>
                    </div>
                )}

                <DeleteFilled
                    type="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteTicket("61546b7864bccbe191f15977", record.ticketId));
                    }}
                />

                <ArrowRightOutlined />
            </div>
        </>
    );
}

BacklogListItem.propTypes = {
    ticketData: PropTypes.object,
};

export default BacklogListItem;
