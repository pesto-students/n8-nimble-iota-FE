import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import "src/components/Common/AppModal/AppModal.less";

const AppModal = ({ visible, handleCancel, children, ...props }) => {
    return (
        <>
            <Modal visible={visible} className="modal" centered={true} footer={null} onCancel={handleCancel} {...props}>
                {children}
            </Modal>
        </>
    );
};

AppModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    children: PropTypes.any,
};

export default AppModal;
