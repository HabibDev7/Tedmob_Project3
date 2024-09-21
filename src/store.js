import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './reducers/uiReducer';

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;