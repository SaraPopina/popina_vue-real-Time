import {
  DataAction,
  DataState,
  FETCHREAL_TIME_DATA_SUCCESS,
  FETCHCLIENT_DATA_SUCCESS,
  CREATE_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "../types";

const dataState: DataState = {
  RealTimedata: null,
  ClientData: [],
};

export default (state = dataState, action: DataAction) => {
  switch (action.type) {
    case FETCHREAL_TIME_DATA_SUCCESS:
      return {
        ...state,
        RealTimedata: action.payload,
      };
    case FETCHCLIENT_DATA_SUCCESS:
      return {
        ...state,
        ClientData: [...state.ClientData, action.payload],
      };
    case CREATE_CLIENT:
      console.log("create client reducer", action.payload);
      return {
        ...state,
        ClientData: [action.payload],
      };
    case EDIT_CLIENT:
      console.log("edit client reducer", action.payload);

    case DELETE_CLIENT:
      console.log("delete client reducer", action.type);

    default:
      return state;
  }
};
