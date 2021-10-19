import { Tooltip as AToolTip } from "antd";
import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";

// eslint-disable-next-line react/prop-types
function Tooltip({ text, color, key }) {
    return (
        <AToolTip title={text} color={color} key={key}>
            <AppButton>{color}</AppButton>
        </AToolTip>
    );
}

export default Tooltip;
