import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import Bar from "src/components/Page/Reports/Bar/Bar";
import Donut from "src/components/Page/Reports/Donut/Donut";
import MultiBar from "src/components/Page/Reports/MultiBar/MultiBar";
import { fetchAllDevlopersProject, fetchAllTickets, fetchReportData, PreviousReportData } from "src/redux";
import {
    generateIssuesVsDate,
    generatePieChartData,
    generatePointsVsDate,
    getPreviousSprint,
} from "src/util/helperFunctions";

const Heading = ({ text }) => {
    return <h3 style={{ textAlign: "center" }}>{text}</h3>;
};

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
                    <Heading text={"Story Points Completed Each Day"} />
                    <Bar map={generatePointsVsDate(reportData)} />
                    <Heading text={"Issues Completed Each Day"} />
                    <MultiBar
                        mapPrevious={generateIssuesVsDate(previousReportData)}
                        mapCurrent={generateIssuesVsDate(reportData)}
                    />
                    <br/>
                    <Heading text={"Tickets Distribution"} />
                    <Donut map={generatePieChartData(ticketList, developerList)} />
                </>
            )}
        </>
    );
}

Heading.propTypes = {
    text : PropTypes.string
}

export default Reports;
