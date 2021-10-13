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
    let splits = url.split("/");
    splits = splits.slice(0, -1);
    const meetUrl = `${splits.join("/")}/meet`;
    return meetUrl;
};
