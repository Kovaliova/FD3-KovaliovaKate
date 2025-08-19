import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
      if (!res.ok) throw new Error('Error');
      const data = await res.json();

      const clients = (data.clientsArr || []).map(c => ({
        id: c.id,
        surname: c.fam || '',
        firstName: c.im || '',
        patronymic: c.otch || '',
        balance: c.balance || 0
      }));

      return { companyName: data.companyName || '', clients };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    companyName: '',
    clients: [],
    status: 'idle',
    error: null
  },
  reducers: {
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(c => c.id !== action.payload);
    },
    editClient: (state, action) => {
      const client = state.clients.find(c => c.id === action.payload.id);
      if (client) Object.assign(client, action.payload);
    },
    addClient: (state) => {
      const newId = state.clients.length
        ? Math.max(...state.clients.map(c => c.id)) + 1
        : 1;
      state.clients.push({ id: newId, surname: '', firstName: '', patronymic: '', balance: 0 });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchClients.pending, state => { state.status = 'loading'; })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyName = action.payload.companyName;
        state.clients = action.payload.clients;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { deleteClient, editClient, addClient } = clientsSlice.actions;
export default clientsSlice.reducer;