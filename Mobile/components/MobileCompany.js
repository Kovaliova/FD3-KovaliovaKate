import React from 'react';
import { connect } from 'react-redux';
import { fetchClients, addClient, editClient, deleteClient } from '../store/clientsSlice';
import ClientList from './ClientList';
import FilterButtons from './FilterButtons';
import mobileEvents from '../Events';

class MobileCompany extends React.PureComponent {
  state = { filter: 'all', editingClients: new Set() };

  componentDidMount() {
    this.props.dispatch(fetchClients());

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
    this.props.dispatch(deleteClient(id));
    this.setState((state) => {
      const newEditing = new Set(state.editingClients);
      newEditing.delete(id);
      return { editingClients: newEditing };
    });
  };

  editClient = (id, surname, firstName, patronymic, balance) => {
    this.props.dispatch(editClient({ id, surname, firstName, patronymic, balance: +balance }));
    this.setState((state) => {
      const newEditing = new Set(state.editingClients);
      newEditing.delete(id);
      return { editingClients: newEditing };
    });
  };

  addClient = () => {
    const { clients } = this.props;
    const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClient = { id: newId, surname: '', firstName: '', patronymic: '', balance: 0 };
    this.props.dispatch(addClient(newClient));
    this.setState((state) => ({
      editingClients: new Set(state.editingClients).add(newId),
    }));
  };

  startEditClient = (id) => {
    this.setState((state) => ({
      editingClients: new Set(state.editingClients).add(id),
    }));
  };

  changeFilter = (filter) => this.setState({ filter });

  getFilteredClients() {
    const { clients } = this.props;
    const { filter } = this.state;

    if (!clients) return [];
    if (!Array.isArray(clients)) return [];

    if (filter === 'blocked') return clients.filter(c => c.balance < 0);
    if (filter === 'active') return clients.filter(c => c.balance >= 0);
    return clients;
  }

  render() {
    const { companyName, status, clients, error } = this.props;
    const { editingClients } = this.state;

    console.log('MobileCompany render');
    console.log('Status:', status);
    console.log('Clients from props:', clients);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    const filteredClients = this.getFilteredClients();

    return (
      <React.Fragment>
        <h2>{companyName || 'Компания'}</h2>
        <FilterButtons />

        {filteredClients.length > 0 ? (
          <ClientList clients={filteredClients} editingClients={editingClients} />
        ) : (
          <p>No clients available</p>
        )}

        <button onClick={this.addClient} style={{ marginTop: '20px' }}>
          Добавить клиента
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  companyName: state.clients.companyName,
  clients: state.clients.clients || [],
  status: state.clients.status,
  error: state.clients.error,
});

export default connect(mapStateToProps)(MobileCompany);