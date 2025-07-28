import React from 'react';
import ReactDOM from 'react-dom';

import { clientsArr } from './Clients.js';
import ClientList from './components/ClientList.js';
import FilterButtons from './components/FilterButtons.js';
import mobileEvents from './Events.js';
import './main.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clients: clientsArr,
      filter: 'all',
      editingClients: new Set(),
    };
  }

  componentDidMount() {
    mobileEvents.on('delete', this.deleteClient);
    mobileEvents.on('edit', this.editClient);
    mobileEvents.on('add', this.addClient);
    mobileEvents.on('changeFilter', this.changeFilter);
    mobileEvents.on('startEdit', this.startEditClient);
  }

  componentWillUnmount() {
    mobileEvents.removeAllListeners();
  }

  deleteClient = (id) => {
    const newClients = this.state.clients.filter(c => c.id !== id);
    this.setState(state => {
      const newEditing = new Set(state.editingClients);
      newEditing.delete(id);
      return {
        clients: newClients,
        editingClients: newEditing,
      };
    });
  };

  editClient = (id, surname, firstName, patronymic, balance) => {
    const newClients = this.state.clients.map(c => {
      if (c.id === id) {
        return { ...c, surname, firstName, patronymic, balance: +balance };
      }
      return c;
    });
    this.setState(state => {
      const newEditing = new Set(state.editingClients);
      newEditing.delete(id);
      return {
        clients: newClients,
        editingClients: newEditing,
      };
    });
  };

  addClient = () => {
    const newId = this.state.clients.length > 0
      ? Math.max(...this.state.clients.map(c => c.id)) + 1
      : 1;
    const newClient = {
      id: newId,
      surname: '',
      firstName: '',
      patronymic: '',
      balance: 0,
    };
    this.setState(state => ({
      clients: [...state.clients, newClient],
      editingClients: new Set(state.editingClients).add(newId),
    }));
  };

  startEditClient = (id) => {
    this.setState(state => ({
      editingClients: new Set(state.editingClients).add(id),
    }));
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getFilteredClients() {
    const { clients, filter } = this.state;
    if (filter === 'blocked') return clients.filter(c => c.balance < 0);
    if (filter === 'active') return clients.filter(c => c.balance >= 0);
    return clients;
  }

  render() {
    console.log('App render');

  return (
      <React.Fragment>
        <FilterButtons />
        <ClientList clients={this.getFilteredClients()} editingClients={this.state.editingClients}/>
        <button onClick={() => mobileEvents.emit('add')} style={{ marginTop: '20px' }}>Добавить клиента</button>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
