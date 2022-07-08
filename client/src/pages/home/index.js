import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/Header";
import LeftHome from "../../components/Home/Left";
import RightHome from "../../components/Home/Right";
import Stories from "../../components/Home/Stories";
import CreatePost from "../../components/CreatePost";
import SenVerification from "../../components/Home/sendVerification";
import Post from "../../components/Post";

function Home({ setVisible, posts, loading, getPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
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
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}

export default Home;
