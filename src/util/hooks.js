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
