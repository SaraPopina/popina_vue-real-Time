import {
  AuthAction,
  AuthState,
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  SET_SUCCESS,
  FETCHDATA_SUCCESS,
} from "../types";

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: "",
  success: "",
  uid: null,
  data: null,
};

export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case FETCHDATA_SUCCESS:
      console.log("on recupere bien les donné ", action.payload);
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};