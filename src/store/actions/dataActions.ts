import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";

import {
  DataAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  SET_SUCCESS,
  FETCHDATA_SUCCESS,
  Data,
} from "../types";
import { RootState } from "..";
import { auth, database } from "firebase";

export const setData = (
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
      const orderId = (await snapshot).val();
      const realTimeRef = database().ref().child(`realtimes/${orderId}`);

      realTimeRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getOldData(data));
      });
    } else {
      const realTimeRef = database()
        .ref()
        .child(`realtimes/${(await snapshot).val()}`);

      realTimeRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getOldData(data));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOldData = (
  data: null
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    console.log("ici la fonction recup data", data);
    dispatch({
      type: FETCHDATA_SUCCESS,
      payload: data,
    });
  };
};
