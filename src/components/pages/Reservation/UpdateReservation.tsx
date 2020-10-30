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
import { startEditReservation } from "../../../store/actions/reservationAction";
import * as moment from "moment";
import "moment/locale/fr";
import FormReservation from "./form/FormReservation";

interface HomePageProps {
  BookingData?: Reservation | {};
}

interface LinkStateProp {
  BookingData?: Reservation;
  id?: string;
  open?: boolean;
  onUpdateReservation?: (reservation: Reservation) => void;
}

interface LinkDispatchProps {
  //   startEditClient?: (client: Reservation) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class UpdateReservation extends Component<
  Props,
  { open: boolean; booking: Reservation; id: string }
> {
  submitUpdate: React.RefObject<FormReservation>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      booking: null,
      id: null,
    };
    this.submitUpdate = React.createRef();
  }

  componentDidMount() {
    this.handleModal;
  }

  handleModal = (booking: Reservation) => {
    if (booking) {
      this.setState({
        booking: booking,
      });
    }
    this.setState({
      open: !this.state.open,
    });
  };

  handleTapCloseModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleSubmit = () => {
    this.submitUpdate.current.manageReservation();

    this.setState({
      open: !this.state.open,
    });
  };

  onUpdateBooking = (reservation: Reservation) => {
    this.props.onUpdateReservation(reservation);
  };

  render() {
    return (
      <div>
        <Dialog
          key="info_client"
          onClose={this.handleModal}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          maxWidth="xl"
        >
          <DialogTitle
            id="customized-dialog-title"
            style={{ textAlign: "center" }}
          >
            Modifier la réservation
          </DialogTitle>
          <DialogContent dividers style={{ backgroundColor: "#F5FAF8" }}>
            <FormReservation
              reservation={this.state.booking}
              id={this.state.id}
              ref={this.submitUpdate}
              submit={this.onUpdateBooking}
            />
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
              Annuler
              <FontAwesomeIcon
                icon={faWindowClose}
                style={{ marginLeft: "10px" }}
              />
            </Button>

            <Button
              style={{
                backgroundColor: "rgba(122, 191, 146, 0.71)",
                borderColor: "rgba(122, 191, 146, 0.71)",
              }}
              onClick={this.handleSubmit}
            >
              Enregistrer
              <FontAwesomeIcon icon={faSave} style={{ marginLeft: "10px" }} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
