import React, { Component } from "react";
import Table from "./../components/Table/Table";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Icon from "@material-ui/core/Icon";
import style from "./ContactList.module.css";
import ContactModal from "./../components/ContactModal/ContactModal";
import { idGenerator, dataFormatter } from "../utils";
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
  {
    label: "",
    value: "edit",
    width: "5%",
  },
  {
    label: "",
    value: "delete",
    width: "5%",
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
    modalState: false,
    contactIds: [],
    editData: "",
    type: "create",
  };
  componentDidMount() {
    fetch("https://run.mocky.io/v3/f152ba0e-640b-4e5e-a8d9-98d276880146")
      .then((res) => res.json())
      .then((result) => {
        this.setState(
          {
            dbData: dataFormatter(result),
            contactIds: result.map((data) => data.id),
          },
          () => {
            this.formatData();
          }
        );
      });
  }
  handleDelete = (id) => {
    let contactIds = this.state.contactIds.filter((data) => {
      return data !== id;
    });
    let dbData = { ...this.state.dbData };
    delete dbData[id];
    this.setState({ dbData, contactIds, modalState: false }, () => {
      this.formatData();
    });
  };
  handleEdit = (id) => {
    const { dbData } = this.state;
    this.selectedId = id;
    this.setState({ modalState: true, editData: dbData[id], type: "edit" });
  };
  formatData = () => {
    const { dbData, contactIds } = this.state;
    let formattedData = contactIds.map((ids) => {
      let data = dbData[ids];
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
        edit: {
          value: (
            <span
              onClick={() => {
                this.handleEdit(data.id);
              }}
            >
              <Icon>create</Icon>
            </span>
          ),
        },
        delete: {
          value: (
            <span
              onClick={() => {
                this.handleDelete(data.id);
              }}
            >
              <Icon>delete</Icon>
            </span>
          ),
        },
      };
    });
    this.setState({ formattedData }, () => {
      this.setState({ loading: true, modalState: false });
    });
  };
  handleContactModal = (type) => {
    if (type === "close") {
      this.setState({ modalState: false });
    } else {
      this.setState({ modalState: true, type: "create" });
    }
  };
  updateData = (data, type) => {
    if (type === "edit") {
      let dbData = { ...this.state.dbData };
      dbData[this.selectedId] = data;
      this.setState({ dbData, modalState: false }, () => {
        this.formatData();
      });
    } else {
      console.log(data);
      let newId = idGenerator(this.state.contactIds);
      let dbData = Object.assign({}, this.state.dbData, {
        [newId]: Object.assign(data, { id: newId }),
      });
      let contactIds = [...this.state.contactIds];
      contactIds.push(newId);
      this.setState({ dbData, contactIds }, () => {
        this.formatData();
      });
    }
  };
  render() {
    const {
      dbData,
      formattedData,
      loading,
      modalState,
      type,
      editData,
    } = this.state;
    return loading ? (
      <div className={style["container"]}>
        {modalState && (
          <ContactModal
            handleContactModal={this.handleContactModal}
            updateData={this.updateData}
            type={type}
            data={editData}
          />
        )}
        <div className={style["container_header"]}>
          <div className={style["container_header--left"]}>
            <div>
              <Icon style={{ fontSize: "32px" }}>contact_page</Icon>
            </div>
            <div>
              <h2>Contacts</h2>
              <p>Welcome to flatCRM page</p>
            </div>
          </div>
          <div className={style["container_header--right"]}>
            <label>Sort by:</label>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
        <div className={style["container_subheader"]}>
          <div style={{ position: "relative", width: "240px" }}>
            <input type="text" placeholder="Search contacts" />
            <span className={style["input_icon"]}>
              <Icon>search</Icon>
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                this.handleContactModal("create");
              }}
            >
              + Add Contact
            </button>
          </div>
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
