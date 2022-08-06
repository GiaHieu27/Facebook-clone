import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import friendsSlice from "../../redux/slices/friendsSlice";
import { getFriend } from "../../functions/friend";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";

function Friend() {
  const { user, friends } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    getFriendPages();
  }, []);

  const getFriendPages = async () => {
    dispatch(friendsSlice.actions.FRIEND_REQUEST());
    const res = await getFriend(user.token);
    if (res.success === true)
      dispatch(friendsSlice.actions.FRIEND_SUCCESS(res.data));
    else dispatch(friendsSlice.actions.FRIEND_ERROR(res.data));
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
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && "mmenu_item active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>Home</span>
            </Link>

            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === "requests" && "mmenu_item active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friends Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === "sent" && "mmenu_item active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === "all" && "mmenu_item active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

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

        <div className="friends_right">
          {(type === undefined || type === "requests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.requests &&
                  friends.data.requests.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="request"
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.sentRequests &&
                  friends.data.sentRequests.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="sent"
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.friends &&
                  friends.data.friends.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="friend"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Friend;
