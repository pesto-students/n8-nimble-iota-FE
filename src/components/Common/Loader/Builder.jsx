import React from "react";
import { Spin } from "antd";
import styles from "src/components/Common/Loader/Builder.module.less";

function Builder() {
    return <Spin className={styles.build} tip="Building..." />;
}

export default Builder;
