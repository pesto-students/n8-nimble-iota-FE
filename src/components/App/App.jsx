import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import IndexRouting from "../../route/IndexRouting";
import "./App.less";
import '../themes/themes.less'
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
