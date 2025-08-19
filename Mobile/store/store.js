import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';

const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});

export default store;