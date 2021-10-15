import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

function Line({ map }) {
    const state = {
        series: [
            {
                name: "Current Sprint",
                type: "column",
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
            },
            {
                name: "Previous Sprint",
                type: "column",
                data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
            },
            {
                name: "Average",
                type: "line",
                data: [1.25, 2.5, 2.13, 36, 44, 45, 50, 58],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: true,
            },
            dataLabels: {
                enabled: true,
            },
            stroke: {
                width: [1, 1, 2],
            },
            title: {
                text: "Story Points Comparison - Previous Sprint vs Current Sprint",
                align: "left",
                offsetX: 110,
            },
            xaxis: {
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#008FFB",
                    },
                    labels: {
                        style: {
                            colors: "#008FFB",
                        },
                    },
                    title: {
                        text: "Average",
                        style: {
                            color: "#008FFB",
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                {
                    seriesName: "Current Sprint",
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#00E396",
                    },
                    labels: {
                        style: {
                            colors: "#00E396",
                        },
                    },
                    title: {
                        text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: "#00E396",
                        },
                    },
                },
                {
                    seriesName: "Revenue",
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: "#FEB019",
                    },
                    labels: {
                        style: {
                            colors: "#FEB019",
                        },
                    },
                    title: {
                        text: "Revenue (thousand crores)",
                        style: {
                            color: "#FEB019",
                        },
                    },
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60,
                },
            },
            legend: {
                horizontalAlign: "left",
                offsetX: 40,
            },
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
