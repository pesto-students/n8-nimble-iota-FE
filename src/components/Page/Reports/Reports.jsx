import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Bar from "src/components/Page/Reports/Bar/Bar";
import Donut from "src/components/Page/Reports/Donut/Donut";
import Line from "src/components/Page/Reports/Line/Line";
import { fetchAllDevlopersProject, fetchAllTickets, fetchReportData, PreviousReportData } from "src/redux";
import {
    generateIssuesVsDate,
    generatePieChartData,
    generatePointsVsDate,
    getPreviousSprint,
} from "src/util/helperFunctions";

function Reports() {
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList, loadingDevelopers } = useSelector((state) => state.project.developer);
    const { reportData, reportsLoading, previousReportData, previousReportDataLoading } = useSelector(
        (state) => state.project.reports
    );
    const { selectedSprint, sprintList } = useSelector((state) => state.project.sprint);
    const { projectId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTickets(projectId));
        dispatch(fetchAllDevlopersProject(projectId));
        //TODO remove harcode sprint
        dispatch(fetchReportData(selectedSprint._id));
        dispatch(PreviousReportData(getPreviousSprint(sprintList, selectedSprint._id)));
    }, []);

    return (
        <>
            {!(loadingDevelopers || loading || reportsLoading || previousReportDataLoading) && (
                <>
                    <Bar map={generatePointsVsDate(reportData)} />

                    <Line
                        mapPrevious={generateIssuesVsDate(previousReportData)}
                        mapCurrent={generateIssuesVsDate(reportData)}
                    />
                    <Donut map={generatePieChartData(ticketList, developerList)} />
                </>
            )}
        </>
    );
}

export default Reports;
