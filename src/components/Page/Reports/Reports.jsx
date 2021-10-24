import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Bar from "src/components/Page/Reports/Bar/Bar";
import Donut from "src/components/Page/Reports/Donut/Donut";
import Line from "src/components/Page/Reports/Line/Line";
import { fetchAllDevlopersProject, fetchAllTickets, fetchReportData } from "src/redux";
import { generateIssuesVsDate, generatePieChartData, generatePointsVsDate } from "src/util/helperFunctions";

function Reports() {
    const { loading, ticketList } = useSelector((state) => state.project.ticket);
    const { developerList, loadingDevelopers } = useSelector((state) => state.project.developer);
    const { reportData, reportsLoading } = useSelector((state) => state.project.reports);
    const { selectedSprint } = useSelector((state) => state.project.sprint);
    const { projectId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllTickets(projectId));
        dispatch(fetchAllDevlopersProject(projectId));
        //TODO remove harcode sprint
        dispatch(fetchReportData(selectedSprint._id));
    }, []);
    const docs = require('../../../nimble.md')
    function createMarkup() {
        return {__html: docs.toString()};
      }
      
      function MyComponent() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
      }

    return (
        <>
            {!(loadingDevelopers || loading || reportsLoading) && (
                <>
                {/* <MyComponent/> */}
                    <Bar map={generatePointsVsDate(reportData)} />

                    <Line
                        mapPrevious={generateIssuesVsDate(reportData)}
                        mapCurrent={generateIssuesVsDate(reportData)}
                    />

                    <Donut map={generatePieChartData(ticketList, developerList)} />
                </>
            )}
        </>
    );
}

export default Reports;
