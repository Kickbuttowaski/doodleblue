import React, { Component } from "react";
import Table from "./../components/Table/Table";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import Icon from "@material-ui/core/Icon";
import style from "./ContactList.module.css";
import ContactModal from "./../components/ContactModal/ContactModal";
import { idGenerator, dataFormatter } from "../utils";
import _ from "lodash";
import DetailView from "../components/DetailView/DetailView";

class ContactList extends Component {
  state = {
    dbData: "",
    formattedData: "",
    loading: false,
    modalState: false,
    contactIds: [],
    type: "create",
    searchValue: "",
    isOpen: false,
    sortOrder: { path: "fname", order: "asc" },
    showDetailView: false,
  };

  componentDidMount() {
    fetch("https://run.mocky.io/v3/67f48be9-8d09-454e-b682-ade577217f22")
      .then((res) => res.json())
      .then((result) => {
        this.setState(
          {
            dbData: dataFormatter(result),
            contactIds: result.map((data) => data.id),
          },
          () => {
            //this.handleTableTemplate();
            this.formatData();
          }
        );
      });
    this.tableTemplate = [
      {
        label: (
          <Icon style={{ color: "#696969", cursor: "pointer" }}>add_box</Icon>
        ),
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
        width: "15%",
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
  }
  handleSearch = (data) => {
    this.setState({
      searchValue: data,
    });
  };

  renderDropDown = () => {
    //In real scenairo, post request is made for every character typed and based on response the content is generated. Mocking it here
    const { dbData, contactIds, searchValue } = this.state;
    let returnData = [];
    contactIds.forEach((id) => {
      if (
        searchValue.length > 0 &&
        dbData[id].first_name.toLowerCase().includes(searchValue)
      ) {
        returnData.push(
          <div
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.handleRowData(dbData[id].id);
            }}
          >
            <BasicInfo
              size="32px"
              fname={dbData[id].first_name}
              lname={dbData[id].last_name}
              email={dbData[id].email}
            />
          </div>
        );
      }
    });

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
  handleEdit = (id, event) => {
    const { dbData } = this.state;
    this.selectedId = id;
    this.setState({ modalState: true, type: "edit" });
  };
  formatData = () => {
    //Storing the data in {id:data..} format so that it would easy to get the required data based on id
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
        company: { value: data.company || "-" },
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
        edit: {
          value: (
            <span
              onClick={(e) => {
                e.stopPropagation();
                this.handleEdit(data.id, e);
              }}
            >
              <Icon>create</Icon>
            </span>
          ),
        },
        delete: {
          value: (
            <span
              onClick={(e) => {
                e.stopPropagation();
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
      //In real case scenario the data will be posted and in response will get a ID, mocking it here.
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
    var sortOrder = {
      path: data,
      order: "asc",
    };

    this.setState({ sortOrder });
  };
  handleRowData = (id) => {
    this.selectedId = id;
    //this.handleTableTemplate("edit");
    this.setState({ showDetailView: true });
  };
  showDropdownMenu = () => {
    this.setState({ isOpen: !this.state.isOpen }, () =>
      document.addEventListener("click", this.hideDropdownMenu)
    );
  };
  hideDropdownMenu = () => {
    this.setState({ isOpen: false }, () =>
      document.removeEventListener("click", this.hideDropdownMenu)
    );
  };
  render() {
    const {
      dbData,
      formattedData,
      loading,
      modalState,
      type,
      isOpen,
      searchValue,
      sortOrder,
      showDetailView,
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
            data={dbData[this.selectedId]}
          />
        )}
        <div className={style["top_section"]}>
          <div className={style["container_header"]}>
            <div className={style["container_header--left"]}>
              <div>
                <Icon style={{ fontSize: "32px" }}>contact_page</Icon>
              </div>
              <div>
                <label>Contacts</label>
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
                type="text"
                placeholder="Search contacts"
                onClick={() => {
                  this.showDropdownMenu();
                }}
                onChange={(e) => {
                  this.handleSearch(e.currentTarget.value);
                }}
              />
              {isOpen && (
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
        </div>
        <div className={style["tabel_container"]}>
          <Table
            sortOrder={sortOrder}
            dbData={formattedData}
            tableData={this.tableTemplate}
            handleRowData={this.handleRowData}
          />

          <DetailView
            data={dbData[this.selectedId]}
            show={showDetailView}
            handleClose={() => {
              //this.handleTableTemplate();
              this.setState({ showDetailView: false });
            }}
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
