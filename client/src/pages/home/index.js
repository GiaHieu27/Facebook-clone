import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";

import Header from "../../components/Header";
import LeftHome from "../../components/Home/Left";
import RightHome from "../../components/Home/Right";
import Stories from "../../components/Home/Stories";
import CreatePost from "../../components/CreatePost";
import SenVerification from "../../components/Home/sendVerification";
import Post from "../../components/Post";
import Meeting from "../../components/Meeting";

function Home({ setVisible, posts, loading, getPosts }) {
  const user = useSelector((state) => state.user);
  const [height, setHeight] = useState();
  const middle = useRef(null);

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getPosts={getPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SenVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <Meeting />
        {loading ? (
          <div className="sekeleton_loader">
            <ScaleLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome />
    </div>
  );
}

export default Home;
