import React, { Component } from "react";
import './style.css';
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      items: { name: "", mail: "", id: "" },
      myData: [
        { name: "1", mail: "1", id: 1 },
        { name: "2", mail: "2", id: 2 },
        { name: "3", mail: "3.", id: 3 },
        { name: "4", mail: "4.", id: 4 },
        { name: "5", mail: "5", id: 5 }
      ],
      toEditIndex :0
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editModeStatus = this.editModeStatus.bind(this);
    // this.handleInputEdit = this.handleInputEdit.bind(this);
  }
  /* will handle every change on input */
  editModeStatus(){
    let buttonInnerText;
    if(this.state.editMode=== true){
  buttonInnerText= "update "    
    }
    if(this.state.editMode=== false){
      buttonInnerText= "add"
  }
  return buttonInnerText;
  }
  handleChangeInput(e) {
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
  /* will handle Create part of CRUD => Add new data to array */
  handleSubmit(e) {
    if (this.state.editMode === false) {
      e.preventDefault();
      this.state.myData.push(this.state.items);
      this.setState({ items: { name: "", mail: "", id: "" } });
    }
    if (this.state.editMode === true) {
      console.log('updated')
      // this.setState({ myData:  });
    // this.setState({ toEditIndex: 0 });

      this.setState({ editMode: false  });
    }
  }
  /* will find the clicked list item of html tags inside the render method */

  findClickedIndex(id) {
    const index = this.state.myData.findIndex(item => item.id === id);
    return index;
  }
  /* will recieve the id of selected Element and delete it */
  handleDelete(id) {
    this.setState({ myData: this.state.myData.filter(item => item.id !== id) });
    this.state.myData.splice(this.findClickedIndex(id), 1);
  }
  /* will recieve the id of selected Element and edit it */
  handleEdit(id) {
    this.setState({ editMode: true  });
    const obj=this.state.myData[this.findClickedIndex(id)];
    this.setState({ items: { name: obj.name, mail: obj.mail, id: obj.id } });
    const index =this.findClickedIndex(id);
    this.setState({ toEditIndex: index });
  }
  render() {
    return (
      <>
        <form action="" onSubmit={this.handleSubmit}>
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
         
          <button id={this.editModeStatus()}>{this.editModeStatus()}</button>
        </form>

        <ol>
          {this.state.myData.map((el, id) => (
            <li key={id}>
              {el.name} /{el.mail}
              <button id="edit" onClick={() => this.handleEdit(el.id)}>
                Edit
              </button>
              <button id="delete" onClick={() => this.handleDelete(el.id)}>
                Delete
              </button>
            </li>
          ))}
        </ol>
      </>
    );
  }
}

export default Template;
