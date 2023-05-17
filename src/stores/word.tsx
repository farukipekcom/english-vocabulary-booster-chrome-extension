import {createSlice} from "@reduxjs/toolkit";
const initialState = {
  query: "",
  modals: "",
  triggers: false,
  wordId: "",
  words: [],
  allWords: [],
};
const words = createSlice({
  name: "words",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setModal: (state, action) => {
      state.modals = action.payload;
    },
    setTrigger: (state, action) => {
      state.triggers = action.payload;
    },
    setWordId: (state, action) => {
      state.wordId = action.payload;
    },
    setWords: (state, action) => {
      state.words = action.payload;
    },
    setAllWords: (state, action) => {
      state.allWords = action.payload;
    },
    deleteWord: (state, action) => {
      fetch(process.env.API_URL + action.payload, {
        method: "DELETE",
      });
    },
  },
});
export const {setQuery, setModal, setTrigger, setWordId, setWords, setAllWords, deleteWord} = words.actions;
export default words.reducer;
