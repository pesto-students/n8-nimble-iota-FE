import { Card } from "antd";
import PropTypes from "prop-types";
import React from "react";

function CardCustom({ children, ...props }) {
    return <Card {...props}>{children}</Card>;
}

CardCustom.propTypes = {
    children: PropTypes.any,
};
export default CardCustom;
