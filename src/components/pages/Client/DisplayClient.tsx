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
import { addClient, createClient } from "../../../store/actions/dataActions";
import { ClientModel, DataState, DataAction } from "../../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps } from "react-router-dom";

interface HomePageProps {
  id?: string;
  color?: string;
}

interface HomePageState {}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp;

export class DisplayClient extends React.Component<Props> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    console.log("props display client", this.props);
    this.state = {
      open: false,
      setOpen: false,
    };
  }
  onCreate = (client: ClientModel) => {
    this.props.addClient(client);
  };

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

  render() {
    const { ClientData } = this.props;
    return (
      <div>
        <section className="dashboard_container">
          <div className="template-card">
            <CreateClient />
            {/* <UpdateClient ref={this.modalElement} onUpdateClient={this.onClientUpdate} /> */}

            {ClientData.map((client) => {
              return (
                <div>
                  <Card className="card-style">
                    <Tooltip title="Modifier" placement="top-end">
                      <Button
                        variant="contained"
                        style={{ float: "right", color: "#464e5d" }}
                        onClick={this.handleOpen}
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
                      {/* <DeleteClient clientKey={client} onDeleteClient={this.onClientDeleted} /> */}
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
  ClientData?: ClientModel[];
}

interface LinkDispatchProps {
  addClient?: (client: ClientModel) => void;
}

const mapStateToProps = (
  state: DataState,
  props: HomePageProps
): LinkStateProp => ({
  ClientData: state.ClientData,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DataAction>,
  props: HomePageProps
): LinkDispatchProps => ({
  addClient: bindActionCreators(createClient, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayClient);
