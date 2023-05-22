import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {supabase} from "../options/lib/helper/supabaseClient";
import axios from "axios";
const initialState = {
  query: "",
  modal: false,
  trigger: false,
  wordId: "",
  token: JSON.parse(localStorage.getItem("token")),
  activeCategory: "All",
  allWordsLoading: false,
  allWordsResponse: [],
  allWordsCount: "",
  allWordsErrors: "",
  pageWordsLoading: false,
  pageWordsResponse: [],
  pageWordsErrors: "",
  deleteLoading: false,
  deleteResponse: false,
  deleteErrors: "",
  userLoading: false,
  userResponse: null,
  userErrors: "",
};
export const fetchAllWords = createAsyncThunk("words/fetchAllWords", async (id) => {
  return axios.get(process.env.API_URL).then((res) => res.data.map((item) => item));
});
export const fetchPageWords = createAsyncThunk("words/fetchPageWords", async (payload: any) => {
  return axios
    .get(process.env.API_URL + `?page=${payload.pageNumber}&limit=${payload.limit}&orderBy=added_date&order=desc`)
    .then((res) => res.data.map((item) => item));
});
export const deleteWord = createAsyncThunk("words/deleteWord", async (id: any) => {
  return axios.delete(process.env.API_URL + id).then((res) => res.status === 200 && true);
});
export const fetchUser = createAsyncThunk("words/fetchUser", async () => {
  const res = await supabase.from("user").select("*");
  return res.data[0];
});
const words = createSlice({
  name: "words",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setWordId: (state, action) => {
      state.wordId = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWords.pending, (state, action) => {
      state.allWordsLoading = true;
    });
    builder.addCase(fetchAllWords.fulfilled, (state, action) => {
      state.allWordsLoading = false;
      state.allWordsResponse = action.payload;
      state.allWordsCount = action.payload.length;
      state.allWordsErrors = "";
    });
    builder.addCase(fetchAllWords.rejected, (state, action) => {
      state.allWordsLoading = true;
      state.allWordsResponse = [];
      state.allWordsErrors = action.error.message;
    });
    builder.addCase(fetchPageWords.pending, (state, action) => {
      state.pageWordsLoading = true;
    });
    builder.addCase(fetchPageWords.fulfilled, (state, action) => {
      state.pageWordsLoading = false;
      state.pageWordsResponse = action.payload;
      state.pageWordsErrors = "";
    });
    builder.addCase(fetchPageWords.rejected, (state, action) => {
      state.pageWordsLoading = true;
      state.pageWordsResponse = [];
      state.pageWordsErrors = action.error.message;
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
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userLoading = true;
      state.userResponse = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.userResponse = action.payload;
      state.userErrors = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userLoading = true;
      state.userErrors = action.error.message;
    });
  },
});
export const {setQuery, setModal, setTrigger, setWordId, setActiveCategory, setToken} = words.actions;
export default words.reducer;
