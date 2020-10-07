import React, { FC, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess, getOldData } from "../../store/actions/authActions";
import store, { RootState } from "../../store";

const Dashboard: FC = () => {
  const { user, success, data } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="is-size-1">Ici le dashboard , Welcome {user?.uid}</h1>
        <h2>{data.device_name}</h2>
      </div>
    </section>
  );
};

export default Dashboard;
