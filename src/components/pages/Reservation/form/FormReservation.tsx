import React, { Component, ChangeEvent } from "react";
import {
  AccountCircle,
  Email,
  Phone,
  Restaurant,
  BusinessCenter,
  CalendarToday,
} from "@material-ui/icons/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from "@date-io/moment";
import * as moment from "moment";
import "moment/locale/fr";

import {
  InputAdornment,
  TextField,
  withStyles,
  IconButton,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import Reservation from "../../../../store/model/ReservationModel";
import { teal } from "@material-ui/core/colors";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: teal,
  },
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#6fc597",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6fc597",
    },
    "&.MuiInput-underline": {
      color: "#6fc597",
      borderBottomColor: "#6fc597",
    },
    "&.MuiInput-underline:before": {
      color: "#6fc597",
      borderBottomColor: "#6fc597",
    },
    "&.MuiInputBase-root": {
      color: "#6fc597",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#6fc597",
      },
      "&:hover fieldset": {
        borderColor: "#6fc597",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6fc597",
      },
    },
  },
})(TextField);

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
      const selectedReservation: Reservation = this.state.reservation;
      let date: number = this.state.date;
      let newDate = new Date(date * 1000);
      const reservation: Reservation = this.props.reservation
        .set(
          "bookingDate",
          this.state.reservation.bookingDate
            ? this.state.reservation.bookingDate
            : newDate
        )
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
    const newDate = date.unix();
    let bookingInfos = this.state.reservation;
    bookingInfos["bookingDate"] = newDate;

    this.setState({
      reservation: bookingInfos,
      date: date,
    });
  };

  render() {
    return (
      <div>
        {this.props.reservation ? (
          <div style={{ textAlign: "center" }}>
            <h2>Date & Horaire de la reservation : </h2>
            <h3>
              {moment(this.props.reservation.bookingDate * 1000).format("LLLL")}
            </h3>
          </div>
        ) : (
          ""
        )}
        <ThemeProvider theme={defaultMaterialTheme}>
          <MuiPickersUtilsProvider utils={Moment}>
            <DateTimePicker
              autoOk
              disablePast
              hideTabs
              label="Date de la réservation"
              value={this.props.reservation ? this.state.date : this.state.date}
              ampm={false}
              onChange={this.handleChangeDateTime}
              name="bookingDate"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarToday />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "green",
          }}
        >
          <CssTextField
            label="Nom & Prénom"
            defaultValue={
              this.props.reservation ? this.props.reservation.personName : ""
            }
            onChange={this.handleChange}
            name="personName"
            required={true}
            margin="dense"
            id="custom-css-standard-input"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <CssTextField
            style={{
              marginRight: "25%",
            }}
            id="outlined-number"
            label="Nombre de couverts "
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            defaultValue={
              this.props.reservation ? this.props.reservation.numberOfGuests : 1
            }
            onChange={this.handleChange}
            name="numberOfGuests"
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <Restaurant />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <br />
        <div className="form-template">
          <CssTextField
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
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <CssTextField
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
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <br />

        <CssTextField
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
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <Restaurant />
              </InputAdornment>
            ),
          }}
        />
        <br />

        <CssTextField
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
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <BusinessCenter />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}
