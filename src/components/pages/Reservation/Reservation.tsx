import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Reservation from "../../../store/model/ReservationModel";
import {
  ReservationState,
  ReservationAction,
} from "../../../store/types/ReservationTypes";
import { Card, Typography, CardContent, CardHeader } from "@material-ui/core";
import * as moment from "moment";
import "moment/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import DisplayGroupReservation from "./DisplayGroupReservation";
import { ContactsOutlined } from "@material-ui/icons";

interface displayReservationProps {
  id?: string;
  color?: string;
  Reservationdata: Reservation[];
}

interface filterState {
  booking: {}[];
  newData: {};
  open: boolean;
  bookingLenght: number;
}

type Props = LinkStateProp;
export class ReservationVue extends React.Component<Props, filterState> {
  modalElement: React.RefObject<DisplayGroupReservation>;
  constructor(props: Props, {}) {
    super(props);
    this.state = {
      booking: [],
      newData: {},
      open: false,
      bookingLenght: null,
    };
    this.getNumberOfReservation = this.getNumberOfReservation.bind(this);
    this.getNumberOfGuest = this.getNumberOfGuest.bind(this);
    this.getDayOfBooking = this.getDayOfBooking.bind(this);
    this.modalElement = React.createRef();
    // this.getDataByDay();
  }

  componentWillMount() {
    const bookingByDate = this.getDataByDay();
    this.setState({
      newData: bookingByDate,
    });
  }

  handleOpen = (reservation: Reservation) => {
    this.modalElement.current.handleModal(reservation);

    this.setState({
      open: true,
    });
  };

  getDataByDay = () => {
    let finalData: {}[] = [];

    this.props.Reservationdata.forEach((aReservation) => {
      this.state.booking.push(aReservation);
    });

    let groupBy = (key: string, arr: {}[]) =>
      arr.reduce(
        (groupDate: any, day: any) => ({
          ...groupDate,
          [day[key]]:
            day[key] in groupDate ? groupDate[day[key]].concat(day) : [day],
        }),
        {}
      );

    finalData = groupBy("bookingDate", this.state.booking);
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
      console.log(aKey);
      return aKey;
    });
  };

  render() {
    const { Reservationdata } = this.props;
    const bookingByDate = this.state.newData;

    return (
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

                <CardContent>
                  <div className="numberClient-booking">
                    {this.getNumberOfGuest(aBooking)}/{" "}
                    {this.getNumberOfReservation(aBooking)}
                  </div>
                </CardContent>
                <CardContent>Couvert / Reservation</CardContent>
              </Card>
            </div>
          );
        })}
        <DisplayGroupReservation ref={this.modalElement} />
      </div>
    );
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
