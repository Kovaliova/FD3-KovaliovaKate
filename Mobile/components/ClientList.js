import React from "react";
import ClientRow from "./ClientRow";

class ClientList extends React.PureComponent {
  render() {
    console.log("ClientList render");

    return (
      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {this.props.clients.map(client => (
            <ClientRow key={client.id} client={client} isEditing={this.props.editingClients.has(client.id)}/>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ClientList;