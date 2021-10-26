import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "src/redux/store";
import "src/components/App/App.less";
import "src/components/themes/themes.less";
import Overall from "src/components/App/Overall";
import ErrorBoundary from "src/components/Common/Errorboundary";
import Builder from "src/components/Common/Loader/Builder";

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <Suspense fallback={<Builder />}>
                    <Overall />
                </Suspense>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
