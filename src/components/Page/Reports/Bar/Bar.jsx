import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

function Bar({ map }) {
    const values = Object.values(map)
    const keys = Object.keys(map)

    const state = {
        series: [
            {
                name: "",
                data: values,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "bar",
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: `${40}%`,
                    dataLabels: {
                        position: "top", // top, center, bottom
                    },
                },
            },
            dataLabels: {
                enabled: true,
            },

            xaxis: {
                categories: keys,
                position: "top",
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                },
            },
            yaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
                },
            },
            // title: {
            //     text: "Story Points completed each day.",
            //     floating: true,
            //     offsetY: 330,
            //     align: "center",
            //     style: {
            //         color: "#444",
            //     },
            // },
        },
    };

    return <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />;
}

Bar.propTypes = {
    map: PropTypes.object,
    options: PropTypes.object,
    series: PropTypes.array,
};
export default Bar;
