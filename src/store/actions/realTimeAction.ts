import { ThunkAction } from "redux-thunk";
import {
  RealTimeAction,
  FETCHREAL_TIME_DATA_SUCCESS,
} from "../types/RealTimeTypes";
import { RootState } from "..";
import { auth, database } from "firebase";
import RealTime from "../model/RealTimeModel";

export const setRealTimeData = (
  userUid: string
): ThunkAction<void, RootState, null, RealTimeAction> => {
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
        data.id = snapshot.key;
        let realtimeData = new RealTime(data);
        dispatch(getRealTimeData(realtimeData));
      });
    } else {
      const realTimeRef = database()
        .ref()
        .child(`realtimes/${(await snapshot).val()}`);

      realTimeRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        data.id = snapshot.key;
        let realtimeData = new RealTime(data);
        dispatch(getRealTimeData(realtimeData));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRealTimeData = (
  RealTimedata: RealTime
): ThunkAction<void, RootState, null, RealTimeAction> => {
  return (dispatch) => {
    dispatch({
      type: FETCHREAL_TIME_DATA_SUCCESS,
      payload: RealTimedata,
    });
  };
};
