import React, { FC, useEffect, createRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import { RootState } from "../../../store";
import CreateClient from "./CreateClient";
import { DisplayClient } from "./DisplayClient";
import { ClientState, ClientAction } from "../../../store/types/ClientTypes";
import { ThunkDispatch } from "redux-thunk";
import { addClient } from "../../../store/actions/clientActions";
import Client from "../../../store/model/ClientModel";

interface displayClientProps {
  id?: string;
  color?: string;
  ClientData: Client[];
}

interface HomePageState {}

type Props = displayClientProps & LinkDispatchProps & LinkStateProp;

const ClientsContainer: FC<Props> = () => {
  const { user, success } = useSelector((state: RootState) => state.auth);
  const { ClientData } = useSelector((state: RootState) => state.client);
  const [open, setOpen] = React.useState(false);
  const modalCreateElement = React.createRef<CreateClient>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="dashboard_container">
      <DisplayClient ClientData={ClientData} />
    </section>
  );
};

interface LinkStateProp {
  ClientData: Client[];
}

interface LinkDispatchProps {
  addClient: (client: Client) => void;
}

const mapStateToProps = (
  state: ClientState,
  props: displayClientProps
): LinkStateProp => ({
  ClientData: state.ClientData,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ClientAction>,
  props: displayClientProps
): LinkDispatchProps => ({
  addClient: bindActionCreators(addClient, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);
