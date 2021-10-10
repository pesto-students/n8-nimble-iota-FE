import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

function Line({ map }) {
    const state = {
        series: [
            {
                type: "column",
                data: Object.values(map),
            },
            {
                type: "line",
                data: Object.keys(map),
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
            },
            stroke: {
                width: [0, 4],
            },
            title: {
                text: "Traffic Sources",
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
            },
            // labels: [
            //     "01 Jan 2001",
            //     "02 Jan 2001",
            //     "03 Jan 2001",
            //     "04 Jan 2001",
            //     "05 Jan 2001",
            //     "06 Jan 2001",
            //     "07 Jan 2001",
            //     "08 Jan 2001",
            //     "09 Jan 2001",
            //     "10 Jan 2001",
            //     "11 Jan 2001",
            //     "12 Jan 2001",
            // ],
        },
    };

    return <ReactApexChart options={state.options} series={state.series} type="line" height={350} />;
}

Line.propTypes = {
    map: PropTypes.object,
    options: PropTypes.object,
    series: PropTypes.array,
};

export default Line;
