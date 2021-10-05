import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

function CardCustom({ children, ...props }) {
    return <Card {...props}>{children}</Card>;
}

CardCustom.propTypes = {
    children: PropTypes.elementType,
};
export default CardCustom;
