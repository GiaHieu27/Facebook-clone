import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import MenuItem from "./MenuItem";
import useClickOutside from "../../hooks/useClickOutSide";
import { savePost } from "../../functions/post";

function PostMenu({
  user,
  postUserId,
  postId,
  imageLenght,
  setShowMenu,
  checkSavedPost,
  setCheckSavedPost,
  images,
}) {
  const [compare] = useState(user.id === postUserId ? true : false);

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const handleSavePost = async () => {
    savePost(postId, user.token);
    if (checkSavedPost) setCheckSavedPost(false);
    else setCheckSavedPost(true);
  };

  const handleDownloadImg = async () => {
    images.map((image) => saveAs(image.url, "image.jpg"));
  };

  return (
    <ul className="post_menu" ref={menuRef}>
      <MenuItem icon="pin_icon" title="Pin Post" />

      <div onClick={handleSavePost}>
        {checkSavedPost ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this to your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>

      {compare && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!compare && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imageLenght && (
        <div onClick={() => handleDownloadImg()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imageLenght && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {compare && (
        <MenuItem img="../../../icons/lock.png" title="Edit audience" />
      )}
      {compare && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {compare && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {compare && <MenuItem icon="date_icon" title="Edit Date" />}
      {compare && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {compare && <MenuItem icon="archive_icon" title="Move to archive" />}
      {compare && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      )}
      {!compare && <div className="line"></div>}
      {!compare && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}

export default PostMenu;
