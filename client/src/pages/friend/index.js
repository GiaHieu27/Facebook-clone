import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import friendsReducer from "../../redux/reducers/friendsReducer";
import { getFriend } from "../../functions/friend";

function Friend() {
  const user = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    getFriendPages();
  }, []);

  const getFriendPages = async () => {
    dispatch(friendsReducer.actions.FRIEND_REQUEST());
    const res = await getFriend(user.token);
    if (res.success === true)
      dispatch(friendsReducer.actions.FRIEND_SUCCESS(res.data));
    else dispatch(friendsReducer.actions.FRIEND_ERROR(res.data));
  };

  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_left_wrap">
            <div className="mmenu_item active_friends">
              <div className="small_circle" style={{ background: "#1876f2" }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Home</span>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friends Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="friends_right"></div>
      </div>
    </>
  );
}

export default Friend;
