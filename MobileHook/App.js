import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store/store';
import { fetchClients, deleteClient, editClient, addClient } from './store/clientsSlice';

import ClientList from './components/ClientList';
import FilterButtons from './components/FilterButtons';
import mobileEvents from './Events';
import './main.css';

const AppComponent = () => {
  const clients = useSelector(state => state.clientsData.clients);
  const { status, error } = useSelector(state => state.clientsData);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [editingClients, setEditingClients] = useState(new Set());

  useEffect(() => { dispatch(fetchClients()); }, [dispatch]);

  const updateEditingClients = (id, action) => {
    setEditingClients(prev => {
      const newSet = new Set(prev);
      if (action === 'add') newSet.add(id);
      if (action === 'delete') newSet.delete(id);
      return newSet;
    });
  };

  useEffect(() => {
    const handlers = {
      delete: (id) => { dispatch(deleteClient(id)); updateEditingClients(id, 'delete'); },
      edit: (id, surname, firstName, patronymic, balance) => {
        dispatch(editClient({ id, surname, firstName, patronymic, balance: +balance }));
        updateEditingClients(id, 'delete');
      },
      startEdit: (id) => updateEditingClients(id, 'add'),
      changeFilter: setFilter
    };

    Object.entries(handlers).forEach(([event, fn]) => mobileEvents.on(event, fn));
    return () => mobileEvents.removeAllListeners();
  }, [dispatch]);

  const handleAddClient = () => {
    dispatch(addClient());
    const lastClient = store.getState().clientsData.clients.slice(-1)[0];
    if (lastClient) updateEditingClients(lastClient.id, 'add');
  };

  const getFilteredClients = () => {
    if (!clients) return [];
    if (filter === 'blocked') return clients.filter(c => c.balance < 0);
    if (filter === 'active') return clients.filter(c => c.balance >= 0);
    return clients;
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <React.Fragment>
      <FilterButtons />
      <ClientList clients={getFilteredClients()} editingClients={editingClients} />
      <button onClick={handleAddClient} style={{ marginTop: '20px' }}>
        Добавить клиента
      </button>
    </React.Fragment>
  );
};

ReactDOM.render(<Provider store={store}> <AppComponent /> </Provider>, document.getElementById('container'));