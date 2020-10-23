import React, { Component } from "react";
import { Button, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Client from "../../../store/model/ClientModel";
import swal from "sweetalert";

interface Props {
  clientKey?: Client;
  id?: string;
  onDeleteClient?: (client: Client) => void;
}

export default class DeleteClient extends Component<Props> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  deleteClient = () => {
    this.props.onDeleteClient(this.props.clientKey);
  };

  confirmAlert = () => {
    swal({
      title: "Êtes vous vraiment sur de vouloir supprimer cette fiche client ?",
      icon: "warning",
      buttons: ["Non", "Oui"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.deleteClient();
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
