import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./reducers/authReducer";
import dataReducer from "./reducers/dataReducer";
import { DataAction, DataState } from "./types";

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<DataState, DataAction>)
  )
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
