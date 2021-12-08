import { Divider } from "antd";
import PropTypes from "prop-types";
import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppModal from "src/components/Common/AppModal/AppModal";

function ConfirmCompleteSprint(props) {
    return (
        <AppModal {...props}>
            <div className="text" style={{ width: "100%", color: "primary" }}>
                <b>Confirmation</b>
            </div>
            <div className="text" style={{ textAlign: "center", width: "100%", color: "black" }}>
                Retrospective has not been done for this sprint, would you still like to proceed with complete sprint ?
            </div>
            <Divider />
            <AppButton onClick={props.onYes}>Yes</AppButton>
            {"  "}
            <AppButton onClick={props.onNo}>No</AppButton>
        </AppModal>
    );
}

ConfirmCompleteSprint.propTypes = {
    onYes: PropTypes.func,
    onNo: PropTypes.func,
};

export default ConfirmCompleteSprint;
