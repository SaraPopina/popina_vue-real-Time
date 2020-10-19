import React, { Component, ChangeEvent, FC, useState } from "react";
import {
  AccountCircle,
  Email,
  Phone,
  LocationOn,
  LocationCity,
  Public,
  BusinessCenter,
  Message,
} from "@material-ui/icons/";
import { InputAdornment, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { addClient } from "../../../../store/actions/dataActions";

interface Props {
  client?: {};
  confirm: (client: ClientState) => void;
}

interface ClientState {
  // userUid: "";
  // showMo: true;
  // required: true;
  address?: string;
  addressComplement?: string;
  city?: string;
  comment?: string;
  company?: string;
  company_number?: string;
  country?: string;
  email?: string;
  name?: string;
  phone?: string;
  zip?: string;
}

// const FormClient: FC<Props> = ({}) => {
export default class FormClient extends Component<Props, ClientState> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      address: "",
      addressComplement: "",
      city: "",
      comment: "",
      company: "",
      company_number: "",
      country: "",
      email: "",
      name: "",
      phone: "",
      zip: "",
    };
  }
  // création et modification de la fiche client Firebase depuis le Onclick button => CreateClient.jsx // UpdateClient.jsx
  manageClient = () => {
    // event.preventDefault();

    // //update client
    // if (this.props) {
    //   const selectedClient = this.state.client;

    //   const client = this.props.client
    //     .set("address", selectedClient.address)
    //     .set("addressComplement", selectedClient.addressComplement)
    //     .set("city", selectedClient.city)
    //     .set("comment", selectedClient.comment)
    //     .set("company", selectedClient.company)
    //     .set("company_number", selectedClient.company_number)
    //     .set("country", selectedClient.country)
    //     .set("email", selectedClient.email)
    //     .set("name", selectedClient.name)
    //     .set("phone", selectedClient.phone)
    //     .set("zip", selectedClient.zip);

    //   // this.props.submit(client);

    //   //  create client
    // } else {
    // const client = this.state.client;
    // }

    // this.setState({
    //   showMo: !this.state.showMo,
    // });
    console.log("on apelle le manage client ici");
    this.props.confirm(this.state);
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(name, value);
    this.setState({
      [name]: value, // no typing error
    });
  };

  // const { classes, client } = this.props;
  render() {
    console.log("ici le form", this.props, this.state);
    return (
      <div>
        <h2 style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          Identité :
        </h2>

        <TextField
          label="Nom & prénom"
          // defaultValue={ClientData ? name : ""}
          onChange={this.handleChange}
          name="name"
          required={true}
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <br />
        <div className="form-template">
          <TextField
            label="Email"
            //   defaultValue={ClientData ? email : ""}
            onChange={this.handleChange}
            name="email"
            className="control-form"
            margin="dense"
            type="email"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Téléphone"
            //   defaultValue={ClientData ? phone : ""}
            onChange={this.handleChange}
            className="control-form"
            name="phone"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
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
        <TextField
          label="Adresse"
          // defaultValue={ClientData ? address : ""}
          onChange={this.handleChange}
          name="address"
          margin="dense"
          multiline
          fullWidth
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          label="Complément d'adresse"
          // defaultValue={ClientData ? addressComplement : ""}
          onChange={this.handleChange}
          name="addressComplement"
          margin="dense"
          multiline
          fullWidth
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <div className="form-template">
          <TextField
            label="Ville"
            //   defaultValue={ClientData ? city : ""}
            onChange={this.handleChange}
            name="city"
            className="control-form"
            margin="dense"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            label="Code postal"
            //   defaultValue={ClientData ? zip : ""}
            onChange={this.handleChange}
            name="zip"
            className="control-form"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
          <br />
        </div>
        <TextField
          label="Pays"
          // defaultValue={ClientData ? country : ""}
          onChange={this.handleChange}
          name="country"
          className="control-form"
          margin="dense"
          multiline
          rows="2"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
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
          <TextField
            label="Société"
            //   defaultValue={ClientData ? company : ""}
            onChange={this.handleChange}
            name="company"
            className="control-form"
            margin="dense"
            multiline
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessCenter />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            label="Numéro de société"
            //   defaultValue={ClientData ? company_number : ""}
            onChange={this.handleChange}
            name="company_number"
            className="control-form"
            margin="dense"
            multiline
            type="number"
            rows="2"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessCenter />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TextField
          label="Commentaire"
          multiline
          rows="3"
          // defaultValue={ClientData ? comment : ""}
          name="comment"
          onChange={this.handleChange}
          fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessCenter />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

// export default FormClient;
