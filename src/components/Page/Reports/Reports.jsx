import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bar from "src/components/Page/Reports/Bar/Bar";
import Donut from "src/components/Page/Reports/Donut/Donut";
import Line from "src/components/Page/Reports/Line/Line";
import { generateIssuesVsDate, generatePieChartData, generatePointsVsDate } from "src/util/helperFunctions";
import { fetchAllDevlopersProject, fetchAllTickets, fetchReportData } from "src/redux";
import Loader from "src/components/Common/Loader/Loader";

function Reports() {
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList, loadingDevelopers } = useSelector((state) => state.project.developer);
    const { reportData, reportsLoading } = useSelector((state) => state.project.reports);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTickets("61546b7864bccbe191f15977"));
        dispatch(fetchAllDevlopersProject("61546b7864bccbe191f15977"));
        dispatch(fetchReportData("dsffd"))
    }, []);

    return (
        <>
            {!(loadingDevelopers || loading || reportsLoading) && (
                <>
                    <Bar map={generatePointsVsDate(reportData)} />
                    <Bar map={generateIssuesVsDate(reportData)} />
                    {/* <Line map={generateIssuesVsDate(reportData)} /> */}
                    <Donut map={generatePieChartData(ticketList, developerList)} />
                </>
            )}
        </>
    );
}

export default Reports;
