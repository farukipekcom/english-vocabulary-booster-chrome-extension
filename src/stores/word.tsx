import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  query: "",
  modals: false,
  triggers: false,
  wordId: "",
  words: [],
  yeni: [],
  loading: false,
  allWords: [],
  error: "",
  loading2: false,
  allWords2: [],
  error2: "",
  deleteLoading: false,
  deleteResponse: false,
  deleteErrors: "",
};
export const fetchAllWords = createAsyncThunk("words/fetchAllWords", async (id) => {
  return axios.get(process.env.API_URL).then((res) => res.data.map((item) => item));
});
export const fetchPageWords = createAsyncThunk("words/fetchPageWords", async () => {
  return axios.get(process.env.API_URL + `?page=1&limit=8&orderBy=added_date&order=desc`).then((res) => res.data.map((item) => item));
});
export const deleteWord = createAsyncThunk("words/deleteWord", async (id: any) => {
  return axios.delete(process.env.API_URL + id).then((res) => res.status === 200 && true);
});
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
      state.yeni = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWords.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllWords.fulfilled, (state, action) => {
      state.loading = false;
      state.allWords = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAllWords.rejected, (state, action) => {
      state.loading = true;
      state.allWords = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchPageWords.pending, (state, action) => {
      state.loading2 = true;
    });
    builder.addCase(fetchPageWords.fulfilled, (state, action) => {
      state.loading2 = false;
      state.allWords2 = action.payload;
      state.error2 = "";
    });
    builder.addCase(fetchPageWords.rejected, (state, action) => {
      state.loading2 = true;
      state.allWords2 = [];
      state.error2 = action.error.message;
    });
    builder.addCase(deleteWord.pending, (state, action) => {
      state.deleteLoading = true;
      state.deleteResponse = false;
    });
    builder.addCase(deleteWord.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.deleteResponse = action.payload;
      state.deleteErrors = "";
    });
    builder.addCase(deleteWord.rejected, (state, action) => {
      state.deleteLoading = true;
      state.deleteErrors = action.error.message;
    });
  },
});
export const {setQuery, setModal, setTrigger, setWordId, setWords, setAllWords} = words.actions;
export default words.reducer;
