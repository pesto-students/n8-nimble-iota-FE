import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import IndexRouting from "../../route/IndexRouting";
import "./App.less";
import "../themes/themes.less";
import NavBar from "../Common/NavBar/NavBar";
function App() {
    return (
        <>
            <Provider store={store}>
                <NavBar />
            </Provider>
        </>
    );
}

export default App;
