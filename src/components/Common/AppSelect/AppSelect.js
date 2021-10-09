import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import styles from "src/components/Common/AppSelect/AppSelect.module.less";

function AppSelect({ options, defaultValue, onChange, display = "name", ...props }) {
    return (
        <Select defaultValue={defaultValue} onChange={onChange} className={styles.slct} {...props}>
            {options.map((item, index) => (
                <Select.Option key={index} value={JSON.stringify(item)} disabled={item.disabled}>
                    {item[display]}
                </Select.Option>
            ))}
        </Select>
    );
}

AppSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    display: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default AppSelect;
