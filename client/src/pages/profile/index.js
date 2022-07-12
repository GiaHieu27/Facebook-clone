// lib
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ScaleLoader from "react-spinners/ScaleLoader";
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
import CreratePostPopup from "../../components/CreratePostPopup";
import { ProfileContext } from "../../profileContext/Context";

function Profile({ getPosts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, user, loading } = useContext(ProfileContext);
  const { username } = useParams();

  let userParam = username === undefined ? user.username : username;
  let visitor = userParam === user.username ? false : true;

  const [photos, setPhotos] = useState([]);
  const [visible, setVisible] = useState(false);

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
  const friend = useMediaQuery({
    query: "(max-width: 770px)",
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
      <Header page="profile" getPosts={getPosts} />

      {visible && (
        <CreratePostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          posts={profile.posts}
          profile
        />
      )}

      <div className="profile_top" ref={profileTopRef}>
        <div className="profile_container">
          {loading ? (
            <>
              <div className="profile_cover">
                <Skeleton
                  height="347px"
                  containerClassName="avatar-skeleton"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div
                className="profile_img_wrap"
                style={{ marginBottom: "-3rem", transform: "translateY(-8px)" }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    height="180px"
                    width="180px"
                    circle
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        height="33px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(10px)" }}
                      />
                      <Skeleton
                        height="26px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(14px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="15px"
                        width="90px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(12px)" }}
                      />
                    </div>
                    <div
                      className="profile_friend_imgs"
                      style={{ marginLeft: `${!friend ? 0 : 35}px` }}
                    >
                      {Array.from(new Array(6), (val, index) => index + 1).map(
                        (val, i) => (
                          <Skeleton
                            circle
                            height="32px"
                            width="32px"
                            key={i}
                            containerClassName="avatar-skeleton"
                            style={{
                              transform: `translateY(5px) translateX(${
                                -i * 7
                              }px)`,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton
                    height="36px"
                    width="120px"
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      height="36px"
                      width="120px"
                      containerClassName="avatar-skeleton"
                    />
                    {visitor && (
                      <Skeleton
                        height="36px"
                        width="120px"
                        containerClassName="avatar-skeleton"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
                {loading ? (
                  <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="sekeleton_loader">
                        <ScaleLoader color="#1876f2" />
                      </div>
                    </div>

                    <div className="profile_card">
                      <div className="profile_card_header">
                        Photos
                        <div className="profile_header_link">
                          See all photos
                        </div>
                      </div>
                      <div className="sekeleton_loader">
                        <ScaleLoader color="#1876f2" />
                      </div>
                    </div>

                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="sekeleton_loader">
                        <ScaleLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro visitor={visitor} />
                    <Photos
                      userParam={userParam}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile.friends} />
                  </>
                )}

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
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPost />
                {loading ? (
                  <div className="sekeleton_loader">
                    <ScaleLoader color="#1876f2" />
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
