import React from "react";
import style from "./BasicInfo.module.css";
import Avatar from "./../Avatar/Avatar";
const BasicInfo = ({ fname,lname, email }) => {
  return (
    <div className={style["container"]}>
      <div>
        {" "}
        <Avatar text={fname} size="48px" />
      </div>
      <div style={{ width: "100%" }}>
        <div className={style["basicInfo_name"]}>{fname}</div>
        <div className={style["basicInfo_email"]}>{email}</div>
      </div>
    </div>
  );
};

export default BasicInfo;
