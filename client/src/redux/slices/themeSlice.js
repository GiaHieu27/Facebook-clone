import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const themeSlice = createSlice({
  name: "theme",
  initialState: Cookies.get("darkTheme")
    ? JSON.parse(Cookies.get("darkTheme"))
    : false,
  reducers: {
    DARK: (state, action) => {
      return true;
    },
    LIGHT: (state, action) => {
      return false;
    },
  },
});

export default themeSlice;
