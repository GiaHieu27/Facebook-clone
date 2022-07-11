// import lib
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// import in project
import "./scss/main.scss";
import "./styles/icons/icons.scss";
import App from "./App";
import userSlice from "./redux/reducers/userReducer";
import profileSlice from "./redux/reducers/profileReducer";
import friendSlice from "./redux/reducers/friendsReducer";
import { ProfileProvider } from "./profileContext/Context";
import themeSlice from "./redux/reducers/themeReducer";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    friends: friendSlice.reducer,
    theme: themeSlice.reducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ProfileProvider>
      <Router>
        <App />
      </Router>
    </ProfileProvider>
  </Provider>,
  document.getElementById("root")
);
