import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import themeSlice from "../../../redux/slices/themeSlice";

function DisplayAccessibility({ setVisible }) {
  const darkTheme = useSelector((sate) => sate.theme);
  const dispatch = useDispatch();
  const [state, setState] = useState(darkTheme);

  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Display &amp; Accessibility
      </div>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>

      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input
          type="radio"
          name="dark"
          id="darkOff"
          checked={!state ? true : false}
          onChange={() => {
            dispatch(themeSlice.actions.LIGHT());
            Cookies.set("darkTheme", false);
            setState(false);
          }}
        />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input
          type="radio"
          name="dark"
          id="darkOn"
          checked={state ? state : false}
          onChange={() => {
            dispatch(themeSlice.actions.DARK());
            Cookies.set("darkTheme", true);
            setState(true);
          }}
        />
      </label>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Compact mode</span>
          <span className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}

export default DisplayAccessibility;
