import React, { Component } from "react";
import style from "./DetailView.module.css";
import Avatar from "./../Avatar/Avatar";
import Icon from "@material-ui/core/Icon";
const DetailView = ({ show, data, handleClose }) => {
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
      </span>
      <div className={style["detail_avatar"]}>
        <Avatar text={data.first_name} size="84px" />
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
        <div className={style["detail_field_data"]}>{data.company}</div>
      </div>
      <div className={style["detail_field"]}>
        <div className={style["detail_field_label"]}>Address:</div>
        <div className={style["detail_field_data"]}>{data.address1}</div>
      </div>
    </div>
  );
};

export default DetailView;
