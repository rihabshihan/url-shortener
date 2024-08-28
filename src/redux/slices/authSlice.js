import { createSlice } from '@reduxjs/toolkit';

//the value stored in localStorage under the key user. If there's no user in localStorage, it defaults to null.
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

// dispatch the authslice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => { //When the login action is dispatched, 
      localStorage.setItem('user', JSON.stringify(action.payload)); //this reducer function updates the user state with the data provided in action.payload.
      state.user = action.payload;
    },
    logout: (state) => { //When the logout action is dispatched, this reducer function sets user to null.
      state.user = null;
      localStorage.removeItem('user'); //The user data is also removed from localStorage, effectively logging the user out.
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
