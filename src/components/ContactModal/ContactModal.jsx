import React, { Component } from "react";
import style from "./ContactModal.module.css";
import Icon from "@material-ui/core/Icon";

class ContactModal extends Component {
  state = {};
  render() {
    const { handleContactModal } = this.props;
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
              <input type="text" placeholder="Firstname"></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Last Name</label>
              <input type="text" placeholder="Lastname"></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Email</label>
              <input type="text" placeholder="Email"></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Phone</label>
              <input type="text" placeholder="Phone"></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Company</label>
              <input type="text" placeholder="Company"></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Address line 1</label>
              <input type="text" placeholder="Address line 1"></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "100%" }}>
              <label className={style["form_label"]}>Address line 1</label>
              <input type="text" placeholder="Address line 2"></input>
            </div>
          </div>
          <div className={style["form_row"]}>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>State</label>
              <input type="text" placeholder="State"></input>
            </div>
            <div style={{ width: "50%" }}>
              <label className={style["form_label"]}>Country</label>
              <input type="text" placeholder="Country"></input>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <center>
              <button>Create</button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactModal;
