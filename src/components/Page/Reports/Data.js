export const barData = {
    series: [
        {
            name: "",
            data: [1, 4, 3, 4, 1, 8, 3, 3, 2, 9, 1, 4, 2, 5],
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
                dataLabels: {
                    position: "top", // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
        },

        xaxis: {
            categories: [
                "21/01/2021",
                "22/01/2021",
                "23/01/2021",
                "24/01/2021",
                "25/01/2021",
                "26/01/2021",
                "27/01/2021",
                "28/01/2021",
                "29/01/2021",
                "30/01/2021",
                "31/01/2021",
                "01/02/2021",
                "02/02/2021",
                "03/02/2021",
            ],
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
        title: {
            text: "Issues Resolved each day",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
                color: "#444",
            },
        },
    },
};

export const lineData = {
    series: [
        {
            name: "Website Blog",
            type: "column",
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
        {
            name: "Social Media",
            type: "line",
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
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
        labels: [
            "01 Jan 2001",
            "02 Jan 2001",
            "03 Jan 2001",
            "04 Jan 2001",
            "05 Jan 2001",
            "06 Jan 2001",
            "07 Jan 2001",
            "08 Jan 2001",
            "09 Jan 2001",
            "10 Jan 2001",
            "11 Jan 2001",
            "12 Jan 2001",
        ],
        xaxis: {
            type: "datetime",
        },
        yaxis: [
            {
                title: {
                    text: "Website Blog",
                },
            },
            {
                opposite: true,
                title: {
                    text: "Social Media",
                },
            },
        ],
    },
};
