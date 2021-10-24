import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";

function Searchbox({ placeholder, loading, ...props }) {
    const { Search } = Input;
    return <Search placeholder={placeholder} loading={loading} {...props} />;
}

Searchbox.propTypes = {
    placeholder: PropTypes.string,
    loading: PropTypes.bool,
};

export default Searchbox;
