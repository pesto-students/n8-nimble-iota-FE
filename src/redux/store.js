import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "src/redux/rootReducer";

let middlewares = [thunk];
if (process.env.REACT_APP_ENV !== "production") {
    middlewares.push(logger);
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
