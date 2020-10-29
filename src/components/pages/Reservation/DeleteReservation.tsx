import React, { Component } from "react";
import { Button, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Reservation from "../../../store/model/ReservationModel";
import swal from "sweetalert";

interface Props {
  reservationKey?: Reservation;
  id?: string;
  onDeleteReservation?: (reservation: Reservation) => void;
}

export default class DeleteReservation extends Component<Props> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  deleteReservation = () => {
    this.props.onDeleteReservation(this.props.reservationKey);
  };

  confirmAlert = () => {
    swal({
      title: "Êtes vous vraiment sur de vouloir supprimer cette réservation ?",
      icon: "warning",
      buttons: ["Non", "Oui"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.deleteReservation();
      }
    });
  };

  render() {
    return (
      <Tooltip title="Supprimer" placement="bottom-end">
        <Button
          style={{ width: "100%" }}
          variant="contained"
          color="secondary"
          onClick={this.confirmAlert}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Tooltip>
    );
  }
}
