import RealTime from "../model/RealTimeModel";

export const FETCHREAL_TIME_DATA_SUCCESS = "FETCHREAL_TIME_DATA_SUCCESS";

export interface RealTimeState {
  RealTimedata: RealTime[] | null;
}

interface fetchRealTimeDataSuccess {
  type: typeof FETCHREAL_TIME_DATA_SUCCESS;
  payload: RealTime;
}

export type RealTimeAction = fetchRealTimeDataSuccess;
