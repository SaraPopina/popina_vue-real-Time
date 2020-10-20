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
import { ClientModel } from "../../../store/types";
import { editClient } from "../../../store/actions/dataActions";

interface HomePageProps {
  id?: string;
  color?: string;
  address?: string;
  addressComplement?: string;
  city?: string;
  comment?: string;
  company?: string;
  company_number?: string;
  country?: string;
  email?: string;
  name?: string;
  phone?: string;
  zip?: string;
  ClientData?: ClientModel[] | {};
}

interface LinkStateProp {
  ClientData?: ClientModel[];
  id?: string;
  open?: boolean;
}

interface LinkDispatchProps {
  addClient?: (client: ClientModel) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class UpdateClient extends Component<
  Props,
  { open: boolean; client: ClientModel; id: string }
> {
  submitUpdate: React.RefObject<FormClient>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    // console.log("ici les props", this.props);
    this.state = {
      open: false,
      client: null,
      id: null,
    };
    this.submitUpdate = React.createRef();
  }

  // ouverture du modal avec son ID
  handleModal = (client: ClientModel) => {
    console.log("open modal avec client ", client);
    if (client) {
      this.setState({
        client: client,
      });
    }
    this.setState({
      open: !this.state.open,
    });
  };

  // ferme le modal
  handleTapCloseModal() {
    this.setState({
      // client: null,
      open: !this.state.open,
      client: null,
    });
  }

  handleSubmit = () => {
    this.submitUpdate.current.manageClient();

    this.setState({
      open: !this.state.open,
    });
  };

  onUpdateClient = (client: ClientModel) => {
    console.log("creation client", client);
    editClient(client);
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
