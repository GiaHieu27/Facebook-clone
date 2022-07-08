import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useClickOutSide from "../../hooks/useClickOutSide";
import * as functions from "../../functions/search";
import { Return, Search } from "../../svg";

function SearchMenu({ color, setShowSearchMenu }) {
  const user = useSelector((state) => state.user);

  const [iconVisible, setIconVisible] = useState(true);
  const [searchterm, setSearchTerm] = useState("");
  const [results, setResults] = useState("");
  const [searchHistory, setSearchHistory] = useState();

  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutSide(menuRef, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    getHistorySearch();
  }, []);

  const getHistorySearch = async () => {
    const res = await functions.getSearchHistory(user.token);
    setSearchHistory(res);
  };

  const handleSearch = async () => {
    if (searchterm === "") {
      setResults([]);
    } else {
      const res = await functions.search(searchterm, user.token);
      setResults(res);
    }
  };

  const handleAddToHistorySearch = async (searchUser) => {
    await functions.addToSearchHistory(searchUser, user.token);
    getHistorySearch();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menuRef}>
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
        <div
          className="search"
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            value={searchterm}
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={() => handleSearch()}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results == "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a href="/">Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createAt) - new Date(a.createAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => handleAddToHistorySearch(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i className="exit_icon"></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user, i) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => handleAddToHistorySearch(user._id)}
              key={i}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchMenu;
