import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

import customerReducer from './reducers/customer';
import categoryReducer from './reducers/category';
import productsReducer from './reducers/products';
import usersReducer from './reducers/users';
import ordersReducer from './reducers/orders';
import appConfigReducer from './reducers/appConfig';
import hotelRoomReducer from './reducers/hotelRoom';
import hotelOrderReducer from './reducers/hotelOrders';

const rootReducer = combineReducers({
  categoryReducer,
  productsReducer,
  customerReducer,
  usersReducer,
  ordersReducer,
  appConfigReducer,
  hotelRoomReducer,
  hotelOrderReducer
});


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: process.env.NODE_ENV !== 'production', // Habilita las Redux DevTools en entornos de desarrollo
});

const persistor = persistStore(store);

// Limpia el estado persistido (por ejemplo, al cerrar sesión o al reiniciar la aplicación)
//persistor.purge();

export { store, persistor };