import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bar from "src/components/Page/Reports/Bar/Bar";
import Donut from "src/components/Page/Reports/Donut/Donut";
import Line from "src/components/Page/Reports/Line/Line";
import { generateIssuesVsDate, generatePieChartData, generatePointsVsDate } from "src/util/helperFunctions";
import { fetchAllDevlopersProject, fetchAllTickets, fetchReportData } from "src/redux";
import Loader from "src/components/Common/Loader/Loader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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

    return (
        <>
            {!(loadingDevelopers || loading || reportsLoading) && (
                <>
                    {/* <Bar map={generatePointsVsDate(reportData)} /> */}
                    <div>
                        {/* <div style={{ width: "50%",float:"left",padding:"12px" }}> */}
                            <Bar map={generatePointsVsDate(reportData)} />
                        {/* </div>
                        <div style={{ width: "50%", float: "right",padding:"12px"  }}>
                            <Line map={generateIssuesVsDate(reportData)} />
                        </div> */}
                    </div>

                    <Line map={generateIssuesVsDate(reportData)} />
                    <Donut map={generatePieChartData(ticketList, developerList)} />
                </>
            )}
        </>
    );
}

export default Reports;
