import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import Header from "./components/sections/Header";
import SignIn from "./components/pages/SignIn";
import Homepage from "./components/pages/Homepage";
import RealTime from "./components/pages/RealTime/Real_time";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Loader from "./components/UI/Loader";
import firebase from "./firebase/config";
import { setLoading } from "./store/actions/authActions";
import { setClientData } from "./store/actions/clientActions";
import { setRealTimeData } from "./store/actions/realTimeAction";
import { setReservationData } from "./store/actions/reservationAction";
import { RootState } from "./store";
import "./file.css";
import ClientsContainer from "./components/pages/Client/ClientsContainer";
import RealTimeContainer from "./components/pages/RealTime/RealTime_container";
import ReservationContainer from "./components/pages/Reservation/Reservation_container";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        dispatch(setRealTimeData(user.uid));
        dispatch(setClientData(user.uid));
        dispatch(setReservationData(user.uid));
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PrivateRoute path="/clients" component={ClientsContainer} exact />
        <PrivateRoute path="/real_time" component={RealTimeContainer} exact />
        <PrivateRoute
          path="/reservation"
          component={ReservationContainer}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
