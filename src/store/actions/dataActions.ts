import { ThunkAction } from "redux-thunk";
import {
  DataAction,
  FETCHREAL_TIME_DATA_SUCCESS,
  FETCHCLIENT_DATA_SUCCESS,
} from "../types";
import { RootState } from "..";
import { auth, database } from "firebase";

export const setRealTimeData = (
  userUid: string
): ThunkAction<void, RootState, null, DataAction> => {
  return async (dispatch) => {
    const userUid = auth().currentUser.uid;
    const snapshot = database()
      .ref()
      .child(`users/${userUid}/realtimeID`)
      .once("value");

    if (false == (await snapshot).exists()) {
      const newKey = database()
        .ref()
        .child(`users/${userUid}/realtimeID`)
        .push().key;

      database().ref().child(`users/${userUid}/`).update({
        realtimeID: newKey,
      });
      const realtimeID = (await snapshot).val();
      const realTimeRef = database().ref().child(`realtimes/${realtimeID}`);

      realTimeRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getRealTimeData(data));
      });
    } else {
      const realTimeRef = database()
        .ref()
        .child(`realtimes/${(await snapshot).val()}`);

      realTimeRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getRealTimeData(data));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRealTimeData = (
  RealTimedata: null
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    dispatch({
      type: FETCHREAL_TIME_DATA_SUCCESS,
      payload: RealTimedata,
    });
  };
};

export const setClientData = (
  userUid: string
): ThunkAction<void, RootState, null, DataAction> => {
  return async (dispatch) => {
    const userUid = auth().currentUser.uid;
    const snapshot = database()
      .ref()
      .child(`users/${userUid}/agendaID`)
      .once("value");

    if (false == (await snapshot).exists()) {
      const newKey = database().ref().child(`users/${userUid}/agendaID`).push()
        .key;

      database().ref().child(`users/${userUid}/`).update({
        agendaID: newKey,
      });
      const agendaID = (await snapshot).val();
      console.log(agendaID);
      const agendaRef = database().ref().child(`agendas/${agendaID}`);

      agendaRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getClientData(data));
      });
    } else {
      const agendaRef = database()
        .ref()
        .child(`agendas/${(await snapshot).val()}`);

      agendaRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getClientData(data));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getClientData = (
  Clientdata: null
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    console.log("ici la fonction recup data", Clientdata);
    dispatch({
      type: FETCHCLIENT_DATA_SUCCESS,
      payload: Clientdata,
    });
  };
};
