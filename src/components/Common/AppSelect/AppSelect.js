import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import styles from "./AppSelect.module.less";

function AppSelect({ options, defaultValue, onChange, ...props }) {
    return (
        <Select defaultValue={defaultValue} onChange={onChange} className={styles.slct} {...props}>
            {options.map((item, index) => (
                <Select.Option key={index} value={item._id} disabled={item.disabled}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
}

AppSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default AppSelect;
