import PropTypes from "prop-types";
import React from "react";
import ReactApexChart from "react-apexcharts";

function Line({ mapPrevious, mapCurrent }) {
    const previousData = [44, 55, 57, 22, 61, 75, 60, 66, 66]
    const currentData  = [76, 85, 103, 98, 89, 105, 90, 114, 94]
    const averageData = [60,70,80,60,75,90,75,90,80]
    
    const state = {
        series: [
            {
                name: "Previous",
                data: previousData,
            },
            {
                name: "Current",
                data: currentData,
            },
            {
                name: "Average",
                data: averageData,
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
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
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            },
            yaxis: {
                title: {
                    text: "Story Points",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "Story Points : " + val;
                    },
                },
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
