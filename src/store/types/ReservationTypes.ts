import Reservation from "../model/ReservationModel";

export const FETCHRESERVATION_DATA_SUCCESS = "FETCHRESERVATION_DATA_SUCCESS";
// export const CREATE_CLIENT = "CREATE_CLIENT";
// export const DELETE_CLIENT = "DELETE_CLIENT";
// export const EDIT_CLIENT = "EDIT_CLIENT";

// state
export interface ReservationState {
  ReservationData: Reservation[] | null;
}

interface fetchReservationtDataSuccess {
  type: typeof FETCHRESERVATION_DATA_SUCCESS;
  payload: Reservation;
}

// interface create_client {
//   type: typeof CREATE_CLIENT;
//   payload: Reservation;
// }

// interface edit_client {
//   type: typeof EDIT_CLIENT;
//   payload: Reservation;
// }

// interface delete_client {
//   type: typeof DELETE_CLIENT;
//   payload: string;
// }

export type ReservationAction = fetchReservationtDataSuccess;
//   | edit_client
//   | delete_client
//   | create_client;
