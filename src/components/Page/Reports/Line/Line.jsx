import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

function Line({ mapPrevious, mapCurrent }) {
    const previousData = Object.values(mapPrevious);
    const currentData = Object.values(mapCurrent);
    // const averageData = [];

    const state = {
        series: [
            {
                name: "Previous Sprint Trend",
                data: previousData,
            },
            {
                name: "Current Sprint Trend",
                data: currentData,
            },
            // {
            //     name: "Average",
            //     data: averageData,
            // },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    horizontal: false,
                    columnWidth: "4px",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: Object.keys(mapCurrent),
            },
            yaxis: {
                title: {
                    text: "Issues Completed",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "Issues  : " + val;
                    },
                },
            },
        },
        title: {
            text: "Issues Competed Each Day",
            floating: true,
            align: "center",
            style: {
                color: "#444",
            },
        },
    };

    return <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />;
}

Line.propTypes = {
    mapPrevious: PropTypes.object,
    mapCurrent: PropTypes.object,
    options: PropTypes.object,
    series: PropTypes.array,
};

export default Line;
