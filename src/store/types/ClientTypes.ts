import Client from "../model/ClientModel";

export const FETCHCLIENT_DATA_SUCCESS = "FETCHCLIENT_DATA_SUCCESS";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";

// state
export interface ClientState {
  ClientData: Client[] | null;
}

interface fetchClientDataSuccess {
  type: typeof FETCHCLIENT_DATA_SUCCESS;
  payload: Client;
}
interface create_client {
  type: typeof CREATE_CLIENT;
  payload: Client;
}

interface edit_client {
  type: typeof EDIT_CLIENT;
  payload: Client;
}

interface delete_client {
  type: typeof DELETE_CLIENT;
  payload: string;
}

export type ClientAction =
  | fetchClientDataSuccess
  | edit_client
  | delete_client
  | create_client;
