import React, { Component } from "react";
import style from "./Table.module.css";
import Icon from "@material-ui/core/Icon";
import _ from "lodash";
class Table extends Component {
  state = {
    loading: false,
  };

  generateHeader = () => {
    const { tableData } = this.state;
    return tableData.map((data, i) => {
      return (
        <th style={{ width: data.width }} key={i}>
          {data.label}
        </th>
      );
    });
  };
  handleRowClick = (data) => {
    //console.log(data);
  };

  componentDidMount() {
    const { dbData, tableData, sortOrder } = this.props;

    this.setState(
      {
        dbData: _.orderBy(dbData, `${sortOrder.path}.value`, sortOrder.order),
        tableData,
      },
      () => {
        this.setState({ loading: true });
      }
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { dbData, sortOrder } = this.props;

    if (!_.isEqual(dbData, prevProps.dbData)) {
      this.setState({ dbData });
    }
    if (dbData.length > prevProps.dbData.length) {
      this.setState({ dbData });
    }
    if (!_.isEqual(sortOrder, prevProps.sortOrder)) {
      this.setState({
        dbData: _.orderBy(dbData, `${sortOrder.path}.value`, sortOrder.order),
      });
    }
  }
  generateBody = () => {
    const { dbData, tableData } = this.state;
    return dbData.map((data, i) => {
      return (
        <tr key={i + data.name}>
          {tableData.map(({ value, label, width, i }) => {
            if (value !== "checkbox" && "label" in data[value]) {
              return (
                <td
                  onClick={() => {
                    this.handleRowClick(data["id"]["value"]);
                  }}
                  style={{ width: width }}
                >
                  {data[value]["label"]}
                </td>
              );
            } else {
              if (value === "checkbox") {
                return (
                  <td
                    onClick={() => {
                      this.handleRowClick(data["id"]["value"]);
                    }}
                    style={{ width: width }}
                    key={i + value}
                  >
                    {<input type="checkbox" />}
                  </td>
                );
              } else {
                return (
                  <td
                    onClick={() => {
                      this.handleRowClick(data["id"]["value"]);
                    }}
                    style={{ width: width }}
                    key={i + value}
                  >
                    {data[value]["value"]}
                  </td>
                );
              }
            }
          })}
        </tr>
      );
    });
  };
  render() {
    const { dbData, tableData } = this.props;
    const { loading } = this.state;
    return loading ? (
      <div className={style["table_container"]}>
        <table>
          <thead>{this.generateHeader()}</thead>
          <tbody>{this.generateBody()}</tbody>
        </table>
      </div>
    ) : (
      <div>loading..</div>
    );
  }
}

export default Table;
