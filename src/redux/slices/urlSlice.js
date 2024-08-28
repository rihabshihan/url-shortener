import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: JSON.parse(localStorage.getItem('urls')) || [], //array that stores all the URLs. Initially, it tries to load any saved URLs from localStorage
}; // If no URLs are stored, it initializes as an empty array.

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    addUrl: (state, action) => { //action is dispatched, this reducer adds the new URL 
      state.urls.push(action.payload);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
    deleteUrl: (state, action) => { //action is dispatched, this reducer filters out the URL with the matching id from the urls array.
      state.urls = state.urls.filter((url) => url.id !== action.payload);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
    updateUrl: (state, action) => { // action is dispatched, this reducer finds the URL in the urls array with the matching id.
      const index = state.urls.findIndex((url) => url.id === action.payload.id);
      if (index !== -1) {
        state.urls[index] = action.payload; //If found, it updates the URL with the new data provided in action.payload.
        localStorage.setItem('urls', JSON.stringify(state.urls));
      }
    },
  },
});

export const { addUrl, deleteUrl, updateUrl } = urlSlice.actions;
export default urlSlice.reducer;
