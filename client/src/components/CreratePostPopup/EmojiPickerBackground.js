import { useEffect, useState, useRef } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";

function EmojiPickerBackground({
  text,
  setText,
  user,
  background,
  setBackground,
  type2,
}) {
  const [picker, setPicker] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const sm = useMediaQuery({ query: "(max-width: 550px)" });

  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/3.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
    "../../../images/postBackgrounds/9.jpg",
  ];

  const handleEmojiClick = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handleBackgroundClick = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };

  const handleRemoveBackground = () => {
    bgRef.current.style.backgroundImage = ``;
    setBackground();
    bgRef.current.classList.remove("bgHandler");
  };

  return (
    <div className={!type2 ? "" : "images_input"}>
      <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`Ban dang nghi gi the ${user.last_name}`}
          onChange={(e) => setText(e.target.value)}
          onClick={() => setPicker(false)}
          className={`post_input ${!type2 ? "" : "input2"} ${
            sm && !background && "ww"
          }`}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 30)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              !type2 ? "rlmove" : "movepicker2"
            }`}
          >
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBg(!showBg)}
          />
        )}
        {!type2 && showBg && (
          <div className="post_background">
            <div
              className="no_bg"
              onClick={() => {
                handleRemoveBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                alt={i}
                key={i}
                onClick={() => {
                  handleBackgroundClick(i);
                }}
              />
            ))}
          </div>
        )}

        <i
          className={`emoji_icon_large ${!type2 ? "" : "moveleft"}`}
          onClick={() => {
            setPicker(!picker);
          }}
        ></i>
      </div>
    </div>
  );
}

export default EmojiPickerBackground;
