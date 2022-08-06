import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

function Meeting() {
  const friendStore = useSelector((state) => state.friends);
  const friends = friendStore.data.friends;

  const isMobile = useMediaQuery({
    query: "(max-width: 620px)",
  });

  return (
    <div className="meeting">
      <a
        href="http://localhost:9000/create"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="meeting_btn hover3">
          <img src="../../../icons/meeting.png" alt="" width="23" />
          <span>Tạo phòng họp mặt</span>
        </button>
      </a>

      <div className="meeting_friends">
        {friends && friends.length && !isMobile
          ? friends.map((friend) => (
              <img
                src={friend.picture}
                alt=""
                width="40"
                height="40"
                key={friend._id}
              />
            ))
          : friends &&
            friends.length &&
            isMobile &&
            friends
              .slice(0, 2)
              .map((friend) => (
                <img
                  src={friend.picture}
                  alt=""
                  width="40"
                  height="40"
                  key={friend._id}
                />
              ))}
      </div>
    </div>
  );
}

export default Meeting;
