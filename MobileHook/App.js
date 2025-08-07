import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { clientsArr } from './Clients.js';
import ClientList from './components/ClientList.js';
import FilterButtons from './components/FilterButtons.js';
import mobileEvents from './Events.js';
import './main.css';

const App = () => {
  const [clients, setClients] = useState(clientsArr);
  const [filter, setFilter] = useState('all');
  const [editingClients, setEditingClients] = useState(new Set());

  const deleteClient = useCallback((id) => {
    setClients((prevClients) => prevClients.filter(c => c.id !== id));
    setEditingClients((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const editClient = useCallback((id, surname, firstName, patronymic, balance) => {
    setClients((prevClients) =>  prevClients.map(c => c.id === id  ? { ...c, surname, firstName, patronymic, balance: +balance }  : c ));
    setEditingClients((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const addClient = useCallback(() => {
    setClients((prevClients) => {
      const newId = prevClients.length > 0
        ? Math.max(...prevClients.map(c => c.id)) + 1
        : 1;
      const newClient = {
        id: newId,
        surname: '',
        firstName: '',
        patronymic: '',
        balance: 0,
      };
      return [...prevClients, newClient];
    });

    setEditingClients((prev) => {
      const newSet = new Set(prev);
      const newId = clients.length > 0
        ? Math.max(...clients.map(c => c.id)) + 1
        : 1;
      newSet.add(newId);
      return newSet;
    });
  }, [clients]);

  const startEditClient = useCallback((id) => {
    setEditingClients((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  const changeFilter = useCallback((newFilter) => {  setFilter(newFilter); }, []);

  useEffect(() => {
    mobileEvents.on('delete', deleteClient);
    mobileEvents.on('edit', editClient);
    mobileEvents.on('add', addClient);
    mobileEvents.on('changeFilter', changeFilter);
    mobileEvents.on('startEdit', startEditClient);

    return () => {
      mobileEvents.removeAllListeners();
    };
  }, [deleteClient, editClient, addClient, changeFilter, startEditClient]);

  const getFilteredClients = () => {
    if (filter === 'blocked') return clients.filter(c => c.balance < 0);
    if (filter === 'active') return clients.filter(c => c.balance >= 0);
    return clients;
  };

  console.log('App render');

  return (
    <React.Fragment>
      <FilterButtons />
      <ClientList clients={getFilteredClients()} editingClients={editingClients} />
      <button onClick={() => mobileEvents.emit('add')} style={{ marginTop: '20px' }}>Добавить клиента</button>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));