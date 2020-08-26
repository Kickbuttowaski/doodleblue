import React, { Component } from "react";
import Table from "./../components/Table/Table";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Icon from "@material-ui/core/Icon";
import style from "./ContactList.module.css";
import ContactModal from "./../components/ContactModal/ContactModal";
import { idGenerator, dataFormatter } from "../utils";
import _ from "lodash";
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
    searchValue: "",
    showDropDown: false,
    sortOrder: { path: "fname", order: "asc" },
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
  handleSearch = (data) => {
    this.setState({
      searchValue: data,
    });
  };
  renderDropDown = () => {
    const { dbData, contactIds, searchValue } = this.state;
    let returnData = [];
    contactIds.forEach((id) => {
      if (
        searchValue.length > 0 &&
        dbData[id].first_name.toLowerCase().includes(searchValue)
      ) {
        returnData.push(
          <div
            onClick={() => {
              console.log(dbData[id].id);
            }}
          >
            <BasicInfo
              size="32px"
              fname={dbData[id].first_name}
              email={dbData[id].email}
            />
          </div>
        );
      }
    });
    // let returnData = contactIds.map((id) => {
    //   if (dbData[id].first_name.toLowerCase().startsWith(searchValue)) {
    //     return <div>{dbData[id].first_name}</div>;
    //   }
    // });

    return returnData;
  };
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
  handleSortDropdown = (data) => {
    const { sortOrder } = this.state;

    var newSortOrder = "";
    if (sortOrder.path === data) {
      newSortOrder = {
        path: data,
        order: sortOrder.order === "asc" ? "desc" : "asc",
      };
    } else {
      newSortOrder = {
        path: data,
        order: "asc",
      };
    }
    this.setState({ sortOrder: newSortOrder });
  };
  render() {
    const {
      dbData,
      formattedData,
      loading,
      modalState,
      type,
      editData,
      showDropDown,
      searchValue,
      sortOrder,
    } = this.state;

    let dropDownData = this.renderDropDown();
    if (dropDownData.length <= 0 && searchValue.length > 0) {
      dropDownData = (
        <div className={style["dropdown_options--message"]}>
          Oops, No contact found
        </div>
      );
    } else if (dropDownData.length <= 0) {
      dropDownData = (
        <div className={style["dropdown_options--message"]}>
          Type to start searching..
        </div>
      );
    }
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
            <select
              onChange={(e) => {
                this.handleSortDropdown(e.currentTarget.value);
              }}
            >
              <option value="fname">Name</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
        <div className={style["container_subheader"]}>
          <div style={{ position: "relative", width: "240px" }}>
            <input
              onFocus={() => {
                this.setState({ showDropDown: true });
              }}
              onBlur={() => {
                this.setState({ showDropDown: false });
              }}
              type="text"
              placeholder="Search contacts"
              onChange={(e) => {
                this.handleSearch(e.currentTarget.value);
              }}
            />
            {showDropDown && (
              <div className={style["dropdown_options"]}>{dropDownData}</div>
            )}
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
        <div style={{ maxWidth: "700px" }}>
          <Table
            sortOrder={sortOrder}
            dbData={formattedData}
            tableData={tableTemplate}
          />
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default ContactList;
// style={{ width: "700px" }}
