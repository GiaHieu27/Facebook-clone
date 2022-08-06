import { useSelector } from "react-redux";

function Meeting() {
  const friendStore = useSelector((state) => state.friends);
  const friends = friendStore.data.friends;

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
        {friends && friends.length
          ? friends.map((friend) => (
              <img
                src={friend.picture}
                alt=""
                width="40"
                height="40"
                key={friend._id}
              />
            ))
          : ""}
      </div>
    </div>
  );
}

export default Meeting;
