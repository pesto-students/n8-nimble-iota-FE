import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/components/TicketModal/TicketModal.module.less";

const TicketListItem = ({ label, fullWidth, Component }) => {
    return (
        <div
            className={
                styles[
                    classNames({
                        ListItemFulWidth: fullWidth,
                        ListItem: !fullWidth,
                    })
                ]
            }
        >
            <div
                className={
                    styles[
                        classNames({
                            labelFullWidth: fullWidth,
                            label: !fullWidth,
                        })
                    ]
                }
            >
                <b>{label}</b>
            </div>
            {Component}
        </div>
    );
};

TicketListItem.propTypes = {
    label: PropTypes.string,
    Component: PropTypes.any,
    fullWidth: PropTypes.bool,
};

export default TicketListItem;
