import React from "react";
import { Provider } from "react-redux";
import store from "src/redux/store";
import Overall from "src/components/App/Overall";
import "src/components/App/App.less";
import "src/components/themes/themes.less";

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
