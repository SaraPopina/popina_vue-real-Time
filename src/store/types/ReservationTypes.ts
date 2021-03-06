import Reservation from "../model/ReservationModel";

export const FETCHRESERVATION_DATA_SUCCESS = "FETCHRESERVATION_DATA_SUCCESS";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const DELETE_RESERVATION = "DELETE_RESERVATION";
export const EDIT_RESERVATION = "EDIT_RESERVATION";
export const FILTER_BY_DAY = "FILTER_BY_DAY";

// state
export interface ReservationState {
  ReservationData: Reservation[] | null;
}

interface fetchReservationtDataSuccess {
  type: typeof FETCHRESERVATION_DATA_SUCCESS;
  payload: Reservation;
}

interface create_reservation {
  type: typeof CREATE_RESERVATION;
  payload: Reservation;
}

interface edit_reservation {
  type: typeof EDIT_RESERVATION;
  payload: Reservation;
}

interface delete_reservation {
  type: typeof DELETE_RESERVATION;
  payload: string;
}

interface filter_reservation {
  type: typeof FILTER_BY_DAY;
  payload: Reservation;
}

export type ReservationAction =
  | fetchReservationtDataSuccess
  | edit_reservation
  | filter_reservation
  | delete_reservation
  | create_reservation;
