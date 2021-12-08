import { Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

function Loader({ load, children }) {
    return (
        <Spin spinning={load} tip="Loading...">
            {children}
        </Spin>
    );
}

Loader.propTypes = {
    children: PropTypes.any,
    load: PropTypes.bool,
};

export default Loader;
