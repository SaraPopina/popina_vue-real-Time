import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Typography,
  CardActions,
} from "@material-ui/core";
import Reservation from "../../../store/model/ReservationModel";
import * as moment from "moment";
import "moment/locale/fr";
import UpdateReservation from "./UpdateReservation";
import { startRemoveReservation } from "../../../store/actions/reservationAction";
import DeleteReservation from "./DeleteReservation";

interface HomePageProps {
  BookingData?: Reservation | {};
}

interface LinkStateProp {
  BookingData?: Reservation;
  id?: string;
  open?: boolean;
  handler?: () => void;
}

interface LinkDispatchProps {
  onUpdate?: (reservation: Reservation) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class DisplayGroupReservation extends Component<
  Props,
  { show: boolean; open: boolean; booking: Reservation[]; id: string }
> {
  modalElement: React.RefObject<UpdateReservation>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      show: false,
      open: false,
      booking: null,
      id: null,
    };
    this.modalElement = React.createRef();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.booking !== this.state.booking) {
      this.setState({
        booking: this.state.booking,
      });
    }
  }

  handleModal = (booking: Reservation[]) => {
    if (booking) {
      this.setState({
        booking: booking,
      });
    }
    this.setState({
      open: !this.state.open,
    });
  };

  handleOpen = (reservation: Reservation) => {
    this.modalElement.current.handleModal(reservation);

    this.setState({
      open: true,
    });
  };

  handleTapCloseModal(reservation: Reservation[]) {
    if (this.state.booking !== reservation) {
      console.log("oui", reservation, this.state.booking);
    } else {
      console.log("non", reservation, this.state.booking);
    }
    // this.props.handler();

    this.setState({
      open: !this.state.open,
    });
  }

  handleSubmit = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  onReservationDeleted = (reservation: Reservation) => {
    const booking = this.state.booking.filter(
      (aBooking) => aBooking.id !== reservation.id
    );
    this.setState({ booking: booking });

    startRemoveReservation(reservation);
  };

  onReservationUpdated = (reservation: Reservation) => {
    const booking = this.state.booking;

    const indexOfReservation = booking.findIndex(
      (aReservation, _index) => aReservation.id === reservation.id
    );

    booking[indexOfReservation] = reservation;
    this.setState({ booking: booking });
    // startEditReservation(reservation);

    this.props.onUpdate(reservation);
  };

  render() {
    // console.log(this.state.booking);
    return (
      <div>
        {this.state.booking == null ||
        this.state.booking.length == 0 ||
        this.state.booking == undefined ? (
          ""
        ) : (
          <div>
            <UpdateReservation
              ref={this.modalElement}
              onUpdateReservation={this.onReservationUpdated}
            />
            <Dialog
              key="info_client"
              onClose={this.handleModal}
              aria-labelledby="customized-dialog-title"
              open={this.state.open}
              maxWidth="xl"
              fullWidth={true}
            >
              <DialogTitle
                id="customized-dialog-title"
                style={{ textAlign: "center" }}
              >
                Détail Reservation
              </DialogTitle>
              <DialogContent dividers className="booking-detail-modal">
                {Object.values(this.state.booking).map(
                  (aReservation: Reservation, index) => {
                    return (
                      <Card key={index} className="reservation-card-detail">
                        <div
                          onClick={() => this.handleOpen(aReservation)}
                          style={{ display: "flex" }}
                        >
                          <div className="div-nbGuest">
                            <p className="number">
                              {aReservation.numberOfGuests}
                            </p>
                            <span style={{ color: "#8a8a8a" }}>personnes</span>
                          </div>
                          <div className="div-content-booking">
                            <Typography
                              variant="h5"
                              style={{
                                color: "#464e5d",
                                textAlign: "center",
                                fontWeight: "bold",
                                marginBottom: "10px",
                              }}
                            >
                              {aReservation.personName}
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h3"
                              color="textSecondary"
                            >
                              {aReservation.phone}
                            </Typography>
                            <Typography
                              variant="h5"
                              component="h3"
                              color="textSecondary"
                            >
                              {aReservation.email}
                            </Typography>
                            <Typography
                              variant="h6"
                              component="h6"
                              color="textSecondary"
                            >
                              {moment(aReservation.bookingDate * 1000).format(
                                "LLLL"
                              )}
                            </Typography>
                          </div>
                        </div>
                        <CardActions style={{ padding: "16px" }}>
                          <DeleteReservation
                            reservationKey={aReservation}
                            onDeleteReservation={this.onReservationDeleted}
                          />
                        </CardActions>
                      </Card>
                    );
                  }
                )}
              </DialogContent>
              <DialogActions style={{ padding: "16px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.handleTapCloseModal(this.state.booking);
                  }}
                  style={{ marginRight: "10px" }}
                >
                  OK
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    style={{ marginLeft: "10px" }}
                  />
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}
