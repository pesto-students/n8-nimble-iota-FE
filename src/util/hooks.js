import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { useHistory, useRouteMatch } from "react-router-dom";

export const useRouting = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    return {
        navigate: (to, exact, replace) => {
            if (replace) {
                if (exact) history.replace(to);
                else history.replace(`${path}/${to}`);
            } else {
                if (exact) history.push(to);
                else history.push(`${path}/${to}`);
            }
        },
        path,
        url,
    };
};

export const useMeeting = () => {
    const { url } = useRouting();
    const { projectId } = useParams();
    const projects = useSelector((state) => state.projectList.projects);
    const currentProject = projects.find((e) => e._id === projectId);
    const meetUrl = `${url}/meet?roomName=${currentProject?.meetingRoom?.roomName}&meetingId=${
        currentProject?.meetingRoom?.roomId
    }&referrer=${encodeURI(url)}`;
    return meetUrl;
};

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
