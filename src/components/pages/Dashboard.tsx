import React, { FC, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess, getOldData } from "../../store/actions/authActions";
import store, { RootState } from "../../store";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
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

const Dashboard: FC = () => {
  const { user, success, data } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  console.log(data);
  let sumPaid: number = 0;
  let sumNotPaid: number = 0;
  let sumCancelled: number = 0;
  let sumTransferred: number = 0;
  let totalGuests: number = data.number_guests;
  let sumGuestPaid: number = 0;
  let sumGuestNotPaid: number = 0;

  const useStyles = makeStyles({
    card: {
      width: "55%",
      marginTop: 70,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: "spacing(0.5)",
      transition: "0.3s",
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
    },
  });

  const classes = useStyles();

  function calculate_total(): void {
    let totalPricePaid: number[] = [];
    let totalPriceNotPaid: number[] = [];
    let totalCancelled: number[] = [];
    let totalTransferred: number[] = [];
    let totalGuestPaid: number[] = [];
    let totalGuestNotPaid: number[] = [];

    data.tickets.map((aTicket) => {
      totalCancelled.push(aTicket.cancelled);
      totalCancelled.reduce((a: number, b: number) => {
        return (sumCancelled = a + b);
      });

      totalTransferred.push(aTicket.transferred);
      totalTransferred.reduce((a: number, b: number) => {
        return (sumTransferred = a + b);
      });

      if (aTicket.live_paid > 0) {
        aTicket.payments.map((aPayment) => {
          totalPricePaid.push(aPayment.amount);
          totalPricePaid.reduce((a: number, b: number) => {
            return (sumPaid = a + b);
          });
        });

        totalGuestPaid.push(aTicket.number_guests);
        totalGuestPaid.reduce((a: number, b: number) => {
          return (sumGuestPaid = a + b);
        });
      } else {
        totalPriceNotPaid.push(aTicket.price.amount);
        totalPriceNotPaid.reduce((a: number, b: number) => {
          return (sumNotPaid = a + b);
        });

        totalGuestNotPaid.push(aTicket.number_guests);
        totalGuestNotPaid.reduce((a: number, b: number) => {
          return (sumGuestNotPaid = a + b);
        });
      }
    });
  }

  calculate_total();
  let sumTotal: number = sumPaid + sumNotPaid;

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
        <h2>Caisse du {moment(data.date_begin).format("LLLL")} </h2>
        <h3>
          Dernière modification effectué à {moment(data.date_end).format("LT")}{" "}
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  style={{ color: "#94c7f3", borderBottom: 0 }}
                >
                  Encaissements
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Payé
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {(sumPaid / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderBottom: 0 }}>
                  - dont encaissé
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {(sumPaid / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderBottom: 0 }}>- dont offert</TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  ??
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderBottom: 0 }}>
                  - dont transféré
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {(sumTransferred / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Non payé
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {(sumNotPaid / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    color: "#94c7f3",
                    fontWeight: "bold",
                    borderBottom: 0,
                  }}
                >
                  {(sumTotal / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderBottom: 0 }}>Annulations</TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {(sumCancelled / 100).toFixed(2)} €
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer className={classes.table}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  style={{ color: "#bd9b71", borderBottom: 0 }}
                >
                  Clients
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Clients ayant payé
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {sumGuestPaid}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Clients n'ayant pas encore payé
                </TableCell>
                <TableCell style={{ fontWeight: "bold", borderBottom: 0 }}>
                  {sumGuestNotPaid}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    borderBottom: 0,
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "#bd9b71",
                    borderBottom: 0,
                  }}
                >
                  {totalGuests}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section>
        {/* /////////////// section order //////////// */}

        <Card className={classes.card}>
          <CardHeader className="cardHeaderShadowStyles" title={"Commande"} />
          <CardContent className={classes.content}>
            {data.tickets.map((aData) => {
              return (
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow
                      className="detail_tableHeader"
                      key={aData.order_id}
                    >
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {moment(aData.date_begin).format("LT")}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {aData.room} {aData.table}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {aData.waiter}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: "bold",
                          fontStyle: "italic",
                        }}
                      >
                        {(aData.price.amount / 100).toFixed(2)}
                        {aData.price.currency}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aData.live_paid >= 1 ? (
                      aData.payments.map((aPayment) => {
                        return (
                          <TableRow
                            key={aPayment.clientID}
                            style={{
                              backgroundColor: "#34c73a1c",
                              marginBottom: "10px",
                            }}
                          >
                            <TableCell> {aPayment.name}</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell align="right">
                              {" "}
                              {(aPayment.amount / 100).toFixed(2)}
                              {aPayment.currency}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow
                        style={{
                          backgroundColor: "#ffcfcf",
                          marginBottom: "10px",
                        }}
                      >
                        <TableCell> Paiement en attente </TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    {aData.items.map((row) => (
                      <TableRow key={row.name} style={{ borderBottom: 0 }}>
                        <TableCell style={{ borderBottom: 0 }}>
                          {row.quantity} * {row.name}
                        </TableCell>
                        <TableCell style={{ borderBottom: 0 }} />
                        <TableCell style={{ borderBottom: 0 }} />
                        <TableCell align="right" style={{ borderBottom: 0 }}>
                          {(row.price.amount / 100).toFixed(2)}{" "}
                          {row.price.currency}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableFooter>
                </Table>
              );
            })}
          </CardContent>
        </Card>

        {/* /////////////// section team //////////// */}
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
