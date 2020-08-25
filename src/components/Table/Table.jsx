import React, { Component } from "react";
import style from "./Table.module.css";

class Table extends Component {
  state = {};

  generateHeader = () => {
    const { tableData } = this.props;
    return tableData.map((data, i) => {
      return <th style={{ width: data.width }} key={i}>{data.label}</th>;
    });
  };
  generateBody = () => {
    const { dbData, tableData } = this.props;
    return dbData.map((data, i) => {
      return (
        <tr key={i + data.name}>
          {tableData.map(({ value, label,width, i }) => {
            if (value !== "checkbox" && "label" in data[value]) {
              return <td style={{ width: width }}>{data[value]["label"]}</td>;
            } else {
              if (value === "checkbox") {
                return <td style={{ width: width }} key={i + value}>{<input type="checkbox" />}</td>;
              } else {
                return <td style={{ width: width }} key={i + value}>{data[value]["value"]}</td>;
              }
            }
          })}
        </tr>
      );
    });
  };
  render() {
    const { dbData, tableData } = this.props;
    return (
      <div className={style["table_container"]}>
        <table>
          <thead>{this.generateHeader()}</thead>
          <tbody>{this.generateBody()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
