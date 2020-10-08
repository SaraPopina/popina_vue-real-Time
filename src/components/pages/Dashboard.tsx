import React, { FC, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess, getOldData } from "../../store/actions/authActions";
import store, { RootState } from "../../store";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as moment from "moment";
import "moment/locale/fr";
import CardHeader from "@material-ui/core/CardHeader";

const Dashboard: FC = () => {
  const { user, success, data } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  let newDateBegin = new Date(data.date_begin);
  let dateBegin = newDateBegin.toDateString();

  let newDateEnd = new Date(data.date_end);
  let dateEnd = newDateEnd.toDateString();

  console.log(data);

  const useStyles = makeStyles({
    card: {
      marginTop: 70,
      borderRadius: "spacing(0.5)",
      transition: "0.3s",
      width: "50%",
      overflow: "initial",
      background: "#ffffff",
    },
    table: {
      maxWidth: 300,
    },
    content: {
      paddingTop: 10,
      textAlign: "left",
      overflowX: "auto",
      borderBottom: 0,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="dashboard_container">
      <div className="dashboard_header_title">
        <h1 className="is-size-1">Temps réel</h1>
      </div>
      <div className="dashboard_realtime_title_container">
        <h2>Caisse du {moment(dateBegin).format("LLLL")} </h2>
        <h3>
          Dernière modification effectué à {moment(dateEnd).format("LT")}{" "}
        </h3>
        <p className="tip">
          Rafraichissement de la page automatiquement à chaque changements sur
          votre ipad.
        </p>
      </div>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <TableContainer className={classes.table}>
          <Table aria-label="simple-table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  style={{ color: "#94c7f3" }}
                >
                  Encaissements
                </TableCell>
              </TableRow>
            </TableHead>
            {data.tickets.map((row) => (
              <TableBody>
                <TableRow key={row.order_id}>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Payé
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>- dont encaissé</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>- dont offert</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> dont transféré</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.transferred} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Non payé
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Total
                  </TableCell>
                  <TableCell style={{ color: "#94c7f3", fontWeight: "bold" }}>
                    {row.price.amount / 100} {row.price.currency}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Annulations</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.cancelled} {row.price.currency}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <TableContainer className={classes.table}>
          <Table aria-label="simple-table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  style={{ color: "#bd9b71" }}
                >
                  Clients
                </TableCell>
              </TableRow>
            </TableHead>
            {data.tickets.map((row) => (
              <TableBody>
                <TableRow key={row.order_id}>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Clients ayant payé
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Clients n'ayant pas encore payé
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {row.live_paid}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontStyle: "italic" }}
                  >
                    Total
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#bd9b71" }}>
                    {row.number_guests}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </section>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Card className={classes.card}>
          <CardHeader
            className="cardHeaderShadowStyles"
            title={"Commande"}
            subheader={"Détail de la commande"}
          />

          <CardContent className={classes.content}>
            {data.tickets.map((aData) => {
              return (
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow className="detail_tableHeader">
                      <TableCell
                        align="center"
                        style={{
                          color: "#bd9b71",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {aData.waiter}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#bd9b71",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {aData.room} {aData.table}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: "#bd9b71",
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {moment(aData.date_begin).format("LT")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Produits</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell>Prix</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aData.items.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>
                          {row.price.amount / 100} {row.price.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4}>Total</TableCell>
                      <TableCell>
                        {data.tickets.map((aTicket) => {
                          return (
                            aTicket.price.amount / 100 + aTicket.price.currency
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })}
          </CardContent>
        </Card>
        {data.team.map((aTeamMember) => {
          return (
            <Card className="team-card">
              <CardContent>
                <Typography gutterBottom>Équipe</Typography>
                <Typography variant="h5" component="h3" color="textSecondary">
                  <p>{aTeamMember.name}</p>
                </Typography>
                <Typography color="textSecondary">
                  {moment(aTeamMember.date_begin).format("LLLL")}
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  {moment(aTeamMember.date_end).format("LLLL")}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </section>
  );
};

export default Dashboard;
