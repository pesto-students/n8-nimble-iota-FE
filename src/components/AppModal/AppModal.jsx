import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import "./AppModal.less";

const AppModal = ({ visible, children, ...props }) => {
    return (
        <React.Fragment>
            <Modal
                visible={visible}
                className="modal"
                centered={true}
                footer={null}
                {...props}
            >
                {children}
            </Modal>
        </React.Fragment>
    );
};

AppModal.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.elementType,
};

export default AppModal;
