import {configureStore} from "@reduxjs/toolkit";
import word from "./word";
const store = configureStore({
  reducer: {
    word,
  },
});

export default store;
