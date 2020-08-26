import React, { Component } from "react";
import style from "./ContactModal.module.css";
import Icon from "@material-ui/core/Icon";

class ContactModal extends Component {
  state = {
    payload: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
    },
  };

  handleUserInput = (type, data) => {
    this.setState({
      payload: Object.assign({}, this.state.payload, { [type]: data }),
    });
  };

  handleSubmit = () => {
    const { payload } = this.state;
    const { updateData } = this.props;
    updateData(payload);
  };
  render() {
    const { handleContactModal } = this.props;
    const {
      first_name,
      last_name,
      email,
      phone,
      company,
      address1,
      address2,
      city,
      country,
    } = this.state.payload;
    return (
      <div className={style["container"]}>
        <div className={style["modal"]}>
          <span
            onClick={() => {
              handleContactModal("close");
            }}
            className={style["modal--close"]}
          >
            <Icon>close</Icon>
          </span>
          <div className={style["form_row"]}>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>First Name</label>
              <input
                type="text"
                placeholder="Firstname"
                value={first_name}
                onChange={(e) => {
                  this.handleUserInput("first_name", e.currentTarget.value);
                }}
              ></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Last Name</label>
              <input
                type="text"
                placeholder="Lastname"
                value={last_name}
                onChange={(e) => {
                  this.handleUserInput("last_name", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  this.handleUserInput("email", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => {
                  this.handleUserInput("phone", e.currentTarget.value);
                }}
              ></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Company</label>
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => {
                  this.handleUserInput("company", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                value={address1}
                onChange={(e) => {
                  this.handleUserInput("address1", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 2"
                value={address2}
                onChange={(e) => {
                  this.handleUserInput("address2", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  this.handleUserInput("city", e.currentTarget.value);
                }}
              ></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Country</label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  this.handleUserInput("country", e.currentTarget.value);
                }}
              ></input>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <center>
              <button onClick={this.handleSubmit}>Create</button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactModal;