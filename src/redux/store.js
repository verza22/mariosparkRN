// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({
  reducer: reducer,
  // Puedes agregar otras configuraciones aquí, como middleware, etc.
});

export default store;