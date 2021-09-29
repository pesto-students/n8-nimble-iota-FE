import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import IndexRouting from "../../route/IndexRouting";
import "./App.less";
import "../themes/themes.less";
import AppInput from "../Common/AppInput/AppInput";
import AppDropDown from "../Common/AppDropDown/AppDropDown";
function App() {
    return (
        <>
            <Provider store={store}>
                <div
                    style={{
                        margin: 10,
                    }}
                >
                    <AppDropDown
                        options={[
                            { label: "x", value: "x" },
                            { label: "y", value: "y" },
                        ]}
                        // defaultValue="x"
                        placeholder="Select"
                    />
                </div>
                <IndexRouting />
            </Provider>
        </>
    );
}

export default App;
