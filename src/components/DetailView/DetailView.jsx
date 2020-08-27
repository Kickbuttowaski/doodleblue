import React, { Component } from "react";
import style from "./DetailView.module.css";
import Avatar from "./../Avatar/Avatar";
import Icon from "@material-ui/core/Icon";
import { addressBuilder } from "../../utils";

const DetailView = ({ show = false, data, handleClose }) => {
  let showView = show ? style.container : style.container_hide;
  return (
    <div className={showView}>
      <span
        onClick={() => {
          handleClose();
        }}
        className={style["modal--close"]}
      >
        <Icon>close</Icon>
      </span>{" "}
      <div className={style["detail_avatar"]}>
        <Avatar text={data.first_name + " " + data.last_name} size="84px" />
      </div>
      <div className={style["detail_title"]}>
        {data.first_name + " " + data.last_name}
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Full Name:</div>
        <div className={style["detail_field_data"]}>{data.first_name}</div>
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Email:</div>
        <div className={style["detail_field_data"]}>{data.email}</div>
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Phone:</div>
        <div className={style["detail_field_data"]}>{data.phone}</div>
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Company:</div>
        <div className={style["detail_field_data"]}>{data.company || "-"}</div>
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Address:</div>
        <div className={style["detail_field_data"]}>
          {addressBuilder(
            data.address1,
            data.address2,
            data.city,
            data.country
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;

DetailView.defaultProps = {
  data: {
    first_name: "Jake",
    last_name: "Jake",
    email: "jake@gmail.com",
    phone: "9710644621",
    company: "infosys",
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
};
