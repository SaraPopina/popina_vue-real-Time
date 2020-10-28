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
} from "@material-ui/core";
import Reservation from "../../../store/model/ReservationModel";
import * as moment from "moment";
import "moment/locale/fr";
import UpdateReservation from "./UpdateReservation";

interface HomePageProps {
  BookingData?: Reservation | {};
}

interface LinkStateProp {
  BookingData?: Reservation;
  id?: string;
  open?: boolean;
}

interface LinkDispatchProps {
  //   startEditClient?: (client: Reservation) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class DisplayGroupReservation extends Component<
  Props,
  { open: boolean; booking: Reservation; id: string }
> {
  modalElement: React.RefObject<UpdateReservation>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      booking: null,
      id: null,
    };
    this.modalElement = React.createRef();

    // this.submitUpdate = React.createRef();
  }

  componentDidMount() {
    this.handleModal;
  }

  handleModal = (booking: Reservation) => {
    // console.log(booking);
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

  handleTapCloseModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleSubmit = () => {
    // this.submitUpdate.current.manageClient();

    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div>
        {this.state.booking == null || this.state.booking == undefined ? (
          ""
        ) : (
          <div>
            <UpdateReservation ref={this.modalElement} />
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
                      <Card
                        key={aReservation.id}
                        className="reservation-card-detail"
                        onClick={() => this.handleOpen(aReservation)}
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
                    this.handleTapCloseModal();
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
