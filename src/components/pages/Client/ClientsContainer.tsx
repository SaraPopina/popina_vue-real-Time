import React, { FC, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import store, { RootState } from "../../../store";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";

import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as moment from "moment";
import "moment/locale/fr";
import CardHeader from "@material-ui/core/CardHeader";
import { Tooltip, Avatar, CardActions } from "@material-ui/core";

const ClientsContainer: FC = () => {
  const { user, success } = useSelector((state: RootState) => state.auth);
  const { ClientData } = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();

  console.log("client data", ClientData);

  const useStyles = makeStyles({});

  const classes = useStyles();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="dashboard_container">
      <div className="template-card">
        {/* <CreateClient ref={this.modalCreateElement} onCreateClient={this.onClientAdded} />
        <UpdateClient ref={this.modalElement} onUpdateClient={this.onClientUpdate} /> */}
        {ClientData.map((client) => {
          console.log(client);
          return (
            <div>
              <Card className="card-style">
                <Tooltip title="Modifier" placement="top-end">
                  <Button
                    variant="contained"
                    style={{ float: "right", color: "#464e5d" }}
                  >
                    {/* <FontAwesomeIcon icon={faEdit} /> */}
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

                    {/* <FontAwesomeIcon icon={faAddressBook} className={classes.icon} /> */}

                    {client.address ? <b> {client.address} </b> : " ( Vide ) "}

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

                    {/* <FontAwesomeIcon icon={faEnvelope} className={classes.icon} /> */}

                    {client.email ? <b> {client.email} </b> : " ( Vide ) "}

                    <br />

                    {/* <FontAwesomeIcon icon={faPhone} className={classes.icon} /> */}

                    {client.phone ? <b> {client.phone} </b> : " ( Vide ) "}
                    <br />

                    {/*  partie info société */}
                    {/* <FontAwesomeIcon icon={faStoreAlt} className={classes.iconStore} /> */}

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
                  {/* <DeleteClient clientKey={client} onDeleteClient={this.onClientDeleted} /> */}
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClientsContainer;
