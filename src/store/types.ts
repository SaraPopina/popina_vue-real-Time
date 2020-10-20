export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";
export const FETCHREAL_TIME_DATA_SUCCESS = "FETCHREAL_TIME_DATA_SUCCESS";
export const FETCHCLIENT_DATA_SUCCESS = "FETCHCLIENT_DATA_SUCCESS";
export const CREATE_CLIENT = "CREATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";

// model
export interface User {
  email: string;
  uid: string;
}

export interface RealTimeModel {
  client_id: string;
  connected: boolean;
  date_begin: number;
  date_deleted: number;
  date_end: number;
  device_name: string;
  fiscal: number;
  is_closed: number;
  name: string;
  number_guests: number;
  team: [
    {
      date_begin: number;
      date_end: number;
      name: string;
    }
  ];
  ticket_address: string;
  ticket_city: string;
  ticket_company: string;
  ticket_country: string;
  ticket_naf: string;
  ticket_name: string;
  ticket_phone: string;
  ticket_text: string;
  ticket_tva: string;
  ticket_url: string;
  ticket_zip: string;
  tickets: [
    {
      cancelled: number;
      date_begin: number;
      date_end: number;
      items: [
        {
          cancelled: 0;
          category: string;
          creation_date: number;
          live_paid: number;
          name: string;
          parent_category: string;
          parent_category_index: number;
          price: {
            amount: number;
            currency: string;
            tax: number;
            tax_name: string;
            tier: string;
          };
          quantity: number;
          step_index: number;
          transferred: number;
          waiter: string;
          waiter_id: string;
        }
      ];
      live_paid: number;
      number_guests: number;
      order_id: number;
      payments: [
        {
          amount: number;
          cancelled: number;
          clientID: string;
          creation_date: number;
          currency: string;
          mode: number;
          name: string;
          type: number;
        }
      ];
      price: { amount: number; currency: string; tier: string };
      prints_count: number;
      room: string;
      table: string;
      transferred: number;
      waiter: string;
      waiter_id: string;
    }
  ];
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  success: string;
  uid: string;
}

export interface ClientModel {
  id?: string;
  address: string;
  addressComplement: string;
  city: string;
  comment: string;
  company: string;
  company_number: string;
  country: string;
  email: string;
  name: string;
  phone: string;
  zip: string;
}

// state
export interface DataState {
  RealTimedata: RealTimeModel | null;
  ClientData: ClientModel[] | null;
}
export interface SignInData {
  email: string;
  password: string;
}

//login user
export interface LoginUser {
  email: string;
  password: string;
}

interface fetchRealTimeDataSuccess {
  type: typeof FETCHREAL_TIME_DATA_SUCCESS;
  payload: RealTimeModel;
}

interface fetchClientDataSuccess {
  type: typeof FETCHCLIENT_DATA_SUCCESS;
  payload: ClientModel;
}
interface create_client {
  type: typeof CREATE_CLIENT;
  payload: ClientModel;
}

interface edit_client {
  type: typeof EDIT_CLIENT;
  payload: ClientModel;
}

interface delete_client {
  type: typeof DELETE_CLIENT;
  payload: string;
}

// Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction;

export type DataAction =
  | fetchRealTimeDataSuccess
  | fetchClientDataSuccess
  | edit_client
  | delete_client
  | create_client;
