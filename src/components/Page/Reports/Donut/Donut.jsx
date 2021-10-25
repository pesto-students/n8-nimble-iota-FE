import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

function Donut({ map }) {
    const state = {
        options: {
            labels: Object.keys(map),
            fill: {
                // colors: [
                //     "#2C3668",
                //     "rgb(69, 90, 100)",
                //     "rgb(111, 191, 115)",
                //     "rgb(255, 172, 51)",
                //     "rgb(100, 181, 246)",
                // ],
            },
            dataLabels: {
                formatter: function (val, opts) {
                    return opts.w.config.series[opts.seriesIndex];
                },
            },
        },
        series: Object.values(map),
    };

    return <ReactApexChart options={state.options} series={state.series} type="donut" height={350} />;
}

Donut.propTypes = {
    map: PropTypes.object,
    options: PropTypes.object,
    series: PropTypes.array,
};
export default Donut;
