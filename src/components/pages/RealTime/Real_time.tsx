import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
import RealTime from "../../../store/model/RealTimeModel";
import { DataState, DataAction } from "../../../store/types";
import { ThunkDispatch } from "redux-thunk";

type Props = LinkStateProp;
export class RealTimeVue extends React.Component<Props> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {};
  }

  render() {
    const { RealTimedata } = this.props;
    console.log(RealTimedata);

    return (
      <section>
        <div className="dashboard_header_title">
          <h1 className="is-size-1">Temps réel</h1>
        </div>
        {RealTimedata.map((aData) => {
          return (
            <div className="dashboard_realtime_title_container">
              <h2>Caisse du {moment(aData.date_begin).format("LLLL")} </h2>
              <h3>
                Dernière modification effectué à{" "}
                {moment(aData.date_end).format("LT")}{" "}
              </h3>
              <p className="tip">
                Rafraichissement de la page automatiquement à chaque changements
                sur votre ipad.
              </p>

              <section
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <TableContainer className="table-RealTime">
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
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.sumTotalPaid()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: 0 }}>
                          - dont encaissé
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumPaid()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: 0 }}>
                          - dont offert
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumDiscount()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: 0 }}>
                          - dont transféré
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_transfered()} €
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
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumNotPaid()} €
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
                          {aData.sumTotal()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: 0 }}>
                          Annulations
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumCancelled()} €
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer className="table-RealTime">
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
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumGuestPaid()}
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
                        <TableCell
                          style={{ fontWeight: "bold", borderBottom: 0 }}
                        >
                          {aData.total_sumGuestNotPaid()}
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
                          {aData.sumTotalGuest()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </section>
              {/* /////////////// section order //////////// */}

              <section>
                <Card className="card-RealTime">
                  <CardHeader
                    className="cardHeaderShadowStyles"
                    title={"Commande"}
                  />
                  <CardContent className="content-RealTime">
                    {aData.tickets.map((aTicket, index) => {
                      return (
                        <Table
                          size="small"
                          aria-label="a dense table"
                          key={index}
                        >
                          <TableHead key={index}>
                            <TableRow
                              className="detail_tableHeader"
                              key={index}
                            >
                              <TableCell
                                align="center"
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {moment(aTicket.date_begin).format("LT")}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {aTicket.room} {aTicket.table}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {aTicket.waiter}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                }}
                              >
                                {(aTicket.price.amount / 100).toFixed(2)}
                                {aTicket.price.currency}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {aTicket.live_paid >= 1 ? (
                              aTicket.payments.map((aPayment, index) => {
                                return (
                                  <TableRow
                                    key={index}
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
                            {aTicket.items != undefined ? (
                              aTicket.items.map((row, index) => (
                                <TableRow
                                  key={index}
                                  style={{ borderBottom: 0 }}
                                >
                                  <TableCell style={{ borderBottom: 0 }}>
                                    {row.quantity} * {row.name}
                                  </TableCell>
                                  <TableCell style={{ borderBottom: 0 }} />
                                  <TableCell style={{ borderBottom: 0 }} />
                                  <TableCell
                                    align="right"
                                    style={{ borderBottom: 0 }}
                                  >
                                    {(row.price.amount / 100).toFixed(2)}{" "}
                                    {row.price.currency}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow style={{ borderBottom: 0 }}>
                                <TableCell style={{ borderBottom: 0 }}>
                                  Commande vierge
                                </TableCell>
                              </TableRow>
                            )}
                          </TableFooter>
                        </Table>
                      );
                    })}
                  </CardContent>
                </Card>
              </section>
              {aData.team.map((aTeamMember, index) => {
                return (
                  <Card className="team-card" key={index}>
                    <CardContent>
                      <Typography gutterBottom>Équipe</Typography>
                      <Typography
                        variant="h5"
                        component="h3"
                        color="textSecondary"
                      >
                        <p>{aTeamMember.name}</p>
                      </Typography>
                      <Typography color="textSecondary">
                        {moment(aTeamMember.date_begin).format("LLLL")}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        color="textSecondary"
                      >
                        {moment(aTeamMember.date_end).format("LLLL")}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          );
        })}

        {/* /////////////// section team //////////// */}
      </section>
    );
  }
}

interface LinkStateProp {
  RealTimedata: RealTime[];
}

const mapStateToProps = (state: DataState): LinkStateProp => ({
  RealTimedata: state.RealTimedata,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DataAction>
) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeVue);
