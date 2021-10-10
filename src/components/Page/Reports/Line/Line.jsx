import React from 'react'
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

function Line({state}) {
    return (
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
    )
}

Line.propTypes = {
    state: PropTypes.object,
    options: PropTypes.object,
    series : PropTypes.array
};

export default Line
