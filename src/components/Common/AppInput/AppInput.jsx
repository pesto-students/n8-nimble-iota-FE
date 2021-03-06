import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons/lib/icons";
import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styles from "src/components/Common/AppInput/AppInput.module.less";

const AppInput = ({ placeholder, isPassword, ...props }) => {
    return (
        <React.Fragment>
            {isPassword ? (
                <Input.Password
                    size="large"
                    placeholder={placeholder}
                    className={styles.input}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    {...props}
                />
            ) : (
                <Input size="large" placeholder={placeholder} className={styles.input} {...props} />
            )}
        </React.Fragment>
    );
};

AppInput.propTypes = {
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
};

export default AppInput;
