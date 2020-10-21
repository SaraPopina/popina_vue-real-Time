import { ThunkAction } from "redux-thunk";
import {
  DataAction,
  FETCHREAL_TIME_DATA_SUCCESS,
  FETCHCLIENT_DATA_SUCCESS,
  ClientModel,
  EDIT_CLIENT,
  CREATE_CLIENT,
  DELETE_CLIENT,
} from "../types";
import { RootState } from "..";
import { auth, database } from "firebase";
import Client from "../model/ClientModel";

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
        data.id = snapshot.key;
        let client = new Client(data);
        dispatch(getClientData(client));
      });
    } else {
      agendaRef = database()
        .ref()
        .child(`agendas/${(await snapshot).val()}`);

      agendaRef.on("child_added", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.key;
        let client = new Client(data);
        dispatch(getClientData(client));
      });

      // agendaRef.on("child_changed", (snapshot) => {
      //   let data = snapshot.val();
      //   data.id = snapshot.ref.key;
      //   dispatch(addClient(data));
      //   dispatch({
      //     type: CREATE_CLIENT,
      //     payload: new Client(data),
      //   });
      // });

      agendaRef.on("child_changed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;
        const client = new Client(data);
        dispatch(getUpdatedClentData(client));
      });

      agendaRef.on("child_removed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;
        if (
          data.orders != 0 &&
          data.orders != undefined &&
          data.orders != null
        ) {
          return window.alert(
            "Impossible de supprimer ce client car des commandes sont toujours en cours "
          );
        } else {
          let data = snapshot.val();
          data.id = snapshot.ref.key;
          // dispatch({
          //   type: DELETE_CLIENT,
          //   payload: new Client(data),
          // });
        }
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export const getClientData = (
  clientdata: Client
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    dispatch({
      type: FETCHCLIENT_DATA_SUCCESS,
      payload: clientdata,
    });
  };
};

export const getUpdatedClentData = (
  clientData: Client
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CLIENT,
      payload: clientData,
    });
  };
};

export const deleteClient = (
  client: Client
): ThunkAction<void, RootState, null, DataAction> => {
  return (dispatch) => {
    console.log("ici le deleteCLient", agendaRef);
    agendaRef.child(client.get("id")).remove();
  };
};

export const addClient = (
  clientData: Client
): ThunkAction<void, RootState, null, DataAction> => {
  if (null != agendaRef) {
    const newClient = clientData.toFirebaseObject();
    agendaRef.push(newClient);
  }

  return async (dispatch) => {
    clientData.set(clientData.id, clientData);
  };
};

export const startRemoveClient = (
  client: Client
): ThunkAction<void, RootState, null, DataAction> => {
  agendaRef.child(client.get("id")).remove();

  return (dispatch) => {
    // dispatch(deleteClient(id));
  };
};

export const startEditClient = (
  client: Client
): ThunkAction<void, RootState, null, DataAction> => {
  console.log(client.toFirebaseObject());
  if (null != agendaRef) {
    const key = client.get("id");
    agendaRef.child(key).update(client.toFirebaseObject());
  }
  return async (dispatch) => {
    // client.set(client.id, client);
    // dispatch(updateClient(client));
    // console.log("on passe ici");
  };
};

// if (this.clientsRef != null) {
//   const key = client.get('id');
//   this.clientsRef.child(key).update(client.toFirebaseObject());
// }
