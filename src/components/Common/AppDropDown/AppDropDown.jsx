import { Select } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/components/Common/AppDropDown/AppDropDown.module.less";

const AppDropDown = ({ options, defaultValue, ...props }) => {
    return (
        <React.Fragment>
            <Select
                className={styles.ddl}
                options={options}
                defaultValue={defaultValue}
                bordered="false"
                size="large"
                {...props}
            />
        </React.Fragment>
    );
};

AppDropDown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    defaultValue: PropTypes.string,
};

export default AppDropDown;
