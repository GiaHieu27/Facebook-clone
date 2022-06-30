import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfileImage from "./UpdateProfileImage";

import useClickOutSide from "../../hooks/useClickOutSide";

function ProfilePicture({ setShow, pRef, photos }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  useClickOutSide(popupRef, () => {
    setShow(false);
  });

  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} đinh dạng khong duoc ho tro`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} dung lượng quá lớn`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  // console.log(photos);

  return (
    <div className="blur">
      <input
        type="file"
        ref={inputRef}
        onChange={handleChangeImage}
        accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
        hidden
      />
      <div className="postBox pictureBox" ref={popupRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => inputRef.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>

        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Thử lại
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your profile Picture</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (item) => item.folder === `${user.username}/profilePicture`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>

          <h4>Other Picture</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (item) => item.folder !== `${user.username}/profilePicture`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  alt=""
                  key={photo.public_id}
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
        {image && (
          <UpdateProfileImage
            image={image}
            setImage={setImage}
            setError={setError}
            setShow={setShow}
            pRef={pRef}
          />
        )}
      </div>
    </div>
  );
}

export default ProfilePicture;
