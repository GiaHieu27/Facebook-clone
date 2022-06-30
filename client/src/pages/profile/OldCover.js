import { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutSide from "../../hooks/useClickOutSide";

function OldCover({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const selectRef = useRef(null);
  useClickOutSide(selectRef, () => {
    setShow(false);
  });

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={selectRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select Photo</span>
        </div>

        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>

        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos
              .filter((item) => item.folder === `${user.username}/cover`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
          <div className="old_pictures">
            {photos
              .filter((item) => item.folder !== `${user.username}/post_images`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OldCover;
