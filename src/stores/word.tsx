import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  words: "",
};

const words = createSlice({
  name: "words",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.words = action.payload;
    },
  },
});

export const {setQuery} = words.actions;
export default words.reducer;
