import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import urlReducer from './slices/urlSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, //authReducer: The reducer function that handles the authentication state, imported from authSlice
    urls: urlReducer, //The reducer function that handles the URLs state, imported from urlSlice.
  },
});

export default store;
