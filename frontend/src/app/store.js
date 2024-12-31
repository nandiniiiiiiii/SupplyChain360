import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';  // Assuming you have combined reducers

const store = configureStore({
  reducer: rootReducer,  // This is where you pass your reducers
});

export default store;
