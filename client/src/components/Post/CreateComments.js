import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import ClipLoader from "react-spinners/PulseLoader";

import { comment } from "../../functions/post";
import uploadImages from "../../functions/uploadImages";
import dataURLtoBlob from "../../helpers/dataURLtoBlob";

function CreateComments({ user, postId, setComments, setCount }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [text, setText] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmojiClick = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

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
      setCommentImage(event.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (commentImage !== "") {
        setLoading(true);
        const img = dataURLtoBlob(commentImage);
        const path = `${user.username}/post_images/${postId}`;

        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);

        const imgComment = await uploadImages(formData, user.token);
        const comments = await comment(
          postId,
          text,
          imgComment[0].url,
          user.token
        );

        setComments(comments);
        setCount((prev) => ++prev);
        setLoading(false);
        setText("");
        setCommentImage("");
      } else {
        setLoading(true);
        const comments = await comment(postId, text, "", user.token);
        setComments(comments);
        setCount((prev) => ++prev);
        setLoading(false);
        setText("");
        setCommentImage("");
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input
            type="file"
            ref={imgRef}
            accept="image/png,image/jpeg,image/jpeg,image/gif,image/webp"
            onChange={handleChangeImage}
            hidden
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Thử lại
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Viet binh luan"
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
            onClick={() => setPicker(false)}
          />
          <div className="comment_circle">
            <ClipLoader color="green" size="7px" loading={loading} />
          </div>

          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker(!picker);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              imgRef.current.click();
            }}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateComments;
