import React from "react";
import mobileEvents from "../Events";

class ClientRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.surnameRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.patronymicRef = React.createRef();
    this.balanceRef = React.createRef();

    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleStartEdit() {
    mobileEvents.emit('startEdit', this.props.client.id);
  }

  handleSaveClick() {
    mobileEvents.emit(
      'edit',
      this.props.client.id,
      this.surnameRef.current.value,
      this.firstNameRef.current.value,
      this.patronymicRef.current.value,
      parseFloat(this.balanceRef.current.value)
    );
  }

  handleDelete() {
    mobileEvents.emit('delete', this.props.client.id);
  }

  render() {
    console.log('ClientRow render', this.props.client.id);

    const client = this.props.client;
    const status = client.balance >= 0 ? "Active" : "Disable";
    const isEditing = this.props.isEditing;

    const inputClass = isEditing ? "visible-input cell-input" : "hidden-input";

    const editButton = isEditing
      ? React.createElement('button', { onClick: this.handleSaveClick, className: "action-button edit-button" }, 'Сохранить')
      : React.createElement('button', { onClick: this.handleStartEdit, className: "action-button edit-button" }, 'Редактировать');

    return React.createElement(
      "tr",
      { className: "client-row" },
      React.createElement("td", null,
        !isEditing ? client.surname : React.createElement("input", { defaultValue: client.surname, ref: this.surnameRef, className: inputClass })
      ),
      React.createElement("td", null,
        !isEditing ? client.firstName : React.createElement("input", { defaultValue: client.firstName, ref: this.firstNameRef, className: inputClass })
      ),
      React.createElement("td", null,
        !isEditing ? client.patronymic : React.createElement("input", { defaultValue: client.patronymic, ref: this.patronymicRef, className: inputClass })
      ),
      React.createElement("td", null,
        !isEditing ? client.balance : React.createElement("input", { defaultValue: client.balance, ref: this.balanceRef, type: "number", className: inputClass + " balance-input" })
      ),
      React.createElement("td", { className: `status-cell ${status === "Active" ? "status-active" : "status-disabled"}` }, status),
      React.createElement("td", null, editButton),
      React.createElement("td", null,
        React.createElement("button", { onClick: this.handleDelete, className: "action-button delete-button" }, "Удалить")
      )
    );
  }
}

export default ClientRow;
