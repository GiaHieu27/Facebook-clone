import { useContext } from "react";
import { useRef, useState } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import Friendship from "./Friendship";
import { ProfileContext } from "../../profileContext/Context";
import { Link } from "react-router-dom";

function ProfilePictureInfos({ profile, visitor, photos }) {
  const { othername } = useContext(ProfileContext);
  const [show, setShow] = useState(false);
  const pRef = useRef(null);

  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div className="profile_circle" onClick={() => setShow(true)}>
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>

        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
            <div className="othername">{`(${othername})`}</div>
          </div>
          {profile?.friends && (
            <div className="profile_friend_count">
              {profile?.friends.length === 0
                ? ""
                : profile?.friends.length === 1
                ? "1 friend"
                : `${profile?.friends.length} friends`}
            </div>
          )}
          <div className="profile_friend_imgs">
            {profile?.friends &&
              profile.friends.slice(0.6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt="friend_picture"
                    style={{
                      transform: `translateX(${-i * 5}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>

      {!visitor ? (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit Profile</span>
          </div>
        </div>
      ) : (
        <Friendship />
      )}
    </div>
  );
}

export default ProfilePictureInfos;
