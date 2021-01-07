import {
  ReservationAction,
  ReservationState,
  FETCHRESERVATION_DATA_SUCCESS,
  CREATE_RESERVATION,
  EDIT_RESERVATION,
  DELETE_RESERVATION,
  FILTER_BY_DAY,
} from "../types/ReservationTypes";

const reservationState: ReservationState = {
  ReservationData: [],
};

export default (state = reservationState, action: ReservationAction) => {
  switch (action.type) {
    case FETCHRESERVATION_DATA_SUCCESS:
      return {
        ...state,
        ReservationData: [...state.ReservationData, action.payload],
      };
    case EDIT_RESERVATION:
      const reservations = state.ReservationData;
      const indexOfReservation = reservations.findIndex(
        (aReservation, _index) => aReservation.id === action.payload.id
      );

      reservations[indexOfReservation] = action.payload;

      return {
        ...state,
        ReservationData: reservations,
      };
    case CREATE_RESERVATION:
      return {
        ...state,
        ReservationData: [action.payload],
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        ReservationData: [...state.ReservationData].filter(
          (aReservation) => aReservation.id !== action.payload
        ),
      };
    case FILTER_BY_DAY:
      return state;

    default:
      return state;
  }
};
