import React from 'react'
import AppModal from '../AppModal/AppModal'
import PropTypes from "prop-types";

function TicketModal(props) {
    return (
        <div>
            <AppModal {...props}>
                {props.children}
            </AppModal>
        </div>
    )
}

TicketModal.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.elementType,
};

export default TicketModal
