import { useState, useContext } from "react";

import Bio from "./Bio";
import EditDetails from "./EditDetails";
import { ProfileContext } from "../../profileContext/Context";

function Intro({ visitor }) {
  const { details, setShowBio, showBio } = useContext(ProfileContext);

  const [visible, setVisible] = useState(false);

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>

      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBio(true)}
        >
          Add bio
        </button>
      )}
      {showBio && <Bio placeholder="Add bio" name="bio" />}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job} at {details?.workplace}
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        !details?.job &&
        details?.workplace && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Live in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/from.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {details?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {details?.instagram}
          </a>
        </div>
      )}

      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Edit details
        </button>
      )}
      {visible && !visitor && <EditDetails setVisible={setVisible} />}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Edit features</button>
      )}
    </div>
  );
}

export default Intro;
