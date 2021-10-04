import React from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";

function Loader({ load, children }) {
    if (load) return <Spin tip="Loading...">{children}</Spin>;
    return <>{children}</>;
}

Loader.propTypes = {
    children: PropTypes.any,
    load: PropTypes.bool,
};

export default Loader;
