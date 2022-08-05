import { configureStore } from "@reduxjs/toolkit";

import friendSlice from "../slices/friendsSlice";
import profileSlice from "../slices/profileSlice";
import themeSlice from "../slices/themeSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    friends: friendSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
