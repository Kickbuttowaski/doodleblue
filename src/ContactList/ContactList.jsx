import React, { Component } from "react";
import Table from "./../components/Table/Table";
// import { data } from "./../utils/sampledata";

const tableTemplate = [
  {
    label: "icon",
    value: "checkbox",
  },
  {
    label: "Basic Info",
    value: "name",
  },
  {
    label: "Company",
    value: "company",
  },
];
const tempData = [
  {
    name: { value: "Jake" },
    email: "jake@gmail.com",
    phone: "9710644621",
    company: { value: "infosys" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: { value: "Amy" },
    email: "amy96@gmail.com",
    phone: "9710644621",
    company: { value: "tcs" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: { value: "Peralta" },
    email: "peralta@gmail.com",
    phone: "9710644621",
    company: { value: "zen mode" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: { value: "Santiago" },
    email: "santiago96@gmail.com",
    phone: "9710644621",
    company: { value: "brooklyn99" },
    address1: "sampel line 1",
    address2: "sampel line 1",
    city: "Chennai",
    country: "India",
  },
  {
    name: { value: "Hitchcock" },
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
    dbData: tempData,
  };
  render() {
    const { dbData } = this.state;

    return (
      <div>
        <Table dbData={tempData} tableData={tableTemplate} />
      </div>
    );
  }
}

export default ContactList;
