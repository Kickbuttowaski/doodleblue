import React, { Component } from "react";
import Table from "./../components/Table/Table";
import BasicInfo from "../components/BasicInfo/BasicInfo";
// import { data } from "./../utils/sampledata";
import style from "./ContactList.module.css";
const tableTemplate = [
  {
    label: "icon",
    value: "checkbox",
    width: "5%",
  },
  {
    label: "Basic Info",
    value: "fname",
    width: "20%",
  },
  {
    label: "Company",
    value: "company",
    width: "20%",
  },
];
const tempData = [
  {
    fname: { value: "Jake" },
    lname: { value: "Jake" },
    email: "jake@gmail.com",
    phone: "9710644621",
    company: { value: "infosys" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    fname: { value: "Amy" },
    lname: { value: "Jake" },
    email: "amy96@gmail.com",
    phone: "9710644621",
    company: { value: "tcs" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    fname: { value: "Peralta" },
    lname: { value: "Jake" },
    email: "peralta@gmail.com",
    phone: "9710644621",
    company: { value: "zen mode" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    fname: { value: "Santiago" },
    lname: { value: "Jake" },
    email: "santiago96@gmail.com",
    phone: "9710644621",
    company: { value: "brooklyn99" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    fname: { value: "Hitchcock" },
    lname: { value: "Jake" },
    email: "hitchkok96@gmail.com",
    phone: "9710644621",
    company: { value: "brooklyn93" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
];

class ContactList extends Component {
  state = {
    dbData: "",
    formattedData: "",
    loading: false,
  };
  componentDidMount() {
    fetch("https://run.mocky.io/v3/f152ba0e-640b-4e5e-a8d9-98d276880146")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ dbData: result }, () => {
          this.formatData();
        });
      });
  }
  formatData = () => {
    const { dbData } = this.state;
    let formattedData = dbData.map((data) => {
      return {
        id: { value: data.id },
        fname: {
          value: data.first_name,
          label: (
            <BasicInfo
              fname={data.first_name}
              lname={data.last_name}
              email={data.email}
            />
          ),
        },
        lname: { value: data.last_name },
        email: data.email,
        phone: data.phone,
        company: { value: data.company },
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
      };
    });
    this.setState({ formattedData }, () => {
      this.setState({ loading: true });
    });
  };
  render() {
    const { dbData, formattedData, loading } = this.state;
    return loading ? (
      <div className={style["container"]}>
        <div className={style["container_header"]}>
          <div className={style["container_header--left"]}>
            <div>ICON</div>
            <div>
              <h2>Contacts</h2>
              <p>Welcome to flatCRM page</p>
            </div>
          </div>
          <div>
            <label>Sort by:</label>
            <p>Date created</p>
          </div>
        </div>
        <div className={style['container_subheader']}>
            <div>Search bar</div>
            <div>Button</div>
        </div>
        <Table dbData={formattedData} tableData={tableTemplate} />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default ContactList;
// style={{ width: "700px" }}
