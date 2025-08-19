import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './clientsSlice';

const store = configureStore({
  reducer: {
    clientsData: clientsReducer
  }
});

export default store;