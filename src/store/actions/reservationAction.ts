import { ThunkAction } from "redux-thunk";
import {
  ReservationAction,
  FETCHRESERVATION_DATA_SUCCESS,
  EDIT_RESERVATION,
  DELETE_RESERVATION,
} from "../types/ReservationTypes";
import { RootState } from "..";
import { auth, database } from "firebase";
import Reservation from "../model/ReservationModel";
import * as moment from "moment";
import "moment/locale/fr";

let calendarRef: database.Reference = null;

export const setReservationData = (
  userUid: string
): ThunkAction<void, RootState, null, ReservationAction> => {
  return async (dispatch) => {
    const userUid = auth().currentUser.uid;
    const snapshot = database()
      .ref()
      .child(`users/${userUid}/calendarID`)
      .once("value");

    if (false == (await snapshot).exists()) {
      const newKey = database()
        .ref()
        .child(`users/${userUid}/calendarID`)
        .push().key;

      database().ref().child(`users/${userUid}/`).update({
        calendarID: newKey,
      });
      const calendarID = (await snapshot).val();
      calendarRef = database().ref().child(`calendars/${calendarID}`);

      calendarRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        data.id = snapshot.key;
        data.month = moment(data.bookingDate * 1000).format("L");
        let reservation = new Reservation(data);
        dispatch(getReservationData(reservation));
      });
    } else {
      calendarRef = database()
        .ref()
        .child(`calendars/${(await snapshot).val()}`);

      calendarRef.orderByChild("bookingDate").on("child_added", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.key;
        data.month = moment(data.bookingDate * 1000).format("L");
        let reservation = new Reservation(data);
        dispatch(getReservationData(reservation));
      });

      calendarRef.on("child_changed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;
        const reservation = new Reservation(data);
        dispatch(getUpdatedReservationData(reservation));
      });

      calendarRef.on("child_removed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;

        const reservation = new Reservation(data);
        dispatch(getDeletedReservationData(reservation));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getReservationData = (
  Reservationdata: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  return (dispatch) => {
    dispatch({
      type: FETCHRESERVATION_DATA_SUCCESS,
      payload: Reservationdata,
    });
  };
};

export const getUpdatedReservationData = (
  reservationData: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RESERVATION,
      payload: reservationData,
    });
  };
};

export const getDeletedReservationData = (
  reservationData: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RESERVATION,
      payload: reservationData.id,
    });
  };
};

export const addReservation = (
  reservationData: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  if (null != calendarRef) {
    const newReservation = reservationData.toFirebaseObject();

    calendarRef.push(newReservation);
  }

  return async (dispatch) => {
    reservationData.set(reservationData.id, reservationData);
  };
};

export const startRemoveReservation = (
  reservation: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  calendarRef.child(reservation.get("id")).remove();

  return () => {};
};

export const startEditReservation = (
  reservation: Reservation
): ThunkAction<void, RootState, null, ReservationAction> => {
  if (null != calendarRef) {
    const key = reservation.get("id");
    calendarRef.child(key).update(reservation.toFirebaseObject());
  }
  return async () => {};
};
