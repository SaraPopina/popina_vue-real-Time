import { ThunkAction } from "redux-thunk";
import firebase from "../../firebase/config";

import {
  AuthAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  SET_SUCCESS,
  FETCHDATA_SUCCESS,
} from "../types";
import { RootState } from "..";
import { auth, database } from "firebase";

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

// export const setData = (
//   userUid: string
// ): ThunkAction<void, RootState, null, AuthAction> => {
//   return async (dispatch) => {
//     const userUid = auth().currentUser.uid;
//     const snapshot = database()
//       .ref()
//       .child(`users/${userUid}/realtimeID`)
//       .once("value");

//     if (false == (await snapshot).exists()) {
//       const newKey = database()
//         .ref()
//         .child(`users/${userUid}/realtimeID`)
//         .push().key;

//       database().ref().child(`users/${userUid}/`).update({
//         realtimeID: newKey,
//       });
//       const orderId = (await snapshot).val();
//       const realTimeRef = database().ref().child(`realtimes/${orderId}`);

//       realTimeRef.on("child_added", (snapshot) => {
//         const data = snapshot.val();
//         dispatch(getOldData(data));
//       });
//     } else {
//       const realTimeRef = database()
//         .ref()
//         .child(`realtimes/${(await snapshot).val()}`);

//       realTimeRef.on("child_added", (snapshot) => {
//         const data = snapshot.val();
//         dispatch(getOldData(data));
//       });
//     }
//     try {
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// Log in
export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    const email = data.email + "@popina.com";
    const password = data.password;

    try {
      const areaSnapshot = await firebase
        .auth()
        .signInWithEmailAndPassword(
          "21672@popina.com",
          "d582eddfe6367c826f94d864ea75651e"
        );

      const userData = areaSnapshot.user as User;
      dispatch({
        type: SET_USER,
        payload: userData,
      });

      // console.log("on recup l'uid", areaSnapshot.user.uid);
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };
};

// Set error
export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

// export const getOldData = (
//   data: null
// ): ThunkAction<void, RootState, null, AuthAction> => {
//   return (dispatch) => {
//     // console.log("ici la fonction recup data", data);
//     dispatch({
//       type: FETCHDATA_SUCCESS,
//       payload: data,
//     });
//   };
// };

// Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};
