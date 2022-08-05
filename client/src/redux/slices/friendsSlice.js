import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
  name: "friends",
  initialState: { loading: false, friends: {}, error: "" },
  reducers: {
    FRIEND_REQUEST: (state, action) => {
      state.loading = true;
    },
    FRIEND_SUCCESS: (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.friends = action.payload;
      }
    },
    FRIEND_ERROR: (state, action) => {
      if (state.error) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export default friendSlice;
