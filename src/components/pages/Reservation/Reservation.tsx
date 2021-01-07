import React from "react";
import Reservation from "../../../store/model/ReservationModel";
import { ReservationState } from "../../../store/types/ReservationTypes";
import { Card, Typography, CardContent } from "@material-ui/core";
import DisplayGroupReservation from "./DisplayGroupReservation";
import CreateReservation from "./CreateReservation";

interface Props {
  id?: string;
  ReservationData?: ReservationState;
  startEditReservation?: (reservation: Reservation) => void;
}

interface filterState {
  newData: {};
  open: boolean;
  bookingLenght: number;
}

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
    this.modalElement = React.createRef();
    this.getDataByDay = this.getDataByDay.bind(this);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(prevState, prevProps, this.state, this.props);
    if (
      this.props.ReservationData.ReservationData !==
      prevProps.ReservationData.ReservationData
    ) {
      const bookingByDate = this.getDataByDay();
      console.log("ici", bookingByDate);

      this.setState({
        newData: bookingByDate,
      });
    }
  }

  handleOpen = (reservation: any) => {
    this.modalElement.current.handleModal(reservation);

    this.setState({
      open: true,
    });
  };

  getDataByDay = () => {
    let finalData: Reservation[] = this.props.ReservationData.ReservationData;
    console.log("before", finalData);
    let groupBy = (key: string, arr: {}[]) =>
      arr.reduce(
        (groupDate: any, day: any) => ({
          ...groupDate,
          [day[key]]:
            day[key] in groupDate ? groupDate[day[key]].concat(day) : [day],
        }),
        {}
      );

    finalData = groupBy("month", this.props.ReservationData.ReservationData);

    console.log("after", finalData);
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
      const numberParse = parseInt(aResa.numberOfGuests);

      totalGuest.push(numberParse);
      totalGuest.reduce((a: number, b: number) => {
        return (sumTotal = a + b);
      });
    });
    return sumTotal;
  };

  onUpdate = (reservation: Reservation) => {
    this.props.startEditReservation(reservation);
  };

  render() {
    const bookingByDate = this.state.newData;

    return (
      <div>
        <CreateReservation />

        <div className="div-reservation">
          {Object.values(bookingByDate).map(
            (aBooking: Reservation, index: number) => {
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
                      Couvert / Reservation
                    </CardContent>
                  </Card>
                </div>
              );
            }
          )}
          <DisplayGroupReservation
            ref={this.modalElement}
            onUpdate={this.onUpdate}
            handler={this.getDataByDay}
          />
        </div>
      </div>
    );
  }
}

export default ReservationVue;
