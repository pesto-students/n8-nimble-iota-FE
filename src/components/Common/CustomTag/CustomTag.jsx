import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";

function CustomTag({ text, color, variant,...props }) {
    return (
        <>
            {variant == "outlined" && <Tag  style={{ borderRadius: "6px", borderColor: color }} {...props} >{text}</Tag>}
            {variant !== "outlined" && (
                <Tag color={color} style={{ borderRadius: "6px" }} {...props}>
                    {text}
                </Tag>
            )}
        </>
    );
}

CustomTag.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
};

export default CustomTag;
