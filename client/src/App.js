// import lib
import { useEffect, useReducer, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// import project
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import ResetPassword from "./pages/reset";
import CreratePostPopup from "./components/CreratePostPopup";
import { postsReducer } from "./functions/reducer";

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((sate) => ({ ...sate }));

  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      dispatch({
        type: "POST_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  // console.log(posts);

  return (
    <>
      {visible && (
        <CreratePostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          posts={posts}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile/" element={<Profile />} getPosts={getPosts} />
          <Route path="/profile/:username" element={<Profile />} />

          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getPosts={getPosts}
              />
            }
          />
          <Route path="/activate/:tokenUrl" element={<Activate />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
