import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "./App.less";
import "../themes/themes.less";
import Overall from "./Overall";

function App() {
    return (
        <>
            <Provider store={store}>
                <Overall />
            </Provider>
        </>
    );
}

export default App;
