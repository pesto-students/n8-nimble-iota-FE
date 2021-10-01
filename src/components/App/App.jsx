import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "./App.less";
import "../themes/themes.less";
import IndexRouting from "../../route/IndexRouting";
import useNavigatorOnLine from "../Common/NavigatorOnline/NavigatorOnline";

function App() {
    const isOnline = useNavigatorOnLine();
    useEffect(() => {
        if (!isOnline) alert("Please check your internet connection!");
    }, [isOnline]);
    return (
        <>
            <Provider store={store}>
                <IndexRouting />
            </Provider>
        </>
    );
}

export default App;
