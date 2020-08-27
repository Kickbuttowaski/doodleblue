import React, { Component } from "react";
import style from "./ContactModal.module.css";
import Icon from "@material-ui/core/Icon";
import { mailValidator } from "../../utils/index";
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
    error: {
      first_name: null,
      email: null,
      phone: null,
    },
  };
  componentDidMount() {
    const { data, type } = this.props;
    if (type === "edit") {
      this.setState({ payload: Object.assign({}, this.state.payload, data) });
    }
  }
  formValidator = () => {
    const { first_name, email, phone } = this.state.payload;
    let error = {
      first_name: null,
      email: null,
      phone: null,
    };
    let flag = true;
    if (first_name.trim().length === 0) {
      error.first_name = "First name cannot be empty";
      flag = false;
    } else if (first_name.trim().length < 2) {
      error.first_name = "First name should be atleast 2 characters";
      flag = false;
    }
    if (
      phone.toString().trim().length < 10 ||
      phone.toString().trim().length > 10
    ) {
      error.phone = "Please enter a valid phone number";
      flag = false;
    }
    if (!mailValidator(email)) {
      error.email = "Please enter a valid valid email";
      flag = false;
    }
    this.setState({ error: Object.assign({}, this.state.error, error) });
    return flag;
  };
  handleUserInput = (type, data) => {
    this.setState({
      payload: Object.assign({}, this.state.payload, { [type]: data }),
      error: Object.assign({}, this.state.error, { [type]: null }),
    });
  };

  handleSubmit = () => {
    const { payload } = this.state;
    const { updateData, type = "create" } = this.props;
    if (this.formValidator()) {
      updateData(payload, type);
    }
  };
  render() {
    const { handleContactModal, type } = this.props;
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
    const { error } = this.state;
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
              {error.first_name && (
                <p className={style["error_var"]}>{error.first_name}</p>
              )}
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
              {error.email && (
                <p className={style["error_var"]}>{error.email}</p>
              )}
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
              {error.phone && (
                <p className={style["error_var"]}>{error.phone}</p>
              )}
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
              <button onClick={this.handleSubmit}>
                {type === "edit" ? "Update" : "Create"}
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactModal;
