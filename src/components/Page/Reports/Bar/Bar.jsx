import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

function Bar({state}) {
    return <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />;
}

Bar.propTypes = {
    state: PropTypes.object,
    options: PropTypes.object,
    series : PropTypes.array
};
export default Bar;
