export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";
export const FETCHDATA_SUCCESS = "FETCHDATA_SUCCESS";

export interface User {
  email: string;
  uid: string;
}

export interface Data {
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
  data: Data | null;
}

export interface LoginUser {
  email: string;
  password: string;
}

//login user
export interface SignInData {
  email: string;
  password: string;
}

interface fetchDataSuccess {
  type: typeof FETCHDATA_SUCCESS;
  payload: Data;
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
  | fetchDataSuccess
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction;
