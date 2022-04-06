import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createEpicMiddleware } from "redux-observable";
import Reducer from "./reducers/Reducer";
import { rootEpic } from "./reducers/Reducer";

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
