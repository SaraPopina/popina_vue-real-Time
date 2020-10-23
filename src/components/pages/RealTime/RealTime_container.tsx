import React, { FC, useEffect, createRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import { RootState } from "../../../store";
import {
  RealTimeState,
  RealTimeAction,
} from "../../../store/types/RealTimeTypes";
import { ThunkDispatch } from "redux-thunk";
import RealTime from "../../../store/model/RealTimeModel";
import { RealTimeVue } from "./Real_time";

interface displayRealTimeProps {
  id?: string;
  color?: string;
  RealTimedata: RealTime[];
}

interface HomePageState {}

type Props = displayRealTimeProps & LinkDispatchProps & LinkStateProp;

const RealTimeContainer: FC<Props> = () => {
  const { success } = useSelector((state: RootState) => state.auth);
  const { RealTimedata } = useSelector(
    (state: RootState) => state.realTimeData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="dashboard_container">
      <RealTimeVue RealTimedata={RealTimedata} />
    </section>
  );
};

interface LinkStateProp {
  RealTimedata: RealTime[];
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: RealTimeState,
  props: displayRealTimeProps
): LinkStateProp => ({
  RealTimedata: state.RealTimedata,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, RealTimeAction>,
  props: displayRealTimeProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeContainer);
