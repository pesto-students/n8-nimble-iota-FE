import { useHistory, useRouteMatch } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";

export const useRouting = () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    return {
        navigate: (to, exact, replace) => {
            if (replace) {
                if (exact) history.replace(to);
                else history.replace(`${path}/${to}`);
            } else {
                console.log(to);
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
    let splits = url.split("/");
    splits = splits.slice(0, -1);
    const meetUrl = `${splits.join("/")}/meet?roomName=${currentProject?.meetingRoom?.roomName}&meetingId=${
        currentProject?.meetingRoom?.roomId
    }&referrer=${encodeURI(url)}`;
    return meetUrl;
};

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
