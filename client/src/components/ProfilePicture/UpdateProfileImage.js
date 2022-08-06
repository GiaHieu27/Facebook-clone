import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Cropper from "react-easy-crop";
import PulseLoader from "react-spinners/PulseLoader";

import getCroppedImg from "../../helpers/getCroppedImg";
import uploadImages from "../../functions/uploadImages";
import userSlice from "../../redux/slices/userSlice";
import { updateProfilePicture } from "../../functions/profile";
import { createPost } from "../../functions/post";

function UpdateProfileImage({ image, setImage, setError, setShow, pRef }) {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 1, y: 1 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const handleUpdateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((i) => i.blob());
      // console.log(img);
      // console.log(blob);
      const path = `${user.username}/profilePicture`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, user.token);
      // console.log(response);
      const updatePicture = await updateProfilePicture(res[0].url, user.token);
      if (updatePicture === "ok") {
        const newPost = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );

        if (newPost.status === "ok") {
          setLoading(false);
          setImage("");
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
          dispatch(userSlice.actions.UPDATEPICTURE(res[0].url));
          setShow(false);
        } else {
          setLoading(false);
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(updatePicture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>

      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>

        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            value={zoom}
            ref={slider}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button className="blue_btn" onClick={handleUpdateProfilePicture}>
          {loading ? <PulseLoader color="white" size="7px" /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default UpdateProfileImage;
