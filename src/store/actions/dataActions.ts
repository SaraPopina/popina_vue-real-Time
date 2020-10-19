import { User, CREATE_CLIENT } from "./../types";
import { ThunkAction } from "redux-thunk";
import {
  DataAction,
  FETCHREAL_TIME_DATA_SUCCESS,
  FETCHCLIENT_DATA_SUCCESS,
  ClientModel,
} from "../types";
import { RootState } from "..";
import { auth, database } from "firebase";

let agendaRef: database.Reference = null;

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
      agendaRef = database().ref().child(`agendas/${agendaID}`);

      agendaRef.on("child_added", (snapshot) => {
        const data = snapshot.val();
        dispatch(getClientData(data));
      });
    } else {
      agendaRef = database()
        .ref()
        .child(`agendas/${(await snapshot).val()}`);

      agendaRef.on("child_added", (snapshot) => {
        let data = snapshot.val();
        dispatch(getClientData(data));
      });

      agendaRef.on("child_changed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;
        dispatch(addClient(data));
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getClientData = (
  clientdata: null
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    dispatch({
      type: FETCHCLIENT_DATA_SUCCESS,
      payload: clientdata,
    });
  };
};

export const createClient = (
  client: ClientModel
): ThunkAction<void, RootState, null, DataAction> => {
  // console.log("ici create client ", client);
  return (dispatch) => {
    // dispatch({
    //   type: CREATE_CLIENT,
    //   payload: client,
    // });
  };
};

export const addClient = (clientData: {
  address: string;
  addressComplement: string;
  city: string;
  comment: string;
  company: string;
  company_number: string;
  country: string;
  email: string;
  name: string;
  phone: string;
  zip: string;
}): ThunkAction<void, RootState, null, DataAction> => {
  console.log("ici lagenda ref", clientData);
  if (null != agendaRef) {
    console.log("ici la condition", agendaRef, clientData);
    // const clientData = client.toFirebaseObject();
    agendaRef.push(clientData);
  }

  return async (dispatch) => {
    const {
      address = "",
      addressComplement = "",
      city = "",
      comment = "",
      company = "",
      company_number = "",
      country = "",
      email = "",
      name = "",
      phone = "",
      zip = "",
    } = clientData;
    const client = {
      address,
      addressComplement,
      city,
      comment,
      company,
      company_number,
      country,
      email,
      name,
      phone,
      zip,
    };

    dispatch({
      type: CREATE_CLIENT,
      payload: client,
    });
  };
};
