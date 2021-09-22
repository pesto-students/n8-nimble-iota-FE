import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import IndexRouting from "../../route/IndexRouting";
import "./App.css";

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
