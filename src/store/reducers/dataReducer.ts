import {
  DataAction,
  DataState,
  FETCHREAL_TIME_DATA_SUCCESS,
  FETCHCLIENT_DATA_SUCCESS,
} from "../types";

const dataState: DataState = {
  RealTimedata: null,
  ClientData: null,
};

export default (state = dataState, action: DataAction) => {
  switch (action.type) {
    case FETCHREAL_TIME_DATA_SUCCESS:
      return {
        ...state,
        RealTimedata: action.payload,
      };
    case FETCHCLIENT_DATA_SUCCESS:
      console.log("on recupere bien les donné ", action.payload);
      return {
        ...state,
        ClientData: action.payload,
      };
    default:
      return state;
  }
};
