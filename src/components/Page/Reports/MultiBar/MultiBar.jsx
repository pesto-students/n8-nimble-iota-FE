import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

function MultiBar({ mapPrevious, mapCurrent }) {
    const previousData = Object.values(mapPrevious);
    const currentData = Object.values(mapCurrent);

    const state = {
        series: [
            {
                name: "Previous Sprint Trend",
                data: previousData,
            },
            {
                name: "Current Sprint Trend",
                data: currentData,
            }
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
                    columnWidth: "40%",
                },
            },
            dataLabels: {
                enabled: true,
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
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
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
        }
    };

    return <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />;
}

MultiBar.propTypes = {
    mapPrevious: PropTypes.object,
    mapCurrent: PropTypes.object,
    options: PropTypes.object,
    series: PropTypes.array,
};

export default MultiBar;
