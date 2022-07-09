import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/friend";

function Card({ userr, user, type, getFriendPages }) {
  const handleCancelRequest = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res === "ok") getFriendPages();
  };
  const handleAcceptRequest = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res === "ok") getFriendPages();
  };
  const handleDeleteRequest = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res === "ok") getFriendPages();
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => handleCancelRequest(userr._id)}
        >
          Cancel Requests
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => handleAcceptRequest(userr._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn"
            onClick={() => handleDeleteRequest(userr._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
