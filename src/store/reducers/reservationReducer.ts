import {
  ReservationAction,
  ReservationState,
  FETCHRESERVATION_DATA_SUCCESS,
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

    default:
      return state;
  }
};
