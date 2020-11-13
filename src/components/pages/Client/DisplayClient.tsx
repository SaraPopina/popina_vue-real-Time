import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Avatar,
  CardActions,
} from "@material-ui/core";
import {
  faAddressBook,
  faEnvelope,
  faPhone,
  faStoreAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import CreateClient from "./CreateClient";
import UpdateClient from "./UpdateClient";
import DeleteClient from "./DeleteClient";
import Client from "../../../store/model/ClientModel";
import { ClientState } from "../../../store/types/ClientTypes";

interface Props {
  ClientData?: ClientState;
  id?: string;
  addClient?: (client: Client) => void;
  startRemoveClient?: (client: Client) => void;
}

export class DisplayClient extends React.Component<Props> {
  modalElement: React.RefObject<UpdateClient>;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
    };
    this.modalElement = React.createRef();
  }
  onCreate = (client: Client) => {
    this.props.addClient(client);
  };

  handleOpen = (client: Client) => {
    this.modalElement.current.handleModal(client);

    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  onClientDeleted = (client: Client) => {
    this.props.startRemoveClient(client);
  };

  render() {
    return (
      <div>
        <CreateClient />
        <UpdateClient ref={this.modalElement} />
        <div className="template-card">
          {this.props.ClientData.ClientData.map((client: Client) => {
            return (
              <div key={client.id}>
                <Card className="card-style">
                  <Tooltip title="Modifier" placement="top-end">
                    <Button
                      variant="contained"
                      style={{ float: "right", color: "#464e5d" }}
                      onClick={() => this.handleOpen(client)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Tooltip>
                  <CardContent style={{ fontSize: "16px" }}>
                    <Avatar className="avatar" src="/broken-image.jpg" />
                    {client.name ? (
                      <h2 className="client-name">{client.name}</h2>
                    ) : (
                      <h2 className="client-name"> Nouveau Client </h2>
                    )}
                    <hr style={{ margin: "10px" }} />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="div"
                    >
                      {/*  partie info perso  */}
                      <FontAwesomeIcon icon={faAddressBook} className="icon" />
                      {client.address ? (
                        <b> {client.address} </b>
                      ) : (
                        " ( Vide ) "
                      )}
                      {client.addressComplement ? (
                        <b> {client.addressComplement} </b>
                      ) : (
                        ""
                      )}
                      {client.zip ? <b> {client.zip} </b> : ""}
                      {client.city ? <b> {client.city} </b> : ""}
                      {client.country ? <b> {client.country} </b> : ""}
                      <br />
                      {/*  partie info contact */}
                      <FontAwesomeIcon icon={faEnvelope} className="icon" />
                      {client.email ? <b> {client.email} </b> : " ( Vide ) "}
                      <br />
                      <FontAwesomeIcon icon={faPhone} className="icon" />
                      {client.phone ? <b> {client.phone} </b> : " ( Vide ) "}
                      <br />
                      {/*  partie info société */}
                      <FontAwesomeIcon
                        icon={faStoreAlt}
                        className="iconStore "
                      />
                      {client.company ? <b> {client.company} </b> : " ( Vide )"}
                      {client.company_number ? (
                        <div>
                          {" "}
                          <br />{" "}
                          <p style={{ marginLeft: "12px" }}>
                            N° Société : <b> {client.company_number} </b>
                          </p>
                        </div>
                      ) : (
                        " "
                      )}
                      {client.comment ? (
                        <div>
                          {" "}
                          <br />{" "}
                          <p style={{ marginLeft: "12px" }}>
                            Commentaire : <b> {client.comment} </b>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </CardContent>
                  <hr style={{ margin: "10px" }} />
                  <CardActions style={{ padding: "16px" }}>
                    <DeleteClient
                      clientKey={client}
                      onDeleteClient={this.onClientDeleted}
                    />
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayClient;
