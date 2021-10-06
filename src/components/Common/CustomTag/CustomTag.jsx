import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";

function CustomTag({ text, color }) {
    return <Tag color={color} style={{borderRadius:"6px"}}>{text}</Tag>;
}

CustomTag.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
};

export default CustomTag;
