import { useRef } from "react";
import { useContext } from "react";
import { ProfileContext } from "../../profileContext/Context";
import Detail from "./Detail";
import useClickOutside from "../../hooks/useClickOutSide";

function EditDetails({ setVisible }) {
  const { details } = useContext(ProfileContext);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setVisible(false));

  return (
    <div className="blur">
      <div className="postBox infosBox" ref={modalRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>

        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your details</span>
            <span>Details you seclect will be public</span>
          </div>

          <div className="details_header">Other Name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            text="other name"
            name="otherName"
          />

          <div className="details_header">Work</div>
          <Detail value={details?.job} img="job" text="job" name="job" />
          <Detail
            value={details?.workplace}
            img="job"
            text="workplace"
            name="workplace"
          />

          <div className="details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
          />

          <div className="details_header">Current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
          />
          <div className="details_header">Hometown</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            text="hometown"
          />
          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            name="relationship"
            rel
          />
          <div className="details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="instagram"
            placeholder="Add instagram"
            name="instagram"
            text="instagram"
          />
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
