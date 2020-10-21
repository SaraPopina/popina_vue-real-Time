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
  console.log(state, action);
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
    case EDIT_CLIENT:
      const clients = state.ClientData;
      const indexOfClient = clients.findIndex(
        (aClient, _index) => aClient.id === action.payload.id
      );
      clients[indexOfClient] = action.payload;
      return {
        ...state,
        ClientData: clients,
      };
    case CREATE_CLIENT:
      return {
        ...state,
        ClientData: [action.payload],
      };
    case DELETE_CLIENT:
      return {
        ...state,
        ClientData: [...state.ClientData].filter(
          (aClient) => aClient.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
