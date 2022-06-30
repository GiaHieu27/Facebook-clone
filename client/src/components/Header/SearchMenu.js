import { useEffect, useRef } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { Return, Search } from "../../svg";

function SearchMenu({ color, setShowSearchMenu }) {
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutSide(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search">
          <Search color={color} />
          <input type="text" placeholder="Search Facebook" ref={input} />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
}

export default SearchMenu;
