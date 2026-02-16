import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});


export const { increment, decrement } = counterSlice.actions;

// Export the reducer to use in the store
export default counterSlice.reducer;