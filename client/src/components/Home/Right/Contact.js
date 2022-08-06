import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriend } from "../../../functions/friend";
import friendSlice from "../../../redux/slices/friendsSlice";

function Contact() {
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const friends = friendStore.data.friends;

  useEffect(() => {
    getFriendPages();
  }, []);

  const getFriendPages = async () => {
    dispatch(friendSlice.actions.FRIEND_REQUEST());
    const res = await getFriend(user.token);
    if (res.success === true)
      dispatch(friendSlice.actions.FRIEND_SUCCESS(res.data));
    else dispatch(friendSlice.actions.FRIEND_ERROR(res.data));
  };

  return (
    <>
      {friends &&
        friends.length > 0 &&
        friends.map((friend) => (
          <div className="contact hover3" key={friend._id}>
            <div className="contact_img">
              <img src={friend.picture} alt="" />
            </div>
            <span>
              {friend.first_name} {friend.last_name}
            </span>
          </div>
        ))}
    </>
  );
}

export default Contact;
