import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Reservation from "../../../store/model/ReservationModel";
import {
  ReservationState,
  ReservationAction,
} from "../../../store/types/ReservationTypes";
import { Card, Typography, CardContent } from "@material-ui/core";
import DisplayGroupReservation from "./DisplayGroupReservation";
import CreateReservation from "./CreateReservation";
import { bindActionCreators } from "redux";
import {
  addReservation,
  startEditReservation,
  startRemoveReservation,
} from "../../../store/actions/reservationAction";

interface displayReservationProps {
  id?: string;
  color?: string;
  Reservationdata: Reservation[];
}

interface filterState {
  newData: {};
  open: boolean;
  bookingLenght: number;
}

type Props = LinkStateProp & displayReservationProps & LinkDispatchProps;
export class ReservationVue extends React.Component<Props, filterState> {
  modalElement: React.RefObject<DisplayGroupReservation>;
  constructor(props: Props, {}) {
    super(props);
    this.state = {
      newData: this.getDataByDay(),
      open: false,
      bookingLenght: null,
    };
    this.getNumberOfReservation = this.getNumberOfReservation.bind(this);
    this.getNumberOfGuest = this.getNumberOfGuest.bind(this);
    this.getDayOfBooking = this.getDayOfBooking.bind(this);
    this.modalElement = React.createRef();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.Reservationdata !== prevProps.Reservationdata) {
      const bookingByDate = this.getDataByDay();

      this.setState({
        newData: bookingByDate,
      });

      this.modalElement.current.handleModal;
    }
  }

  handleOpen = (reservation: any) => {
    this.modalElement.current.handleModal(reservation);

    this.setState({
      open: true,
    });
  };

  getDataByDay = () => {
    let finalData: Reservation[] = this.props.Reservationdata;
    let groupBy = (key: string, arr: {}[]) =>
      arr.reduce(
        (groupDate: any, day: any) => ({
          ...groupDate,
          [day[key]]:
            day[key] in groupDate ? groupDate[day[key]].concat(day) : [day],
        }),
        {}
      );

    finalData = groupBy("month", this.props.Reservationdata);
    return finalData;
  };

  getNumberOfReservation = (number: Reservation) => {
    let numberOfBooking: number = Object.keys(number).length;
    return numberOfBooking;
  };

  getNumberOfGuest = (reservation: Reservation) => {
    let totalGuest: number[] = [0];
    let sumTotal: number = 0;
    Object.values(reservation).forEach((aResa) => {
      totalGuest.push(aResa.numberOfGuests);
      totalGuest.reduce((a: number, b: number) => {
        return (sumTotal = a + b);
      });
    });
    return sumTotal;
  };

  getDayOfBooking = () => {
    Object.keys(this.state.newData).forEach((aKey) => {
      return aKey;
    });
  };

  onCreate = (reservation: Reservation) => {
    this.props.addReservation(reservation);
  };

  render() {
    const bookingByDate = this.state.newData;

    return (
      <div>
        <CreateReservation />

        <div className="div-reservation">
          {Object.values(bookingByDate).map((aBooking: Reservation, index) => {
            return (
              <div key={index} onClick={() => this.handleOpen(aBooking)}>
                <Card className="reservation-card">
                  <Typography
                    className="reservation-day"
                    variant="h5"
                    component="h2"
                  >
                    {Object.keys(bookingByDate)[index]}
                  </Typography>

                  <CardContent style={{ textAlign: "center" }}>
                    <div className="numberClient-booking">
                      {this.getNumberOfGuest(aBooking)}{" "}
                      <span style={{ color: "#a3b3b4" }}>/</span>
                      {this.getNumberOfReservation(aBooking)}
                    </div>
                  </CardContent>
                  <CardContent
                    style={{ color: "#a3b3b4", textAlign: "center" }}
                  >
                    Couvert Reservation
                  </CardContent>
                </Card>
              </div>
            );
          })}
          <DisplayGroupReservation ref={this.modalElement} />
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  Reservationdata: Reservation[];
  id?: string;
}

interface LinkDispatchProps {
  addReservation?: (reservation: Reservation) => void;
  startEditReservation?: (reservation: Reservation) => void;
  startRemoveReservation?: (reservation: Reservation) => void;
}

const mapStateToProps = (
  state: ReservationState,
  props: displayReservationProps
): LinkStateProp => ({
  Reservationdata: state.ReservationData,
  id: props.id,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReservationAction>,
  props: displayReservationProps
): LinkDispatchProps => ({
  addReservation: bindActionCreators(addReservation, dispatch),
  startEditReservation: bindActionCreators(startEditReservation, dispatch),
  startRemoveReservation: bindActionCreators(startRemoveReservation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationVue);
