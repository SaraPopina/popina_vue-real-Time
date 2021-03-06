import { ThunkAction } from "redux-thunk";
import {
  ClientAction,
  FETCHCLIENT_DATA_SUCCESS,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "../types/ClientTypes";
import { RootState } from "..";
import { auth, database } from "firebase";
import Client from "../model/ClientModel";
import { Dispatch } from "redux";

let agendaRef: database.Reference = null;

export const setClientData = (
  userUid: string
): ThunkAction<void, RootState, null, ClientAction> => {
  // return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {

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
        // console.log("ici les data order", data.orders);
        data.id = snapshot.key;
        let client = new Client(data);
        dispatch(getClientData(client));
      });

      agendaRef.on("child_changed", (snapshot) => {
        let data = snapshot.val();
        data.id = snapshot.ref.key;
        const client = new Client(data);
        dispatch(getUpdatedClientData(client));
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
          const client = new Client(data);
          dispatch(getDeletedClientData(client));
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
): ThunkAction<void, RootState, null, ClientAction> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: FETCHCLIENT_DATA_SUCCESS,
      payload: clientdata,
    });
  };
};

export const getUpdatedClientData = (
  clientData: Client
): ThunkAction<void, RootState, null, ClientAction> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: EDIT_CLIENT,
      payload: clientData,
    });
  };
};

export const getDeletedClientData = (
  clientData: Client
): ThunkAction<void, RootState, null, ClientAction> => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: DELETE_CLIENT,
      payload: clientData.id,
    });
  };
};
export const addClient = (
  clientData: Client
): ThunkAction<void, RootState, null, ClientAction> => {
  if (null != agendaRef) {
    const newClient = clientData.toFirebaseObject();
    agendaRef.push(newClient);
  }

  clientData.set(clientData.id, clientData);
  return async (dispatch) => {};
};

export const startRemoveClient = (
  client: Client
): ThunkAction<void, RootState, null, ClientAction> => {
  agendaRef.child(client.get("id")).remove();

  return () => {};
};

export const startEditClient = (
  client: Client
): ThunkAction<void, RootState, null, ClientAction> => {
  if (null != agendaRef) {
    const key = client.get("id");
    agendaRef.child(key).update(client.toFirebaseObject());
  }
  return async () => {};
};
