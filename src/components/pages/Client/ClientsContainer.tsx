import React, { FC, useEffect, createRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuccess } from "../../../store/actions/authActions";
import store, { RootState } from "../../../store";
import CreateClient from "./CreateClient";
import { DisplayClient } from "./DisplayClient";
import { ClientModel, DataState, DataAction } from "../../../store/types";
import { ThunkDispatch } from "redux-thunk";
import { addClient } from "../../../store/actions/dataActions";

interface displayClientProps {
  id?: string;
  color?: string;
}

interface HomePageState {}

type Props = displayClientProps & LinkDispatchProps & LinkStateProp;

const ClientsContainer: FC<Props> = () => {
  const { user, success } = useSelector((state: RootState) => state.auth);
  const { ClientData } = useSelector((state: RootState) => state.data);
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
  ClientData: ClientModel[];
}

interface LinkDispatchProps {
  addClient: (client: ClientModel) => void;
}

const mapStateToProps = (
  state: DataState,
  props: displayClientProps
): LinkStateProp => ({
  ClientData: state.ClientData,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DataAction>,
  props: displayClientProps
): LinkDispatchProps => ({
  addClient: bindActionCreators(addClient, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);
