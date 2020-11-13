import {
  ClientAction,
  ClientState,
  FETCHCLIENT_DATA_SUCCESS,
  CREATE_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "../types/ClientTypes";
import Client from "../model/ClientModel";

const clientState: ClientState = {
  ClientData: [],
};

export default (state = clientState, action: ClientAction) => {
  switch (action.type) {
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
