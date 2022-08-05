import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import PulseLoader from "react-spinners/PulseLoader";

import useClickOutSide from "../../hooks/useClickOutSide";
import uploadImages from "../../functions/uploadImages";
import getCroppedImg from "../../helpers/getCroppedImg";
import OldCover from "./OldCover";
import { createPost } from "../../functions/post";
import { updateCover } from "../../functions/profile";

function Cover({ cover, visitor, photos }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [error, setError] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const menuRef = useRef(null);
  const uploadRef = useRef(null);
  const coverWidthRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    setWidth(coverWidthRef.current.clientWidth);
  }, [window.innerWidth]);

  useClickOutSide(menuRef, () => {
    setShowCoverMenu(false);
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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
      setCoverPicture(event.target.result);
    };
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const coverImg = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 1, y: 1 });
          setCoverPicture(coverImg);
        } else {
          return coverImg;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const handleUpdateCover = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((i) => i.blob());
      
      const path = `${user.username}/cover`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, user.token);
      
      const update_cover = await updateCover(res[0].url, user.token);
      if (update_cover === "ok") {
        const newPost = await createPost(
          "cover",
          null,
          null,
          res,
          user.id,
          user.token
        );

        if (newPost.status === "ok") {
          setLoading(false);
          setCoverPicture("");
          coverRef.current.src = res[0].url;
        } else {
          setLoading(false);
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(update_cover);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="profile_cover" ref={coverWidthRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover picture is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={handleUpdateCover}>
              {loading ? <PulseLoader color="white" size="7px" /> : "Save"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={uploadRef}
        accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
        hidden
        onChange={handleChangeImage}
      />
      {coverPicture && (
        <div className="cover_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} alt="profile_cover" className="cover" ref={coverRef} />
      )}
      {!visitor && (
        <div className="update_cover_wrapper" ref={menuRef}>
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu(!showCoverMenu)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu">
              <div
                className="open_cover_menu_item"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item"
                onClick={() => uploadRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Thử lại
          </button>
        </div>
      )}
      {show && (
        <OldCover
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}

export default Cover;
