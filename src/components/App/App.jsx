import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "./App.less";
import "../themes/themes.less";
import IndexRouting from "../../route/IndexRouting";

function App() {
    return (
        <>
            <Provider store={store}>
                <IndexRouting />
            </Provider>
        </>
    );
}

export default App;
