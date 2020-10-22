import React, { FC, useEffect, Fragment, Component } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addClient } from "../../../store/actions/dataActions";
import store, { RootState } from "../../../store";
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
import { render } from "react-dom";
import FormClient from "./form/FormClient";
import Client from "../../../store/model/ClientModel";

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
}

interface LinkStateProp {
  ClientData?: Client[];
}

interface LinkDispatchProps {
  addClient?: (client: Client) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export default class CreateClient extends Component<Props, { open: boolean }> {
  submitCreate: React.RefObject<FormClient>;
  //   submitCreate: React.RefObject<FormClient | null>;
  constructor(props: {}) {
    super(props);
    // console.log("ici les props", this.props);
    this.state = {
      open: false,
    };
    this.submitCreate = React.createRef();

    // this.submitCreate = React.createRef();
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
    // console.log(
    //   "ici les props de create client pour appeler la fonction action",
    //   this.props
    // );
    this.submitCreate.current.manageClient();
    this.setState({
      open: !this.state.open,
    });
  };

  onCreate = (client: Client) => {
    addClient(client);
  };

  render() {
    return (
      <div>
        <Fragment>
          <div style={{ textAlign: "center", marginTop: "2em" }}>
            <Button
              variant="contained"
              style={{
                color: "black",
                backgroundColor: "white",
                borderColor: "grey",
              }}
              onClick={this.handleOpen}
            >
              Créer une nouvelle fiche client
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
              Nouvelle fiche Client
            </DialogTitle>

            <DialogContent dividers style={{ backgroundColor: "#F5FAF8" }}>
              <FormClient ref={this.submitCreate} confirm={this.onCreate} />
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
