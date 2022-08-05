import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { loading: false, profile: {}, error: "" },
  reducers: {
    PROFILE_REQUEST: (state, action) => {
      state.loading = true;
    },
    PROFILE_SUCCESS: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.profile = action.payload;
      }
    },
    PROFILE_POSTS: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.profile = { ...state.profile, posts: action.payload };
      }
    },
    PROFILE_ERROR: (state, action) => {
      if (state.error) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export default profileSlice;
