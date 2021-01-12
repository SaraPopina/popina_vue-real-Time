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
import {
  RealTimeState,
  RealTimeAction,
} from "../../../store/types/RealTimeTypes";
import { ThunkDispatch } from "redux-thunk";
import ChartClient from "./chart/ChartClient";
import ChartTicket from "./chart/ChartTicket";
import { Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillAlt,
  faCreditCard,
  faHandHoldingUsd,
  faMoneyCheckAlt,
} from "@fortawesome/free-solid-svg-icons";

type Props = LinkStateProp;
export class RealTimeVue extends React.Component<Props> {
  render() {
    const { RealTimedata } = this.props;

    const filterByDate = RealTimedata.map((aData) => {
      return aData.tickets.sort((a, b) => {
        return a.date_begin > b.date_begin ? -1 : 1;
      });
    });

    const dateObject: RealTime = Object.assign({}, ...filterByDate);

    return (
      <section>
        <div className="dashboard_header_title">
          <h1 className="is-size-1">Temps réel</h1>
        </div>
        {RealTimedata.map((aData, index) => {
          return (
            <div className="dashboard_realtime_title_container" key={index}>
              <h2>Caisse du {moment(aData.date_begin).format("LLLL")} </h2>
              <h3>
                Dernière modification effectué à
                {moment(aData.date_end).format("LT")}
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
                {aData.sumTotal() == aData.total_sumNotPaid() ? (
                  <ChartTicket sumTotal={aData.sumTotal()} sumPayed={null} />
                ) : (
                  <ChartTicket
                    sumTotal={aData.sumTotal()}
                    sumPayed={aData.total_sumNotPaid()}
                  />
                )}

                <TableContainer className="table-RealTime">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            color: "#94c7f3",
                            borderBottom: 0,
                            fontSize: 16,
                          }}
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
                        <TableCell
                          style={{ borderBottom: 0, color: "#696969" }}
                        >
                          - dont encaissé
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            borderBottom: 0,
                            color: "#696969",
                          }}
                        >
                          {aData.total_sumPaid()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ borderBottom: 0, color: "#696969" }}
                        >
                          - dont offert
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            borderBottom: 0,
                            color: "#696969",
                          }}
                        >
                          {aData.total_sumDiscount()} €
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ borderBottom: 0, color: "#696969" }}
                        >
                          - dont transféré
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            borderBottom: 0,
                            color: "#696969",
                          }}
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

                {aData.total_sumGuestNotPaid() == aData.sumTotalGuest() ? (
                  <ChartClient
                    guestPaid={null}
                    totalGuest={aData.sumTotalGuest()}
                  />
                ) : (
                  <ChartClient
                    guestPaid={aData.total_sumGuestNotPaid()}
                    totalGuest={aData.sumTotalGuest()}
                  />
                )}

                <TableContainer className="table-RealTime">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          colSpan={2}
                          style={{
                            color: "#bd9b71",
                            borderBottom: 0,
                            fontSize: 16,
                          }}
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
                    title={"Historique des commandes"}
                  />
                  <CardContent className="content-RealTime">
                    {aData.tickets.map((aTicket, index) => {
                      console.log("data", aTicket);
                      return (
                        <Table
                          size="small"
                          aria-label="a dense table"
                          key={index}
                          style={{
                            marginTop: "10px",
                            borderBottom: "4px solid #8c8c8c47",
                          }}
                        >
                          <TableHead key={index}>
                            <TableRow
                              className="detail_tableHeader"
                              key={index}
                              style={{ backgroundColor: "#a7baae" }}
                            >
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  width: "25%",
                                }}
                              >
                                {moment(aTicket.date_begin).format("LT")}
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                  width: "25%",
                                }}
                              >
                                {aTicket.room} {aTicket.table}
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  fontWeight: "bold",
                                  fontStyle: "italic",
                                  width: "25%",
                                }}
                              >
                                {aTicket.waiter}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  fontWeight: "bold",
                                  width: "25%",
                                  fontSize: "20px",
                                }}
                              >
                                <span
                                  style={{
                                    fontStyle: "italic",
                                    marginRight: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Total :{" "}
                                </span>

                                {(aTicket.price.amount / 100).toFixed(2)}
                                {aTicket.price.currency}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {aTicket.payments ? (
                              aTicket.payments.map((aPayment, index) => {
                                return aTicket.price.amount / 100 ==
                                  aData.total_sumItem(aTicket) ? (
                                  <TableRow
                                    key={index}
                                    style={{
                                      backgroundColor: "#34c73a1c",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {(() => {
                                      if (aPayment.name == "Espèces") {
                                        return (
                                          <TableCell>
                                            <FontAwesomeIcon
                                              icon={faMoneyBillAlt}
                                              className="paiement_icon"
                                            />
                                            {aPayment.name}
                                          </TableCell>
                                        );
                                      } else if (
                                        aPayment.name == "Carte de crédit" ||
                                        aPayment.name == "Titre restaurant"
                                      ) {
                                        return (
                                          <TableCell>
                                            <FontAwesomeIcon
                                              icon={faCreditCard}
                                              className="paiement_icon"
                                            />
                                            {aPayment.name}
                                          </TableCell>
                                        );
                                      } else if (
                                        aPayment.name == "Avoir" ||
                                        aPayment.name == "Poporder" ||
                                        aPayment.name == "Compte client"
                                      ) {
                                        return (
                                          <TableCell>
                                            <FontAwesomeIcon
                                              icon={faHandHoldingUsd}
                                              className="paiement_icon"
                                            />
                                            {aPayment.name}
                                          </TableCell>
                                        );
                                      } else if (aPayment.name == "Chèque") {
                                        return (
                                          <TableCell>
                                            <FontAwesomeIcon
                                              icon={faMoneyCheckAlt}
                                              className="paiement_icon"
                                            />
                                            {aPayment.name}
                                          </TableCell>
                                        );
                                      } else {
                                        return (
                                          <TableCell>
                                            <FontAwesomeIcon
                                              icon={faMoneyBillAlt}
                                              className="paiement_icon"
                                            />
                                            {aPayment.name}
                                          </TableCell>
                                        );
                                      }
                                    })()}
                                    <TableCell />
                                    <TableCell />
                                    <TableCell align="right">
                                      {(aPayment.amount / 100).toFixed(2)}
                                      {aPayment.currency}
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  <>
                                    <TableRow
                                      key={index}
                                      style={{
                                        backgroundColor: "#34c73a1c",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <TableCell>{aPayment.name}</TableCell>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell align="right">
                                        {(aPayment.amount / 100).toFixed(2)}
                                        {aPayment.currency}
                                      </TableCell>
                                    </TableRow>

                                    <TableRow
                                      key={index}
                                      style={{
                                        backgroundColor: "#ffcfcf",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <TableCell>
                                        Reste à payer :{" "}
                                        <span style={{ fontSize: "18px" }}>
                                          {aTicket.price.amount / 100 -
                                            aData.total_sumItem(aTicket)}{" "}
                                          €
                                        </span>
                                      </TableCell>
                                      <TableCell />
                                      <TableCell />

                                      <TableCell />
                                    </TableRow>
                                  </>
                                );
                              })
                            ) : (
                              <TableRow
                                style={{
                                  backgroundColor: "#ffcfcf",
                                  marginBottom: "10px",
                                }}
                                key={index}
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
                                    {(row.price.amount / 100).toFixed(2)}
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
                  <section>
                    <Card className="card-RealTime" key={index}>
                      <CardHeader
                        className="cardHeaderShadowStyles"
                        title={"Equipe"}
                      />
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="h3"
                          color="textSecondary"
                        >
                          <Avatar className="avatar" src="/broken-image.jpg" />

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
                  </section>
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

const mapStateToProps = (state: RealTimeState): LinkStateProp => ({
  RealTimedata: state.RealTimedata,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, RealTimeAction>
) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeVue);
