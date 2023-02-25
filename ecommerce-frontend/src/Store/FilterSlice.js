import { createSelector, createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "Filter",
  initialState: {
    sort: null,

  },
  reducers: {
    sortByPrice: (state, action) => {
      return { ...state, sort: action.payload };
    },


  },
});

export const getItemSelector = createSelector(
  (state) => state.filter,
  (state) => state
);


export const {sortByPrice}=filterSlice.actions;

export default filterSlice.reducer;
