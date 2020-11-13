import React, { Component, ChangeEvent } from "react";
import {
  AccountCircle,
  Email,
  Phone,
  LocationOn,
  LocationCity,
  Public,
  BusinessCenter,
} from "@material-ui/icons/";
import { InputAdornment, TextField, withStyles } from "@material-ui/core";
import Client from "../../../../store/model/ClientModel";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#6fc597",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#6fc597",
    },
    "&.MuiInput-underline": {
      color: "#6fc597",
      borderBottomColor: "#6fc597",
    },
    "&.MuiInput-underline:before": {
      color: "#6fc597",
      borderBottomColor: "#6fc597",
    },
    "&.MuiInputBase-root": {
      color: "#6fc597",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#6fc597",
      },
      "&:hover fieldset": {
        borderColor: "#6fc597",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6fc597",
      },
    },
  },
})(TextField);

interface Props {
  client?: Client;
  id?: string;
  confirm?: (client: Client) => void;
  submit?: (client: Client) => void;
}

interface ClientState {
  showMo?: boolean;
  client?: ClientData | {} | any;
}

export default class FormClient extends Component<Props, ClientState> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      client: this.props.client ? this.props.client.toJS() : {},
      showMo: true,
    };
  }

  manageClient = () => {
    // event.preventDefault();

    //update client
    if (this.props.client) {
      console.log("yes");
      const selectedClient = this.state.client;
      const client = this.props.client
        .set("address", selectedClient.address)
        .set("addressComplement", selectedClient.addressComplement)
        .set("city", selectedClient.city)
        .set("comment", selectedClient.comment)
        .set("company", selectedClient.company)
        .set("company_number", selectedClient.company_number)
        .set("country", selectedClient.country)
        .set("email", selectedClient.email)
        .set("name", selectedClient.name)
        .set("phone", selectedClient.phone)
        .set("zip", selectedClient.zip);

      this.props.submit(client);

      //  create client
    } else {
      const client = new Client(this.state.client);
      this.props.confirm(client);
    }

    this.setState({
      showMo: !this.state.showMo,
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let clientInfos = this.state.client;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    clientInfos[name] = value;
    this.setState({
      client: clientInfos,
    });
  };

  render() {
    return (
      <div>
        <h2 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          Identité :
        </h2>

        <CssTextField
          label="Nom & prénom"
          defaultValue={this.props.client ? this.props.client.name : ""}
          onChange={this.handleChange}
          name="name"
          required={true}
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <br />
        <div className="form-template">
          <CssTextField
            label="Email"
            defaultValue={this.props.client ? this.props.client.email : ""}
            onChange={this.handleChange}
            name="email"
            className="control-form"
            margin="dense"
            type="email"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <CssTextField
            label="Téléphone"
            defaultValue={this.props.client ? this.props.client.phone : ""}
            onChange={this.handleChange}
            className="control-form"
            name="phone"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <br />
        <h2 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          Correspondance :
        </h2>
        <CssTextField
          label="Adresse"
          defaultValue={this.props.client ? this.props.client.address : ""}
          onChange={this.handleChange}
          name="address"
          margin="dense"
          multiline
          fullWidth
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <CssTextField
          label="Complément d'adresse"
          defaultValue={
            this.props.client ? this.props.client.addressComplement : ""
          }
          onChange={this.handleChange}
          name="addressComplement"
          margin="dense"
          multiline
          fullWidth
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <div className="form-template">
          <CssTextField
            label="Ville"
            defaultValue={this.props.client ? this.props.client.city : ""}
            onChange={this.handleChange}
            name="city"
            className="control-form"
            margin="dense"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <CssTextField
            label="Code postal"
            defaultValue={this.props.client ? this.props.client.zip : ""}
            onChange={this.handleChange}
            name="zip"
            className="control-form"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
          <br />
        </div>
        <CssTextField
          label="Pays"
          defaultValue={this.props.client ? this.props.client.country : ""}
          onChange={this.handleChange}
          name="country"
          className="control-form"
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <Public />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <h2 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          A propos :
        </h2>
        <div className="form-template">
          <CssTextField
            label="Société"
            defaultValue={this.props.client ? this.props.client.company : ""}
            onChange={this.handleChange}
            name="company"
            className="control-form"
            margin="dense"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <BusinessCenter />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <CssTextField
            label="Numéro de société"
            defaultValue={
              this.props.client ? this.props.client.company_number : ""
            }
            onChange={this.handleChange}
            name="company_number"
            className="control-form"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ color: "#6fc597" }}>
                  <BusinessCenter />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <CssTextField
          label="Commentaire"
          multiline
          rows="3"
          defaultValue={this.props.client ? this.props.client.comment : ""}
          name="comment"
          onChange={this.handleChange}
          fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#6fc597" }}>
                <BusinessCenter />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}
