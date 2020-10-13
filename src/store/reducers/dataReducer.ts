import { DataAction, DataState, FETCHDATA_SUCCESS } from "../types";

const dataState: DataState = {
  data: null,
};

export default (state = dataState, action: DataAction) => {
  switch (action.type) {
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
