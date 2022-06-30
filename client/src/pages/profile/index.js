// lib
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

// project
import profileReducer from "../../redux/reducers/profileReducer";
import Header from "../../components/Header";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PpYouMayKnow from "./PpYouMayKnow";
import CreatePost from "../../components/CreatePost";
import GridPost from "./GridPost";
import Post from "../../components/Post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/Intro";
import { ProfileContext } from "../../profileContext/Context";

function Profile({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, user, loading } = useContext(ProfileContext);
  const { username } = useParams();

  let userParam = username === undefined ? user.username : username;
  let visitor = userParam === user.username ? false : true;

  const [photos, setPhotos] = useState([]);

  const path = `${userParam}/*`;
  const max = 30;
  const sort = "desc";

  useEffect(() => {
    getProfile();
  }, [userParam]);

  const getProfile = async () => {
    try {
      dispatch(profileReducer.actions.PROFILE_REQUEST());
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userParam}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages/`,
            { path, max, sort },
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch(profileReducer.actions.PROFILE_SUCCESS(data));
      }
    } catch (error) {
      dispatch(
        profileReducer.actions.PROFILE_SUCCESS(error.response.data.message)
      );
    }
  };

  // Scroll fixed
  const profileTopRef = useRef(null);
  const [topHeight, setTopHeight] = useState();

  const leftSideRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  const check = useMediaQuery({
    query: "(min-width: 901px)",
  });

  useEffect(() => {
    setTopHeight(profileTopRef.current.clientHeight + 300);
    setLeftHeight(leftSideRef.current.clientHeight);
    window.addEventListener("scroll", getScrollHeight, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScrollHeight, { passive: true });
    };
  }, [loading, scrollHeight]);

  const getScrollHeight = () => {
    setScrollHeight(window.pageYOffset);
  };
  // End scroll fixed

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top" ref={profileTopRef}>
        <div className="profile_container">
          <Cover
            cover={profile.cover}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>

      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PpYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= topHeight && leftHeight >= 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= topHeight &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSideRef}>
                <Intro visitor={visitor} />
                <Photos
                  userParam={userParam}
                  token={user.token}
                  photos={photos}
                />
                <Friends friends={profile.friends} />

                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile={profile}
                    setVisible={setVisible}
                  />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post, i) => (
                      <Post key={i} post={post} user={user} profile />
                    ))
                  ) : (
                    <div className="no_posts">
                      Người dùng {profile.first_name} {profile.last_name} chưa
                      đăng bài viết
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
