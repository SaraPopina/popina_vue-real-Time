import React, { FC, useEffect, createRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import store, { RootState } from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import {
  faAddressBook,
  faEnvelope,
  faPhone,
  faStoreAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { Tooltip, Avatar, CardActions } from "@material-ui/core";
import CreateClient from "./CreateClient";
import { render } from "react-dom";
import {
  addClient,
  startEditClient,
  startRemoveClient,
} from "../../../store/actions/dataActions";
import { ClientModel, DataState, DataAction } from "../../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";
import UpdateClient from "./UpdateClient";
import Client from "../../../store/model/ClientModel";
import DeleteClient from "./DeleteClient";

interface HomePageProps {
  id?: string;
  color?: string;
}

interface HomePageState {}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export class DisplayClient extends React.Component<Props> {
  modalElement: React.RefObject<UpdateClient>;
  constructor(props: Props | Readonly<Props>) {
    super(props);
    console.log("props display client", this.props);
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
    console.log("call du delete", client);
    startRemoveClient(client);
  };

  render() {
    const { ClientData } = this.props;
    return (
      <div>
        <section className="dashboard_container">
          <div className="template-card">
            <CreateClient />
            <UpdateClient ref={this.modalElement} />

            {ClientData.map((client) => {
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

                        <FontAwesomeIcon
                          icon={faAddressBook}
                          className="icon"
                        />

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

                        {client.company ? (
                          <b> {client.company} </b>
                        ) : (
                          " ( Vide )"
                        )}

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
        </section>
      </div>
    );
  }
}

interface LinkStateProp {
  ClientData?: Client[];
  id?: string;
}

interface LinkDispatchProps {
  addClient?: (client: Client) => void;
  startEditClient?: (client: Client) => void;
  startRemoveClient?: (client: Client) => void;
}

const mapStateToProps = (
  state: DataState,
  props: HomePageProps
): LinkStateProp => ({
  ClientData: state.ClientData,
  id: props.id,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DataAction>,
  props: HomePageProps
): LinkDispatchProps => ({
  addClient: bindActionCreators(addClient, dispatch),
  startEditClient: bindActionCreators(startEditClient, dispatch),
  startRemoveClient: bindActionCreators(startRemoveClient, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayClient);
