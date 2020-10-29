import React, { Component, ChangeEvent } from "react";
import {
  AccountCircle,
  Email,
  Phone,
  LocationOn,
  Restaurant,
  BusinessCenter,
} from "@material-ui/icons/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from "@date-io/moment";
import * as moment from "moment";
import "moment/locale/fr";

import { InputAdornment, TextField } from "@material-ui/core";
import Reservation from "../../../../store/model/ReservationModel";

interface Props {
  reservation?: Reservation;
  id?: string;
  confirm?: (reservation: Reservation) => void;
  submit?: (reservation: Reservation) => void;
}

interface BookingState {
  // userUid: "";
  showMo?: boolean;
  reservation?: Reservation | {} | any;
  date?: moment.Moment | any;
}

// const FormReservation: FC<Props> = ({}) => {
export default class FormReservation extends Component<Props, BookingState> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      reservation: this.props.reservation ? this.props.reservation.toJS() : {},
      showMo: true,
      date: this.props.reservation
        ? moment(this.props.reservation.bookingDate * 1000).format("LLL")
        : null,
    };
  }

  manageReservation = () => {
    event.preventDefault();

    //update booking
    if (this.props.reservation) {
      const selectedReservation = this.state.reservation;
      console.log("ici le booking", selectedReservation.date);
      const reservation = this.props.reservation
        .set("bookingDate", selectedReservation.date)
        .set("comments", selectedReservation.comments)
        .set("numberOfGuests", selectedReservation.numberOfGuests)
        .set("comments", selectedReservation.comments)
        .set("personName", selectedReservation.personName)
        .set("tableName", selectedReservation.tableName)
        .set("email", selectedReservation.email)
        .set("phone", selectedReservation.phone);

      this.props.submit(reservation);

      //  create booking
    } else {
      const reservation = new Reservation(this.state.reservation);
      this.props.confirm(reservation);
    }

    this.setState({
      showMo: !this.state.showMo,
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let bookingInfos = this.state.reservation;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    bookingInfos[name] = value;
    this.setState({
      reservation: bookingInfos,
    });
  };

  handleChangeDateTime = (date: moment.Moment) => {
    console.log("handlechange date", date.unix());
    const newDate = date.unix();
    let bookingInfos = this.state.reservation;
    bookingInfos["bookingDate"] = newDate;
    console.log("bookingInfos", bookingInfos);
    this.setState({
      reservation: bookingInfos,
      date: date,
    });
  };

  render() {
    return (
      <div>
        {this.props.reservation ? (
          <div>
            <h3>Date & Horaire de la reservation : </h3>
            <br />
            <h4>
              {moment(this.props.reservation.bookingDate * 1000).format("LLLL")}
            </h4>
          </div>
        ) : (
          ""
        )}
        <MuiPickersUtilsProvider utils={Moment}>
          <DateTimePicker
            // format={"DD-MM-YYYY hh:mm:ss"}
            value={this.props.reservation ? this.state.date : this.state.date}
            ampm={false}
            onChange={this.handleChangeDateTime}
            name="bookingDate"
          />
        </MuiPickersUtilsProvider>
        <TextField
          label="Nombre de couverts "
          defaultValue={
            this.props.reservation ? this.props.reservation.numberOfGuests : ""
          }
          onChange={this.handleChange}
          name="numberOfGuests"
          required={true}
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Restaurant />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          label="Nom & Prénom"
          defaultValue={
            this.props.reservation ? this.props.reservation.personName : ""
          }
          onChange={this.handleChange}
          name="personName"
          required={true}
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <br />
        <div className="form-template">
          <TextField
            label="Email"
            defaultValue={
              this.props.reservation ? this.props.reservation.email : ""
            }
            onChange={this.handleChange}
            name="email"
            className="control-form"
            margin="dense"
            type="email"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Téléphone"
            defaultValue={
              this.props.reservation ? this.props.reservation.phone : ""
            }
            onChange={this.handleChange}
            className="control-form"
            name="phone"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <br />

        <TextField
          label="Numéro Table"
          defaultValue={
            this.props.reservation ? this.props.reservation.tableName : ""
          }
          onChange={this.handleChange}
          name="tableName"
          margin="dense"
          multiline
          fullWidth
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Restaurant />
              </InputAdornment>
            ),
          }}
        />
        <br />

        <TextField
          label="Commentaire"
          multiline
          rows="3"
          defaultValue={
            this.props.reservation ? this.props.reservation.comments : ""
          }
          name="comments"
          onChange={this.handleChange}
          fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessCenter />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

// export default FormReservation;
