import React from "react";
import ClientRow from "./ClientRow";

class ClientList extends React.PureComponent {
  render() {
    console.log("ClientList render");

    const headerRow = React.createElement(
      "tr",
      null,
      React.createElement("th", null, "Фамилия"),
      React.createElement("th", null, "Имя"),
      React.createElement("th", null, "Отчество"),
      React.createElement("th", null, "Баланс"),
      React.createElement("th", null, "Статус"),
      React.createElement("th", null, "Редактировать"),
      React.createElement("th", null, "Удалить")
    );

    const thead = React.createElement("thead", null, headerRow);

    const bodyRows = this.props.clients.map(client =>
      React.createElement(ClientRow, {
        key: client.id,
        client: client,
        isEditing: this.props.editingClients.has(client.id),
      })
    );

    const tbody = React.createElement("tbody", null, bodyRows);

    return React.createElement("table", null, thead, tbody);
  }
}

export default ClientList;