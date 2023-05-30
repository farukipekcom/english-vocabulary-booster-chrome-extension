import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {supabase} from "../options/lib/helper/supabaseClient";
import axios from "axios";
const initialState = {
  location: "",
  query: "",
  modal: false,
  trigger: false,
  wordId: "",
  token: JSON.parse(localStorage.getItem("sb-noyonmsgfmqtzdesmhzy-auth-token")),
  activeCategory: "All",
  allWordsLoading: false,
  allWordsResponse: [],
  allWordsCount: "",
  allWordsErrors: "",
  deleteLoading: false,
  deleteResponse: false,
  deleteErrors: "",
  userLoading: false,
  userSuccess: false,
  userResponse: null,
  userErrors: "",
  settingsLoading: false,
  settingsSuccess: false,
  settingsResponse: [],
  wordsLoading: false,
  wordsSuccess: false,
  wordsResponse: [],
  pageWordsLoading: false,
  pageWordsSuccess: false,
  pageWordsResponse: [],
};
export const fetchAllWords = createAsyncThunk("words/fetchAllWords", async () => {
  return axios.get(process.env.API_URL).then((res) => res.data.map((item) => item));
});

export const deleteWord = createAsyncThunk("words/deleteWord", async (id: number) => {
  const {data, error} = await supabase.from("words").delete().eq("word_id", id);
  return true;
});
export const fetchUser = createAsyncThunk("words/fetchUser", async () => {
  const res = await supabase.from("user").select("*");
  return res.data[0];
});
export const fetchSettings = createAsyncThunk("words/fetchSettings", async () => {
  const res = await supabase.from("settings").select("*");
  return res.data[0];
});
export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
  const res = await supabase.from("words").select("*");
  return res.data;
});
export const fetchPageWords = createAsyncThunk("words/fetchPageWords", async (payload: any) => {
  const res = await supabase
    .from("words")
    .select("*", {count: "exact"})
    .range(payload.wordFrom, payload.wordTo)
    .order("created_at", {ascending: false});
  return res.data;
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
    setLocation: (state, action) => {
      state.location = action.payload;
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
      state.userSuccess = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.userSuccess = true;
      state.userResponse = action.payload;
      state.userErrors = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userLoading = true;
      state.userErrors = action.error.message;
      state.userSuccess = false;
    });
    builder.addCase(fetchSettings.pending, (state, action) => {
      state.settingsLoading = true;
      state.settingsSuccess = false;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action: any) => {
      state.settingsLoading = false;
      state.settingsSuccess = true;
      state.settingsResponse = action.payload;
    });
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.settingsLoading = true;
      state.settingsSuccess = false;
    });
    builder.addCase(fetchWords.pending, (state, action) => {
      state.wordsLoading = true;
      state.wordsSuccess = false;
    });
    builder.addCase(fetchWords.fulfilled, (state, action: any) => {
      state.wordsLoading = false;
      state.wordsSuccess = true;
      state.wordsResponse = action.payload;
    });
    builder.addCase(fetchWords.rejected, (state, action) => {
      state.wordsLoading = true;
      state.wordsSuccess = false;
    });
    builder.addCase(fetchPageWords.pending, (state, action) => {
      state.pageWordsLoading = true;
      state.pageWordsSuccess = false;
    });
    builder.addCase(fetchPageWords.fulfilled, (state, action: any) => {
      state.pageWordsLoading = false;
      state.pageWordsSuccess = true;
      state.pageWordsResponse = action.payload;
    });
    builder.addCase(fetchPageWords.rejected, (state, action) => {
      state.pageWordsLoading = true;
      state.pageWordsSuccess = false;
    });
  },
});
export const {setQuery, setModal, setTrigger, setWordId, setActiveCategory, setToken, setLocation} = words.actions;
export default words.reducer;
