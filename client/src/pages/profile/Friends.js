import { Link } from "react-router-dom";

function Friends({ friends }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link">Xem tất cả freinds</div>
      </div>

      {friends && (
        <div className="profile_header_count">
          {friends.length === 0
            ? "No friend"
            : friends.length === 1
            ? "1 friend"
            : friends.length > 1
            ? `${friends.length} friends`
            : ""}
        </div>
      )}
      <div className="profile_card_grid">
        {friends &&
          friends.slice(0.9).map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              key={friend._id}
            >
              <img src={friend.picture} alt="friend_picture" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Friends;
