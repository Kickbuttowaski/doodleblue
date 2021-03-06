import React from "react";
import style from "./BasicInfo.module.css";
import Avatar from "./../Avatar/Avatar";
const BasicInfo = ({ fname, lname, email, size = "48px" }) => {
  return (
    <div className={style["container"]}>
      <div>
        {" "}
        <Avatar text={fname[0] + " " + lname.trim()} size={size} />
      </div>
      <div style={{ width: "100%" }}>
        <div className={style["basicInfo_name"]}>{fname + " " + lname}</div>
        <div className={style["basicInfo_email"]}>{email}</div>
      </div>
    </div>
  );
};

export default BasicInfo;
