import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "src/redux/store";
import "src/components/App/App.less";
import "src/components/themes/themes.less";
import Overall from "src/components/App/Overall";


function App() {
    return (
        <>
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Overall />
                </Suspense>
            </Provider>
        </>
    );
}

export default App;
