import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";

function CardCustom({ children, ...props }) {
    console.warn(children);
    return <Card {...props}>{children}</Card>;
}

CardCustom.propTypes = {
    children: PropTypes.element,
};
export default CardCustom;
