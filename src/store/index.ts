import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/authReducer";
import clientReducer from "./reducers/clientReducer";
import reaTimeReducer from "./reducers/RealTimeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  realTimeData: reaTimeReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
