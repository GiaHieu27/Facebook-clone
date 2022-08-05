import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./scss/main.scss";
import "./styles/icons/icons.scss";
import App from "./App";
import store from "./redux/store";
import { ProfileProvider } from "./profileContext/Context";

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
