import { PlusCircleFilled } from "@ant-design/icons/lib/icons";
import { Affix } from "antd";
import PropTypes from "prop-types";
import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import styles from "src/components/Common/FloatingAdd/FloatingAdd.module.less";

function FloatingAdd({ onClick, loading }) {
    return (
        <Affix className={styles.floatbutton}>
            <AppButton shape="circle" size="large" type="primary" onClick={onClick} disabled={loading}>
                <PlusCircleFilled />
            </AppButton>
        </Affix>
    );
}
FloatingAdd.propTypes = {
    onClick: PropTypes.func,
    loading: PropTypes.bool,
};
export default FloatingAdd;
