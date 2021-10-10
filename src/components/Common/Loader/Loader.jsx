import React from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";

function Loader({ load, children }) {
<<<<<<< Updated upstream
    return (
        <Spin spinning={load} tip="Loading...">
            {children}
        </Spin>
    );
=======
   return load ? <Spin tip="Loading..." /> : <>{children}</>;
>>>>>>> Stashed changes
}

Loader.propTypes = {
    children: PropTypes.any,
    load: PropTypes.bool,
};

export default Loader;
