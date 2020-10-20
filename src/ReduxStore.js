import { createStore } from "redux";
import reducer from "./ReduxReducer";

const devTools = { tools: undefined };
if (process.env.REACT_APP_ENV === "development") {
  devTools.tools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const ReduxStore = createStore(
  reducer,
  {
    quoteData: {},
  },
  devTools.tools
);

export default ReduxStore;
