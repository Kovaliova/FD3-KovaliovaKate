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
    mobileEvents.emit("startEdit", this.props.client.id);
  }

  handleSaveClick() {
    mobileEvents.emit("edit", this.props.client.id, this.surnameRef.current.value, this.firstNameRef.current.value, this.patronymicRef.current.value, parseFloat(this.balanceRef.current.value));
  }

  handleDelete() {
    mobileEvents.emit("delete", this.props.client.id);
  }

  renderInputOrText(value, ref, type = "text") {
    const { isEditing } = this.props;
    if (!isEditing) {
      return value;
    }
    const className = type === "number" ? "visible-input balance-input" : "visible-input cell-input";
    return <input defaultValue={value} ref={ref} type={type} className={className} />;
  }

  render() {
    console.log("ClientRow render", this.props.client.id);

    const { client, isEditing } = this.props;
    const status = client.balance >= 0 ? "Active" : "Disable";

    const editButton = isEditing ? (
      <button onClick={this.handleSaveClick} className="action-button edit-button">Сохранить</button>
    ) : (<button onClick={this.handleStartEdit} className="action-button edit-button">Редактировать</button>);

    return (
      <tr className="client-row">
        <td>{this.renderInputOrText(client.surname, this.surnameRef)}</td>
        <td>{this.renderInputOrText(client.firstName, this.firstNameRef)}</td>
        <td>{this.renderInputOrText(client.patronymic, this.patronymicRef)}</td>
        <td>{this.renderInputOrText(client.balance, this.balanceRef, "number")}</td>
        <td className={`status-cell ${status === "Active" ? "status-active" : "status-disabled"}`}>
          {status}
        </td>
        <td>{editButton}</td>
        <td>
          <button onClick={this.handleDelete} className="action-button delete-button">Удалить</button>
        </td>
      </tr>
    );
  }
}

export default ClientRow;