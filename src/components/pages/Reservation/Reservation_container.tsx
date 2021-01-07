import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../../store";
import {
  ReservationState,
  ReservationAction,
} from "../../../store/types/ReservationTypes";
import { ThunkDispatch } from "redux-thunk";
import { ReservationVue } from "./Reservation";
import { startEditReservation } from "../../../store/actions/reservationAction";

type Props = LinkDispatchProps & LinkStateProp & OwnProps;

export class ReservationContainer extends Component<Props> {
  render() {
    console.log(this.props.ReservationData);
    return (
      <section className="dashboard_container">
        <ReservationVue
          ReservationData={this.props.ReservationData}
          startEditReservation={this.props.startEditReservation}
        />
      </section>
    );
  }
}

interface LinkStateProp {
  ReservationData: ReservationState;
}

interface LinkDispatchProps {
  startEditReservation: typeof startEditReservation;
}
const mapStateToProps = (state: RootState): LinkStateProp => {
  return { ReservationData: state.reservationData };
};

interface OwnProps {}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReservationAction>
): LinkDispatchProps => ({
  startEditReservation: bindActionCreators(startEditReservation, dispatch),
});

export default connect<LinkStateProp, LinkDispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ReservationContainer);
