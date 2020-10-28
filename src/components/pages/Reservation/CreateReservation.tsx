import React, { Component, Fragment } from "react";
import { addClient } from "../../../store/actions/clientActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import {
  faEdit,
  faWindowClose,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import FormReservation from "./form/FormReservation";
import Reservation from "../../../store/model/ReservationModel";

interface HomePageProps {}

interface LinkStateProp {
  ReservationData?: Reservation[];
}

interface LinkDispatchProps {
  addBooking?: (reservation: Reservation) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class CreateReservation extends Component<
  Props,
  { open: boolean }
> {
  submitCreate: React.RefObject<FormReservation>;
  constructor(props: {}) {
    super(props);
    this.state = {
      open: false,
    };
    this.submitCreate = React.createRef();
  }
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSubmit = () => {
    this.submitCreate.current.manageReservation();
    this.setState({
      open: !this.state.open,
    });
  };

  onCreate = (reservation: Reservation) => {
    console.log("ici le oncreate", reservation);
    // addClient(client);
  };

  render() {
    return (
      <div>
        <Fragment>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{
                color: "black",
                marginTop: "2em",
                backgroundColor: "white",
                borderColor: "grey",
              }}
              onClick={this.handleOpen}
            >
              Créer une nouvelle réservation
              <FontAwesomeIcon icon={faEdit} style={{ marginLeft: "17px" }} />
            </Button>
          </div>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            open={this.state.open}
            maxWidth="xl"
          >
            <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
              Nouvelle Réservation
            </DialogTitle>

            <DialogContent dividers style={{ backgroundColor: "#F5FAF8" }}>
              <FormReservation
                ref={this.submitCreate}
                confirm={this.onCreate}
              />
            </DialogContent>
            <DialogActions style={{ padding: "16px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleClose}
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
        </Fragment>
      </div>
    );
  }
}
