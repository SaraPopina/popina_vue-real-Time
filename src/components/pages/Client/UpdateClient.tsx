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
import FormClient from "./form/FormClient";
import { startEditClient } from "../../../store/actions/clientActions";
import Client from "../../../store/model/ClientModel";

export default class UpdateClient extends Component<
  any,
  { open: boolean; client: Client; id: string }
> {
  submitUpdate: React.RefObject<FormClient>;

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      client: null,
      id: null,
    };
    this.submitUpdate = React.createRef();
  }

  handleModal = (client: Client) => {
    if (client) {
      this.setState({
        client: client,
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
    this.submitUpdate.current.manageClient();

    this.setState({
      open: !this.state.open,
    });
  };

  onUpdateClient = (client: Client) => {
    startEditClient(client);
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
            Modifier le Client
          </DialogTitle>
          <DialogContent dividers style={{ backgroundColor: "#F5FAF8" }}>
            <FormClient
              client={this.state.client}
              id={this.state.id}
              ref={this.submitUpdate}
              submit={this.onUpdateClient}
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
