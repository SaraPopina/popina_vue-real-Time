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

const Dashboard: FC = () => {
  const { user, success, data } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  let newDateBegin = new Date(data.date_begin);
  let dateBegin = newDateBegin.toDateString();

  let newDateEnd = new Date(data.date_end);
  let dateEnd = newDateEnd.toDateString();

  console.log(data);

  const useStyles = makeStyles({
    table: {
      maxWidth: 500,
      width: 400,
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
        <h2 className="dashboard_realtime_title_date">Caisse du {dateBegin}</h2>
        <h2 className="dashboard_realtime_title_date">
          Dernière modification effectué à {dateEnd}{" "}
        </h2>
        <p>
          Rafraichissement de la page automatiquement à chaque changements sur
          votre ipad.
        </p>
        <div>
          <h3>Encaissements</h3>
          {data.tickets.map((aData, index) => {
            return (
              <div>
                <ul key={index}>
                  <li>
                    {" "}
                    <p>Payé</p>
                    <p>{aData.live_paid}</p>
                  </li>
                  <li>
                    <p>Annulé</p>
                    <p>{aData.cancelled}</p>
                  </li>
                  <li>
                    <p>Transféré</p>
                    <p>{aData.transferred}</p>
                  </li>
                  <li>
                    <h5>Total</h5>
                    {Object.values(aData.price).map((aPrice) => {
                      return (
                        <div>
                          <p>Ici le total {aPrice}</p>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <TableContainer component={Paper}>
          {data.tickets.map((aData) => {
            return (
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      Detail de la commande
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Produits</TableCell>
                    <TableCell align="right">Quantité</TableCell>
                    <TableCell align="right">Prix</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aData.items.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">
                        {row.price.amount / 100} {row.price.currency}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={4}>Subtotal</TableCell>
                    <TableCell align="right">Total //</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell align="right">
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
        </TableContainer>
        <div>
          <h3>Équipe</h3>
          <div>
            {data.team.map((aTeamMember) => {
              return (
                <div>
                  <p>{aTeamMember.name}</p>
                  <p>{aTeamMember.date_begin}</p>
                  <p>{aTeamMember.date_end}</p>
                </div>
              );
            })}
          </div>

          <div>
            <h3>Commandes</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
