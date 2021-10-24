import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setupAxios } from "src/service/Axios";

function InjectAxiosInterceptors() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setupAxios(history, dispatch);
    }, [history, dispatch]);

    return null;
}

export default InjectAxiosInterceptors;
