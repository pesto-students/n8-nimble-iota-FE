import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "src/redux/store";
import "src/components/App/App.less";
import "src/components/themes/themes.less";
import Overall from "src/components/App/Overall";
import ErrorBoundary from "src/components/Common/Errorboundary";

function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Overall />
                </Suspense>
             </Provider>
        </ErrorBoundary>
    );
}

export default App;
