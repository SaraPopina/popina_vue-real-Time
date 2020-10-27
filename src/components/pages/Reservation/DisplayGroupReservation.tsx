import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Reservation from "../../../store/model/ReservationModel";

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
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      booking: null,
      id: null,
    };
    // this.submitUpdate = React.createRef();
  }

  handleModal = (booking: Reservation) => {
    console.log(booking);
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
    // this.submitUpdate.current.manageClient();

    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    console.log("ici", this.state.booking);
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
            Modifier le Client
          </DialogTitle>
          <DialogContent
            dividers
            style={{ backgroundColor: "#F5FAF8" }}
          ></DialogContent>
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
