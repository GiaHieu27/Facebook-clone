import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  reducers: {
    LOGIN: (state, action) => {
      return action.payload;
    },
    LOGOUT: (state, action) => {
      return null;
    },
    UPDATEPICTURE: (state, action) => {
      state.picture = action.payload;
    },
    VERIFY: (state, action) => {
      state.verified = action.payload;
    },
  },
});

export default userSlice;
