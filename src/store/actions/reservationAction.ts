import { ThunkAction } from "redux-thunk";
import {
  ReservationAction,
  FETCHRESERVATION_DATA_SUCCESS,
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

        let reservation = new Reservation(data);
        dispatch(getReservationData(reservation));
      });
    } else {
      calendarRef = database()
        .ref()
        .child(`calendars/${(await snapshot).val()}`);

      calendarRef.on("child_added", (snapshot) => {
        let data = snapshot.val();
        // console.log("ici les resa", data);

        // console.log("ici les data order", data.orders);
        data.id = snapshot.key;
        data.bookingDate = moment(data.bookingDate * 1000).format("L");
        let reservation = new Reservation(data);
        dispatch(getReservationData(reservation));
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
