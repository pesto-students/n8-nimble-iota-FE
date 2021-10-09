import { Button } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/components/Common/AppButton/Button.module.less";

const AppButton = ({ type, size, loading, onClick, children, ...props }) => {
    return (
        <React.Fragment>
            <Button
                type={type ? type : "primary"}
                size={size}
                loading={loading}
                className={styles.btn}
                onClick={onClick}
                {...props}
            >
                {children}
            </Button>
        </React.Fragment>
    );
};

export default AppButton;

AppButton.propTypes = {
    type: PropTypes.oneOf(["primary", "dashed", "text", "link", "default"]),
    size: PropTypes.oneOf(["large", "middle", "small"]),
    loading: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onClick: PropTypes.func,
};
