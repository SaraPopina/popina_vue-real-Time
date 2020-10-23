import {
  RealTimeAction,
  FETCHREAL_TIME_DATA_SUCCESS,
  RealTimeState,
} from "../types/RealTimeTypes";

const RealTimeState: RealTimeState = {
  RealTimedata: [],
};

export default (state = RealTimeState, action: RealTimeAction) => {
  switch (action.type) {
    case FETCHREAL_TIME_DATA_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        RealTimedata: [action.payload],
      };
    default:
      return state;
  }
};
