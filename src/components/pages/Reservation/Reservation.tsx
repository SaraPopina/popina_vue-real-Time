import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Reservation from "../../../store/model/ReservationModel";
import {
  ReservationState,
  ReservationAction,
} from "../../../store/types/ReservationTypes";

interface displayReservationProps {
  id?: string;
  color?: string;
  Reservationdata: Reservation[];
}

type Props = LinkStateProp;
export class ReservationVue extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { Reservationdata } = this.props;
    console.log(Reservationdata);

    return <div>page resa</div>;
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ReservationVue);
