import { Link } from 'react-router-dom';

function Friends({ friends }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: '378px',
      }}
    >
      <div className="profile_card">
        <div className="profile_card_header">
          Friends
          <div className="profile_header_link">All freinds</div>
        </div>

        {friends && (
          <div className="profile_header_count">
            {friends.length === 0
              ? 'No friend'
              : friends.length === 1
              ? '1 friend'
              : friends.length > 1
              ? `${friends.length} friends`
              : ''}
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
      <div className="relative_fb_copyright">
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>{' '}
        </Link>
        <span>. </span>
        <Link to="/"></Link>Cookies <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
}

export default Friends;
