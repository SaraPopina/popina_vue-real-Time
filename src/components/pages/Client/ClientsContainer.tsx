import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { RootState } from "../../../store";
import { DisplayClient } from "./DisplayClient";
import { ClientState, ClientAction } from "../../../store/types/ClientTypes";
import { ThunkDispatch } from "redux-thunk";
import {
  addClient,
  startRemoveClient,
} from "../../../store/actions/clientActions";

type Props = LinkDispatchProps & LinkStateProp & OwnProps;

export class ClientsContainer extends Component<Props> {
  render() {
    return (
      <section className="dashboard_container">
        <DisplayClient
          ClientData={this.props.ClientData}
          addClient={this.props.addAClient}
          startRemoveClient={this.props.startRemoveClient}
        />
      </section>
    );
  }
}

interface LinkStateProp {
  ClientData: ClientState;
}

interface LinkDispatchProps {
  addAClient: typeof addClient;
  startRemoveClient: typeof startRemoveClient;
}

interface OwnProps {}

const mapStateToProps = (state: RootState): LinkStateProp => {
  return { ClientData: state.client };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ClientAction>
): LinkDispatchProps => ({
  addAClient: bindActionCreators(addClient, dispatch),
  startRemoveClient: bindActionCreators(startRemoveClient, dispatch),
});

export default connect<LinkStateProp, LinkDispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ClientsContainer);
