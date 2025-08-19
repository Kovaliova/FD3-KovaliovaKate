import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const res = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
    if (!res.ok) throw new Error('Ошибка загрузки');
    const data = await res.json();
    return data;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    companyName: '',
    clients: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addClient: (state, action) => {
      if (!state.clients) state.clients = [];
      state.clients.push(action.payload);
    },
    editClient: (state, action) => {
      const { id, surname, firstName, patronymic, balance } = action.payload;
      const idx = state.clients.findIndex(c => c.id === id);
      if (idx !== -1) state.clients[idx] = { id, surname, firstName, patronymic, balance };
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyName = action.payload.companyName || '';
        state.clients = (action.payload.clientsArr || []).map(c => ({
            id: c.id,
            surname: c.fam,
            firstName: c.im,
            patronymic: c.otch,
            balance: c.balance
        }));
       })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addClient, editClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;