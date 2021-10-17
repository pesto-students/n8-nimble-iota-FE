import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import PropTypes from "prop-types";

function Flipbutton({ flipped, move, setTicketFlipped }) {
    return (
        <AppButton loading={false} size={"middle"} onClick={flipped ? move : setTicketFlipped}>
            {flipped ? "Move to Scrumboard" : "Flip"}
        </AppButton>
    );
}
Flipbutton.propTypes = {
    flipped: PropTypes.bool,
    move: PropTypes.func,
    setTicketFlipped: PropTypes.func,
};
export default Flipbutton;
