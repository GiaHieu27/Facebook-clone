import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import CreateComments from "./CreateComments";
import PostMenu from "./PostMenu";
import { getReacts, reactPost } from "../../functions/post";
import Comment from "./Comment";

function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState([]);
  const [check, setCheck] = useState("");
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getReactPosts();
  }, [post]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const getReactPosts = async () => {
    const res = await getReacts(post._id, user.token);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
  };

  const handleReact = async (reactName) => {
    reactPost(post._id, reactName, user.token);
    if (check === reactName) {
      setCheck();
      let index = reacts.findIndex((x) => x.react === check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(reactName);
      let index = reacts.findIndex((x) => x.react === reactName);
      let index1 = reacts.findIndex((x) => x.react === check);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };

  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `${
                    post.user.gender === "male"
                      ? "đã cập ảnh đại diện của anh ấy"
                      : post.user.gender === "female"
                      ? "đã cập ảnh đại diện của cô ấy"
                      : "đã cập ảnh đại diện"
                  }`}
                {post.type === "cover" &&
                  ` ${
                    post.user.gender === "male"
                      ? "đã cập ảnh bìa của anh ấy"
                      : post.user.gender === "female"
                      ? "đã cập ảnh bìa của cô ấy"
                      : "đã cập ảnh bìa"
                  }`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="gray" />
            </div>
          </div>
        </Link>
        <div>
          <div
            className="post_header_right hover1"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Dots color="gray" />
          </div>
        </div>
      </div>

      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imageLenght={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}

      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post.images.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  alt="post_img"
                  key={i}
                  className={`img-${i}`}
                />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <>
          <div className="post_text">{post.text}</div>
          <div className="post_profile_wrap">
            <div className="post_updated_bg">
              <img src={post.user.cover} alt="" />
            </div>
            <img
              src={post.images[0].url}
              alt=""
              className="post_updated_picture"
            />
          </div>
        </>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        key={i}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total ? total : ""}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">
            {comments.length > 0 ? `${comments.length} comments` : ""}
          </div>
          {/* <div className="share_count">100 share</div> */}
        </div>
      </div>

      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          handleReact={handleReact}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => handleReact(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt="react_icon"
              className="small_react"
              width="20"
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "haha"
                  ? "#f7b125"
                  : check === "sad"
                  ? "#f7b152"
                  : check === "wow"
                  ? "#f7b152"
                  : check === "angry"
                  ? "rgb(233, 113, 15)"
                  : "#65676b"
              }`,
            }}
          >
            {check ? check : "like"}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>

      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComments
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          [...comments]
            .sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt))
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className="view_comments" onClick={() => showMore()}>
            View more commens
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
