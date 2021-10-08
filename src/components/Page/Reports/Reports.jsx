import React from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import Bar from "src/components/Page/Reports/Bar/Bar";
import { barData, lineData } from "src/components/Page/Reports/Data";
import Line from "src/components/Page/Reports/Line/Line";

function Reports() {
    return (
        <>
            <Bar state={barData} />
            <Line state={lineData} />
        </>
    );
}

export default Reports;
