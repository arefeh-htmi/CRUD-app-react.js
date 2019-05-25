import React, { Component } from "react";
import "./style.css";
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      items: { name: "", mail: "", id: "" },
      myData: [
        { name: "n1", mail: "m1", id: 1 },
        { name: "n2", mail: "m2", id: 2 },
        { name: "n3", mail: "m3.", id: 3 },
        { name: "n4", mail: "m4.", id: 4 },
        { name: "n5", mail: "m5", id: 5 }
      ],
      toEditId: 0,
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editModeStatus = this.editModeStatus.bind(this);
  }
  /* will handle every change on input */
  editModeStatus() {
    let buttonInnerText;
    if (this.state.editMode === true) {
      buttonInnerText = "update ";
    }
    if (this.state.editMode === false) {
      buttonInnerText = "add";
    }
    return buttonInnerText;
  }
  /* will find the clicked list item of html tags inside the render method */
  findClickedIndex(id) {
    const index = this.state.myData.findIndex(item => item.id === id);
    return index;
  }
  /* will handle changes on inputes on the page */
  handleChangeInput(e) {
    if (this.state.editMode === false) {
      const { name, value } = e.target;
      let newItems = {
        ...this.state.items,
        [name]: value,
        id: this.state.myData.length + 1
      };
      this.setState({
        ...this.state.items,
        items: newItems
      });
    }
    if (this.state.editMode === true) {
      const { name, value } = e.target;
      let newItems = {
        ...this.state.items,
        [name]: value,
        id: this.state.toEditId
      };
      this.setState({
        ...this.state.items,
        items: newItems
      });
    }
  }
  /* will handle Create part of CRUD => Add new data to array */
  handleSubmit(e) {
    if (this.state.editMode === false) {
      e.preventDefault();
      this.state.myData.push(this.state.items);
      console.log(this.state.myData);
      this.setState({ items: { name: "", mail: "", id: "" } });
    }
    if (this.state.editMode === true) {
      e.preventDefault();
      const id = this.state.toEditId;
      this.state.myData.splice(this.findClickedIndex(id), 1, this.state.items);
      this.setState({ items: { name: "", mail: "", id: "" } });
      this.setState({ editMode: false });
    }
  }
  /* will recieve the id of selected Element and delete it */
  handleDelete(id) {
    this.setState({ myData: this.state.myData.filter(item => item.id !== id) });
    this.state.myData.splice(this.findClickedIndex(id), 1);
  }
  /* will recieve the id of selected Element and edit it */
  handleEdit(id) {
    this.setState({ editMode: true });
    const obj = this.state.myData[this.findClickedIndex(id)];
    this.setState({ items: obj });
    this.setState({ toEditId: id });
  }
  render() {
    return (
      <>
        <form action="" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="name"
              placeholder="Name"
              name="name"
              value={this.state.items.name}
              onChange={this.handleChangeInput}
            />
          </div>
          <div>
            <label htmlFor="mail">Mail:</label>
            <input
              type="text"
              id="mail"
              className="mail"
              placeholder="Mail"
              name="mail"
              value={this.state.items.mail}
              onChange={this.handleChangeInput}
            />
          </div>

          <button id={this.editModeStatus()}>{this.editModeStatus()}</button>
        </form>

        <ol>
          <li style={{padding: `20px 260px 20px 0`}}>
            <span>Name</span>
            <span>Mail</span>
          </li>
          {this.state.myData.map((el, id) => (
            <li key={id} style={{padding: `20px 260px 20px 0`}}>
              <div>
              {el.name}
              </div>
              <div>
              {el.mail}
              </div>
              <div className="btnContainer" btncontainerwidth={
                console.log()}>
              <button id="edit" onClick={() => this.handleEdit(el.id)}>
                Edit
              </button>
              <button id="delete" onClick={() => this.handleDelete(el.id)}>
                Delete
              </button>
              </div>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default Template;
