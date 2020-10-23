import React, { FC, useEffect, createRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import { RootState } from "../../../store";
import {
  ReservationState,
  ReservationAction,
} from "../../../store/types/ReservationTypes";
import { ThunkDispatch } from "redux-thunk";
import Reservation from "../../../store/model/ReservationModel";
import { ReservationVue } from "./Reservation";
// import { ReservationVue } from "./Real_time";

interface displayReservationProps {
  id?: string;
  color?: string;
  Reservationdata: Reservation[];
}

interface HomePageState {}

type Props = displayReservationProps & LinkDispatchProps & LinkStateProp;

const ReservationContainer: FC<Props> = () => {
  const { success } = useSelector((state: RootState) => state.auth);
  const { ReservationData } = useSelector(
    (state: RootState) => state.reservationData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="dashboard_container">
      <ReservationVue Reservationdata={ReservationData} />
    </section>
  );
};

interface LinkStateProp {
  Reservationdata: Reservation[];
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: ReservationState,
  props: displayReservationProps
): LinkStateProp => ({
  Reservationdata: state.ReservationData,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReservationAction>,
  props: displayReservationProps
): LinkDispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationContainer);
